import MainLayout from '@/layouts/main-layout';
import { Challenge, Category, Company } from '@/types';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { formatCurrency } from '@/utils/number';

interface Props {
    challenges: {
        data: Challenge[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    categories: Category[];
    companies: Company[];
    // Frontend esperaba 'statuses', pero el backend envía 'publicationStatuses' y 'activityStatuses'.
    statuses?: string[];
    publicationStatuses?: string[];
    activityStatuses?: string[];
    difficulties: Array<{value: string, label: string}>;
    filters: {
        search?: string;
        category_id?: number;
        // El backend puede usar estas dos claves:
        status?: string;
        publication_status?: string;
        activity_status?: string;
        difficulty?: string;
    };
}

export default function AdminChallenges({ challenges, categories, companies, statuses, publicationStatuses, activityStatuses, difficulties, filters }: Props) {
    const [showViewModal, setShowViewModal] = useState(false);
    const [viewChallenge, setViewChallenge] = useState<Challenge | null>(null);



    // Deriva un estado único para visualización desde publication/activity
    const deriveStatus = (c: any): string => {
        return (c?.status
            || c?.publication_status
            || c?.activity_status
            || 'draft') as string;
    };

    const handleView = (challenge: Challenge) => {
        setViewChallenge(challenge);
        setShowViewModal(true);
    };
    const handleEdit = (challenge: Challenge) => {
        router.visit(`/admin/challenges/${challenge.id}/edit`);
    };
    const handleDelete = (id: number) => {
        if (!confirm('¿Estás seguro de que quieres eliminar este reto?')) return;
        router.delete(`/admin/challenges/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                // Feedback y refresco ligero
                // eslint-disable-next-line no-alert
                alert('Reto eliminado correctamente');
                router.reload({ only: [] });
            },
            onError: (errors) => {
                const msg = typeof errors === 'string'
                    ? errors
                    : (errors && Object.values(errors)[0]) || 'No se pudo eliminar el reto.';
                // eslint-disable-next-line no-alert
                alert(msg as string);
            },
        });
    };
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return 'bg-green-100 text-green-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'hard': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getDifficultyLabel = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return 'Fácil';
            case 'medium': return 'Medio';
            case 'hard': return 'Difícil';
            default: return difficulty;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'draft': return 'bg-gray-100 text-gray-800';
            case 'completed': return 'bg-blue-100 text-blue-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'published': return 'bg-green-100 text-green-800';
            case 'inactive': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'active': return 'Activo';
            case 'draft': return 'Borrador';
            case 'completed': return 'Completado';
            case 'cancelled': return 'Cancelado';
            case 'pending': return 'Pendiente';
            case 'published': return 'Publicado';
            case 'inactive': return 'Inactivo';
            default: return status;
        }
    };

    // Unifica estados provenientes del backend para no romper si cambian las props
    const safeStatuses: string[] = Array.isArray(statuses)
        ? statuses
        : Array.from(new Set([...(publicationStatuses || []), ...(activityStatuses || [])]));

    return (
        <MainLayout title="Gestión de Retos - Panel Administrativo" description="Administra todos los retos del sistema">
            <div className="bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Gestión de Retos</h1>
                                <p className="mt-1 text-sm text-gray-500">
                                    Administra todos los retos del sistema IN-NOVA
                                </p>
                            </div>

                    {/* Modal Ver Reto */}
                    {showViewModal && viewChallenge && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                            <div className="absolute inset-0 bg-black/50" onClick={() => setShowViewModal(false)} />
                            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4">
                                <div className="px-6 py-4 border-b flex items-center justify-between">
                                    <h2 className="text-xl font-semibold">Detalle del Reto</h2>
                                    <button onClick={() => setShowViewModal(false)} className="text-gray-500 hover:text-gray-700">✕</button>
                                </div>
                                <div className="p-6 space-y-4 max-h-[70vh] overflow-auto">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{viewChallenge.name}</h3>
                                        <p className="text-gray-600 mt-1">{viewChallenge.description}</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-sm text-gray-500">Empresa</div>
                                            <div className="text-sm text-gray-900">{viewChallenge.company?.name || 'N/A'}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">Categoría</div>
                                            <div className="text-sm text-gray-900">{viewChallenge.category?.name || 'N/A'}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">Estado</div>
                                            <div className="text-sm"><span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(deriveStatus(viewChallenge))}`}>{getStatusLabel(deriveStatus(viewChallenge))}</span></div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">Dificultad</div>
                                            <div className="text-sm"><span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(viewChallenge.difficulty)}`}>{getDifficultyLabel(viewChallenge.difficulty)}</span></div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">Inicio</div>
                                            <div className="text-sm text-gray-900">{viewChallenge.start_date}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">Fin</div>
                                            <div className="text-sm text-gray-900">{viewChallenge.end_date}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Objetivo</div>
                                        <div className="text-sm text-gray-900">{viewChallenge.objective}</div>
                                    </div>
                                    {Array.isArray(viewChallenge.requirements) && viewChallenge.requirements.length > 0 && (
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">Requisitos</div>
                                            <ul className="list-disc list-inside text-sm text-gray-900 space-y-1">
                                                {viewChallenge.requirements.map((req, idx) => (
                                                    <li key={idx}>{req}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {(viewChallenge.reward_amount || viewChallenge.reward_description) && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <div className="text-sm text-gray-500">Recompensa</div>
                                                <div className="text-sm text-green-700">
                                                    {viewChallenge.reward_amount ? `$${formatCurrency(Number(viewChallenge.reward_amount), (viewChallenge as any).reward_currency as any)} ${viewChallenge.reward_currency}` : '—'}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-500">Detalle</div>
                                                <div className="text-sm text-gray-900">{viewChallenge.reward_description || '—'}</div>
                                            </div>
                                        </div>
                                    )}
                                    {viewChallenge.link_video && (
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">Video</div>
                                            <a href={viewChallenge.link_video} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                                                Ver video
                                            </a>
                                        </div>
                                    )}
                                </div>
                                <div className="px-6 py-4 border-t flex justify-end gap-2">
                                    <button onClick={() => setShowViewModal(false)} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    )}


                            <Link
                                href="/admin/challenges/create"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Crear Nuevo Reto
                            </Link>
                        </div>
                    </div>

                    {/* Filtros */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Buscar
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nombre, descripción..."
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    defaultValue={filters.search}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Categoría
                                </label>
                                <select
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    defaultValue={filters.category_id || ''}
                                >
                                    <option value="">Todas las categorías</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Estado
                                </label>
                                <select
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    defaultValue={(filters as any).status || (filters as any).publication_status || (filters as any).activity_status || ''}
                                >
                                    <option value="">Todos los estados</option>
                                    {safeStatuses.map((status) => (
                                        <option key={status} value={status}>
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Dificultad
                                </label>
                                <select
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    defaultValue={filters.difficulty || ''}
                                >
                                    <option value="">Todas las dificultades</option>
                                    {difficulties.map((difficulty) => (
                                        <option key={difficulty.value} value={difficulty.value}>
                                            {difficulty.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Tabla de Retos */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Retos ({challenges.total})
                            </h3>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Reto
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Empresa
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
                                            Recompensa
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {challenges.data.map((challenge) => (
                                        <tr key={challenge.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {challenge.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {challenge.description.substring(0, 50)}...
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {challenge.company?.name || 'N/A'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {challenge.category?.name || 'N/A'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {(() => { const s = deriveStatus(challenge); return (
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(s)}`}>
                                                        {getStatusLabel(s)}
                                                    </span>
                                                ); })()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                                                    {getDifficultyLabel(challenge.difficulty)}
                                                </span>
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
                                                    <button
                                                        onClick={() => handleView(challenge)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        Ver
                                                    </button>
                                                    <button
                                                        onClick={() => handleEdit(challenge)}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button onClick={() => handleDelete(challenge.id)} className="text-red-600 hover:text-red-900">
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Paginación */}
                        {challenges.last_page > 1 && (
                            <div className="px-6 py-4 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-700">
                                        Mostrando {((challenges.current_page - 1) * challenges.per_page) + 1} a {Math.min(challenges.current_page * challenges.per_page, challenges.total)} de {challenges.total} resultados
                                    </div>
                                    <div className="flex space-x-2">
                                        {challenges.current_page > 1 && (
                                            <Link
                                                href={`/admin/challenges?page=${challenges.current_page - 1}`}
                                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                Anterior
                                            </Link>
                                        )}
                                        {challenges.current_page < challenges.last_page && (
                                            <Link
                                                href={`/admin/challenges?page=${challenges.current_page + 1}`}
                                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                Siguiente
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
