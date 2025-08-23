import React from 'react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/layouts/main-layout';
import { Challenge } from '@/types';
import getVideoEmbedUrl, { getYouTubeId } from '@/utils/video';

interface Props {
  challenge: Challenge;
}

export default function AdminChallengesShow({ challenge }: Props) {
  const money = challenge.reward_amount ? `$${Number(challenge.reward_amount).toLocaleString()} ${challenge.reward_currency || ''}` : '—';
  return (
    <MainLayout title={`Reto: ${challenge.name}`} description="Detalle del reto">
      <div className="bg-gray-50 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{challenge.name}</h1>
              <p className="text-sm text-gray-500">{challenge.category?.name} • {challenge.company?.name}</p>
            </div>
            <Link href="/admin/challenges" className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700">Volver</Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <div>
              <h2 className="font-semibold text-gray-900">Descripción</h2>
              <p className="text-gray-700 mt-1">{challenge.description}</p>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Objetivo</h2>
              <p className="text-gray-700 mt-1">{challenge.objective}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-sm">
                <div className="text-gray-500">Estado de publicación</div>
                <div className="text-gray-900">{challenge.publication_status}</div>
              </div>
              <div className="text-sm">
                <div className="text-gray-500">Estado de actividad</div>
                <div className="text-gray-900">{challenge.activity_status}</div>
              </div>
              <div className="text-sm">
                <div className="text-gray-500">Dificultad</div>
                <div className="text-gray-900">{challenge.difficulty}</div>
              </div>
              <div className="text-sm">
                <div className="text-gray-500">Fechas</div>
                <div className="text-gray-900">{challenge.start_date} → {challenge.end_date}</div>
              </div>
            </div>

            {(challenge.reward_amount || challenge.reward_description) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-sm">
                  <div className="text-gray-500">Recompensa</div>
                  <div className="text-gray-900">{money}</div>
                </div>
                <div className="text-sm">
                  <div className="text-gray-500">Detalle</div>
                  <div className="text-gray-900">{challenge.reward_description || '—'}</div>
                </div>
              </div>
            )}

            {Array.isArray(challenge.requirements) && challenge.requirements.length > 0 && (
              <div>
                <h2 className="font-semibold text-gray-900">Requisitos</h2>
                <ul className="mt-2 list-disc list-inside text-gray-700 space-y-1">
                  {challenge.requirements.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
            )}

            {challenge.link_video && (
              <div>
                <h2 className="font-semibold text-gray-900 mb-2">Video</h2>
                {getYouTubeId(challenge.link_video) ? (
                  <div className="aspect-video bg-gray-200 rounded overflow-hidden">
                    <iframe
                      src={getVideoEmbedUrl(challenge.link_video) || ''}
                      title={challenge.name}
                      className="w-full h-full"
                      frameBorder={0}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm p-3 rounded">
                    No se puede mostrar el video embebido. Verifica que el enlace sea compatible (por ejemplo, YouTube). 
                    <a href={challenge.link_video} target="_blank" rel="noreferrer" className="underline ml-1">Abrir enlace en una nueva pestaña</a>.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
