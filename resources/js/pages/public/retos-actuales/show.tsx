import MainLayout from '@/layouts/main-layout';
import { Challenge } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import ChallengeRegistrationForm from '@/components/challenge-registration-form';
import getVideoEmbedUrl, { getYouTubeId } from '@/utils/video';
import { formatCurrency } from '@/utils/number';

interface Props {
    challenge: Challenge;
    isRegistered?: boolean;
    userGroupCode?: string;
    isGroupLeader?: boolean;
    groupInfo?: {
        group_name: string;
        leader_name: string;
        current_members: number;
        max_participants: number;
        group_code: string;
    };
}

export default function RetoDetalle({ challenge, isRegistered, userGroupCode, isGroupLeader, groupInfo }: Props) {
    const { auth } = usePage().props as any;
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return 'bg-green-100 text-green-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'hard': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getDifficultyLabel = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return 'Fácil';
            case 'medium': return 'Medio';
            case 'hard': return 'Difícil';
            default: return difficulty;
        }
    };

    // usar helpers centralizados de utils/video

    return (
        <MainLayout title={`${challenge.name} - IN-NOVA`} description={challenge.description}>
            <div className="bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="mb-8">
                        <ol className="flex items-center space-x-2 text-sm text-gray-500">
                            <li>
                                <Link href="/retos-actuales" className="hover:text-blue-600">
                                    Retos Actuales
                                </Link>
                            </li>
                            <li>
                                <span className="mx-2">/</span>
                            </li>
                            <li className="text-gray-900 font-medium">
                                {challenge.name}
                            </li>
                        </ol>
                    </nav>

                    {/* Header del Reto */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                                    {challenge.name}
                                </h1>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                                        {getDifficultyLabel(challenge.difficulty)}
                                    </span>
                                    {challenge.category && (
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                            {challenge.category.name}
                                        </span>
                                    )}
                                    {challenge.company && (
                                        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                                            {challenge.company.name}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <p className="text-lg text-gray-600 leading-relaxed">
                            {challenge.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Contenido Principal */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Video */}
                            {challenge.link_video && (
                                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                    {getYouTubeId(challenge.link_video) ? (
                                        <div className="aspect-video bg-gray-200">
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
                                            <a href={challenge.link_video} target="_blank" rel="noreferrer" className="underline ml-1">Abrir enlace</a>.
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Objetivo */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Objetivo del Reto</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {challenge.objective}
                                </p>
                            </div>

                            {/* Requisitos */}
                            {challenge.requirements && challenge.requirements.length > 0 && (
                                <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Requisitos</h2>
                                    <ul className="space-y-3">
                                        {challenge.requirements.map((req, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                                                <span className="text-gray-600">{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {/* Botón para descargar ficha técnica */}
                            <div className="bg-white rounded-lg shadow-sm p-6 mb-4 flex justify-end">
                                <button
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors font-medium"
                                    onClick={() => window.open(`/pdf/${challenge.id}`, '_blank')}
                                >
                                    Descargar ficha técnica PDF
                                </button>
                            </div>

                        </div>
                       


                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Información del Reto */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Información del Reto</h3>
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-sm font-medium text-gray-500">Estado</span>
                                        <p className="text-sm text-gray-900 capitalize">{challenge.activity_status}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-500">Fecha de Inicio</span>
                                        <p className="text-sm text-gray-900">
                                            {new Date(challenge.start_date).toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-500">Fecha de Finalización</span>
                                        <p className="text-sm text-gray-900">
                                            {new Date(challenge.end_date).toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-500">Duración</span>
                                        <p className="text-sm text-gray-900">
                                            {Math.ceil((new Date(challenge.end_date).getTime() - new Date(challenge.start_date).getTime()) / (1000 * 60 * 60 * 24))} días
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Empresa */}
                            {challenge.company && (
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Empresa Organizadora</h3>
                                    <div className="flex items-center">
                                        {challenge.company.logo_url && (
                                            <img
                                                src={challenge.company.logo_url}
                                                alt={challenge.company.name}
                                                className="w-12 h-12 rounded-lg object-cover mr-3"
                                            />
                                        )}
                                        <div>
                                            <p className="font-medium text-gray-900">{challenge.company.name}</p>
                                            <Link
                                                href={`/empresas/${challenge.company.id}`}
                                                className="text-sm text-blue-600 hover:text-blue-800"
                                            >
                                                Ver perfil de la empresa
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Recompensa */}
                            {challenge.reward_amount && (
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">💰 Recompensa</h3>
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

                                        {challenge.reward_description && (
                                            <div>
                                                <h4 className="font-medium text-gray-900 mb-2">Detalles de la Recompensa</h4>
                                                <p className="text-sm text-gray-600 leading-relaxed">
                                                    {challenge.reward_description}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            
                        </div>
                    </div>

                    {/* Formulario de Inscripción - Sección Completa */}
                    {auth?.user && auth.user.roles?.some((role: any) => role.name === 'student') ? (
                        <div className="mt-12">
                            <ChallengeRegistrationForm 
                                challenge={challenge} 
                                isRegistered={isRegistered}
                                userGroupCode={userGroupCode}
                                isGroupLeader={isGroupLeader}
                                groupInfo={groupInfo}
                                onSuccess={() => window.location.reload()}
                            />
                        </div>
                    ) : (
                        <div className="mt-12">
                            <div className="bg-white rounded-lg shadow-sm p-8">
                                <div className="text-center max-w-2xl mx-auto">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Te interesa este reto?</h2>
                                    {!auth?.user ? (
                                        <div className="space-y-6">
                                            <p className="text-lg text-gray-600">
                                                Para participar en este reto, necesitas tener una cuenta de estudiante en nuestra plataforma.
                                            </p>
                                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                                <Link 
                                                    href="/login" 
                                                    className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
                                                >
                                                    Iniciar Sesión
                                                </Link>
                                                <Link 
                                                    href="/register/student" 
                                                    className="border border-blue-600 text-blue-600 py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors font-medium text-center"
                                                >
                                                    Registrarse como Estudiante
                                                </Link>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            <p className="text-lg text-gray-600">
                                                Solo los estudiantes registrados pueden participar en los retos.
                                            </p>
                                            <button className="border border-gray-300 text-gray-700 py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                                                📧 Contactar Empresa
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
