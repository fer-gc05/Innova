import MainLayout from '@/layouts/main-layout';
import MiCuenta from '@/pages/settings/MiCuenta';

interface Props {
    stats: any;
    challengesByStatus: any;
    recentChallenges: any[];
    recentUsers: any[];
    recentAnswers: any[];
}

export default function AdminDashboard(props: Props) {
    return (
        <MainLayout title="Panel Administrativo - IN-NOVA" description="Gestión completa del sistema IN-NOVA">
            <div className="bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Panel Administrativo</h1>
                                <p className="mt-1 text-sm text-gray-500">
                                    Gestiona todos los aspectos de la plataforma IN-NOVA
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Estadísticas Simples */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Usuarios</p>
                                    <p className="text-2xl font-bold text-gray-900">{props.stats?.users || 0}</p>
                                </div>
                                <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center text-white text-xl">
                                    👥
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Empresas</p>
                                    <p className="text-2xl font-bold text-gray-900">{props.stats?.companies || 0}</p>
                                </div>
                                <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center text-white text-xl">
                                    🏢
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Retos</p>
                                    <p className="text-2xl font-bold text-gray-900">{props.stats?.challenges || 0}</p>
                                </div>
                                <div className="w-12 h-12 rounded-lg bg-red-500 flex items-center justify-center text-white text-xl">
                                    🎯
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Formularios</p>
                                    <p className="text-2xl font-bold text-gray-900">{props.stats?.forms || 0}</p>
                                </div>
                                <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center text-white text-xl">
                                    📝
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Acciones Rápidas */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <a href="/admin/users" className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-3 px-4 rounded-lg transition-colors text-center">
                                Gestión de Usuarios
                            </a>
                            <a href="/admin/categories" className="bg-green-100 hover:bg-green-200 text-green-700 font-medium py-3 px-4 rounded-lg transition-colors text-center">
                                Gestión de Categorías
                            </a>
                            <a href="/admin/forms" className="bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium py-3 px-4 rounded-lg transition-colors text-center">
                                Gestión de Formularios
                            </a>
                            <a href="/admin/challenges" className="bg-red-100 hover:bg-red-200 text-red-700 font-medium py-3 px-4 rounded-lg transition-colors text-center">
                                Gestión de Retos
                            </a>
                        </div>
                    </div>

                    {/* Debug Info */}
                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mt-8">
                        <h4 className="font-bold">Debug Info:</h4>
                        <p>Stats: {JSON.stringify(props.stats)}</p>
                        <p>Recent Challenges: {props.recentChallenges?.length || 0}</p>
                        <p>Recent Users: {props.recentUsers?.length || 0}</p>
                        <p>Recent Answers: {props.recentAnswers?.length || 0}</p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
