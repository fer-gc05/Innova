<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\CompanyImage;
use App\Models\User;
use Illuminate\Database\Seeder;

class CompanyImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crear algunos usuarios si no existen
        $users = User::factory(5)->create();

        // Crear empresas con imágenes
        foreach ($users as $user) {
            $company = Company::factory()->create([
                'user_id' => $user->id,
            ]);

            // Crear múltiples imágenes para cada empresa
            $this->createCompanyImages($company);
        }

        // Crear algunas empresas adicionales con diferentes tipos
        $this->createTechnologyCompany();
        $this->createConsultingCompany();
        $this->createMarketingCompany();
    }

    private function createCompanyImages(Company $company): void
    {
        // Imágenes de productos (2-4 por empresa)
        CompanyImage::factory()
            ->count(rand(2, 4))
            ->product()
            ->create(['company_id' => $company->id]);

        // Imágenes de servicios (1-3 por empresa)
        CompanyImage::factory()
            ->count(rand(1, 3))
            ->service()
            ->create(['company_id' => $company->id]);

        // Imágenes de instalaciones (1-2 por empresa)
        CompanyImage::factory()
            ->count(rand(1, 2))
            ->facility()
            ->create(['company_id' => $company->id]);

        // Imágenes de equipo (1-2 por empresa)
        CompanyImage::factory()
            ->count(rand(1, 2))
            ->team()
            ->create(['company_id' => $company->id]);

        // Otras imágenes (1-3 por empresa)
        CompanyImage::factory()
            ->count(rand(1, 3))
            ->create(['company_id' => $company->id]);
    }

    private function createTechnologyCompany(): void
    {
        $user = User::factory()->create();
        $company = Company::factory()
            ->technology()
            ->withLogo()
            ->create(['user_id' => $user->id]);

        // Más imágenes de productos para empresas tecnológicas
        CompanyImage::factory()
            ->count(5)
            ->product()
            ->create(['company_id' => $company->id]);

        CompanyImage::factory()
            ->count(3)
            ->service()
            ->create(['company_id' => $company->id]);

        CompanyImage::factory()
            ->count(2)
            ->facility()
            ->create(['company_id' => $company->id]);
    }

    private function createConsultingCompany(): void
    {
        $user = User::factory()->create();
        $company = Company::factory()
            ->consulting()
            ->withLogo()
            ->create(['user_id' => $user->id]);

        // Más imágenes de servicios para empresas de consultoría
        CompanyImage::factory()
            ->count(4)
            ->service()
            ->create(['company_id' => $company->id]);

        CompanyImage::factory()
            ->count(3)
            ->team()
            ->create(['company_id' => $company->id]);

        CompanyImage::factory()
            ->count(2)
            ->facility()
            ->create(['company_id' => $company->id]);
    }

    private function createMarketingCompany(): void
    {
        $user = User::factory()->create();
        $company = Company::factory()->create([
            'user_id' => $user->id,
            'name' => fake()->company() . ' Marketing Digital',
            'responsible_position' => 'Director de Marketing',
        ]);

        // Imágenes variadas para empresa de marketing
        CompanyImage::factory()
            ->count(3)
            ->service()
            ->create(['company_id' => $company->id]);

        CompanyImage::factory()
            ->count(2)
            ->product()
            ->create(['company_id' => $company->id]);

        CompanyImage::factory()
            ->count(2)
            ->team()
            ->create(['company_id' => $company->id]);
    }
}
