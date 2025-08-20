import React from 'react';
import { Mail, Info } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white">
      {/* Enlaces de interés */}
      <div className="py-8 border-b border-white/10">
        <div className="container mx-auto px-6">
          <h3 className="text-center text-xl font-semibold mb-6">Enlaces de interés</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-6 justify-items-center">
            <a href="https://micolombiadigital.gov.co/" target="_blank" rel="noopener noreferrer">
              <img src="/images/LOGO-COLOMBIA-POTENCIA-DE-LA-VIDA-1.png" alt="Colombia Potencia de la Vida" className="max-h-12 w-auto" />
            </a>
            <a href="https://www.mintic.gov.co/" target="_blank" rel="noopener noreferrer">
              <img src="/images/logo_mintic_24_dark.svg" alt="MinTIC" className="max-h-12 w-auto" />
            </a>
            <a href="https://www.laguajira.gov.co/NuestraGestion/PublishingImages/Paginas/Sistemas-General-de-Regalias/sgr.png" target="_blank" rel="noopener noreferrer">
              <img src="/images/sgr.png" alt="SGR" className="max-h-12 w-auto" />
            </a>
            <a href="https://id.presidencia.gov.co/" target="_blank" rel="noopener noreferrer">
              <img src="/images/Presidencia-logo.png" alt="Presidencia" className="max-h-12 w-auto" />
            </a>
            <a href="https://puntoestrategico.com.co/" target="_blank" rel="noopener noreferrer">
              <img src="/images/logo pe 2025.svg" alt="Punto Estratégico" className="max-h-12 w-auto" />
            </a>
            <a href="https://www.futurizza.co/" target="_blank" rel="noopener noreferrer">
              <img src="/images/LogoFuturiza.png" alt="Futurizza" className="max-h-12 w-auto" />
            </a>
            <a href="https://www.dnp.gov.co/Prensa_/Podcast/Paginas/plan-nacional-de-desarrollo-colombia-potencia-mundial-de-la-vida.aspx" target="_blank" rel="noopener noreferrer">
              <img src="/images/LOGO-COLOMBIA-POTENCIA-DE-LA-VIDA-1.png" alt="DNP" className="max-h-12 w-auto" />
            </a>
            <a href="https://minciencias.gov.co/" target="_blank" rel="noopener noreferrer">
              <img src="/images/logo_ciencias.png" alt="MinCiencias" className="max-h-12 w-auto" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer principal */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          {/* Logos */}
          <div className="flex flex-col items-center lg:items-start gap-6 overflow-hidden pr-6 lg:pr-10">
            <div className="flex items-center gap-8">
              <img src="/images/badge-80-years.svg" alt="80 años" className="max-h-12 w-auto" />
              <img src="/images/IN-Nova%20logo.svg" alt="IN-NOVA" className="max-h-12 w-auto" />
              <img src="/images/dinamica.svg" alt="Dinámica" className="max-h-12 w-auto" />
            </div>
            <div className="w-full max-w-[180px]">
              <img src="/images/LOGO-COLOMBIA-POTENCIA-DE-LA-VIDA-1.png" alt="GOV.CO" className="h-10 w-auto" />
            </div>
          </div>

          {/* Información */}
          <div className="text-center lg:text-left space-y-3 mt-4 lg:mt-8">
            <dl className="space-y-2 text-sm text-blue-100">
              <div>
                <dt className="font-semibold text-white">Horarios de Atención</dt>
                <dd>Lunes a Sábado de 07:00 am – 12:00 pm y de 02:00 pm – 05:00 pm</dd>
              </div>
              <div>
                <dt className="font-semibold text-white">Código postal</dt>
                <dd>230003</dd>
              </div>
            </dl>
          </div>

          {/* Contacto */}
          <div className="text-center lg:text-left space-y-4">
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
              <Mail className="h-5 w-5 text-white" />
              <span className="font-semibold text-white">Contacto</span>
            </div>
            <p className="text-sm text-blue-100">
              <strong>Correo: </strong><br />
              min.nova2024@gmail.com
            </p>
            <div className="flex items-center justify-center lg:justify-start space-x-2">
              <Info className="h-5 w-5 text-white" />
              <span className="text-sm text-blue-100">Acerca del sitio</span>
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
