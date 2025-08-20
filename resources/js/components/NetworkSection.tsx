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
            Invitamos a todas las empresas a formar parte de nuestra red para mejorar la competitividad, fomentar la colaboración y adoptar tecnologías innovadoras. ¡Sé parte de esta transformación y lleva tu empresa al siguiente nivel!
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl text-white p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">¿Que esperas? se parte de este gran proyecto</h3>
            <h4 className="text-2xl font-semibold">Objetivos de la Red de Innovación para Empresas</h4>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4">
                <Users className="h-12 w-12 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">1.</h4>
                <h5 className="font-semibold mb-2">Mejorar la Competitividad Empresarial:</h5>
                <p className="text-sm text-white/80">
                  Potenciar la capacidad de las empresas para competir en el mercado global mediante herramientas y recursos que impulsen la eficiencia y efectividad operativa.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4">
                <Lightbulb className="h-12 w-12 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">2.</h4>
                <h5 className="font-semibold mb-2">Fomentar la Colaboración:</h5>
                <p className="text-sm text-white/80">
                  Promover la cooperación entre empresas para compartir conocimientos y experiencias, facilitando la creación de alianzas estratégicas y proyectos conjuntos que generen valor agregado.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4">
                <BarChart className="h-12 w-12 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">3.</h4>
                <h5 className="font-semibold mb-2">Acelerar la Adopción de Tecnologías Innovadoras:</h5>
                <p className="text-sm text-white/80">
                  Facilitar el acceso a tecnologías de vanguardia y su implementación en procesos empresariales, ofreciendo capacitación y soporte técnico para integrar nuevas soluciones tecnológicas.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4">
                <Monitor className="h-12 w-12 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">4.</h4>
                <h5 className="font-semibold mb-2">Romper la Brecha Digital:</h5>
                <p className="text-sm text-white/80">
                  Reducir las desigualdades en el acceso y uso de tecnologías digitales entre empresas de diferentes tamaños y sectores, impulsando la alfabetización digital y el desarrollo de competencias tecnológicas en el personal de las empresas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
