import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080"
          alt="Ciudad moderna con río"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          ¡Córdoba <span className="text-blue-300">innova!</span>
        </h1>
        <h2 className="text-2xl lg:text-3xl mb-8 font-light opacity-90">
          Descubre nuevas oportunidades de negocio.
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed opacity-80">
          Únete a la red más importante de la Cámara de Comercio y descubre nuevas oportunidades para el desarrollo rural.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
            <span>Únete ahora</span>
            <ChevronRight className="h-4 w-4" />
          </button>
          <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
            Explorar servicios
          </button>
        </div>
      </div>
    </section>
  );
}