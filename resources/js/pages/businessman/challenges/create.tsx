import React, { useState, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import MainLayout from '@/layouts/main-layout';
import { Category, Form, FormQuestion } from '@/types';

interface Props {
  categories: Category[];
  difficulties: Array<{
    value: string;
    label: string;
  }>;
  forms: Form[];
}

export default function CreateChallenge({ categories, difficulties, forms }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categoryQuestions, setCategoryQuestions] = useState<FormQuestion[]>([]);

  const { data, setData, post, processing, errors } = useForm({
    name: '',
    description: '',
    objective: '',
    difficulty: '',
    requirements: [] as string[],
    start_date: '',
    end_date: '',
    category_id: '',
    link_video: '',
    acquisition_type: 'license',
    acquisition_details: '',
    acquisition_terms: '',
    reward_amount: '',
    reward_currency: 'COP',
    reward_description: '',
    reward_delivery_type: 'final_software',
    reward_delivery_details: '',
    category_questions: {},
  });

  // Cargar preguntas cuando se selecciona una categoría
  useEffect(() => {
    if (selectedCategory) {
      // Buscar el formulario específico de esta categoría
      const categoryForm = forms.find(form => form.category_id === selectedCategory.id);
      if (categoryForm && categoryForm.questions) {
        console.log(`Cargando formulario para categoría: ${selectedCategory.name}`, categoryForm.questions);
        setCategoryQuestions(categoryForm.questions);
      } else {
        console.log(`No se encontró formulario para la categoría: ${selectedCategory.name}`);
        setCategoryQuestions([]);
      }
    } else {
      setCategoryQuestions([]);
    }
  }, [selectedCategory, forms]);

  const handleCategoryChange = (categoryId: string) => {
    const category = categories.find(cat => cat.id.toString() === categoryId);
    setSelectedCategory(category || null);
    setData('category_id', categoryId);
    setData('category_questions', {});
  };

  const handleQuestionChange = (questionIndex: number, value: string | string[]) => {
    const question = categoryQuestions[questionIndex];
    if (!question) return;

    setData('category_questions', {
      ...data.category_questions,
      [question.text]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/businessman/challenges', {
      onSuccess: () => {
        // Mostrar alerta de éxito
        alert('¡Reto creado exitosamente en estado borrador! Un administrador lo revisará y lo publicará.');
        // Redirigir al panel después de crear
      },
      onError: () => {
        // Mostrar alerta de error
        alert('Error al crear el reto. Por favor, verifica los datos e intenta nuevamente.');
      },
    });
  };

  const renderQuestion = (question: FormQuestion, index: number) => {
    const value = (data.category_questions as Record<string, string | string[]>)[question.text] || '';

    switch (question.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
            className="mt-2 block w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
            placeholder={`Ingresa tu respuesta...`}
            required={question.required}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
            rows={4}
            className="mt-2 block w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm resize-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
            placeholder={`Describe tu respuesta con detalle...`}
            required={question.required}
          />
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
            className="mt-2 block w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
            required={question.required}
          >
            <option value="" className="text-gray-500">Selecciona una opción</option>
            {question.options?.map((option, i) => (
              <option key={i} value={option} className="text-gray-900">{option}</option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="mt-3 space-y-3">
            {question.options?.map((option, i) => (
              <label key={i} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-50 hover:border-gray-300">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={value === option}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2"
                  required={question.required}
                />
                <span className="ml-3 text-sm font-medium text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="mt-3 space-y-3">
            {question.options?.map((option, i) => (
              <label key={i} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-50 hover:border-gray-300">
                <input
                  type="checkbox"
                  value={option}
                  checked={Array.isArray(value) && value.includes(option)}
                  onChange={(e) => {
                    const currentValues = Array.isArray(value) ? value : [];
                    const newValues = e.target.checked
                      ? [...currentValues, option]
                      : currentValues.filter(v => v !== option);
                    handleQuestionChange(index, newValues);
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="ml-3 text-sm font-medium text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <MainLayout title="Crear Nuevo Reto - Panel Empresarial" description="Crea un nuevo reto para tu empresa">
      <div className="bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Crear Nuevo Reto</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Completa la información para crear un nuevo reto para tu empresa
                </p>
              </div>
              <Link
                href="/businessman/panel"
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors inline-flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver al Panel
              </Link>
            </div>
          </div>

          {/* Formulario */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Información Básica */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Información Básica
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Reto *
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                      Elige un nombre atractivo y descriptivo que capture la esencia de tu reto
                    </p>
                    <input
                      type="text"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                      placeholder="Ej: Desarrollo de app innovadora"
                      required
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría *
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                      Selecciona la categoría que mejor describe el tipo de reto que quieres crear
                    </p>
                    <select
                      value={data.category_id}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                      required
                    >
                      <option value="">Selecciona una categoría</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>}
                  </div>
                </div>

                {/* Preguntas Específicas de Categoría - Movido aquí */}
                {selectedCategory && (
                  <>
                    {categoryQuestions.length > 0 ? (
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                          Formulario Específico - {selectedCategory.name}
                        </h3>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-blue-700 text-sm">
                            <strong>Formulario único de la categoría:</strong> Estas preguntas son específicas para la categoría "{selectedCategory.name}" y ayudarán a definir mejor los criterios de tu reto.
                          </p>
                        </div>
                        <div className="space-y-6">
                          {categoryQuestions.map((question, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                {question.text} {question.required && <span className="text-red-500">*</span>}
                              </label>
                              {renderQuestion(question, index)}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-yellow-700 text-sm">
                          <strong>Nota:</strong> La categoría "{selectedCategory.name}" no tiene un formulario específico configurado. Puedes continuar con la creación del reto sin preguntas adicionales.
                        </p>
                      </div>
                    )}
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción *
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Explica detalladamente en qué consiste tu reto, qué problema resuelve y qué se espera de los participantes
                  </p>
                  <textarea
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm resize-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                    placeholder="Describe detalladamente en qué consiste tu reto..."
                    required
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Objetivo *
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Define claramente qué quieres lograr con este reto y cuál es el resultado esperado
                  </p>
                  <textarea
                    value={data.objective}
                    onChange={(e) => setData('objective', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm resize-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                    placeholder="¿Qué objetivo específico quieres lograr con este reto?"
                    required
                  />
                  {errors.objective && <p className="mt-1 text-sm text-red-600">{errors.objective}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dificultad *
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                      Define el nivel de complejidad que tendrá el reto para los participantes
                    </p>
                    <select
                      value={data.difficulty}
                      onChange={(e) => setData('difficulty', e.target.value)}
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                      required
                    >
                      <option value="">Selecciona la dificultad</option>
                      {difficulties.map((difficulty) => (
                        <option key={difficulty.value} value={difficulty.value}>
                          {difficulty.label}
                        </option>
                      ))}
                    </select>
                    {errors.difficulty && <p className="mt-1 text-sm text-red-600">{errors.difficulty}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Inicio *
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                      Fecha en la que los estudiantes podrán comenzar a participar en el reto
                    </p>
                    <input
                      type="date"
                      value={data.start_date}
                      onChange={(e) => setData('start_date', e.target.value)}
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                      required
                    />
                    {errors.start_date && <p className="mt-1 text-sm text-red-600">{errors.start_date}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Fin *
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                      Fecha límite para que los estudiantes entreguen sus propuestas
                    </p>
                    <input
                      type="date"
                      value={data.end_date}
                      onChange={(e) => setData('end_date', e.target.value)}
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                      required
                    />
                    {errors.end_date && <p className="mt-1 text-sm text-red-600">{errors.end_date}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link del Video (Opcional)
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Agrega un video explicativo o promocional para que los estudiantes entiendan mejor tu reto
                  </p>
                  <input
                    type="url"
                    value={data.link_video}
                    onChange={(e) => setData('link_video', e.target.value)}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  {errors.link_video && <p className="mt-1 text-sm text-red-600">{errors.link_video}</p>}
                </div>
              </div>

              {/* Adquisición del Software */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Adquisición del Software
                </h3>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-purple-700 text-sm">
                    <strong>Importante:</strong> Especifica cómo deseas obtener el software desarrollado por los estudiantes.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Adquisición *
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Define cómo deseas obtener el software desarrollado por los estudiantes
                  </p>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-50 hover:border-gray-300">
                      <input
                        type="radio"
                        name="acquisition_type"
                        value="license"
                        checked={data.acquisition_type === 'license'}
                        onChange={(e) => setData('acquisition_type', e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2"
                        required
                      />
                      <div className="ml-3">
                        <span className="text-sm font-medium text-gray-700">Licencia de Software</span>
                        <p className="text-xs text-gray-500 mt-1">Obtener el software mediante una licencia de uso</p>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-50 hover:border-gray-300">
                      <input
                        type="radio"
                        name="acquisition_type"
                        value="purchase"
                        checked={data.acquisition_type === 'purchase'}
                        onChange={(e) => setData('acquisition_type', e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2"
                        required
                      />
                      <div className="ml-3">
                        <span className="text-sm font-medium text-gray-700">Compra del Software</span>
                        <p className="text-xs text-gray-500 mt-1">Adquirir la propiedad completa del software desarrollado</p>
                      </div>
                    </label>
                  </div>
                  {errors.acquisition_type && <p className="mt-1 text-sm text-red-600">{errors.acquisition_type}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detalles de la Adquisición
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Especifica los detalles del proceso de adquisición, plazos, entregables y cualquier consideración especial
                  </p>
                  <textarea
                    value={data.acquisition_details}
                    onChange={(e) => setData('acquisition_details', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm resize-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                    placeholder="Describe los detalles específicos de cómo se realizará la adquisición del software..."
                  />
                  {errors.acquisition_details && <p className="mt-1 text-sm text-red-600">{errors.acquisition_details}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Términos y Condiciones de Adquisición
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Define los términos legales y condiciones que regirán la adquisición del software
                  </p>
                  <textarea
                    value={data.acquisition_terms}
                    onChange={(e) => setData('acquisition_terms', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm resize-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                    placeholder="Especifica los términos y condiciones que aplicarán para la adquisición del software..."
                  />
                  {errors.acquisition_terms && <p className="mt-1 text-sm text-red-600">{errors.acquisition_terms}</p>}
                </div>
              </div>



              {/* Recompensa */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Recompensa (Opcional)
                </h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-700 text-sm">
                    Puedes establecer una recompensa económica para motivar la participación en tu reto.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monto de la Recompensa
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                      Establece el valor económico que recibirá el ganador del reto
                    </p>
                    <input
                      type="number"
                      value={data.reward_amount}
                      onChange={(e) => setData('reward_amount', e.target.value)}
                      placeholder="500000"
                      min="0"
                      max="99999999.99"
                      step="0.01"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                    />
                    {errors.reward_amount && <p className="mt-1 text-sm text-red-600">{errors.reward_amount}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Moneda
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                      Selecciona la moneda en la que se entregará la recompensa
                    </p>
                    <select
                      value={data.reward_currency}
                      onChange={(e) => setData('reward_currency', e.target.value)}
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                    >
                      <option value="COP">COP (Pesos Colombianos)</option>
                      <option value="USD">USD (Dólares)</option>
                      <option value="EUR">EUR (Euros)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción de la Recompensa
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Explica cómo se entregará la recompensa, cuándo y qué criterios se usarán para seleccionar al ganador
                  </p>
                  <textarea
                    value={data.reward_description}
                    onChange={(e) => setData('reward_description', e.target.value)}
                    rows={3}
                    placeholder="Describe cómo se entregará la recompensa y los criterios para ganarla..."
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm resize-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                  />
                  {errors.reward_description && <p className="mt-1 text-sm text-red-600">{errors.reward_description}</p>}
                </div>



                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Entrega de Recompensa *
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Especifica cuándo se entregará la recompensa al ganador
                  </p>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-50 hover:border-gray-300">
                      <input
                        type="radio"
                        name="reward_delivery_type"
                        value="prototype"
                        checked={data.reward_delivery_type === 'prototype'}
                        onChange={(e) => setData('reward_delivery_type', e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2"
                        required
                      />
                      <div className="ml-3">
                        <span className="text-sm font-medium text-gray-700">Por Prototipo</span>
                        <p className="text-xs text-gray-500 mt-1">La recompensa se entregará cuando el estudiante presente el prototipo inicial</p>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-50 hover:border-gray-300">
                      <input
                        type="radio"
                        name="reward_delivery_type"
                        value="final_software"
                        checked={data.reward_delivery_type === 'final_software'}
                        onChange={(e) => setData('reward_delivery_type', e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2"
                        required
                      />
                      <div className="ml-3">
                        <span className="text-sm font-medium text-gray-700">Por Software Final</span>
                        <p className="text-xs text-gray-500 mt-1">La recompensa se entregará cuando se complete y entregue el software final</p>
                      </div>
                    </label>
                  </div>
                  {errors.reward_delivery_type && <p className="mt-1 text-sm text-red-600">{errors.reward_delivery_type}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detalles de Entrega de Recompensa
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Especifica los detalles del proceso de entrega, plazos, criterios de evaluación y cualquier consideración especial
                  </p>
                  <textarea
                    value={data.reward_delivery_details}
                    onChange={(e) => setData('reward_delivery_details', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm resize-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                    placeholder="Describe los detalles específicos de cómo se entregará la recompensa..."
                  />
                  {errors.reward_delivery_details && <p className="mt-1 text-sm text-red-600">{errors.reward_delivery_details}</p>}
                </div>
              </div>

              {/* Información Importante */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-yellow-900 mb-2">
                  Información Importante
                </h3>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Tu reto será revisado por el equipo administrativo antes de ser publicado</li>
                  <li>• Recibirás una notificación cuando sea aprobado o rechazado</li>
                  <li>• Puedes editar el reto mientras esté en estado "Pendiente"</li>
                  <li>• Una vez aprobado, los estudiantes podrán inscribirse</li>
                </ul>
              </div>

              {/* Botones */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <Link
                  href="/businessman/panel"
                  className="px-6 py-2 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-6 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {processing ? 'Creando...' : 'Crear Reto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
