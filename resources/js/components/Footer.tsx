import React from 'react';
import { Mail, Info } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-blue-600 to-blue-700 text-white">
      {/* Enlaces de interés */}
      <div className="bg-blue-700/40 border-b border-white/10">
        <div className="container mx-auto px-6 pt-28 pb-12">
          <h3 className="text-center text-xl font-semibold tracking-wide mb-8">Enlaces de interés</h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-6 lg:gap-10 items-center justify-items-center">
            <a href="https://micolombiadigital.gov.co/" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 transition ease-out">
              <img src="/images/LOGO-COLOMBIA-POTENCIA-DE-LA-VIDA-1.png" alt="Colombia Potencia de la Vida" className="max-h-12 w-auto max-w-full object-contain" />
            </a>
            <a href="https://www.mintic.gov.co/" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 transition ease-out">
              <img src="/images/logo_mintic_24_dark.svg" alt="MinTIC" className="max-h-12 w-auto max-w-full object-contain" />
            </a>
            <a href="https://www.laguajira.gov.co/NuestraGestion/PublishingImages/Paginas/Sistemas-General-de-Regalias/sgr.png" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 transition ease-out">
              <img src="/images/sgr.png" alt="SGR" className="max-h-12 w-auto max-w-full object-contain" />
            </a>
            <a href="https://id.presidencia.gov.co/" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 transition ease-out">
              <img src="/images/Presidencia-logo.png" alt="Presidencia" className="max-h-12 w-auto max-w-full object-contain" />
            </a>
            <a href="https://puntoestrategico.com.co/" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 transition ease-out">
              <img src="/images/logo pe 2025.svg" alt="Punto Estratégico" className="max-h-12 w-auto max-w-full object-contain" />
            </a>
            <a href="https://www.futurizza.co/" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 transition ease-out">
              <img src="/images/LogoFuturiza.png" alt="Futurizza" className="max-h-12 w-auto max-w-full object-contain" />
            </a>
            <a href="https://www.dnp.gov.co/Prensa_/Podcast/Paginas/plan-nacional-de-desarrollo-colombia-potencia-mundial-de-la-vida.aspx" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 transition ease-out">
              <img src="/images/LOGO-COLOMBIA-POTENCIA-DE-LA-VIDA-1.png" alt="DNP" className="max-h-12 w-auto max-w-full object-contain" />
            </a>
            <a href="https://minciencias.gov.co/" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 transition ease-out">
              <img src="/images/logo_ciencias.png" alt="MinCiencias" className="max-h-12 w-auto max-w-full object-contain" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer principal */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-10 items-start">
          {/* Logos */}
          <div className="space-y-6">
            <div className="flex items-center gap-8 justify-center lg:justify-start">
              <img src="/images/badge-80-years.svg" alt="80 años" className="max-h-12 w-auto max-w-full object-contain opacity-90" />
              <img src="/images/IN-Nova%20logo.svg" alt="IN-NOVA" className="max-h-12 w-auto max-w-full object-contain" />
              <img src="/images/dinamica.svg" alt="Dinámica" className="max-h-12 w-auto max-w-full object-contain opacity-90" />
            </div>
            <div className="flex items-center justify-center lg:justify-start">
              <img src="/images/LOGO-COLOMBIA-POTENCIA-DE-LA-VIDA-1.png" alt="GOV.CO" className="h-auto max-h-12 w-auto max-w-[160px] object-contain" />
            </div>
          </div>

          {/* Información */}
          <div className="space-y-3 text-blue-100">
            <h4 className="text-white text-xl font-bold mb-4">Red de innovación de Córdoba</h4>
            <div className="space-y-2 text-sm max-w-md">
              <p><strong>Horarios de Atención: </strong>Lunes a Sábado de 07:00 am – 12:00 pm y de 02:00 pm – 05:00 pm</p>
              <p><strong>Código postal: </strong>230003</p>
            </div>
          </div>

          {/* Contacto */}
          <div className="space-y-4 text-blue-100">
            <div className="flex items-center space-x-2 mb-2">
              <Mail className="h-5 w-5 text-white" />
              <span className="font-semibold text-white">Contacto</span>
            </div>
            <p className="text-sm">
              <strong>Correo: </strong><br />
              min.nova2024@gmail.com
            </p>
            <div className="flex items-center space-x-2">
              <Info className="h-5 w-5 text-white" />
              <span className="text-sm">Acerca del sitio</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto px-6">
          <p className="text-center text-sm text-blue-100">
            <a href="/" className="font-bold text-white">Red de innovacion</a> todos los derechos reservados 2024 ©
          </p>
        </div>
      </div>
    </footer>
  );
}
