<?php

namespace Database\Seeders;

use App\Models\Form;
use App\Models\Category;
use Illuminate\Database\Seeder;

class CategoryFormSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all();

        if ($categories->isEmpty()) {
            $this->command->info('No hay categorías para crear formularios. Ejecuta CategorySeeder primero.');
            return;
        }

        foreach ($categories as $category) {
            // Verificar si ya existe un formulario para esta categoría
            if (Form::where('category_id', $category->id)->exists()) {
                continue;
            }

            $questions = $this->generateQuestionsForCategory($category->name);

            Form::create([
                'name' => "Formulario de {$category->name}",
                'description' => "Formulario para recopilar información específica sobre proyectos de {$category->name}",
                'category_id' => $category->id,
                'questions' => $questions,
            ]);
        }

        $this->command->info('Formularios de categorías creados exitosamente.');
    }

    private function generateQuestionsForCategory($categoryName): array
    {
        $baseQuestions = [
            [
                'text' => '¿Cuál es el alcance del proyecto?',
                'type' => 'select',
                'required' => true,
                'options' => ['Pequeño', 'Mediano', 'Grande', 'Empresarial'],
            ],
            [
                'text' => '¿En qué etapa se encuentra el proyecto?',
                'type' => 'radio',
                'required' => true,
                'options' => ['Idea', 'Prototipo', 'Desarrollo', 'Lanzamiento', 'Escalamiento'],
            ],
            [
                'text' => '¿Cuál es el presupuesto estimado?',
                'type' => 'select',
                'required' => true,
                'options' => ['Menos de $10M', '$10M - $50M', '$50M - $100M', 'Más de $100M'],
            ],
            [
                'text' => 'Describa los requisitos técnicos específicos',
                'type' => 'textarea',
                'required' => false,
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
                        'options' => ['React', 'Vue.js', 'Angular', 'Laravel', 'Django', 'Node.js', 'Python', 'Java', 'Flutter', 'React Native'],
                    ],
                    [
                        'text' => '¿Requiere integración con APIs externas?',
                        'type' => 'radio',
                        'required' => true,
                        'options' => ['Sí', 'No', 'No estoy seguro'],
                    ],
                    [
                        'text' => '¿Necesita base de datos?',
                        'type' => 'radio',
                        'required' => true,
                        'options' => ['Sí', 'No'],
                    ],
                    [
                        'text' => '¿Qué tipo de aplicación es?',
                        'type' => 'select',
                        'required' => true,
                        'options' => ['Web', 'Móvil', 'Desktop', 'Híbrida', 'API'],
                    ],
                ];
                break;

            case 'innovación':
                $specificQuestions = [
                    [
                        'text' => '¿Qué tipo de innovación busca?',
                        'type' => 'checkbox',
                        'required' => false,
                        'options' => ['Producto', 'Proceso', 'Modelo de negocio', 'Tecnológica', 'Social'],
                    ],
                    [
                        'text' => '¿Tiene patentes o propiedad intelectual?',
                        'type' => 'radio',
                        'required' => true,
                        'options' => ['Sí', 'No', 'En proceso'],
                    ],
                    [
                        'text' => '¿Cuál es el nivel de innovación?',
                        'type' => 'select',
                        'required' => true,
                        'options' => ['Incremental', 'Radical', 'Disruptiva'],
                    ],
                ];
                break;

            case 'sostenibilidad':
                $specificQuestions = [
                    [
                        'text' => '¿Qué aspectos de sostenibilidad aborda?',
                        'type' => 'checkbox',
                        'required' => false,
                        'options' => ['Medioambiental', 'Social', 'Económica', 'Energética', 'Recursos'],
                    ],
                    [
                        'text' => '¿Tiene certificaciones de sostenibilidad?',
                        'type' => 'radio',
                        'required' => true,
                        'options' => ['Sí', 'No', 'En proceso'],
                    ],
                    [
                        'text' => '¿Cuál es el impacto ambiental esperado?',
                        'type' => 'textarea',
                        'required' => false,
                    ],
                ];
                break;

            case 'marketing digital':
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
                        'options' => ['Redes sociales', 'Email marketing', 'Publicidad online', 'Influencers', 'Content marketing', 'SEO/SEM'],
                    ],
                    [
                        'text' => '¿Tiene presencia digital actual?',
                        'type' => 'radio',
                        'required' => true,
                        'options' => ['Sí', 'No', 'Limitada'],
                    ],
                ];
                break;

            case 'desarrollo de software':
            case 'software':
                $specificQuestions = [
                    [
                        'text' => '¿Qué tipo de software necesita?',
                        'type' => 'select',
                        'required' => true,
                        'options' => ['Aplicación web', 'Aplicación móvil', 'Software de escritorio', 'Sistema empresarial', 'API'],
                    ],
                    [
                        'text' => '¿Qué lenguajes de programación prefiere?',
                        'type' => 'checkbox',
                        'required' => false,
                        'options' => ['JavaScript', 'Python', 'Java', 'C#', 'PHP', 'Ruby', 'Go', 'Rust'],
                    ],
                    [
                        'text' => '¿Necesita integración con sistemas existentes?',
                        'type' => 'radio',
                        'required' => true,
                        'options' => ['Sí', 'No'],
                    ],
                ];
                break;

            case 'inteligencia artificial':
            case 'ai':
            case 'machine learning':
                $specificQuestions = [
                    [
                        'text' => '¿Qué tipo de IA necesita?',
                        'type' => 'checkbox',
                        'required' => false,
                        'options' => ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Chatbots', 'Análisis predictivo'],
                    ],
                    [
                        'text' => '¿Tiene datos para entrenar el modelo?',
                        'type' => 'radio',
                        'required' => true,
                        'options' => ['Sí', 'No', 'Necesito ayuda para recolectar'],
                    ],
                    [
                        'text' => '¿Cuál es el volumen de datos aproximado?',
                        'type' => 'select',
                        'required' => true,
                        'options' => ['Menos de 1GB', '1GB - 10GB', '10GB - 100GB', 'Más de 100GB'],
                    ],
                ];
                break;

            case 'emprendimiento':
                $specificQuestions = [
                    [
                        'text' => '¿En qué fase del emprendimiento se encuentra?',
                        'type' => 'select',
                        'required' => true,
                        'options' => ['Idea', 'Validación', 'Desarrollo MVP', 'Lanzamiento', 'Escalamiento'],
                    ],
                    [
                        'text' => '¿Tiene equipo de trabajo?',
                        'type' => 'radio',
                        'required' => true,
                        'options' => ['Sí', 'No', 'En formación'],
                    ],
                    [
                        'text' => '¿Ha participado en programas de incubación?',
                        'type' => 'radio',
                        'required' => true,
                        'options' => ['Sí', 'No'],
                    ],
                ];
                break;

            case 'educación':
            case 'education':
                $specificQuestions = [
                    [
                        'text' => '¿Qué tipo de solución educativa necesita?',
                        'type' => 'select',
                        'required' => true,
                        'options' => ['Plataforma LMS', 'Contenido educativo', 'Herramientas de evaluación', 'Gamificación', 'Realidad virtual/aumentada'],
                    ],
                    [
                        'text' => '¿Para qué nivel educativo es?',
                        'type' => 'checkbox',
                        'required' => false,
                        'options' => ['Preescolar', 'Primaria', 'Secundaria', 'Universidad', 'Educación continua', 'Empresarial'],
                    ],
                    [
                        'text' => '¿Necesita integración con sistemas educativos existentes?',
                        'type' => 'radio',
                        'required' => true,
                        'options' => ['Sí', 'No'],
                    ],
                ];
                break;

            default:
                $specificQuestions = [
                    [
                        'text' => '¿Cuáles son los requisitos específicos del proyecto?',
                        'type' => 'textarea',
                        'required' => false,
                    ],
                    [
                        'text' => '¿Tiene experiencia previa en este tipo de proyectos?',
                        'type' => 'radio',
                        'required' => true,
                        'options' => ['Sí', 'No', 'Limitada'],
                    ],
                ];
                break;
        }

        return array_merge($baseQuestions, $specificQuestions);
    }
}
