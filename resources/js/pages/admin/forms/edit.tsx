import MainLayout from '@/layouts/main-layout';
import { Category, Form, FormQuestion } from '@/types';
import { Link, useForm, router } from '@inertiajs/react';
import { useEffect, useMemo } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
  form: Form;
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

interface SortableQuestionProps {
  question: any;
  index: number;
  updateQuestion: (idx: number, field: 'text' | 'type' | 'required' | 'options', value: any) => void;
  removeQuestion: (idx: number) => void;
  addOption: (qIdx: number) => void;
  updateOption: (qIdx: number, optIdx: number, value: string) => void;
  removeOption: (qIdx: number, optIdx: number) => void;
  errors: any;
}

function SortableQuestion({
  question,
  index,
  updateQuestion,
  removeQuestion,
  addOption,
  updateOption,
  removeOption,
  errors
}: SortableQuestionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: question.id || index });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const requiresOptions = question.type === 'select' || question.type === 'radio' || question.type === 'checkbox';

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border border-gray-200 rounded-lg p-4 bg-gray-50"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-200 rounded"
          >
            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 2a2 2 0 1 1 .001 4.001A2 2 0 0 1 7 2zm0 6a2 2 0 1 1 .001 4.001A2 2 0 0 1 7 8zm0 6a2 2 0 1 1 .001 4.001A2 2 0 0 1 7 14zm6-8a2 2 0 1 1-.001-4.001A2 2 0 0 1 13 6zm0 2a2 2 0 1 1 .001 4.001A2 2 0 0 1 13 8zm0 6a2 2 0 1 1 .001 4.001A2 2 0 0 1 13 14z" />
            </svg>
          </div>
          <h4 className="font-medium text-gray-900">Pregunta #{index + 1}</h4>
        </div>
        <button
          type="button"
          onClick={() => removeQuestion(index)}
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
            value={question.text}
            onChange={(e) => updateQuestion(index, 'text', e.target.value)}
            required
          />
          {errors[`questions.${index}.text`] && (
            <p className="mt-1 text-sm text-red-600">{errors[`questions.${index}.text`]}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción (Opcional)</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
            value={question.description}
            onChange={(e) => updateQuestion(index, 'description', e.target.value)}
            placeholder="Ej. Proporciona el nombre legal de tu empresa tal como aparece en los documentos oficiales"
          />
          {errors[`questions.${index}.description`] && (
            <p className="mt-1 text-sm text-red-600">{errors[`questions.${index}.description`]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={question.type}
            onChange={(e) => updateQuestion(index, 'type', e.target.value as FormQuestion['type'])}
          >
            {QUESTION_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors[`questions.${index}.type`] && (
            <p className="mt-1 text-sm text-red-600">{errors[`questions.${index}.type`]}</p>
          )}
        </div>

        <div className="flex items-center">
          <input
            id={`q-${index}-required`}
            type="checkbox"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            checked={question.required}
            onChange={(e) => updateQuestion(index, 'required', e.target.checked)}
          />
          <label htmlFor={`q-${index}-required`} className="ml-2 block text-sm text-gray-700">
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
              onClick={() => addOption(index)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Añadir opción
            </button>
          </div>
          <div className="space-y-2">
            {(question.options || []).map((opt: string, oIdx: number) => (
              <div key={oIdx} className="flex items-center gap-2">
                <input
                  type="text"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={opt}
                  onChange={(e) => updateOption(index, oIdx, e.target.value)}
                  placeholder={`Opción ${oIdx + 1}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeOption(index, oIdx)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Quitar
                </button>
              </div>
            ))}
            {errors[`questions.${index}.options`] && (
              <p className="mt-1 text-sm text-red-600">{errors[`questions.${index}.options`]}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function EditForm({ form, categories }: Props) {
  const { data, setData, processing, reset, errors } = useForm<any>({
    name: '',
    description: '',
    category_id: '',
    questions: [] as any[],
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = (data.questions as any[]).findIndex((q: any) => (q.id || 0) === active.id);
      const newIndex = (data.questions as any[]).findIndex((q: any) => (q.id || 0) === over?.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newQuestions = arrayMove(data.questions as any[], oldIndex, newIndex);
        setData('questions', newQuestions);
      }
    }
  };

  useEffect(() => {
    setData({
      name: form.name,
      description: form.description,
      category_id: form.category_id,
      questions: (form.questions || []).map((q) => ({
        id: Date.now() + Math.random(),
        text: q.text,
        description: q.description || '',
        type: q.type,
        required: q.required,
        options: q.options,
      })),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.id]);

  const categoryOptions = useMemo(() => categories || [], [categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = (data.questions as any[]).map((q: any) => ({
      text: q.text,
      description: q.description,
      type: q.type,
      required: q.required,
      options:
        q.type === 'select' || q.type === 'radio' || q.type === 'checkbox'
          ? (((q.options as string[] | undefined) || []).filter((o) => typeof o === 'string' && (o as string).trim() !== ''))
          : undefined,
    }));
    const payload: any = { ...data, questions: cleaned };

    (router as any).put(`/admin/forms/${form.id}`, payload, {
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
    const next = [...data.questions];
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
    setData('questions', next);
  };

  const addQuestion = () => {
    const newQuestion = { id: Date.now() + Math.random(), text: '', description: '', type: 'text', required: false };
    const updatedQuestions = [newQuestion, ...data.questions];
    setData('questions', updatedQuestions);
  };

  const removeQuestion = (idx: number) => {
    const next = (data.questions as any[]).filter((_: any, i: number) => i !== idx);
    setData('questions', next.length ? next : [{ id: Date.now(), text: '', description: '', type: 'text', required: false }]);
  };

  const addOption = (qIdx: number) => {
    const next = [...data.questions];
    const opts = (next[qIdx].options || []).slice();
    opts.push('');
    next[qIdx] = { ...next[qIdx], options: opts };
    setData('questions', next);
  };

  const updateOption = (qIdx: number, optIdx: number, value: string) => {
    const next = [...data.questions];
    const opts = (next[qIdx].options || []).slice();
    opts[optIdx] = value;
    next[qIdx] = { ...next[qIdx], options: opts };
    setData('questions', next);
  };

  const removeOption = (qIdx: number, optIdx: number) => {
    const next = [...data.questions];
    const opts = (next[qIdx].options || []).slice();
    opts.splice(optIdx, 1);
    next[qIdx] = { ...next[qIdx], options: opts };
    setData('questions', next);
  };

  return (
    <MainLayout title={`Editar Formulario: ${form.name}`} description="Actualiza la configuración del formulario">
      <div className="bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Editar Formulario</h1>
            <p className="mt-1 text-sm text-gray-500">Modifica el nombre, categoría y preguntas.</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">Preguntas</h3>
                  <button type="button" onClick={addQuestion} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Añadir pregunta
                  </button>
                </div>

                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={(data.questions as any[]).map((q: any) => q.id || 0)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-5">
                      {(data.questions as any[]).map((q: any, idx: number) => (
                        <SortableQuestion
                          key={q.id || idx}
                          question={q}
                          index={idx}
                          updateQuestion={updateQuestion}
                          removeQuestion={removeQuestion}
                          addOption={addOption}
                          updateOption={updateOption}
                          removeOption={removeOption}
                          errors={errors}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </div>

              <div className="flex items-center justify-end gap-3">
                <Link href={`/admin/forms/${form.id}`} className="px-4 py-2 rounded-lg border hover:bg-gray-50">
                  Cancelar
                </Link>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                >
                  {processing ? 'Guardando…' : 'Guardar cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
