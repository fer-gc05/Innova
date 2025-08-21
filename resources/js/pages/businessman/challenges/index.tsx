import React, { useState, useEffect } from 'react';
import { Link, useForm, router } from '@inertiajs/react';
import MainLayout from '@/layouts/main-layout';
import { Challenge, Category, Form, FormQuestion } from '@/types';

interface BusinessmanChallenge extends Omit<Challenge, 'students'> {
  students: Array<{
    id: number;
    user: {
      name: string;
      email: string;
    };
  }>;
}

interface Stats {
  total: number;
  active: number;
  pending: number;
  completed: number;
  totalParticipants: number;
}

interface Props {
  challenges: {
    all: BusinessmanChallenge[];
    active: BusinessmanChallenge[];
    pending: BusinessmanChallenge[];
    completed: BusinessmanChallenge[];
  };
  stats: Stats;
  categories?: Category[];
  difficulties?: Array<{
    value: string;
    label: string;
  }>;
  forms?: Form[];
}

export default function ChallengesIndex({ challenges, stats, categories = [], difficulties = [], forms = [] }: Props) {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'pending' | 'completed'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingChallenge, setEditingChallenge] = useState<BusinessmanChallenge | null>(null);
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
    reward_amount: '',
    reward_currency: 'COP',
    reward_description: '',
    reward_type: 'fixed',
    category_questions: {},
  });

  // Cargar preguntas cuando se selecciona una categoría
  useEffect(() => {
    if (selectedCategory) {
      const categoryForm = forms.find(form => form.category_id === selectedCategory.id);
      if (categoryForm) {
        setCategoryQuestions(categoryForm.questions);
      } else {
        setCategoryQuestions([]);
      }
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

  const handleDelete = (challenge: BusinessmanChallenge) => {
    if (!challenge) return;
    if (!confirm('¿Seguro que deseas eliminar este reto? Esta acción no se puede deshacer.')) return;
    router.delete(`/businessman/challenges/${challenge.id}`, {
      preserveScroll: true,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/businessman/challenges', {
      onSuccess: () => {
        setShowCreateModal(false);
        setSelectedCategory(null);
        setCategoryQuestions([]);
        setData({
          name: '',
          description: '',
          objective: '',
          difficulty: '',
          requirements: [],
          start_date: '',
          end_date: '',
          category_id: '',
          link_video: '',
          reward_amount: '',
          reward_currency: 'COP',
          reward_description: '',
          reward_type: 'fixed',
          category_questions: {},
        });
      },
    });
  };

  const handleEdit = (challenge: BusinessmanChallenge) => {
    setEditingChallenge(challenge);
    const category = categories.find(cat => cat.id === challenge.category_id);
    setSelectedCategory(category || null);

    // Cargar datos del reto para editar
    setData({
      name: challenge.name,
      description: challenge.description,
      objective: challenge.objective,
      difficulty: challenge.difficulty,
      requirements: challenge.requirements || [],
      start_date: challenge.start_date,
      end_date: challenge.end_date,
      category_id: challenge.category_id.toString(),
      link_video: challenge.link_video || '',
      reward_amount: challenge.reward_amount?.toString() || '',
      reward_currency: challenge.reward_currency || 'COP',
      reward_description: challenge.reward_description || '',
      reward_type: challenge.reward_type || 'fixed',
      category_questions: {},
    });

    setShowEditModal(true);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingChallenge) return;

    post(`/businessman/challenges/${editingChallenge.id}`, {
      method: 'put',
      onSuccess: () => {
        setShowEditModal(false);
        setEditingChallenge(null);
        setSelectedCategory(null);
        setCategoryQuestions([]);
        setData({
          name: '',
          description: '',
          objective: '',
          difficulty: '',
          requirements: [],
          start_date: '',
          end_date: '',
          category_id: '',
          link_video: '',
          reward_amount: '',
          reward_currency: 'COP',
          reward_description: '',
          reward_type: 'fixed',
          category_questions: {},
        });
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required={question.required}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required={question.required}
          />
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required={question.required}
          >
            <option value="">Selecciona una opción</option>
            {question.options?.map((option, i) => (
              <option key={i} value={option}>{option}</option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="mt-2 space-y-2">
            {question.options?.map((option, i) => (
              <label key={i} className="flex items-center">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={value === option}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  className="mr-2"
                  required={question.required}
                />
                {option}
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="mt-2 space-y-2">
            {question.options?.map((option, i) => (
              <label key={i} className="flex items-center">
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
                  className="mr-2"
                />
                {option}
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
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Activo</span>;
      case 'pending':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pendiente</span>;
      case 'completed':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Completado</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Fácil</span>;
      case 'medium':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Medio</span>;
      case 'hard':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Difícil</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{difficulty}</span>;
    }
  };

  const getCurrentChallenges = () => {
    switch (activeTab) {
      case 'active':
        return challenges.active;
      case 'pending':
        return challenges.pending;
      case 'completed':
        return challenges.completed;
      default:
        return challenges.all;
    }
  };

  const currentChallenges = getCurrentChallenges();

    return (
    <MainLayout title="Mis Retos - Panel Empresarial" description="Gestiona todos los retos de tu empresa">
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Mis Retos</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Gestiona todos los retos de tu empresa
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Crear Nuevo Reto
              </button>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Retos</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center text-white text-xl">
                  🎯
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Activos</p>
                  <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center text-white text-xl">
                  ✅
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pendientes</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-yellow-500 flex items-center justify-center text-white text-xl">
                  ⏳
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completados</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center text-white text-xl">
                  🏆
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Participantes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalParticipants}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center text-white text-xl">
                  👥
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtrar por Estado</h3>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === 'all'
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todos ({stats.total})
              </button>
              <button
                onClick={() => setActiveTab('active')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === 'active'
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Activos ({stats.active})
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === 'pending'
                    ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pendientes ({stats.pending})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeTab === 'completed'
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Completados ({stats.completed})
              </button>
            </div>
          </div>

          {/* Tabla de Retos */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Retos ({currentChallenges.length})
              </h3>
            </div>

            {currentChallenges.length === 0 ? (
              <div className="p-12 text-center">
                <div className="text-gray-500 mb-4">
                  <div className="text-6xl mb-4">🎯</div>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No hay retos {activeTab !== 'all' ? activeTab : ''}
                </h3>
                <p className="text-gray-500 mb-6">
                  {activeTab === 'all'
                    ? 'Aún no has creado ningún reto. Comienza creando tu primer reto.'
                    : `No tienes retos ${activeTab === 'active' ? 'activos' : activeTab === 'pending' ? 'pendientes' : 'completados'}.`
                  }
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Crear Primer Reto
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoría
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dificultad
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fechas
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Participantes
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recompensa
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentChallenges.map((challenge) => (
                      <tr key={challenge.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {challenge.name}
                            </div>
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                              {challenge.description}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {challenge.category?.name || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(challenge.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getDifficultyBadge(challenge.difficulty)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div>Inicio: {new Date(challenge.start_date).toLocaleDateString()}</div>
                            <div>Fin: {new Date(challenge.end_date).toLocaleDateString()}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            👥 {challenge.students.length} participantes
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {challenge.reward_amount ? (
                              <span className="font-medium text-green-600">
                                ${challenge.reward_amount.toLocaleString()} {challenge.reward_currency}
                              </span>
                            ) : (
                              <span className="text-gray-500">Sin recompensa</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Link
                              href={`/businessman/challenges/${challenge.id}`}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Ver
                            </Link>
                            {challenge.status === 'pending' && (
                              <button
                                onClick={() => handleEdit(challenge)}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Editar
                              </button>
                            )}
                            {challenge.students.length === 0 && challenge.status === 'pending' && (
                              <button
                                onClick={() => handleDelete(challenge)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Eliminar
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Creación de Reto */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Crear Nuevo Reto</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {/* Información Básica */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Información Básica</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Reto *
                    </label>
                    <input
                      type="text"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.link_video && <p className="mt-1 text-sm text-red-600">{errors.link_video}</p>}
                </div>
              </div>

              {/* Preguntas Específicas de Categoría */}
              {selectedCategory && categoryQuestions.length > 0 && (
                <div className="mt-8 space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Preguntas Específicas - {selectedCategory.name}
                  </h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-blue-700 text-sm">
                      Estas preguntas ayudarán a definir mejor los criterios de tu reto según la categoría seleccionada.
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
              )}

              {/* Recompensa */}
              <div className="mt-8 space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Recompensa (Opcional)</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
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
                      type="number"
                      value={data.reward_amount}
                      onChange={(e) => setData('reward_amount', e.target.value)}
                      placeholder="500000"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="fixed">Monto Fijo</option>
                    <option value="variable">Monto Variable</option>
                    <option value="percentage">Porcentaje</option>
                  </select>
                </div>
              </div>

              {/* Información Importante */}
              <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
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
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-2 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-6 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {processing ? 'Creando...' : 'Crear Reto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Edición de Reto */}
      {showEditModal && editingChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Editar Reto</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleUpdate} className="p-6">
              {/* Información Básica */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Información Básica</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Reto *
                    </label>
                    <input
                      type="text"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.link_video && <p className="mt-1 text-sm text-red-600">{errors.link_video}</p>}
                </div>
              </div>

              {/* Preguntas Específicas de Categoría */}
              {selectedCategory && categoryQuestions.length > 0 && (
                <div className="mt-8 space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Preguntas Específicas - {selectedCategory.name}
                  </h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-blue-700 text-sm">
                      Estas preguntas ayudarán a definir mejor los criterios de tu reto según la categoría seleccionada.
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
              )}

              {/* Recompensa */}
              <div className="mt-8 space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Recompensa (Opcional)</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
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
                      type="number"
                      value={data.reward_amount}
                      onChange={(e) => setData('reward_amount', e.target.value)}
                      placeholder="500000"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="fixed">Monto Fijo</option>
                    <option value="variable">Monto Variable</option>
                    <option value="percentage">Porcentaje</option>
                  </select>
                </div>
              </div>

              {/* Información Importante */}
              <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-yellow-900 mb-2">
                  Información Importante
                </h3>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Tu reto será revisado por el equipo administrativo antes de ser publicado</li>
                  <li>• Recibirás una notificación cuando sea aprobado o rechazado</li>
                  <li>• Solo puedes editar retos en estado "Pendiente"</li>
                  <li>• Una vez aprobado, los estudiantes podrán inscribirse</li>
                </ul>
              </div>

              {/* Botones */}
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-2 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-6 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {processing ? 'Actualizando...' : 'Actualizar Reto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
