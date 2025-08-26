import React, { useState, useEffect } from 'react';
import { Link, useForm, router } from '@inertiajs/react';
import MainLayout from '@/layouts/main-layout';
import { Challenge, Category, Form, FormQuestion } from '@/types';
import { formatCurrency } from '@/utils/number';

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
      },
    });
  };

  const handleEdit = (challenge: BusinessmanChallenge) => {
    router.visit(`/businessman/challenges/${challenge.id}/edit`);
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

  const getStatusBadge = (publicationStatus: string, activityStatus: string) => {
    // Mostrar "Pendiente" cuando está en borrador e inactivo
    if (publicationStatus === 'draft' && activityStatus === 'inactive') {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pendiente</span>;
    }

    // Mostrar "Borrador" cuando está en borrador pero activo (caso especial)
    if (publicationStatus === 'draft' && activityStatus === 'active') {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">Borrador</span>;
    }

    // Si está publicado, mostrar el estado de actividad
    switch (activityStatus) {
      case 'active':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Activo</span>;
      case 'completed':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Completado</span>;
      case 'inactive':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Inactivo</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{activityStatus}</span>;
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
              <Link
                href="/businessman/challenges/create"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Crear Nuevo Reto
              </Link>
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
                <Link
                  href="/businessman/challenges/create"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Crear Primer Reto
                </Link>
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
                                                      {getStatusBadge(challenge.publication_status, challenge.activity_status)}
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
                                ${formatCurrency(Number(challenge.reward_amount), (challenge as any).reward_currency as any)} {challenge.reward_currency}
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
                            {challenge.publication_status === 'draft' && (
                              <button
                                onClick={() => handleEdit(challenge)}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Editar
                              </button>
                            )}
                            {challenge.students.length === 0 && challenge.publication_status === 'draft' && (
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





    </MainLayout>
  );
}
