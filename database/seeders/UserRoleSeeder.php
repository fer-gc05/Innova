<?php

namespace Database\Seeders;

use App\Models\User;
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

        // Crear usuario estudiante
        $student = User::create([
            'name' => 'Estudiante Ejemplo',
            'email' => 'estudiante@innova.com',
            'username' => 'estudiante',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
        $student->assignRole('student');

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
