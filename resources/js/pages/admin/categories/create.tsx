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
            <h1 className="text-3xl font-bold text-gray-900">Crear Categoría</h1>
            <p className="mt-1 text-sm text-gray-500">Completa el formulario para registrar una nueva categoría.</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  required
                  maxLength={255}
                  placeholder="Ingresa el nombre de la categoría"
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
                  placeholder="Describe esta categoría"
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
