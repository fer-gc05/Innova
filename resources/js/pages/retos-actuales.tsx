import { Head } from '@inertiajs/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Play, Info, MoreVertical } from 'lucide-react';

export default function RetosActualesPage() {
    const retos = [
        {
            id: 1,
            titulo: "HOTEL BAROCA",
            estado: "CERRADO",
            estadoColor: "red",
            video: "https://via.placeholder.com/400x250/000000/FFFFFF?text=Video+Preview",
            descripcion: "El reto invita a desarrolladores, diseñadores, creativos y emprendedores a proponer una solución innovadora que mejore la experiencia del huésped desde su reserva hasta el check-out.",
            botones: ["Ficha tecnica"]
        },
        {
            id: 2,
            titulo: "DELICIAS CARIBEÑAS",
            estado: "ABIERTO",
            estadoColor: "green",
            video: "https://via.placeholder.com/400x250/000000/FFFFFF?text=Video+Preview",
            descripcion: "Promover el restaurante ubicado en una vereda remota, utilizando redes sociales y mejorando el acceso mediante una embarcación segura y eficiente.",
            botones: ["Registrarse", "Ficha tecnica"]
        },
        {
            id: 3,
            titulo: "MEDISALUD",
            estado: "ABIERTO",
            estadoColor: "green",
            video: "https://via.placeholder.com/400x250/000000/FFFFFF?text=Video+Preview",
            descripcion: "Desarrollar aplicación de telemedicina, para mejorar los servicios de salud para habitantes indígenas, campesinos, afros.",
            botones: ["Registrarse", "Ficha tecnica"]
        },
        {
            id: 4,
            titulo: "ASOPROMARSAB",
            estado: "ABIERTO",
            estadoColor: "green",
            video: "https://via.placeholder.com/400x250/000000/FFFFFF?text=Video+Preview",
            descripcion: "Desarrollar una plataforma digital para conectar productores agrícolas con mercados locales y nacionales.",
            botones: ["Registrarse", "Ficha tecnica"]
        },
        {
            id: 5,
            titulo: "AAPTE",
            estado: "CERRADO",
            estadoColor: "red",
            video: "https://via.placeholder.com/400x250/000000/FFFFFF?text=Video+Preview",
            descripcion: "Crear un sistema de gestión integral para pequeñas empresas del sector turístico.",
            botones: ["Ficha tecnica"]
        }
    ];

    return (
        <>
            <Head title="Retos Actuales - IN-NOVA">
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
                                RETOS <span className="text-blue-200">ACTUALES</span>
                            </h1>
                            <div className="text-sm text-blue-100">
                                HOME / RETOS ACTUALES
                            </div>
                        </div>
                    </div>
                </section>

                {/* Retos Grid */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {retos.map((reto) => (
                                <div key={reto.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border">
                                    {/* Header */}
                                    <div className="p-4 border-b">
                                        <h3 className="text-lg font-bold text-gray-800 mb-2">{reto.titulo}</h3>
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                            reto.estadoColor === 'green' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {reto.estado}
                                        </span>
                                    </div>

                                    {/* Video */}
                                    <div className="relative">
                                        <img 
                                            src={reto.video} 
                                            alt={reto.titulo}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <button className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors">
                                                <Play className="h-6 w-6" />
                                            </button>
                                        </div>
                                        <div className="absolute top-2 left-2">
                                            <button className="bg-black/50 text-white p-1 rounded-full">
                                                <Info className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div className="absolute top-2 right-2">
                                            <button className="bg-black/50 text-white p-1 rounded-full">
                                                <MoreVertical className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div className="absolute bottom-2 left-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                                            {reto.titulo}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="p-4">
                                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                            {reto.descripcion}
                                        </p>
                                        
                                        {/* Buttons */}
                                        <div className="space-y-2">
                                            {reto.botones.map((boton, index) => (
                                                <button 
                                                    key={index}
                                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
                                                >
                                                    {boton}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
