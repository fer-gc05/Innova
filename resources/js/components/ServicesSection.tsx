import React from 'react';
import { Globe, Mail, Users, ChevronRight } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      icon: Globe,
      title: "Vitrina de Empresas Innovadoras",
      description: "**Destaca tu empresa:** Gana visibilidad y atrae clientes.",
      link: "Saber más"
    },
    {
      icon: Mail,
      title: "Campañas de Email Marketing Efectivas",
      description: "**Email marketing:** Conecta con tus clientes y aumenta tus ventas.",
      link: "Saber más"
    },
    {
      icon: Users,
      title: "Chatbots Inteligentes para Redes Sociales",
      description: "**Chatbots:** Automatiza tu atención al cliente y mejora la experiencia.",
      link: "Saber más"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-blue-600 font-semibold mb-4">
            Descubre cómo nuestras herramientas y servicios pueden llevar tu empresa al siguiente nivel.
          </p>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Crece, innova y destaca en el
          </h2>
          <h3 className="text-4xl font-bold text-gray-800 mb-12">
            mercado <span className="text-blue-600">digital.</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 text-center group">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors">
                  <IconComponent className="h-10 w-10 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-4">{service.title}</h4>
                <p className="text-gray-600 mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: service.description }}></p>
                <a
                  href="#"
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors group"
                >
                  <span>{service.link}</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
