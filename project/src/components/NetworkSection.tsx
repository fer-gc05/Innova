import React from 'react';
import { Users, Lightbulb, BarChart, Monitor } from 'lucide-react';

export default function NetworkSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Únete a Nuestra <span className="text-blue-600">Red de Innovación</span>
          </h2>
          <h3 className="text-2xl text-gray-700 mb-8">Empresarial</h3>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Red para impulsar la competitividad, fomentar la colaboración y potenciar tecnologías innovadoras. 
            Creando las mejores alianzas empresariales y facilitando el intercambio del desarrollo.
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl text-white p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">¿Qué esperarás al unirte de este gran proyecto?</h3>
            <h4 className="text-2xl font-semibold">Objetivos de la Red de Innovación para Empresas</h4>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4">
                <Users className="h-12 w-12 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">1.</h4>
                <h5 className="font-semibold mb-2">Mejorar la Competitividad Empresarial</h5>
                <p className="text-sm text-white/80">
                  Apoyando a las empresas a incrementar su productividad y mejorar el desempeño competitivo y alcanzar más tecnologías del mundo empresarial.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4">
                <Lightbulb className="h-12 w-12 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">2.</h4>
                <h5 className="font-semibold mb-2">Fomentar la Colaboración Empresarial</h5>
                <p className="text-sm text-white/80">
                  Promover la cooperación entre empresas, instituciones de investigación y organismos de desarrollo para alcanzar objetivos comunes.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4">
                <BarChart className="h-12 w-12 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">3.</h4>
                <h5 className="font-semibold mb-2">Apoyar el Financiación en Tecnología e Innovación</h5>
                <p className="text-sm text-white/80">
                  Facilitar el acceso a fuentes de financiación para proyectos de investigación, desarrollo e innovación empresarial.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4">
                <Monitor className="h-12 w-12 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">4.</h4>
                <h5 className="font-semibold mb-2">Impulsar la Brecha Digital</h5>
                <p className="text-sm text-white/80">
                  Apoyar a las empresas en la adopción de nuevas tecnologías digitales para mejorar sus procesos y productos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}