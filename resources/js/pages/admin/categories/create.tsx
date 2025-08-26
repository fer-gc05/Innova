import MainLayout from '@/layouts/main-layout';
import { Link, useForm } from '@inertiajs/react';

export default function CreateCategory() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/categories', {
      preserveScroll: true,
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <MainLayout title="Crear Categoría - Panel Administrativo" description="Crea una nueva categoría para el sistema">
      <div className="bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Crear Categoría</h1>
                <p className="mt-1 text-sm text-gray-500">Completa el formulario para registrar una nueva categoría.</p>
              </div>
              <Link
                href="/admin/dashboard"
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors inline-flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Panel Admin
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                <p className="text-xs text-gray-500 mb-2">
                  Elige un nombre claro y descriptivo que identifique el tipo de retos de esta categoría
                </p>
                <input
                  type="text"
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  required
                  maxLength={255}
                  placeholder="Ej: Desarrollo de Software, Marketing Digital, Diseño UX"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
                <p className="text-xs text-gray-500 mb-2">
                  Explica detalladamente qué tipos de retos incluye esta categoría y qué habilidades se requieren
                </p>
                <textarea
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white shadow-sm resize-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                  rows={4}
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  required
                  placeholder="Describe los tipos de retos, tecnologías involucradas y perfiles de estudiantes que pueden participar..."
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>

              <div className="flex items-center justify-end space-x-3">
                <Link href="/admin/categories" className="px-4 py-2 rounded-lg border hover:bg-gray-50">Cancelar</Link>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {processing ? 'Guardando...' : 'Crear categoría'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
