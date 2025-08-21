<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Company;
use App\Models\CompanyImage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear usuario administrador
        $admin = User::create([
            'name' => 'Administrador',
            'email' => 'admin@innova.com',
            'username' => 'admin',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $admin->assignRole('admin');

        // Crear usuario empresario
        $businessman = User::create([
            'name' => 'Empresario Ejemplo',
            'email' => 'empresario@innova.com',
            'username' => 'empresario',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $businessman->assignRole('businessman');

        // Crear empresa asociada al empresario y algunas imágenes activas
        $company = Company::create([
            'name' => 'Empresa Ejemplo S.A.S.',
            'nit' => '123456789-0',
            'responsible_name' => 'Empresario Ejemplo',
            'responsible_email' => 'empresario@innova.com',
            'responsible_phone' => '3001234567',
            'responsible_position' => 'CEO',
            'address' => 'Calle 123 # 45-67, Bogotá, Colombia',
            'logo' => 'companies/logos/placeholder-logo.png',
            'user_id' => $businessman->id,
        ]);

        // Crear imágenes variadas para la empresa
        CompanyImage::factory()->count(2)->product()->create([
            'company_id' => $company->id,
            'is_active' => true,
        ]);
        CompanyImage::factory()->count(2)->service()->create([
            'company_id' => $company->id,
            'is_active' => true,
        ]);
        CompanyImage::factory()->count(1)->facility()->create([
            'company_id' => $company->id,
            'is_active' => true,
        ]);
        CompanyImage::factory()->count(1)->team()->create([
            'company_id' => $company->id,
            'is_active' => true,
        ]);

        // Crear usuario estudiante
        $student = User::create([
            'name' => 'Estudiante Ejemplo',
            'email' => 'estudiante@innova.com',
            'username' => 'estudiante',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $student->assignRole('student');

        // Crear registro de estudiante asociado
        \App\Models\Student::create([
            'user_id' => $student->id,
            'is_leader' => true,
        ]);

        // Crear usuarios adicionales con roles aleatorios
        $roles = ['admin', 'businessman', 'student'];

        for ($i = 1; $i <= 10; $i++) {
            $user = User::factory()->create([
                'email' => "user{$i}@innova.com",
                'username' => "user{$i}",
            ]);

            $randomRole = $roles[array_rand($roles)];
            $user->assignRole($randomRole);
        }

        // Asignar roles a usuarios existentes si no tienen
        $usersWithoutRoles = User::whereDoesntHave('roles')->get();
        foreach ($usersWithoutRoles as $user) {
            $randomRole = $roles[array_rand($roles)];
            $user->assignRole($randomRole);
        }
    }
}
