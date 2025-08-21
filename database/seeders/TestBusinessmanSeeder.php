<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Company;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TestBusinessmanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Verificar si ya existe el usuario de prueba
        $existingUser = User::where('email', 'empresario@test.com')->first();

        if ($existingUser) {
            $this->command->info('Usuario de prueba ya existe.');
            return;
        }

        // Crear usuario empresario
        $user = User::create([
            'name' => 'Empresario Test',
            'username' => 'empresario_test',
            'email' => 'empresario@test.com',
            'password' => Hash::make('password123'),
        ]);

        // Asignar rol de empresario
        $user->assignRole('businessman');

        // Crear empresa asociada
        $company = Company::create([
            'name' => 'Empresa Test S.A.S.',
            'nit' => '999999999-9',
            'responsible_name' => 'Empresario Test',
            'responsible_email' => 'empresario@test.com',
            'responsible_phone' => '3001234567',
            'responsible_position' => 'CEO',
            'address' => 'Calle 123 # 45-67, Bogotá',
            'user_id' => $user->id,
        ]);

        $this->command->info('Usuario empresario de prueba creado exitosamente.');
        $this->command->info('Email: empresario@test.com');
        $this->command->info('Password: password123');
    }
}
