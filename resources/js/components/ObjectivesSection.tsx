import React from 'react';

export default function ObjectivesSection() {
  const objectives = [
    {
      id: 1,
      title: "Mejorar la Competitividad Empresarial:",
      description: "Potenciar la capacidad de las empresas para competir en el mercado global mediante herramientas y recursos que impulsen la eficiencia y efectividad operativa."
    },
    {
      id: 2,
      title: "Fomentar la Colaboración:",
      description: "Promover la cooperación entre empresas para compartir conocimientos y experiencias, facilitando la creación de alianzas estratégicas y proyectos conjuntos que generen valor agregado."
    },
    {
      id: 3,
      title: "Acelerar la Adopción de Tecnologías Innovadoras:",
      description: "Facilitar el acceso a tecnologías de vanguardia y su implementación en procesos empresariales, ofreciendo capacitación y soporte técnico para integrar nuevas soluciones tecnológicas."
    },
    {
      id: 4,
      title: "Romper la Brecha Digital:",
      description: "Reducir las desigualdades en el acceso y uso de tecnologías digitales entre empresas de diferentes tamaños y sectores, impulsando la alfabetización digital y el desarrollo de competencias tecnológicas en el personal de las empresas."
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-700 to-blue-500 text-white py-20 pb-40">
      {/* Onda superior dentro de esta sección */}
      <div className="absolute top-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-16">
          <path
            className="fill-white"
            d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
            c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
            c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"/>
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-5xl mb-12 text-center">
          <p className="text-white/90 mb-4">¿Qué esperas? sé parte de este gran proyecto</p>
          <h2 className="text-4xl lg:text-6xl font-semibold leading-tight">
            Objetivos de la Red de Innovación para Empresas
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Objectives - two columns */}
          <div className="lg:col-span-8 grid md:grid-cols-2 gap-x-16 gap-y-10">
            {objectives.map((objective) => (
              <div key={objective.id} className="flex items-start">
                <div className="mr-6 select-none leading-none text-white/80 font-semibold text-6xl lg:text-7xl">
                  {objective.id}.
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-semibold mb-2">
                    {objective.title}
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    {objective.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Illustration */}
          <div className="lg:col-span-4 hidden lg:block">
            <img
              src="/images/corporate-laptop.png"
              alt="Ilustración innovación"
              className="w-full h-auto drop-shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Onda inferior invertida */}
      <div className="absolute bottom-0 left-0 right-0 transform rotate-180">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-16">
          <path
            className="fill-white"
            d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
            c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
            c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"/>
        </svg>
      </div>
    </section>
  );
}
