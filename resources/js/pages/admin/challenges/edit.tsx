import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import MainLayout from '@/layouts/main-layout';
import { Category, Challenge, Company } from '@/types';

interface Props {
  challenge: Challenge;
  categories: Category[];
  companies: Company[];
  publicationStatuses?: string[];
  activityStatuses?: string[];
  difficulties?: string[];
}

export default function AdminChallengesEdit({ challenge, categories, companies, publicationStatuses = ['draft','published'], activityStatuses = ['active','completed','inactive'], difficulties = ['easy','medium','hard'] }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    name: challenge.name || '',
    description: challenge.description || '',
    objective: challenge.objective || '',
    difficulty: challenge.difficulty || 'easy',
    requirements: challenge.requirements || [],
    publication_status: challenge.publication_status || 'draft',
    activity_status: challenge.activity_status || 'active',
    start_date: String(challenge.start_date).slice(0,10),
    end_date: String(challenge.end_date).slice(0,10),
    link_video: challenge.link_video || '',
    video_id: challenge.video_id || '',
    reward_amount: challenge.reward_amount ?? '',
    reward_currency: challenge.reward_currency || 'COP',
    reward_description: challenge.reward_description || '',
    reward_type: challenge.reward_type || 'fixed',
    category_id: challenge.category_id || challenge.category?.id || '',
    company_id: challenge.company_id || challenge.company?.id || '',
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/admin/challenges/${challenge.id}`);
  };

  return (
    <MainLayout title={`Editar Reto - ${challenge.name}`} description="Edita la información del reto">
      <div className="bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Editar Reto</h1>
              <p className="text-sm text-gray-500">Actualiza los campos y guarda los cambios</p>
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
                  <select className="w-full border rounded-lg px-3 py-2" value={data.difficulty} onChange={e=>setData('difficulty', e.target.value as any)} required>
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
                  <select className="w-full border rounded-lg px-3 py-2" value={(data as any).publication_status} onChange={e=>setData('publication_status' as any, e.target.value)} required>
                    {publicationStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Estado de actividad *</label>
                  <select className="w-full border rounded-lg px-3 py-2" value={(data as any).activity_status} onChange={e=>setData('activity_status' as any, e.target.value)} required>
                    {activityStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Dificultad *</label>
                  <select className="w-full border rounded-lg px-3 py-2" value={data.difficulty} onChange={e=>setData('difficulty', e.target.value as any)} required>
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Monto</label>
                  <input type="number" className="w-full border rounded-lg px-3 py-2" value={data.reward_amount as any} onChange={e=>setData('reward_amount', e.target.value)} min={0} step="0.01" />
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
                  <select className="w-full border rounded-lg px-3 py-2" value={data.reward_type} onChange={e=>setData('reward_type', e.target.value as any)}>
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
