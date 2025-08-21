import { useState, type FormEvent } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import MainLayout from '@/layouts/main-layout';


interface Category {
    id: number;
    name: string;
    description: string;
    created_at: string;
    forms_count?: number;
    challenges_count?: number;
}

interface PaginatedData {
    data: Category[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    categories: PaginatedData;
    filters: {
        search: string;
    };
}

export default function CategoriesIndex({ categories, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [viewingCategory, setViewingCategory] = useState<Category | null>(null);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const { data, setData, put, processing, errors, reset, clearErrors } = useForm<{ name: string; description: string }>({
        name: '',
        description: '',
    });

    const handleSearch = () => {
        router.get('/admin/categories', { search: searchTerm }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
            router.delete(`/admin/categories/${id}`);
        }
    };

    const handleView = (category: Category) => {
        setViewingCategory(category);
        setShowViewModal(true);
    };

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
        setData({ name: category.name || '', description: category.description || '' });
        clearErrors();
        setShowEditModal(true);
    };

    const closeModals = () => {
        setShowViewModal(false);
        setShowEditModal(false);
        setViewingCategory(null);
        setEditingCategory(null);
        reset();
        clearErrors();
    };

    const handleUpdate = (e: FormEvent) => {
        e.preventDefault();
        if (!editingCategory) return;
        put(`/admin/categories/${editingCategory.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                closeModals();
            },
        });
    };

    return (
        <MainLayout title="Gestión de Categorías - Panel Administrativo" description="Administra todas las categorías del sistema">
            <div className="bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Gestión de Categorías</h1>
                                <p className="mt-1 text-sm text-gray-500">
                                    Administra todas las categorías del sistema IN-NOVA
                                </p>
                            </div>
                            <Link
                                href="/admin/categories/create"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Crear Nueva Categoría
                            </Link>
                        </div>
                    </div>

                    {/* Filtros */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Buscar
                                </label>
                                <input
                                    type="text"
                                    placeholder="Buscar categorías..."
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>
                            <div className="flex items-end">
                                <button
                                    onClick={handleSearch}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Buscar
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tabla de Categorías */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Categorías ({categories.total})
                            </h3>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Categoría
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Descripción
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Formularios
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Retos
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Fecha Creación
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {categories.data.map((category) => (
                                        <tr key={category.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {category.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-600 max-w-xs truncate">
                                                    {category.description}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    📝 {category.forms_count || 0}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    🎯 {category.challenges_count || 0}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {new Date(category.created_at).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleView(category)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        Ver
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleEdit(category)}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(category.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mensaje si no hay categorías */}
                        {categories.data.length === 0 && (
                            <div className="p-12 text-center">
                                <div className="text-gray-500 mb-4">
                                    <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay categorías</h3>
                                <p className="text-gray-500 mb-4">Comienza creando tu primera categoría.</p>
                                <Link
                                    href="/admin/categories/create"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Crear Primera Categoría
                                </Link>
                            </div>
                        )}

                        {/* Modales */}
                        {showViewModal && viewingCategory && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                                <div className="bg-white w-full max-w-lg rounded-lg shadow-lg">
                                    <div className="px-6 py-4 border-b flex items-center justify-between">
                                        <h3 className="text-lg font-semibold">Detalle de Categoría</h3>
                                        <button onClick={closeModals} className="text-gray-500 hover:text-gray-700">✕</button>
                                    </div>
                                    <div className="p-6 space-y-3">
                                        <div>
                                            <div className="text-sm text-gray-500">Nombre</div>
                                            <div className="text-base font-medium">{viewingCategory.name}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">Descripción</div>
                                            <div className="text-base text-gray-700 whitespace-pre-line">{viewingCategory.description}</div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 pt-2">
                                            <div className="text-sm text-gray-600">📝 Formularios: {viewingCategory.forms_count ?? 0}</div>
                                            <div className="text-sm text-gray-600">🎯 Retos: {viewingCategory.challenges_count ?? 0}</div>
                                        </div>
                                    </div>
                                    <div className="px-6 py-4 border-t flex justify-end">
                                        <button onClick={closeModals} className="px-4 py-2 rounded-lg border hover:bg-gray-50">Cerrar</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {showEditModal && editingCategory && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                                <div className="bg-white w-full max-w-lg rounded-lg shadow-lg">
                                    <div className="px-6 py-4 border-b flex items-center justify-between">
                                        <h3 className="text-lg font-semibold">Editar Categoría</h3>
                                        <button onClick={closeModals} className="text-gray-500 hover:text-gray-700">✕</button>
                                    </div>
                                    <form onSubmit={handleUpdate} className="p-6 space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                            <input
                                                type="text"
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                required
                                                maxLength={255}
                                            />
                                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                            <textarea
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                rows={4}
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                                required
                                            />
                                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                                        </div>
                                        <div className="flex justify-end space-x-3 pt-2">
                                            <button type="button" onClick={closeModals} className="px-4 py-2 rounded-lg border hover:bg-gray-50">Cancelar</button>
                                            <button type="submit" disabled={processing} className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">
                                                {processing ? 'Guardando...' : 'Guardar cambios'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Paginación */}
                        {categories.last_page > 1 && (
                            <div className="px-6 py-4 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-700">
                                        Mostrando {((categories.current_page - 1) * categories.per_page) + 1} a {Math.min(categories.current_page * categories.per_page, categories.total)} de {categories.total} resultados
                                    </div>
                                    <div className="flex space-x-2">
                                        {categories.current_page > 1 && (
                                            <Link
                                                href={`/admin/categories?page=${categories.current_page - 1}`}
                                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                Anterior
                                            </Link>
                                        )}
                                        {categories.current_page < categories.last_page && (
                                            <Link
                                                href={`/admin/categories?page=${categories.current_page + 1}`}
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
