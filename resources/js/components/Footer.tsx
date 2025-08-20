import React from 'react';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-blue-900 text-white">
      {/* Enlaces de interés */}
      <div className="bg-blue-600 py-4">
        <div className="container mx-auto px-6">
          <h3 className="text-center text-lg font-semibold mb-4">Enlaces de interés</h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center space-x-2">
              <img src="https://via.placeholder.com/40x40/ffffff/3B82F6?text=CC" alt="Cámara de Comercio" className="rounded" />
              <span className="text-sm">Cámara de Comercio de Córdoba</span>
            </div>
            <div className="flex items-center space-x-2">
              <img src="https://via.placeholder.com/40x40/ffffff/3B82F6?text=RD" alt="Red Innova" className="rounded" />
              <span className="text-sm">Red de Innovación de Córdoba</span>
            </div>
            <div className="flex items-center space-x-2">
              <img src="https://via.placeholder.com/40x40/ffffff/3B82F6?text=GC" alt="Gov.co" className="rounded" />
              <span className="text-sm">GOV.CO</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer principal */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-white text-blue-900 p-3 rounded-lg">
                <div className="font-bold text-xl">IN</div>
              </div>
              <span className="text-2xl font-bold">IN-NOVA</span>
            </div>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Red de innovación de Córdoba - Impulsando el crecimiento empresarial a través de la innovación,
              la tecnología y la colaboración estratégica entre empresas del sector.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-blue-100">
                <MapPin className="h-5 w-5 text-blue-300" />
                <span>Carrera 7A #30-20, Montería, Córdoba</span>
              </div>
              <div className="flex items-center space-x-3 text-blue-100">
                <Phone className="h-5 w-5 text-blue-300" />
                <span>(57) 4 7858900 ext 2840</span>
              </div>
              <div className="flex items-center space-x-3 text-blue-100">
                <Mail className="h-5 w-5 text-blue-300" />
                <span>min.nova2024@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Servicios</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors flex items-center space-x-2">
                  <span>Innovación Empresarial</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors flex items-center space-x-2">
                  <span>Consultoría Digital</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors flex items-center space-x-2">
                  <span>Email Marketing</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors flex items-center space-x-2">
                  <span>Redes Sociales</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Contacto</h4>
            <div className="space-y-4">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                Contacto
              </button>
              <button className="w-full bg-transparent border-2 border-blue-400 hover:bg-blue-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                Acerca del sitio
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-blue-700 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200 text-sm">
              Red de innovacion todos los derechos reservados 2024
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-blue-200 hover:text-white text-sm transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-blue-200 hover:text-white text-sm transition-colors">
                Términos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
