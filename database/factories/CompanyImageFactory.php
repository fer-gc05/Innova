<?php

namespace Database\Factories;

use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CompanyImage>
 */
class CompanyImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['product', 'service', 'facility', 'team', 'other'];
        $type = $this->faker->randomElement($types);

        // Generar títulos y descripciones según el tipo
        $titles = [
            'product' => [
                'Producto Innovador A',
                'Solución Tecnológica B',
                'Servicio Digital C',
                'Plataforma Web D',
                'Aplicación Móvil E'
            ],
            'service' => [
                'Consultoría Empresarial',
                'Desarrollo de Software',
                'Marketing Digital',
                'Capacitación Corporativa',
                'Soporte Técnico'
            ],
            'facility' => [
                'Oficinas Principales',
                'Sala de Reuniones',
                'Área de Desarrollo',
                'Laboratorio de Innovación',
                'Espacio de Coworking'
            ],
            'team' => [
                'Equipo de Desarrollo',
                'Departamento de Marketing',
                'Grupo de Innovación',
                'Equipo Directivo',
                'Personal Administrativo'
            ],
            'other' => [
                'Evento Corporativo',
                'Presentación de Producto',
                'Ceremonia de Premios',
                'Capacitación Interna',
                'Reunión de Equipo'
            ]
        ];

        $descriptions = [
            'product' => [
                'Nuestro producto estrella que revoluciona la industria',
                'Solución tecnológica de última generación',
                'Plataforma innovadora para el mercado actual',
                'Herramienta digital que optimiza procesos',
                'Aplicación móvil con funcionalidades avanzadas'
            ],
            'service' => [
                'Servicio profesional de consultoría empresarial',
                'Desarrollo de software a medida para empresas',
                'Estrategias de marketing digital efectivas',
                'Programas de capacitación corporativa',
                'Soporte técnico especializado 24/7'
            ],
            'facility' => [
                'Modernas instalaciones equipadas con tecnología de punta',
                'Espacios diseñados para la colaboración y creatividad',
                'Ambiente laboral que fomenta la innovación',
                'Infraestructura tecnológica de primer nivel',
                'Oficinas con diseño moderno y funcional'
            ],
            'team' => [
                'Equipo multidisciplinario de profesionales expertos',
                'Personal capacitado y comprometido con la excelencia',
                'Grupo de trabajo colaborativo y dinámico',
                'Directivos con amplia experiencia en el sector',
                'Personal administrativo eficiente y profesional'
            ],
            'other' => [
                'Evento corporativo exitoso con participación masiva',
                'Presentación de nuevos productos y servicios',
                'Reconocimiento a la excelencia empresarial',
                'Sesión de capacitación para el personal',
                'Reunión de equipo para planificación estratégica'
            ]
        ];

        return [
            'company_id' => Company::factory(),
            'image_path' => 'companies/placeholder.jpg', // Placeholder - en producción se subirían imágenes reales
            'title' => $this->faker->randomElement($titles[$type]),
            'description' => $this->faker->randomElement($descriptions[$type]),
            'type' => $type,
            'order' => $this->faker->numberBetween(1, 10),
            'is_active' => $this->faker->boolean(80), // 80% de probabilidad de estar activa
        ];
    }

    /**
     * Indicate that the image is for a product.
     */
    public function product(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'product',
            'title' => $this->faker->randomElement([
                'Producto Innovador A',
                'Solución Tecnológica B',
                'Servicio Digital C',
                'Plataforma Web D',
                'Aplicación Móvil E'
            ]),
        ]);
    }

    /**
     * Indicate that the image is for a service.
     */
    public function service(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'service',
            'title' => $this->faker->randomElement([
                'Consultoría Empresarial',
                'Desarrollo de Software',
                'Marketing Digital',
                'Capacitación Corporativa',
                'Soporte Técnico'
            ]),
        ]);
    }

    /**
     * Indicate that the image is for a facility.
     */
    public function facility(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'facility',
            'title' => $this->faker->randomElement([
                'Oficinas Principales',
                'Sala de Reuniones',
                'Área de Desarrollo',
                'Laboratorio de Innovación',
                'Espacio de Coworking'
            ]),
        ]);
    }

    /**
     * Indicate that the image is for a team.
     */
    public function team(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'team',
            'title' => $this->faker->randomElement([
                'Equipo de Desarrollo',
                'Departamento de Marketing',
                'Grupo de Innovación',
                'Equipo Directivo',
                'Personal Administrativo'
            ]),
        ]);
    }
}
