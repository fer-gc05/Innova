import React from 'react';
import { Users, TrendingUp, Award } from 'lucide-react';

export default function InnovationSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Impulsando la <span className="text-blue-600">Innovación</span>
          </h2>
          <h3 className="text-2xl text-gray-700 mb-6">Empresarial</h3>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Estamos introduciendo nuevos estándares de gestión empresarial. Más de 200 empresas están comprometidas
            con mejorar sus ventas, marketing y campañas de promoción de productos.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="text-6xl font-bold text-blue-600 mb-2">+200</div>
              <div className="text-xl text-gray-700 mb-4">Empresas Afiliadas</div>
              <p className="text-gray-600">
                Las empresas se están uniendo a nuestra red para colaborar y compartir mejores prácticas
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-gray-800">+1 de</div>
                <div className="text-gray-600">Un proyecto de innovación</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-gray-800">Campañas</div>
                <div className="text-gray-600">de Marketing</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600&h=400"
                alt="Equipo empresarial"
                className="rounded-2xl shadow-2xl w-full max-w-md"
              />
              <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-4 rounded-xl shadow-lg">
                <Award className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
