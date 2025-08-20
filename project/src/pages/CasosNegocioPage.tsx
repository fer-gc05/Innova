import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function CasosNegocioPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">CASOS DE NEGOCIO</h1>
          <div className="flex items-center justify-center space-x-2 text-blue-200">
            <span>Categorías</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Tenemos grandes proyectos por anunciar
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Próximamente estaremos compartiendo casos de éxito y proyectos destacados que están 
            transformando el panorama empresarial en Córdoba.
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-3xl">🚀</div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Casos de Éxito en Desarrollo</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Estamos documentando los casos de negocio más exitosos de nuestra red. 
              Pronto podrás conocer las historias de transformación digital y crecimiento 
              empresarial de nuestros aliados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Notificarme cuando esté listo
              </button>
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Ver otros proyectos
              </button>
            </div>
          </div>
        </div>

        {/* Categories Preview */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">Categorías de Casos</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Transformación Digital', count: '12 casos', color: 'bg-blue-500' },
              { name: 'Innovación Tecnológica', count: '8 casos', color: 'bg-green-500' },
              { name: 'Crecimiento Empresarial', count: '15 casos', color: 'bg-purple-500' },
              { name: 'Sostenibilidad', count: '6 casos', color: 'bg-orange-500' }
            ].map((category, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 ${category.color} rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg`}>
                  {index + 1}
                </div>
                <h4 className="font-bold text-gray-800 mb-2">{category.name}</h4>
                <p className="text-sm text-gray-600">{category.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}