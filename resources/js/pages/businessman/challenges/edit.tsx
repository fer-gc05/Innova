import React, { useState, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import MainLayout from '@/layouts/main-layout';
import { Category, Form, FormQuestion } from '@/types';
import { getYouTubeId, getYouTubeThumbnail } from '@/utils/video';
import { formatCurrency, parseCurrency } from '@/utils/number';

interface Challenge {
  id: number;
  name: string;
  description: string;
  objective: string;
  difficulty: string;
  requirements: string[];
  start_date: string;
  end_date: string;
  category_id: number;
  link_video?: string;
  reward_amount?: string;
  reward_currency: string;
  reward_description?: string;
  reward_type: string;
  status: string;
  category: Category;
}

interface Props {
  challenge: Challenge;
  categoryAnswers?: Record<string, string | string[]>;
  categories: Category[];
  difficulties: Array<{
    value: string;
    label: string;
  }>;
  forms: Form[];
}

export default function EditChallenge({ challenge, categoryAnswers, categories, difficulties, forms }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(challenge.category);
  const [categoryQuestions, setCategoryQuestions] = useState<FormQuestion[]>([]);

  const { data, setData, put, processing, errors } = useForm<any>({
    name: challenge.name,
    description: challenge.description,
    objective: challenge.objective,
    difficulty: challenge.difficulty,
    requirements: challenge.requirements || [],
    start_date: challenge.start_date,
    end_date: challenge.end_date,
    category_id: challenge.category_id.toString(),
    link_video: challenge.link_video || '',
    reward_amount: challenge.reward_amount || '',
    reward_currency: challenge.reward_currency || 'COP',
    reward_description: challenge.reward_description || '',
    reward_type: challenge.reward_type || 'fixed',
    category_questions: (categoryAnswers as Record<string, string | string[]>) || {},
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
    const payload: any = {
      ...data,
      reward_amount: (() => {
        const raw = parseCurrency((data as any).reward_amount, (data as any).reward_currency as any);
        return raw === '' ? null : Number(raw);
      })(),
    };
    if ((window as any).Inertia?.put) {
      (window as any).Inertia.put(`/businessman/challenges/${challenge.id}`, payload, {
        onSuccess: () => alert('¡Reto actualizado exitosamente!'),
        onError: () => alert('Error al actualizar el reto. Por favor, verifica los datos e intenta nuevamente.'),
      });
    } else {
      put(`/businessman/challenges/${challenge.id}`, payload as any);
    }
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Activo
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pendiente
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Completado
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <MainLayout title={`Editar Reto: ${challenge.name}`} description="Edita la información de tu reto">
      <div className="bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">Editar Reto</h1>
                <div className="flex items-center space-x-3 mt-2">
                  <p className="text-sm text-gray-500">{challenge.name}</p>
                  {getStatusBadge(challenge.status)}
                </div>
              </div>

              {/* Vista previa de video y formateo de monto */}
              <div className="flex space-x-3">
                <Link
                  href="/businessman/challenges"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors inline-flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Volver a Retos
                </Link>
                <Link
                  href={`/businessman/challenges/${challenge.id}`}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2 px-4 rounded-lg transition-colors inline-flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Ver Reto
                </Link>
              </div>
            </div>
          </div>

          {/* Advertencia si el reto está activo */}
          {challenge.status === 'active' && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-amber-800">
                    Reto Activo
                  </h3>
                  <div className="mt-2 text-sm text-amber-700">
                    <p>
                      Este reto está activo y tiene participantes inscritos. Los cambios que realices pueden afectar a los participantes actuales.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción *
                  </label>
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

              {data.link_video && (
                <div className="-mt-4">
                  {getYouTubeId(data.link_video) ? (
                    <div className="bg-white rounded-lg border p-4">
                      <div className="text-sm text-gray-600 mb-2">Vista previa (miniatura)</div>
                      <div className="flex items-center gap-4">
                        <img
                          src={getYouTubeThumbnail(data.link_video, 'hq') || ''}
                          alt="Miniatura del video"
                          className="w-64 aspect-video object-cover rounded border"
                        />
                        <div className="text-sm text-gray-500">
                          Detectado enlace de YouTube. Se mostrará el video en la vista de detalle.
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm p-3 rounded">
                      No se puede mostrar la vista previa del video. Verifica que el enlace sea válido (ej. YouTube: youtu.be/VIDEO o youtube.com/watch?v=VIDEO).
                    </div>
                  )}
                </div>
              )}

              {/* Preguntas Específicas de Categoría */}
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
                        <strong>Nota:</strong> La categoría "{selectedCategory.name}" no tiene un formulario específico configurado. Puedes continuar con la edición del reto sin preguntas adicionales.
                      </p>
                    </div>
                  )}
                </>
              )}

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
                    <input
                      type="text"
                      inputMode="decimal"
                      value={formatCurrency((data as any).reward_amount, (data as any).reward_currency as any)}
                      onChange={(e) => {
                        const parsed = parseCurrency(e.target.value, (data as any).reward_currency as any);
                        setData('reward_amount', parsed);
                      }}
                      placeholder="500000"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                    />
                    {errors.reward_amount && <p className="mt-1 text-sm text-red-600">{errors.reward_amount}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Moneda
                    </label>
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
                    Tipo de Recompensa
                  </label>
                  <select
                    value={data.reward_type}
                    onChange={(e) => setData('reward_type', e.target.value)}
                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                  >
                    <option value="fixed">Monto Fijo</option>
                    <option value="variable">Monto Variable</option>
                    <option value="percentage">Porcentaje</option>
                  </select>
                </div>
              </div>

              {/* Botones */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <Link
                  href="/businessman/challenges"
                  className="px-6 py-2 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-6 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {processing ? 'Actualizando...' : 'Actualizar Reto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
