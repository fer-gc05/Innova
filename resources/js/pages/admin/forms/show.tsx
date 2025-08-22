import MainLayout from '@/layouts/main-layout';
import { Form } from '@/types';
import { Link } from '@inertiajs/react';

interface Props {
  form: Form;
}

export default function ShowForm({ form }: Props) {
  return (
    <MainLayout title={`Formulario: ${form.name}`} description="Detalle del formulario">
      <div className="bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{form.name}</h1>
              <p className="mt-1 text-sm text-gray-500">Categoría: {form.category?.name ?? 'N/A'}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/forms/${form.id}/edit`} className="px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
                Editar
              </Link>
              <Link href="/admin/forms" className="px-3 py-2 rounded-lg border hover:bg-gray-50">
                Volver
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h2>
              <p className="text-gray-700 whitespace-pre-line">{form.description}</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Preguntas ({form.questions?.length ?? 0})</h2>
              <div className="space-y-3">
                {(form.questions || []).map((q, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-gray-900">{q.text}</div>
                      <div className="text-xs text-gray-500">Tipo: {q.type}{q.required ? ' • requerida' : ''}</div>
                    </div>
                    {(q.options && q.options.length > 0) && (
                      <ul className="list-disc list-inside mt-2 text-sm text-gray-700">
                        {q.options.map((opt, oi) => (
                          <li key={oi}>{opt}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Metadatos</h2>
              <div className="text-sm text-gray-600">
                <div>Creado: {new Date(form.created_at).toLocaleString()}</div>
                <div>Actualizado: {new Date(form.updated_at).toLocaleString()}</div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
