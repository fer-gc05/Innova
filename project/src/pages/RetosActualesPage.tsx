import React from 'react';
import { Play, Calendar, Eye, ThumbsUp } from 'lucide-react';

export default function RetosActualesPage() {
  const challenges = [
    {
      id: 1,
      title: "HOTEL BAROCA",
      category: "CERRADO",
      categoryColor: "bg-red-500",
      thumbnail: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400&h=300",
      description: "El reto invita a desarrolladores, diseñadores, creativos y emprendedores a imaginar una solución innovadora que mejore la experiencia del huésped desde el check-in hasta el check-out.",
      action: "FICHA TÉCNICA",
      actionColor: "bg-blue-600"
    },
    {
      id: 2,
      title: "DELICIAS CARIBEÑAS",
      category: "ABIERTO",
      categoryColor: "bg-green-500",
      thumbnail: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300",
      description: "Promover el restaurante ubicado en una vereda remota, utilizando redes sociales y negociando el acceso mediante una carretera segura y eficiente.",
      action: "Registrarse",
      actionColor: "bg-blue-600"
    },
    {
      id: 3,
      title: "MEDISALUD",
      category: "ABIERTO",
      categoryColor: "bg-green-500",
      thumbnail: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400&h=300",
      description: "Desarrollar una plataforma digital innovadora para mejorar la atención médica y la gestión de pacientes en centros de salud rurales.",
      action: "Participar",
      actionColor: "bg-green-600"
    },
    {
      id: 4,
      title: "ASOPROMARSAB",
      category: "ABIERTO",
      categoryColor: "bg-green-500",
      thumbnail: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400&h=300",
      description: "Crear soluciones tecnológicas para optimizar la cadena de suministro y comercialización de productos agrícolas locales.",
      action: "Más información",
      actionColor: "bg-blue-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-blue-200 mb-4">
            <span>HOME</span>
            <span>/</span>
            <span>RETOS ACTUALES</span>
          </div>
          <h1 className="text-4xl font-bold">RETOS ACTUALES</h1>
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group">
              {/* Video Thumbnail */}
              <div className="relative">
                <img
                  src={challenge.thumbnail}
                  alt={challenge.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 rounded-full p-4">
                    <Play className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`${challenge.categoryColor} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                    {challenge.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{challenge.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                  {challenge.description}
                </p>

                {/* Stats */}
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>1.2k</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>89</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Hace 2 días</span>
                  </div>
                </div>

                {/* Action Button */}
                <button className={`w-full ${challenge.actionColor} hover:opacity-90 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform group-hover:scale-105`}>
                  {challenge.action}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Ver más retos
          </button>
        </div>
      </div>
    </div>
  );
}