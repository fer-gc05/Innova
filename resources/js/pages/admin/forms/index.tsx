import MainLayout from '@/layouts/main-layout';
import { Form, Category } from '@/types';
import { Link, router } from '@inertiajs/react';

interface Props {
    forms: {
        data: Form[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    categories: Category[];
    filters: {
        search?: string;
        category_id?: number;
    };
}

export default function AdminForms({ forms, categories, filters }: Props) {
    const handleDelete = (id: number) => {
        if (!confirm('¿Estás seguro de que quieres eliminar este formulario?')) return;
        router.delete(`/admin/forms/${id}`, {
            preserveScroll: true,
        });
    };
    return (
        <MainLayout title="Gestión de Formularios - Panel Administrativo" description="Administra todos los formularios del sistema">
            <div className="bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Gestión de Formularios</h1>
                                <p className="mt-1 text-sm text-gray-500">
                                    Administra todos los formularios del sistema IN-NOVA
                                </p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Link
                                    href="/admin/dashboard"
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors inline-flex items-center"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Panel Admin
                                </Link>
                                <Link
                                    href="/admin/forms/create"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Crear Nuevo Formulario
                                </Link>
                            </div>
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
                                    placeholder="Nombre del formulario..."
                                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                                    defaultValue={filters.search}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Categoría
                                </label>
                                <select
                                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
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
                        </div>
                    </div>

                    {/* Tabla de Formularios */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Formularios ({forms.total})
                            </h3>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Formulario
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Categoría
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Preguntas
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
                                    {forms.data.map((form) => (
                                        <tr key={form.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {form.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {form.description?.substring(0, 50)}...
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {form.category?.name || 'N/A'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {form.questions?.length || 0} preguntas
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {new Date(form.created_at).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <Link
                                                        href={`/admin/forms/${form.id}`}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        Ver
                                                    </Link>
                                                    <Link
                                                        href={`/admin/forms/${form.id}/edit`}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        Editar
                                                    </Link>
                                                    <button onClick={() => handleDelete(form.id)} className="text-red-600 hover:text-red-900">
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
                        {forms.last_page > 1 && (
                            <div className="px-6 py-4 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-700">
                                        Mostrando {((forms.current_page - 1) * forms.per_page) + 1} a {Math.min(forms.current_page * forms.per_page, forms.total)} de {forms.total} resultados
                                    </div>
                                    <div className="flex space-x-2">
                                        {forms.current_page > 1 && (
                                            <Link
                                                href={`/admin/forms?page=${forms.current_page - 1}`}
                                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                Anterior
                                            </Link>
                                        )}
                                        {forms.current_page < forms.last_page && (
                                            <Link
                                                href={`/admin/forms?page=${forms.current_page + 1}`}
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
