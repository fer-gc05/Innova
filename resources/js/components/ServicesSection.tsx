import React from 'react';

export default function ServicesSection() {
  const services = [
    {
      id: 1,
      title: "Vitrina de Empresas Innovadoras",
      description: "Destaca tu empresa: Gana visibilidad y atrae clientes.",
      icon: "/images/sitio-web-90x90.png",
      buttonText: "Saber más"
    },
    {
      id: 2,
      title: "Campañas de Email Marketing Efectivas",
      description: "Email marketing: Conecta con tus clientes y aumenta tus ventas.",
      icon: "/images/marketing-90x90.png",
      buttonText: "Saber más"
    },
    {
      id: 3,
      title: "Chatbots Inteligentes para Redes Sociales",
      description: "Chatbots: Automatiza tu atención al cliente y mejora la experiencia.",
      icon: "/images/chatbot-90x90.png",
      buttonText: "Saber más"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-lg text-gray-600 mb-4">
            Descubre cómo nuestras herramientas y servicios pueden llevar tu empresa al siguiente nivel.
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
            <span className="text-blue-600 underline">Crece, innova y destaca</span> en el mercado digital.
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              {/* Icon */}
              <div className="mb-6">
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-20 h-20 mx-auto"
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Button */}
              <button className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300">
                {service.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
