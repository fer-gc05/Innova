import React from 'react';

export default function InnovationSection() {
  const stats = [
    {
      id: 1,
      number: "+200",
      title: "Empresas Afiliadas",
      description: "Las empresas se están uniendo a nuestra red para colaborar y compartir mejores prácticas"
    },
    {
      id: 2,
      number: "+1 de",
      title: "Un proyecto de innovación",
      description: "Proyectos enfocados en adoptar tecnologías avanzadas para optimizar operaciones y procesos."
    },
    {
      id: 3,
      number: "",
      title: "Campañas de Marketing",
      description: "Se van llevando a cabo campañas innovadoras para mejorar la visibilidad y las ventas de productos."
    }
  ];

  return (
    <>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-2xl font-bold text-gray-600 mb-4">2025</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
              Impulsando la <span className="text-blue-600 underline">Innovación</span> Empresarial
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Estamos introduciendo nuevos estándares de gestión empresarial. Más de 200 empresas están comprometidas con mejorar sus ventas, marketing y campañas de promoción de productos.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Image */}
            <div className="order-2 lg:order-1">
              <img
                src="/images/corporate-conf.png"
                alt="Conferencia de innovación"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>

            {/* Right Column - Stats */}
            <div className="order-1 lg:order-2 space-y-8">
              {stats.map((stat) => (
                <div key={stat.id} className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                  {stat.number && (
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-2xl">
                      {stat.number}
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {stat.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join Network Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                Únete a Nuestra <span className="text-blue-600 underline">Red de Innovación</span> Empresarial
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Invitamos a todas las empresas a formar parte de nuestra red para mejorar la competitividad, fomentar la colaboración y adoptar tecnologías innovadoras. ¡Sé parte de esta transformación y lleva tu empresa al siguiente nivel!
              </p>
            </div>

            {/* Right Column - Image */}
            <div>
              <img
                src="/images/corporate-window.jpg"
                alt="Ventana de innovación"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
