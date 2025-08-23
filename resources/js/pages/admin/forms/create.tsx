import MainLayout from '@/layouts/main-layout';
import { Category, FormQuestion } from '@/types';
import { Link, useForm, router } from '@inertiajs/react';
import { useMemo } from 'react';

interface Props {
  categories: Category[];
}

const QUESTION_TYPES: FormQuestion['type'][] = [
  'text',
  'textarea',
  'number',
  'email',
  'select',
  'radio',
  'checkbox',
];

export default function CreateForm({ categories }: Props) {
  // Use permissive typing to avoid strict FormDataType constraints with arrays of objects
  const { data, setData, post, processing, reset, errors } = useForm<any>({
    name: '',
    description: '',
    category_id: '',
    questions: [
      {
        id: Date.now(),
        text: '',
        type: 'text',
        required: false,
      },
    ],
  });

  const categoryOptions = useMemo(() => categories || [], [categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Clean questions options in state, then submit using useForm.post (which uses current state)
    const cleaned = (data.questions as any[]).map((q: any) => ({
      text: q.text,
      type: q.type,
      required: q.required,
      options:
        q.type === 'select' || q.type === 'radio' || q.type === 'checkbox'
          ? (((q.options as string[] | undefined) || []).filter((o) => typeof o === 'string' && (o as string).trim() !== ''))
          : undefined,
    }));
    const payload: any = { ...data, questions: cleaned };

    (router as any).post('/admin/forms', payload, {
      preserveScroll: true,
      onSuccess: () => {
        reset();
      },
    });
  };

  const updateQuestion = (
    idx: number,
    field: 'text' | 'type' | 'required' | 'options',
    value: any
  ) => {
    const next = [...(data.questions as any[])];
    // If type changes and no options should be present, clear options
    if (field === 'type') {
      if (value === 'select' || value === 'radio' || value === 'checkbox') {
        next[idx] = { ...next[idx], type: value, options: next[idx].options || [''] };
      } else {
        next[idx] = { ...next[idx], type: value, options: undefined };
      }
    } else if (field === 'options') {
      next[idx] = { ...next[idx], options: value };
    } else {
      next[idx] = { ...next[idx], [field]: value } as any;
    }
    setData('questions', next as any);
  };

  const addQuestion = () => {
    const newQuestion = { id: Date.now() + Math.random(), text: '', type: 'text', required: false };
    const updatedQuestions = [newQuestion, ...(data.questions as any[])];
    setData('questions', updatedQuestions as any);
  };

  const removeQuestion = (idx: number) => {
    const next = (data.questions as any[]).filter((_: any, i: number) => i !== idx);
    setData('questions', (next.length ? next : [{ id: Date.now(), text: '', type: 'text', required: false }]) as any);
  };

  const addOption = (qIdx: number) => {
    const next = [...(data.questions as any[])];
    const opts = (next[qIdx].options || []).slice();
    opts.push('');
    next[qIdx] = { ...next[qIdx], options: opts };
    setData('questions', next as any);
  };

  const updateOption = (qIdx: number, optIdx: number, value: string) => {
    const next = [...(data.questions as any[])];
    const opts = (next[qIdx].options || []).slice();
    opts[optIdx] = value;
    next[qIdx] = { ...next[qIdx], options: opts };
    setData('questions', next as any);
  };

  const removeOption = (qIdx: number, optIdx: number) => {
    const next = [...(data.questions as any[])];
    const opts = (next[qIdx].options || []).slice();
    opts.splice(optIdx, 1);
    next[qIdx] = { ...next[qIdx], options: opts };
    setData('questions', next as any);
  };

  return (
    <MainLayout title="Crear Formulario - Panel Administrativo" description="Crea un nuevo formulario configurable">
      <div className="bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Crear Formulario</h1>
            <p className="mt-1 text-sm text-gray-500">Define el nombre, la categoría y las preguntas.</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Básicos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    maxLength={255}
                    required
                    placeholder="Ej. Formulario de registro"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={data.category_id}
                    onChange={(e) => setData('category_id', e.target.value ? Number(e.target.value) : ('' as any))}
                    required
                  >
                    <option value="">Seleccione una categoría</option>
                    {categoryOptions.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  required
                  placeholder="Describe el propósito del formulario"
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>

              {/* Constructor de preguntas */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">Preguntas</h3>
                  <button type="button" onClick={addQuestion} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Añadir pregunta
                  </button>
                </div>

                <div className="space-y-5">
                  {data.questions.map((q: any, idx: number) => {
                    const requiresOptions = q.type === 'select' || q.type === 'radio' || q.type === 'checkbox';
                    return (
                      <div key={q.id || idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-gray-900">Pregunta #{idx + 1}</h4>
                          <button
                            type="button"
                            onClick={() => removeQuestion(idx)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Eliminar
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-3">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Texto</label>
                            <input
                              type="text"
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={q.text}
                              onChange={(e) => updateQuestion(idx, 'text', e.target.value)}
                              required
                              placeholder="Ej. ¿Cuál es el nombre de tu empresa?"
                            />
                            {errors[`questions.${idx}.text`] && (
                              <p className="mt-1 text-sm text-red-600">{errors[`questions.${idx}.text`]}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                            <select
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={q.type}
                              onChange={(e) => updateQuestion(idx, 'type', e.target.value as FormQuestion['type'])}
                            >
                              {QUESTION_TYPES.map((t) => (
                                <option key={t} value={t}>
                                  {t}
                                </option>
                              ))}
                            </select>
                            {errors[`questions.${idx}.type`] && (
                              <p className="mt-1 text-sm text-red-600">{errors[`questions.${idx}.type`]}</p>
                            )}
                          </div>

                          <div className="flex items-center mt-6">
                            <input
                              id={`q-${idx}-required`}
                              type="checkbox"
                              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                              checked={q.required}
                              onChange={(e) => updateQuestion(idx, 'required', e.target.checked)}
                            />
                            <label htmlFor={`q-${idx}-required`} className="ml-2 block text-sm text-gray-700">
                              Requerida
                            </label>
                          </div>
                        </div>

                        {requiresOptions && (
                          <div className="mt-4">
                            <div className="flex items-center justify-between mb-2">
                              <label className="block text-sm font-medium text-gray-700">Opciones</label>
                              <button
                                type="button"
                                onClick={() => addOption(idx)}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                              >
                                Añadir opción
                              </button>
                            </div>
                            <div className="space-y-2">
                              {(q.options || []).map((opt: string, oIdx: number) => (
                                <div key={oIdx} className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={opt}
                                    onChange={(e) => updateOption(idx, oIdx, e.target.value)}
                                    placeholder={`Opción ${oIdx + 1}`}
                                    required
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeOption(idx, oIdx)}
                                    className="text-red-600 hover:text-red-800 text-sm"
                                  >
                                    Quitar
                                  </button>
                                </div>
                              ))}
                              {errors[`questions.${idx}.options`] && (
                                <p className="mt-1 text-sm text-red-600">{errors[`questions.${idx}.options`]}</p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <Link href="/admin/forms" className="px-4 py-2 rounded-lg border hover:bg-gray-50">
                  Cancelar
                </Link>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {processing ? 'Guardando…' : 'Crear formulario'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
