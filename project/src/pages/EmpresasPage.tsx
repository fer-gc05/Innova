import React from 'react';
import { Calendar, MapPin, ExternalLink, Users } from 'lucide-react';

export default function EmpresasPage() {
  const companies = [
    {
      id: 1,
      name: "JAIN",
      subtitle: "DISTRIBUCIÓN & COMERCIALIZACIÓN",
      description: "Jain D&C prueba",
      category: "Distribución",
      date: "15 JUN",
      logo: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100&h=100",
      featured: true
    },
    {
      id: 2,
      name: "Cluster Turismo Córdoba",
      subtitle: "TURISMO & DESARROLLO",
      description: "Un Cluster Turismo una apuesta importante para el desarrollo del turismo en Córdoba, promoviendo experiencias de viaje inolvidables.",
      category: "Turismo",
      date: "12 JUN",
      logo: "https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&w=100&h=100",
      featured: false
    },
    {
      id: 3,
      name: "Belleza y Cuidado 2",
      subtitle: "ESTÉTICA & BIENESTAR",
      description: "Belleza y cuidado personal y profesional para el bienestar integral.",
      category: "Belleza",
      date: "10 JUN",
      logo: "https://images.pexels.com/photos/3993212/pexels-photo-3993212.jpeg?auto=compress&cs=tinysrgb&w=100&h=100",
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Empresas de la Red</h1>
          <p className="text-blue-100 text-lg">
            Conoce las empresas que forman parte de nuestra red de innovación
          </p>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company) => (
            <div key={company.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
              {/* Company Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{company.date}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    company.featured 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-green-100 text-green-600'
                  }`}>
                    {company.featured ? 'CERRADO' : 'ABIERTO'}
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{company.name}</h3>
                    <p className="text-sm text-gray-600 font-medium">{company.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Company Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-6 leading-relaxed">{company.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{company.category}</span>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center space-x-2 group-hover:scale-105 transform duration-200">
                    <span>CONTINUAR LEYENDO</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Cargar más empresas
          </button>
        </div>
      </div>
    </div>
  );
}