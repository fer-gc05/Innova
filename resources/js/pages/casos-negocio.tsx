import { Head } from '@inertiajs/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CasosNegocioPage() {
    return (
        <>
            <Head title="CASOS DE NEGOCIO - IN-NOVA">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen">
                <Header />

                {/* Hero Section */}
                <section className="relative py-20 bg-gradient-to-r from-purple-600 to-purple-800">
                    <div className="container mx-auto px-6">
                        <div className="text-center text-white">
                            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                                CASOS DE <span className="text-purple-200">NEGOCIO</span>
                            </h1>
                            <p className="text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
                                Descubre casos de éxito y estrategias empresariales que han transformado el sector en Córdoba.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Casos de Éxito */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                Casos de <span className="text-purple-600">Éxito</span>
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Empresas que han logrado transformar sus negocios a través de la innovación y la tecnología.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Caso 1 */}
                            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border">
                                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-2xl">🏢</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Transformación Digital</h3>
                                    <p className="text-gray-600 mb-4">
                                        Una empresa local logró aumentar sus ventas en un 300% implementando estrategias de marketing digital.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">📍 Montería</span>
                                        <span className="text-sm font-semibold text-green-600">+300%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Caso 2 */}
                            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border">
                                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-2xl">🌱</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Agricultura Sostenible</h3>
                                    <p className="text-gray-600 mb-4">
                                        Implementación de tecnologías IoT para optimizar el riego y aumentar la productividad agrícola.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">📍 Lorica</span>
                                        <span className="text-sm font-semibold text-green-600">+150%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Caso 3 */}
                            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border">
                                <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-2xl">💻</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Software Empresarial</h3>
                                    <p className="text-gray-600 mb-4">
                                        Desarrollo de una plataforma de gestión que revolucionó la administración de pequeñas empresas.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">📍 Cereté</span>
                                        <span className="text-sm font-semibold text-green-600">+200%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Caso 4 */}
                            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border">
                                <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-2xl">🏖️</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Turismo Local</h3>
                                    <p className="text-gray-600 mb-4">
                                        Una empresa turística logró triplicar sus visitantes mediante estrategias de marketing digital.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">📍 San Antero</span>
                                        <span className="text-sm font-semibold text-green-600">+250%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Caso 5 */}
                            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border">
                                <div className="h-48 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-2xl">🏥</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Telemedicina</h3>
                                    <p className="text-gray-600 mb-4">
                                        Implementación de servicios de telemedicina que mejoraron el acceso a la salud en zonas rurales.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">📍 Sahagún</span>
                                        <span className="text-sm font-semibold text-green-600">+180%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Caso 6 */}
                            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border">
                                <div className="h-48 bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-2xl">🚚</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Logística Inteligente</h3>
                                    <p className="text-gray-600 mb-4">
                                        Optimización de rutas de distribución que redujo costos operativos en un 40%.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">📍 Montelíbano</span>
                                        <span className="text-sm font-semibold text-green-600">-40%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Métricas de Éxito */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                Métricas de <span className="text-purple-600">Éxito</span>
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Resultados obtenidos por las empresas que han implementado nuestras estrategias de innovación.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="text-center p-8 bg-white rounded-xl shadow-md">
                                <div className="text-4xl font-bold text-purple-600 mb-2">85%</div>
                                <div className="text-gray-600">Aumento en ventas</div>
                            </div>
                            <div className="text-center p-8 bg-white rounded-xl shadow-md">
                                <div className="text-4xl font-bold text-purple-600 mb-2">60%</div>
                                <div className="text-gray-600">Reducción de costos</div>
                            </div>
                            <div className="text-center p-8 bg-white rounded-xl shadow-md">
                                <div className="text-4xl font-bold text-purple-600 mb-2">200+</div>
                                <div className="text-gray-600">Empresas beneficiadas</div>
                            </div>
                            <div className="text-center p-8 bg-white rounded-xl shadow-md">
                                <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
                                <div className="text-gray-600">Satisfacción del cliente</div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
