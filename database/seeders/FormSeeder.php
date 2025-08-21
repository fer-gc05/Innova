<?php

namespace Database\Seeders;

use App\Models\Form;
use App\Models\Category;
use Illuminate\Database\Seeder;

class FormSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all();

        foreach ($categories as $category) {
            // Crear 1-2 formularios por categoría
            $formsToCreate = rand(1, 2);

            for ($i = 1; $i <= $formsToCreate; $i++) {
                $questions = $this->generateQuestionsForCategory($category->name);

                Form::create([
                    'name' => "Formulario de {$category->name} - #{$i}",
                    'description' => "Formulario para recopilar información sobre proyectos de {$category->name}",
                    'category_id' => $category->id,
                    'questions' => $questions,
                ]);
            }
        }
    }

    private function generateQuestionsForCategory($categoryName): array
    {
        $baseQuestions = [
            [
                'text' => '¿Cuál es el nombre de su empresa?',
                'type' => 'text',
                'required' => true,
            ],
            [
                'text' => 'Describa brevemente su proyecto',
                'type' => 'textarea',
                'required' => true,
            ],
            [
                'text' => '¿Cuál es su presupuesto estimado?',
                'type' => 'select',
                'required' => true,
                'options' => ['Menos de $10M', '$10M - $50M', '$50M - $100M', 'Más de $100M'],
            ],
            [
                'text' => '¿En qué etapa se encuentra su proyecto?',
                'type' => 'radio',
                'required' => true,
                'options' => ['Idea', 'Prototipo', 'Desarrollo', 'Lanzamiento', 'Escalamiento'],
            ],
        ];

        // Preguntas específicas por categoría
        $specificQuestions = [];

        switch (strtolower($categoryName)) {
            case 'tecnología':
            case 'tech':
                $specificQuestions = [
                    [
                        'text' => '¿Qué tecnologías principales utilizará?',
                        'type' => 'checkbox',
                        'required' => false,
                        'options' => ['React', 'Vue.js', 'Angular', 'Laravel', 'Django', 'Node.js', 'Python', 'Java'],
                    ],
                    [
                        'text' => '¿Requiere integración con APIs externas?',
                        'type' => 'radio',
                        'required' => true,
                        'options' => ['Sí', 'No', 'No estoy seguro'],
                    ],
                ];
                break;

            case 'marketing':
                $specificQuestions = [
                    [
                        'text' => '¿Cuál es su público objetivo?',
                        'type' => 'textarea',
                        'required' => true,
                    ],
                    [
                        'text' => '¿Qué canales de marketing planea utilizar?',
                        'type' => 'checkbox',
                        'required' => false,
                        'options' => ['Redes sociales', 'Email marketing', 'Publicidad online', 'Influencers', 'Content marketing'],
                    ],
                ];
                break;

            case 'educación':
            case 'education':
                $specificQuestions = [
                    [
                        'text' => '¿Cuál es el grupo etario objetivo?',
                        'type' => 'select',
                        'required' => true,
                        'options' => ['Niños (5-12)', 'Adolescentes (13-17)', 'Adultos jóvenes (18-25)', 'Adultos (26-50)', 'Adultos mayores (50+)'],
                    ],
                    [
                        'text' => '¿Qué modalidad de enseñanza prefiere?',
                        'type' => 'radio',
                        'required' => true,
                        'options' => ['Presencial', 'Virtual', 'Híbrida'],
                    ],
                ];
                break;

            default:
                $specificQuestions = [
                    [
                        'text' => '¿Qué hace único a su proyecto?',
                        'type' => 'textarea',
                        'required' => true,
                    ],
                    [
                        'text' => '¿Ha trabajado en proyectos similares antes?',
                        'type' => 'radio',
                        'required' => true,
                        'options' => ['Sí', 'No'],
                    ],
                ];
        }

        return array_merge($baseQuestions, $specificQuestions);
    }
}
