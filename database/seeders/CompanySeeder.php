<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear algunas empresas de ejemplo
        $companies = [
            [
                'name' => 'TechInnovate Solutions',
                'nit' => '900123456-7',
                'responsible_name' => 'María González',
                'responsible_email' => 'maria.gonzalez@techinnovate.com',
                'responsible_phone' => '3001234567',
                'responsible_position' => 'CEO',
                'address' => 'Calle 123 #45-67, Bogotá, Colombia',
            ],
            [
                'name' => 'Digital Marketing Pro',
                'nit' => '800987654-3',
                'responsible_name' => 'Carlos Rodríguez',
                'responsible_email' => 'carlos.rodriguez@digitalmarketingpro.com',
                'responsible_phone' => '3009876543',
                'responsible_position' => 'Director General',
                'address' => 'Avenida 7 #23-45, Medellín, Colombia',
            ],
            [
                'name' => 'Innovación y Desarrollo SAS',
                'nit' => '700456789-1',
                'responsible_name' => 'Ana Martínez',
                'responsible_email' => 'ana.martinez@innovacionydesarrollo.com',
                'responsible_phone' => '3004567891',
                'responsible_position' => 'Directora de Innovación',
                'address' => 'Carrera 15 #78-90, Cali, Colombia',
            ],
            [
                'name' => 'Consultores Empresariales Unidos',
                'nit' => '600321654-9',
                'responsible_name' => 'Luis Pérez',
                'responsible_email' => 'luis.perez@consultoresunidos.com',
                'responsible_phone' => '3003216549',
                'responsible_position' => 'Socio Director',
                'address' => 'Calle 45 #12-34, Barranquilla, Colombia',
            ],
            [
                'name' => 'Soluciones Tecnológicas Avanzadas',
                'nit' => '500789123-4',
                'responsible_name' => 'Patricia López',
                'responsible_email' => 'patricia.lopez@solucionestecnologicas.com',
                'responsible_phone' => '3007891234',
                'responsible_position' => 'Directora de Tecnología',
                'address' => 'Avenida 68 #23-45, Bogotá, Colombia',
            ],
        ];

        foreach ($companies as $companyData) {
            // Crear un usuario para cada empresa
            $user = User::factory()->create([
                'name' => $companyData['responsible_name'],
                'email' => $companyData['responsible_email'],
            ]);

            // Crear la empresa
            Company::create([
                ...$companyData,
                'user_id' => $user->id,
            ]);
        }
    }
}
