import React from 'react';
import { MapPin, Calendar, Users, Star, Camera, Plane } from 'lucide-react';

export default function ClusterTurismoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center space-x-2 text-blue-200 mb-4">
            <span>HOME</span>
            <span>/</span>
            <span>VIAJES</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Cluster Turismo</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Content Column */}
          <div className="lg:col-span-2">
            {/* Featured Article */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800&h=400"
                  alt="Cluster Turismo Córdoba"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    VIAJES
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                  09 JUN
                </div>
              </div>

              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Cluster Turismo</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Posted by <span className="text-blue-600 font-semibold">Red De Innovación</span>
                </p>

                <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
                  <p>
                    El Cluster Turismo, nos apoyamos ayudando a desarrollar el mundo y crear experiencias 
                    únicas para nuestros visitantes. Además, tenemos una amplia gama de servicios de 
                    cuidadosamente diseñados para satisfacer todas las necesidades de viaje. Desde 
                    paquetes vacacionales personalizados hasta rutas de aventura y historia, cada uno de 
                    nuestros servicios está pensado para brindar comodidad, seguridad y satisfacción en 
                    cada paso de tu aventura.
                  </p>

                  <p>
                    Nos enorgullece trabajar con los mejores proveedores turísticos del mercado y asegurar 
                    que cada experiencia que ofrecemos cumpla con los más altos estándares de calidad. 
                    Ya sea que sueñes con una escapada romántica, unas vacaciones familiares o una 
                    expedición llena de aventura, en Cluster Turismo encontrarás todo lo que necesitas 
                    para hacer realidad el viaje de tus sueños.
                  </p>

                  <p>
                    Además, nos comprometemos a ofrecer una experiencia de planificación y reserva 
                    excepcional, con un servicio al cliente amigable y eficiente, y opciones personalizadas 
                    para que cada viaje sea tan único como nuestros clientes. Porque sabemos que cada 
                    aventura es especial y diferente, y cada experiencia que vivas sea todo lo que 
                    esperabas y mucho más.
                  </p>
                </div>

                <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    ¡Descubre el Mundo con Cluster Turismo!
                  </h3>
                  <div className="text-center">
                    <h4 className="text-xl font-semibold text-blue-600 mb-2">
                      Vuelos de Ensueño y Experiencias
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Tourism Stats */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Estadísticas Turísticas</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Plane className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">Destinos</span>
                  </div>
                  <span className="font-bold text-gray-800">50+</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">Viajeros</span>
                  </div>
                  <span className="font-bold text-gray-800">2,500+</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">Satisfacción</span>
                  </div>
                  <span className="font-bold text-gray-800">98%</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Acciones Rápidas</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors">
                  Planificar Viaje
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors">
                  Ver Paquetes
                </button>
                <button className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-3 px-4 rounded-lg font-semibold transition-colors">
                  Contactar Asesor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}