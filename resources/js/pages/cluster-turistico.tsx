import { Head } from '@inertiajs/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ClusterTurismoPage() {
    return (
        <>
            <Head title="Cluster Turismo - IN-NOVA">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen">
                <Header />

                {/* Hero Section */}
                <section className="relative py-20 bg-gradient-to-r from-green-600 to-green-800">
                    <div className="container mx-auto px-6">
                        <div className="text-center text-white">
                            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                                Cluster <span className="text-green-200">Turismo</span>
                            </h1>
                            <p className="text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
                                Descubre el potencial turístico de Córdoba y las oportunidades de desarrollo en el sector.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Destinos Turísticos */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                Destinos <span className="text-green-600">Turísticos</span>
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Explora los destinos más atractivos de Córdoba y sus alrededores.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Destino 1 */}
                            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-2xl">🏖️</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">San Antero</h3>
                                    <p className="text-gray-600 mb-4">
                                        Hermosas playas y manglares en el Golfo de Morrosquillo.
                                    </p>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <span>📍 Golfo de Morrosquillo</span>
                                    </div>
                                </div>
                            </div>

                            {/* Destino 2 */}
                            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-2xl">🌿</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Lorica</h3>
                                    <p className="text-gray-600 mb-4">
                                        Ciudad histórica con arquitectura colonial y rica gastronomía.
                                    </p>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <span>📍 Bajo Sinú</span>
                                    </div>
                                </div>
                            </div>

                            {/* Destino 3 */}
                            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                                <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-2xl">🏛️</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Montería</h3>
                                    <p className="text-gray-600 mb-4">
                                        Capital del departamento con modernidad y tradición.
                                    </p>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <span>📍 Valle del Sinú</span>
                                    </div>
                                </div>
                            </div>

                            {/* Destino 4 */}
                            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                                <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-2xl">🏔️</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Tierralta</h3>
                                    <p className="text-gray-600 mb-4">
                                        Montañas y ríos para el ecoturismo y la aventura.
                                    </p>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <span>📍 Alto Sinú</span>
                                    </div>
                                </div>
                            </div>

                            {/* Destino 5 */}
                            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                                <div className="h-48 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-2xl">🌊</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Coveñas</h3>
                                    <p className="text-gray-600 mb-4">
                                        Playas vírgenes y deportes acuáticos en el Caribe.
                                    </p>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <span>📍 Golfo de Morrosquillo</span>
                                    </div>
                                </div>
                            </div>

                            {/* Destino 6 */}
                            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                                <div className="h-48 bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-2xl">🌅</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">San Bernardo</h3>
                                    <p className="text-gray-600 mb-4">
                                        Islas paradisíacas y pesca deportiva en el mar.
                                    </p>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <span>📍 Islas del Rosario</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Oportunidades de Inversión */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                Oportunidades de <span className="text-green-600">Inversión</span>
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Descubre las oportunidades de negocio en el sector turístico de Córdoba.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-xl p-8 shadow-md">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Hotelería y Alojamiento</h3>
                                <ul className="space-y-3 text-gray-600">
                                    <li>• Hoteles boutique en destinos costeros</li>
                                    <li>• Eco-lodges en zonas rurales</li>
                                    <li>• Hostales para mochileros</li>
                                    <li>• Glamping en áreas naturales</li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-xl p-8 shadow-md">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Gastronomía y Restaurantes</h3>
                                <ul className="space-y-3 text-gray-600">
                                    <li>• Restaurantes de comida local</li>
                                    <li>• Cafeterías especializadas</li>
                                    <li>• Food trucks en destinos turísticos</li>
                                    <li>• Experiencias gastronómicas únicas</li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-xl p-8 shadow-md">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Actividades y Aventura</h3>
                                <ul className="space-y-3 text-gray-600">
                                    <li>• Tours guiados por la región</li>
                                    <li>• Deportes acuáticos</li>
                                    <li>• Senderismo y ecoturismo</li>
                                    <li>• Experiencias culturales</li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-xl p-8 shadow-md">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Transporte y Logística</h3>
                                <ul className="space-y-3 text-gray-600">
                                    <li>• Servicios de transporte turístico</li>
                                    <li>• Alquiler de vehículos</li>
                                    <li>• Transferencias aeropuerto</li>
                                    <li>• Logística para eventos</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
