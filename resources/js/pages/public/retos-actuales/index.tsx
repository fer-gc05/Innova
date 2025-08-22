import MainLayout from '@/layouts/main-layout';
import { Challenge, Category } from '@/types';
import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

interface Props {
    challenges: Challenge[];
    categories: Category[];
    filters: {
        category_id?: number;
        difficulty?: string;
    };
}

export default function RetosActuales({ challenges, categories, filters }: Props) {
    const [categoryId, setCategoryId] = useState<string>(filters.category_id ? String(filters.category_id) : '');
    const [difficulty, setDifficulty] = useState<string>(filters.difficulty || '');

    const applyFilters = (next: { category_id?: string; difficulty?: string }) => {
        const params: Record<string, string> = {};
        const cat = next.category_id ?? categoryId;
        const dif = next.difficulty ?? difficulty;
        if (cat) params.category_id = cat;
        if (dif) params.difficulty = dif;
        router.get('/retos-actuales', params, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };
    useEffect(() => {
        // Agregar estilos CSS para line-clamp
        const style = document.createElement('style');
        style.textContent = `
            .line-clamp-3 {
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

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

    const getVideoEmbedUrl = (linkVideo: string | null) => {
        if (!linkVideo) return null;

        // Extraer ID de YouTube
        const youtubeRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
        const match = linkVideo.match(youtubeRegex);

        if (match) {
            return `https://www.youtube.com/embed/${match[1]}`;
        }

        return linkVideo;
    };

    return (
        <MainLayout title="Retos Actuales - IN-NOVA" description="Explora los retos y desafíos empresariales actuales">
            <div className="bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Retos Actuales
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-2">
                            Descubre los desafíos empresariales que están transformando la industria
                        </p>
                        <p className="text-sm text-gray-500">
                            Mostrando los retos más recientes primero
                        </p>
                    </div>

                    {/* Filtros */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <div className="flex flex-wrap gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Categoría
                                </label>
                                <select
                                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={categoryId}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setCategoryId(val);
                                        applyFilters({ category_id: val });
                                    }}
                                >
                                    <option value="">Todas las categorías</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Dificultad
                                </label>
                                <select
                                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={difficulty}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setDifficulty(val);
                                        applyFilters({ difficulty: val });
                                    }}
                                >
                                    <option value="">Todas las dificultades</option>
                                    <option value="easy">Fácil</option>
                                    <option value="medium">Medio</option>
                                    <option value="hard">Difícil</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Retos Grid */}
                    {challenges.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                            {challenges.map((challenge) => (
                                <div key={challenge.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col min-h-0">
                                    {/* Video */}
                                    {challenge.link_video && (
                                        <div className="aspect-video bg-gray-200">
                                            <iframe
                                                src={getVideoEmbedUrl(challenge.link_video) || ''}
                                                title={challenge.name}
                                                className="w-full h-full"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>
                                    )}

                                    {/* Contenido */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        {/* Header del reto */}
                                        <div className="mb-4">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                                                {challenge.name}
                                            </h3>
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                                                    {getDifficultyLabel(challenge.difficulty)}
                                                </span>
                                                {challenge.category && (
                                                    <span className="text-sm text-gray-500">
                                                        {challenge.category.name}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Descripción */}
                                        <div className="mb-4">
                                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                                {challenge.description}
                                            </p>
                                        </div>

                                        {/* Objetivo */}
                                        <div className="mb-4">
                                            <h4 className="font-medium text-gray-900 text-sm mb-2">Objetivo:</h4>
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                {challenge.objective}
                                            </p>
                                        </div>

                                        {/* Requisitos */}
                                        {challenge.requirements && challenge.requirements.length > 0 && (
                                            <div className="mb-4">
                                                <h4 className="font-medium text-gray-900 mb-2 text-sm">Requisitos:</h4>
                                                <ul className="text-sm text-gray-600 space-y-1">
                                                    {challenge.requirements.slice(0, 3).map((req, index) => (
                                                        <li key={index} className="flex items-start">
                                                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                                                            <span className="leading-relaxed">{req}</span>
                                                        </li>
                                                    ))}
                                                    {challenge.requirements.length > 3 && (
                                                        <li className="text-blue-600 text-xs mt-1">
                                                            +{challenge.requirements.length - 3} requisitos más...
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Recompensa */}
                                        {challenge.reward_amount && (
                                            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <span className="text-xs font-medium text-green-800">Recompensa</span>
                                                        <p className="text-lg font-bold text-green-900">
                                                            ${challenge.reward_amount?.toLocaleString()} {challenge.reward_currency}
                                                        </p>
                                                    </div>
                                                    <div className="text-green-600 text-2xl">💰</div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Footer con fechas y botón */}
                                        <div className="mt-auto pt-4 border-t border-gray-200">
                                            <div className="flex items-center justify-between">
                                                <div className="text-xs text-gray-500">
                                                    <span>Inicio: {new Date(challenge.start_date).toLocaleDateString()}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>Fin: {new Date(challenge.end_date).toLocaleDateString()}</span>
                                                </div>
                                                <a
                                                    href={`/retos-actuales/${challenge.id}`}
                                                    className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium"
                                                >
                                                    Ver Detalles
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-6xl mb-4">🎯</div>
                            <h3 className="text-xl font-medium text-gray-900 mb-2">No hay retos disponibles</h3>
                            <p className="text-gray-600">No se encontraron retos activos con los filtros seleccionados.</p>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
