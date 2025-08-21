<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class CompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $companyTypes = [
            'Tecnología',
            'Consultoría',
            'Marketing Digital',
            'Desarrollo de Software',
            'Innovación',
            'Servicios Empresariales',
            'Educación',
            'Salud',
            'Finanzas',
            'Comercio'
        ];

        $positions = [
            'CEO',
            'Director General',
            'Gerente',
            'Director de Operaciones',
            'Director Comercial',
            'Director de Tecnología',
            'Director de Marketing',
            'Director de Recursos Humanos',
            'Director Financiero',
            'Director de Innovación'
        ];

        return [
            'name' => $this->faker->company() . ' ' . $this->faker->randomElement($companyTypes),
            'nit' => $this->faker->unique()->numerify('##########'),
            'responsible_name' => $this->faker->name(),
            'responsible_email' => $this->faker->unique()->safeEmail(),
            'responsible_phone' => $this->faker->numerify('3##########'),
            'responsible_position' => $this->faker->randomElement($positions),
            'address' => $this->faker->address(),
            'logo' => null, // Por defecto sin logo
            'user_id' => User::factory(),
        ];
    }

    /**
     * Indicate that the company has a logo.
     */
    public function withLogo(): static
    {
        return $this->state(fn (array $attributes) => [
            'logo' => 'companies/logos/placeholder-logo.png',
        ]);
    }

    /**
     * Indicate that the company is a technology company.
     */
    public function technology(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => $this->faker->company() . ' Tecnología',
            'responsible_position' => $this->faker->randomElement(['CEO', 'Director de Tecnología', 'CTO']),
        ]);
    }

    /**
     * Indicate that the company is a consulting company.
     */
    public function consulting(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => $this->faker->company() . ' Consultores',
            'responsible_position' => $this->faker->randomElement(['Director General', 'Socio Director', 'CEO']),
        ]);
    }
}
