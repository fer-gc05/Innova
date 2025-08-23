import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import MainLayout from '@/layouts/main-layout';
import { Category, Company } from '@/types';
import { getYouTubeId, getYouTubeThumbnail } from '@/utils/video';
import { formatCurrency, parseCurrency } from '@/utils/number';

interface Props {
  categories: Category[];
  companies: Company[];
  publicationStatuses?: string[]; // ['draft','published']
  activityStatuses?: string[]; // ['active','completed','inactive']
  difficulties: string[]; // ['easy','medium','hard']
}

export default function AdminChallengesCreate({ categories, companies, publicationStatuses = ['draft','published'], activityStatuses = ['active','completed','inactive'], difficulties }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    description: '',
    objective: '',
    difficulty: '',
    requirements: [] as string[],
    publication_status: 'draft',
    activity_status: 'active',
    start_date: '',
    end_date: '',
    link_video: '',
    video_id: '',
    reward_amount: '',
    reward_currency: 'COP',
    reward_description: '',
    reward_type: 'fixed',
    category_id: '',
    company_id: '',
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = {
      ...data,
      category_id: data.category_id ? Number(data.category_id as any) : '',
      company_id: data.company_id ? Number(data.company_id as any) : '',
      reward_amount: (() => {
        const raw = parseCurrency((data as any).reward_amount, (data as any).reward_currency as any);
        return raw === '' ? null : Number(raw);
      })(),
      link_video: data.link_video ? data.link_video : null,
    };
    (window as any).Inertia?.post
      ? (window as any).Inertia.post('/admin/challenges', payload)
      : post('/admin/challenges', payload as any);
  };

  return (
    <MainLayout title="Crear Reto - Admin" description="Crea un nuevo reto">
      <div className="bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Crear Reto</h1>
              <p className="text-sm text-gray-500">Completa la información y publica el reto</p>
            </div>
            <Link href="/admin/challenges" className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700">Volver</Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Nombre *</label>
                  <input className="w-full border rounded-lg px-3 py-2" value={data.name} onChange={e=>setData('name', e.target.value)} required />
                  {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Categoría *</label>
                  <select className="w-full border rounded-lg px-3 py-2" value={data.category_id} onChange={e=>setData('category_id', e.target.value)} required>
                    <option value="">Seleccione</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  {errors.category_id && <p className="text-sm text-red-600 mt-1">{errors.category_id}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Empresa *</label>
                  <select className="w-full border rounded-lg px-3 py-2" value={data.company_id} onChange={e=>setData('company_id', e.target.value)} required>
                    <option value="">Seleccione</option>
                    {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  {errors.company_id && <p className="text-sm text-red-600 mt-1">{errors.company_id}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Dificultad *</label>
                  <select className="w-full border rounded-lg px-3 py-2" value={data.difficulty} onChange={e=>setData('difficulty', e.target.value)} required>
                    <option value="">Seleccione</option>
                    {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  {errors.difficulty && <p className="text-sm text-red-600 mt-1">{errors.difficulty}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Descripción *</label>
                <textarea className="w-full border rounded-lg px-3 py-2" rows={3} value={data.description} onChange={e=>setData('description', e.target.value)} required />
                {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Objetivo *</label>
                <textarea className="w-full border rounded-lg px-3 py-2" rows={2} value={data.objective} onChange={e=>setData('objective', e.target.value)} required />
                {errors.objective && <p className="text-sm text-red-600 mt-1">{errors.objective}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Estado de publicación *</label>
                  <select className="w-full border rounded-lg px-3 py-2" value={data.publication_status} onChange={e=>setData('publication_status', e.target.value)} required>
                    {publicationStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Estado de actividad *</label>
                  <select className="w-full border rounded-lg px-3 py-2" value={data.activity_status} onChange={e=>setData('activity_status', e.target.value)} required>
                    {activityStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Dificultad *</label>
                  <select className="w-full border rounded-lg px-3 py-2" value={data.difficulty} onChange={e=>setData('difficulty', e.target.value)} required>
                    <option value="">Seleccione</option>
                    {difficulties.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Inicio *</label>
                  <input type="date" className="w-full border rounded-lg px-3 py-2" value={data.start_date} onChange={e=>setData('start_date', e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Fin *</label>
                  <input type="date" className="w-full border rounded-lg px-3 py-2" value={data.end_date} onChange={e=>setData('end_date', e.target.value)} required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Link de video</label>
                  <input className="w-full border rounded-lg px-3 py-2" value={data.link_video} onChange={e=>setData('link_video', e.target.value)} placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Video ID</label>
                  <input className="w-full border rounded-lg px-3 py-2" value={data.video_id} onChange={e=>setData('video_id', e.target.value)} />
                </div>
              </div>

              {data.link_video && (
                <div className="-mt-4">
                  {getYouTubeId(data.link_video) ? (
                    <div className="bg-white rounded-lg border p-4">
                      <div className="text-sm text-gray-600 mb-2">Vista previa (miniatura)</div>
                      <div className="flex items-center gap-4">
                        <img
                          src={getYouTubeThumbnail(data.link_video, 'hq') || ''}
                          alt="Miniatura del video"
                          className="w-64 aspect-video object-cover rounded border"
                        />
                        <div className="text-sm text-gray-500">
                          Detectado enlace de YouTube. Se mostrará el video en la vista de detalle.
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm p-3 rounded">
                      No se puede mostrar la vista previa del video. Verifica que el enlace sea válido (ej. YouTube: youtu.be/VIDEO o youtube.com/watch?v=VIDEO).
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Monto</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    className="w-full border rounded-lg px-3 py-2"
                    value={formatCurrency((data as any).reward_amount, (data as any).reward_currency as any)}
                    onChange={e=>{
                      const parsed = parseCurrency(e.target.value, (data as any).reward_currency as any);
                      setData('reward_amount' as any, parsed);
                    }}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Moneda</label>
                  <select className="w-full border rounded-lg px-3 py-2" value={data.reward_currency} onChange={e=>setData('reward_currency', e.target.value)}>
                    <option value="COP">COP</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tipo</label>
                  <select className="w-full border rounded-lg px-3 py-2" value={data.reward_type} onChange={e=>setData('reward_type', e.target.value)}>
                    <option value="fixed">fixed</option>
                    <option value="variable">variable</option>
                    <option value="percentage">percentage</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Descripción de la recompensa</label>
                <textarea className="w-full border rounded-lg px-3 py-2" rows={2} value={data.reward_description} onChange={e=>setData('reward_description', e.target.value)} />
              </div>

              <div className="flex justify-end gap-3">
                <Link href="/admin/challenges" className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">Cancelar</Link>
                <button type="submit" disabled={processing} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60">{processing ? 'Guardando...' : 'Guardar'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
