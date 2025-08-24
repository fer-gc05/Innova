import MainLayout from '@/layouts/main-layout';
import { Challenge, Category, Company } from '@/types';
import { Link, router, useForm } from '@inertiajs/react';
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
    difficulties: string[];
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
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingChallenge, setEditingChallenge] = useState<Challenge | null>(null);

    const { data, setData, processing, reset, errors } = useForm({
        name: '',
        description: '',
        objective: '',
        difficulty: '',
        publication_status: 'draft',
        activity_status: 'active',
        requirements: [] as string[],
        start_date: '',
        end_date: '',
        category_id: '' as unknown as number | string,
        company_id: '' as unknown as number | string,
        link_video: '',
        reward_amount: '' as unknown as number | string,
        reward_currency: 'COP',
        reward_description: '',
    });

    // Normaliza una fecha a YYYY-MM-DD para inputs date
    const toDateInput = (value: string | null | undefined) => {
        if (!value) return '';
        // soporta formatos ISO y con tiempo
        return String(value).slice(0, 10);
    };

    // Normaliza URL: si no tiene esquema, agrega https://
    const normalizeUrl = (value: string | null | undefined) => {
        if (!value) return '';
        let url = value.trim();
        if (url && !/^https?:\/\//i.test(url)) {
            url = `https://${url}`;
        }
        try {
            // validación básica
            // eslint-disable-next-line no-new
            new URL(url);
            return url;
        } catch {
            return value; // deja que el backend reporte error si no es válida
        }
    };

    // Normaliza difficulty a los valores de la BD: easy, medium, hard
    const normalizeDifficulty = (value: string | null | undefined): string => {
        const v = (value || '').toLowerCase();
        if (['easy', 'medium', 'hard'].includes(v)) return v;
        // mapeos desde esquema antiguo
        if (v === 'beginner') return 'easy';
        if (v === 'intermediate') return 'medium';
        if (v === 'advanced' || v === 'expert') return 'hard';
        // valor por defecto seguro
        return 'easy';
    };

    const normalizeStatus = (value: string | null | undefined): string => {
        const v = (value || '').toLowerCase();
        // valores permitidos: draft, active, completed, cancelled
        if (['draft', 'active', 'completed', 'cancelled'].includes(v)) return v;
        // mapeos comunes
        if (v === 'pending') return 'draft';
        if (v === 'inactive') return 'draft';
        return v || 'draft';
    };

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
        setEditingChallenge(challenge);
        setData({
            name: challenge.name || '',
            description: challenge.description || '',
            objective: challenge.objective || '',
            difficulty: normalizeDifficulty(challenge.difficulty),
            publication_status: ((challenge as any).publication_status || 'draft') as any,
            activity_status: ((challenge as any).activity_status || 'active') as any,
            requirements: Array.isArray(challenge.requirements) ? challenge.requirements : [],
            start_date: toDateInput((challenge as any).start_date) || '',
            end_date: toDateInput((challenge as any).end_date) || '',
            category_id: (challenge as any).category_id ?? (challenge as any).category?.id ?? '',
            company_id: (challenge as any).company_id ?? (challenge as any).company?.id ?? '',
            link_video: (challenge as any).link_video || '',
            reward_amount: (challenge as any).reward_amount ?? '',
            reward_currency: (challenge as any).reward_currency || 'COP',
            reward_description: (challenge as any).reward_description || '',
        });
        setShowEditModal(true);
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingChallenge) return;
        // Normaliza tipos: ids y montos numéricos
        const payload: any = {
            ...data,
            company_id: data.company_id ? Number(data.company_id) : '',
            category_id: data.category_id ? Number(data.category_id) : '',
            reward_amount: data.reward_amount === '' || data.reward_amount === null ? null : Number(data.reward_amount as any),
            link_video: data.link_video ? normalizeUrl(data.link_video) : null,
            difficulty: normalizeDifficulty(data.difficulty),
            publication_status: (data as any).publication_status,
            activity_status: (data as any).activity_status,
        };
        router.put(`/admin/challenges/${editingChallenge.id}`, payload, {
            preserveScroll: true,
            onSuccess: () => {
                setShowEditModal(false);
                setEditingChallenge(null);
                reset();
                // eslint-disable-next-line no-alert
                alert('Reto actualizado correctamente');
                router.reload({ only: [] });
            },
            onError: (errs) => {
                // Mantiene el modal abierto y muestra errores bajo los campos
                // eslint-disable-next-line no-alert
                if (errs && Object.keys(errs).length) {
                    const firstKey = Object.keys(errs)[0];
                    alert(`No se pudo guardar: ${errs[firstKey as keyof typeof errs]}`);
                }
            },
        });
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

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'draft': return 'bg-gray-100 text-gray-800';
            case 'completed': return 'bg-blue-100 text-blue-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
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
                                            <div className="text-sm"><span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(deriveStatus(viewChallenge))}`}>{deriveStatus(viewChallenge)}</span></div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">Dificultad</div>
                                            <div className="text-sm"><span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(viewChallenge.difficulty)}`}>{viewChallenge.difficulty}</span></div>
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

                    {/* Modal Editar Reto */}
                    {showEditModal && editingChallenge && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                            <div className="absolute inset-0 bg-black/50" onClick={() => setShowEditModal(false)} />
                            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4">
                                <div className="px-6 py-4 border-b flex items-center justify-between">
                                    <h2 className="text-xl font-semibold">Editar Reto</h2>
                                    <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">✕</button>
                                </div>
                                <form onSubmit={handleUpdate} className="p-6 space-y-4 max-h-[70vh] overflow-auto">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-600">Nombre</label>
                                            <input value={data.name} onChange={e => setData('name', e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" required />
                                            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Empresa</label>
                                            <select value={data.company_id as any} onChange={e => setData('company_id', Number(e.target.value))} className="mt-1 w-full border rounded-md px-3 py-2" required>
                                                <option value="">Seleccione</option>
                                                {companies.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
                                            </select>
                                            {errors.company_id && <p className="text-red-600 text-sm mt-1">{errors.company_id}</p>}
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="text-sm text-gray-600">Descripción</label>
                                            <textarea value={data.description} onChange={e => setData('description', e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" rows={3} required />
                                            {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Objetivo</label>
                                            <input value={data.objective} onChange={e => setData('objective', e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" required />
                                            {errors.objective && <p className="text-red-600 text-sm mt-1">{errors.objective}</p>}
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Categoría</label>
                                            <select value={data.category_id as any} onChange={e => setData('category_id', Number(e.target.value))} className="mt-1 w-full border rounded-md px-3 py-2" required>
                                                <option value="">Seleccione</option>
                                                {categories.map(cat => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
                                            </select>
                                            {errors.category_id && <p className="text-red-600 text-sm mt-1">{errors.category_id}</p>}
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Dificultad</label>
                                            <select value={data.difficulty} onChange={e => setData('difficulty', e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" required>
                                                {difficulties.map(df => (<option key={df} value={df}>{df}</option>))}
                                            </select>
                                            {errors.difficulty && <p className="text-red-600 text-sm mt-1">{errors.difficulty}</p>}
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Estado de publicación</label>
                                            <select value={(data as any).publication_status} onChange={e => setData('publication_status' as any, e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" required>
                                                {(publicationStatuses || ['draft','published']).map(st => (<option key={st} value={st}>{st}</option>))}
                                            </select>
                                            {(errors as any).publication_status && <p className="text-red-600 text-sm mt-1">{(errors as any).publication_status}</p>}
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Estado de actividad</label>
                                            <select value={(data as any).activity_status} onChange={e => setData('activity_status' as any, e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" required>
                                                {(activityStatuses || ['active','completed','inactive']).map(st => (<option key={st} value={st}>{st}</option>))}
                                            </select>
                                            {(errors as any).activity_status && <p className="text-red-600 text-sm mt-1">{(errors as any).activity_status}</p>}
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Inicio</label>
                                            <input type="date" value={data.start_date} onChange={e => setData('start_date', e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" required />
                                            {errors.start_date && <p className="text-red-600 text-sm mt-1">{errors.start_date}</p>}
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Fin</label>
                                            <input type="date" value={data.end_date} onChange={e => setData('end_date', e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" required />
                                            {errors.end_date && <p className="text-red-600 text-sm mt-1">{errors.end_date}</p>}
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Recompensa (monto)</label>
                                            <input type="number" value={data.reward_amount as any} onChange={e => setData('reward_amount', e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" min={0} />
                                            {errors.reward_amount && <p className="text-red-600 text-sm mt-1">{errors.reward_amount}</p>}
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Moneda</label>
                                            <input value={data.reward_currency} onChange={e => setData('reward_currency', e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" maxLength={3} />
                                            {errors.reward_currency && <p className="text-red-600 text-sm mt-1">{errors.reward_currency}</p>}
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="text-sm text-gray-600">Descripción recompensa</label>
                                            <input value={data.reward_description} onChange={e => setData('reward_description', e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" />
                                            {errors.reward_description && <p className="text-red-600 text-sm mt-1">{errors.reward_description}</p>}
                                        </div>

                                        <div>
                                            <label className="text-sm text-gray-600">Video (URL)</label>
                                            <input value={data.link_video} onChange={e => setData('link_video', e.target.value)} className="mt-1 w-full border rounded-md px-3 py-2" />
                                            {errors.link_video && <p className="text-red-600 text-sm mt-1">{errors.link_video}</p>}
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2 pt-2">
                                        <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Cancelar</button>
                                        <button type="submit" disabled={processing} className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60">
                                            {processing ? 'Guardando...' : 'Guardar cambios'}
                                        </button>
                                    </div>
                                </form>
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
                                        <option key={difficulty} value={difficulty}>
                                            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
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
                                                        {s.charAt(0).toUpperCase() + s.slice(1)}
                                                    </span>
                                                ); })()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                                                    {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
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
