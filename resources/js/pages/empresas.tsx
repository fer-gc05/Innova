import { Head } from '@inertiajs/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EmpresasPage() {
    return (
        <>
            <Head title="Empresas de la Red - IN-NOVA">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen">
                <Header />

                {/* Hero Section */}
                <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800">
                    <div className="container mx-auto px-6">
                        <div className="text-center text-white">
                            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                                Empresas de la <span className="text-blue-200">Red</span>
                            </h1>
                            <p className="text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
                                Descubre las empresas innovadoras que forman parte de nuestra red de desarrollo empresarial en Córdoba.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Empresas Grid */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                Empresas <span className="text-blue-600">Destacadas</span>
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Conoce las empresas que están transformando el sector empresarial en Córdoba.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Empresa 1 */}
                            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
                                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-blue-600 font-bold text-xl">E1</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Empresa Innovadora A</h3>
                                <p className="text-gray-600 mb-4">
                                    Especializada en tecnología agrícola y desarrollo sostenible.
                                </p>
                                <div className="flex items-center text-sm text-gray-500">
                                    <span>📍 Montería, Córdoba</span>
                                </div>
                            </div>

                            {/* Empresa 2 */}
                            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
                                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-green-600 font-bold text-xl">E2</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Empresa Verde B</h3>
                                <p className="text-gray-600 mb-4">
                                    Líder en soluciones ambientales y energías renovables.
                                </p>
                                <div className="flex items-center text-sm text-gray-500">
                                    <span>📍 Lorica, Córdoba</span>
                                </div>
                            </div>

                            {/* Empresa 3 */}
                            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
                                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-purple-600 font-bold text-xl">E3</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Empresa Digital C</h3>
                                <p className="text-gray-600 mb-4">
                                    Desarrollo de software y soluciones digitales empresariales.
                                </p>
                                <div className="flex items-center text-sm text-gray-500">
                                    <span>📍 Cereté, Córdoba</span>
                                </div>
                            </div>

                            {/* Empresa 4 */}
                            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
                                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-orange-600 font-bold text-xl">E4</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Empresa Turística D</h3>
                                <p className="text-gray-600 mb-4">
                                    Servicios turísticos y experiencias culturales únicas.
                                </p>
                                <div className="flex items-center text-sm text-gray-500">
                                    <span>📍 San Antero, Córdoba</span>
                                </div>
                            </div>

                            {/* Empresa 5 */}
                            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
                                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-red-600 font-bold text-xl">E5</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Empresa Salud E</h3>
                                <p className="text-gray-600 mb-4">
                                    Innovación en servicios de salud y bienestar comunitario.
                                </p>
                                <div className="flex items-center text-sm text-gray-500">
                                    <span>📍 Sahagún, Córdoba</span>
                                </div>
                            </div>

                            {/* Empresa 6 */}
                            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
                                <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-teal-600 font-bold text-xl">E6</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Empresa Logística F</h3>
                                <p className="text-gray-600 mb-4">
                                    Soluciones logísticas y de transporte inteligente.
                                </p>
                                <div className="flex items-center text-sm text-gray-500">
                                    <span>📍 Montelíbano, Córdoba</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
