<?php

namespace Database\Seeders;

use App\Models\Challenge;
use App\Models\Company;
use App\Models\Category;
use Illuminate\Database\Seeder;

class ChallengeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtener categorías existentes
        $categories = Category::all();

        if ($categories->isEmpty()) {
            // Crear categorías si no existen
            $categories = collect([
                'Tecnología',
                'Innovación',
                'Sostenibilidad',
                'Marketing Digital',
                'Desarrollo de Software',
                'Inteligencia Artificial',
                'Emprendimiento',
                'Educación'
            ])->map(function($name) {
                return Category::create([
                    'name' => $name,
                    'description' => 'Categoría de ' . $name
                ]);
            });
        }

        // Obtener empresas existentes
        $companies = Company::all();

        if ($companies->isEmpty()) {
            $this->command->info('No hay empresas para crear retos. Ejecuta CompanyImageSeeder primero.');
            return;
        }

        $challengeData = [
            [
                'name' => 'Desarrollo de App Móvil para Gestión de Inventarios',
                'description' => 'Crear una aplicación móvil innovadora que permita a las empresas gestionar sus inventarios de manera eficiente, con funcionalidades de escaneo de códigos de barras, alertas de stock bajo y reportes en tiempo real.',
                'objective' => 'Desarrollar una solución móvil completa para la gestión de inventarios que mejore la eficiencia operativa de las empresas.',
                'difficulty' => 'hard',
                'requirements' => [
                    'Conocimientos en desarrollo móvil (React Native o Flutter)',
                    'Experiencia con APIs REST',
                    'Conocimientos de bases de datos',
                    'Diseño de UX/UI intuitivo',
                    'Implementación de funcionalidades de escaneo'
                ],
                'publication_status' => 'published',
                'activity_status' => 'active',
                'category_name' => 'Desarrollo de Software'
            ],
            [
                'name' => 'Sistema de IA para Análisis de Sentimientos',
                'description' => 'Desarrollar un sistema de inteligencia artificial que analice sentimientos en redes sociales y comentarios de clientes para ayudar a las empresas a entender mejor la percepción de su marca.',
                'objective' => 'Crear una herramienta de análisis de sentimientos que proporcione insights valiosos para la toma de decisiones empresariales.',
                'difficulty' => 'hard',
                'requirements' => [
                    'Conocimientos en Machine Learning',
                    'Experiencia con Python y librerías de NLP',
                    'Integración con APIs de redes sociales',
                    'Desarrollo de dashboard de visualización',
                    'Análisis de datos y estadísticas'
                ],
                'publication_status' => 'published',
                'activity_status' => 'active',
                'category_name' => 'Inteligencia Artificial'
            ],
            [
                'name' => 'Plataforma de E-learning para Capacitación Corporativa',
                'description' => 'Crear una plataforma de aprendizaje en línea que permita a las empresas capacitar a sus empleados de manera eficiente y personalizada.',
                'objective' => 'Desarrollar una solución educativa que mejore la capacitación y desarrollo profesional dentro de las organizaciones.',
                'difficulty' => 'medium',
                'requirements' => [
                    'Desarrollo web full-stack',
                    'Sistema de gestión de usuarios',
                    'Creación de contenido multimedia',
                    'Sistema de evaluaciones y certificaciones',
                    'Análisis de progreso y reportes'
                ],
                'publication_status' => 'draft',
                'activity_status' => 'active',
                'category_name' => 'Educación'
            ],
            [
                'name' => 'Solución de Marketing Digital Automatizado',
                'description' => 'Desarrollar una herramienta que automatice campañas de marketing digital, incluyendo email marketing, redes sociales y publicidad online.',
                'objective' => 'Crear una plataforma que optimice las estrategias de marketing digital y mejore el ROI de las campañas.',
                'difficulty' => 'medium',
                'requirements' => [
                    'Conocimientos en marketing digital',
                    'Integración con APIs de redes sociales',
                    'Sistema de automatización',
                    'Análisis de métricas y KPIs',
                    'Diseño de campañas personalizadas'
                ],
                'publication_status' => 'published',
                'activity_status' => 'active',
                'category_name' => 'Marketing Digital'
            ],
            [
                'name' => 'App de Sostenibilidad para Empresas',
                'description' => 'Crear una aplicación que ayude a las empresas a medir y reducir su huella de carbono, implementando prácticas sostenibles.',
                'objective' => 'Desarrollar una herramienta que promueva la sostenibilidad empresarial y el cumplimiento de objetivos ESG.',
                'difficulty' => 'medium',
                'requirements' => [
                    'Conocimientos en sostenibilidad empresarial',
                    'Desarrollo de aplicaciones móviles',
                    'Sistema de cálculo de huella de carbono',
                    'Dashboard de métricas ambientales',
                    'Integración con sensores IoT'
                ],
                'publication_status' => 'draft',
                'activity_status' => 'active',
                'category_name' => 'Sostenibilidad'
            ],
            [
                'name' => 'Plataforma de Innovación Colaborativa',
                'description' => 'Desarrollar una plataforma que fomente la innovación colaborativa dentro de las empresas, permitiendo a los empleados compartir ideas y proyectos.',
                'objective' => 'Crear un ecosistema de innovación que impulse la creatividad y colaboración en las organizaciones.',
                'difficulty' => 'easy',
                'requirements' => [
                    'Desarrollo web moderno',
                    'Sistema de gestión de ideas',
                    'Funcionalidades de colaboración',
                    'Sistema de votación y evaluación',
                    'Gamificación y recompensas'
                ],
                'publication_status' => 'published',
                'activity_status' => 'completed',
                'category_name' => 'Innovación'
            ]
        ];

        foreach ($companies as $company) {
            // Crear 2-4 retos por empresa
            $numChallenges = rand(2, 4);
            $selectedChallenges = array_rand($challengeData, $numChallenges);

            if (!is_array($selectedChallenges)) {
                $selectedChallenges = [$selectedChallenges];
            }

            foreach ($selectedChallenges as $index) {
                $challengeInfo = $challengeData[$index];

                // Encontrar la categoría correspondiente
                $category = $categories->firstWhere('name', $challengeInfo['category_name']);

                if (!$category) {
                    $category = $categories->random();
                }

                $startDate = now()->addDays(rand(1, 30));
                $endDate = $startDate->copy()->addDays(rand(30, 90));

                Challenge::create([
                    'name' => $challengeInfo['name'],
                    'description' => $challengeInfo['description'],
                    'objective' => $challengeInfo['objective'],
                    'difficulty' => $challengeInfo['difficulty'],
                    'requirements' => $challengeInfo['requirements'],
                    'publication_status' => $challengeInfo['publication_status'],
                    'activity_status' => $challengeInfo['activity_status'],
                    'start_date' => $startDate->format('Y-m-d'),
                    'end_date' => $endDate->format('Y-m-d'),
                    'link_video' => rand(0, 1) ? 'https://www.youtube.com/embed/dQw4w9WgXcQ' : null,
                    'reward_amount' => rand(500000, 5000000), // Entre 500k y 5M COP
                    'reward_currency' => 'COP',
                    'reward_description' => 'Recompensa económica por el desarrollo exitoso del proyecto. El monto se pagará al equipo ganador una vez se complete la validación del proyecto.',
                    'category_id' => $category->id,
                    'company_id' => $company->id,
                ]);
            }
        }

        $this->command->info('Retos creados exitosamente para todas las empresas.');
    }
}
