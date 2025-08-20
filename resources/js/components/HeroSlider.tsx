import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "¡Córdoba innova!",
      subtitle: "Descubre nuevas oportunidades de negocio.",
      description: "Únete a la red de innovación de la Cámara de Comercio de Montería y lleva tu empresa al siguiente nivel.",
      backgroundImage: "/images/hero-open.webp",
      buttonText: "Saber más",
      overlay: false
    },
    {
      id: 2,
      title: "+200 empresas cordobesas",
      subtitle: "ya forman parte de nuestra red de innovación.",
      description: "Accede a herramientas, recursos y contactos para impulsar el crecimiento de tu negocio.",
      backgroundImage: "/images/hero-slide2.jpg",
      buttonText: "Saber más",
      overlay: true
    },
    {
      id: 3,
      title: "Transforma tu empresa",
      subtitle: "con tecnología y estrategia.",
      description: "La Cámara de Comercio de Montería te brinda el apoyo que necesitas para innovar y competir en el mercado global.",
      backgroundImage: "/images/hero-slide3.jpg",
      buttonText: "Saber más",
      overlay: true
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.backgroundImage})` }}
            >
              {slide.overlay && <div className="absolute inset-0 bg-blue-600/80"></div>}
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-6">
                <div className="max-w-4xl">
                  <div className={`space-y-6 ${slide.overlay ? 'text-white' : 'text-white'}`}>
                    <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                      {slide.title}
                    </h1>
                    <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                      {slide.subtitle}
                    </h2>
                    <p className="text-xl max-w-2xl leading-relaxed">
                      {slide.description}
                    </p>
                    <div className="pt-4">
                      <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-colors duration-300">
                        {slide.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors duration-300 z-20"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors duration-300 z-20"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Removed wave divider to avoid undesired wave effects near footer */}
    </section>
  );
}
