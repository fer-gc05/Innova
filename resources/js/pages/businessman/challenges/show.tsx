import React from 'react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/layouts/main-layout';
import getVideoEmbedUrl, { getYouTubeId } from '@/utils/video';
import { formatCurrency } from '@/utils/number';

interface Props {
  challenge: any;
  stats: any;
  participants: any[];
}

export default function ChallengeShow({ challenge, stats, participants }: Props) {
  console.log('ChallengeShow component rendered', { challenge, stats, participants });

  return (
    <MainLayout title={`${challenge?.name || 'Reto'} - Detalles`} description={`Detalles del reto ${challenge?.name || ''}`}>
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Link href="/businessman/challenges" className="text-blue-600 hover:text-blue-800">
                  ← Volver a Retos
                </Link>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {challenge?.name || 'Cargando...'}
                  </h1>
                  <p className="text-gray-500">Detalles del reto</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  challenge?.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                  challenge?.status === 'active' ? 'bg-green-100 text-green-800' :
                  challenge?.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                  challenge?.status === 'published' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {challenge?.status === 'draft' ? 'Borrador' :
                   challenge?.status === 'active' ? 'Activo' :
                   challenge?.status === 'completed' ? 'Completado' :
                   challenge?.status === 'published' ? 'Publicado' : challenge?.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  challenge?.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  challenge?.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  challenge?.difficulty === 'hard' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {challenge?.difficulty === 'easy' ? 'Fácil' :
                   challenge?.difficulty === 'medium' ? 'Medio' :
                   challenge?.difficulty === 'hard' ? 'Difícil' : challenge?.difficulty}
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stats?.totalParticipants || 0}</div>
                <div className="text-sm text-gray-500">Total Participantes</div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats?.activeParticipants || 0}</div>
                <div className="text-sm text-gray-500">Activos</div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats?.completedParticipants || 0}</div>
                <div className="text-sm text-gray-500">Completados</div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats?.pendingParticipants || 0}</div>
                <div className="text-sm text-gray-500">Pendientes</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Descripción</h2>
                <p className="text-gray-700">{challenge?.description || 'No disponible'}</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Objetivo</h2>
                <p className="text-gray-700">{challenge?.objective || 'No disponible'}</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Requisitos</h2>
                {challenge?.requirements && challenge.requirements.length > 0 ? (
                  <ul className="space-y-2">
                    {challenge.requirements.map((requirement: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No hay requisitos específicos</p>
                )}
              </div>

              {challenge.reward_amount && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">💰 Recompensa</h2>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="text-3xl font-bold text-green-900 mb-1">
                        ${formatCurrency(Number(challenge.reward_amount), (challenge as any).reward_currency as any)} {challenge.reward_currency}
                      </div>
                      <div className="text-sm text-green-700 capitalize">
                        {challenge.reward_type === 'fixed' ? 'Recompensa Fija' :
                         challenge.reward_type === 'variable' ? 'Recompensa Variable' :
                         'Recompensa por Porcentaje'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {challenge?.link_video && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Video del Reto</h2>
                  {getYouTubeId(challenge.link_video) ? (
                    <div className="aspect-video">
                      <iframe
                        src={getVideoEmbedUrl(challenge.link_video) || ''}
                        className="w-full h-full rounded-lg"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    </div>
                  ) : (
                    <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm p-3 rounded">
                      No se puede mostrar el video embebido. Verifica que el enlace sea compatible (por ejemplo, YouTube).
                      <a href={challenge.link_video} target="_blank" rel="noreferrer" className="underline ml-1">Abrir enlace</a>.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Información General</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Empresa</label>
                    <p className="text-gray-900">{challenge?.company?.name || 'No disponible'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Categoría</label>
                    <p className="text-gray-900">{challenge?.category?.name || 'No disponible'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Fecha de Inicio</label>
                    <p className="text-gray-900">
                      {challenge?.start_date ? new Date(challenge.start_date).toLocaleDateString() : 'No disponible'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Fecha de Fin</label>
                    <p className="text-gray-900">
                      {challenge?.end_date ? new Date(challenge.end_date).toLocaleDateString() : 'No disponible'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Creado</label>
                    <p className="text-gray-900">
                      {challenge?.created_at ? new Date(challenge.created_at).toLocaleDateString() : 'No disponible'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Participantes ({participants?.length || 0})</h3>
                {participants && participants.length > 0 ? (
                  <div className="space-y-3">
                    {participants.map((participant: any, index: number) => (
                      <div key={participant.id || index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{participant.name}</div>
                          <div className="text-sm text-gray-500">{participant.email}</div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {participant.registered_at ? new Date(participant.registered_at).toLocaleDateString() : ''}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No hay participantes registrados</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
