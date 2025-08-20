<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            'admin', // Role administrativo, podra acceder a todas las funcionalidades del sistema.
            'businessman', // Role de empresario, podra crear un reto, ademas de observar los retos habilitador y sus participantes.
            'student' // Role de estudiante, puede suscribirse a un reto, ademas de observar los retos habilitados.
        ];

        foreach ($roles as $role) {
            $role = Role::create(['name' => $role]);
        }

        $permissions = [
            'manage_users', // Permite gestionar usuarios.
            'manage_businesses', // Permite gestionar empresas.
            'create_challenges', // Permite crear retos.
            'manage_challenges', // Permite gestionar retos habilitados y sus participantes.
            'subscribe_to_challenges' // Permite suscribirse a retos.

        ];

        foreach ($permissions as $permission) {
            $permission = Permission::create(['name' => $permission]);
        }

        $adminRole = Role::where('name', 'admin')->first(); // Asigna todos los permisos al rol de administrador.
        $adminRole->givePermissionTo(Permission::all());

        $businessmanRole = Role::where('name', 'businessman')->first(); // Asigna permisos al rol de empresario.
        $businessmanRole->givePermissionTo(['create_challenges', 'manage_challenges']);

        $studentRole = Role::where('name', 'student')->first(); // Asigna permisos al rol de estudiante.
        $studentRole->givePermissionTo(['subscribe_to_challenges']);
    }
}
