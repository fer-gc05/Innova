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
                'options' => ['Pequeño (1-3 meses)', 'Mediano (3-6 meses)', 'Grande (6-12 meses)', 'Empresarial (12+ meses)'],
            ],
            [
                'text' => '¿En qué etapa se encuentra el proyecto?',
                'type' => 'radio',
                'required' => true,
                'options' => ['Idea conceptual', 'Prototipo', 'Desarrollo activo', 'Lanzamiento beta', 'Escalamiento'],
            ],
            [
                'text' => '¿Cuál es el presupuesto estimado para el desarrollo?',
                'type' => 'select',
                'required' => true,
                'options' => ['Menos de $10M', '$10M - $50M', '$50M - $100M', '$100M - $500M', 'Más de $500M'],
            ],
            [
                'text' => '¿Cuál es el público objetivo principal?',
                'type' => 'textarea',
                'required' => true,
            ],
        ];

        // Preguntas específicas por categoría
        $specificQuestions = [];

        switch (strtolower($categoryName)) {
            case 'tecnología':
            case 'tech':
                $specificQuestions = [
                    [
                        'text' => '¿Qué tecnologías principales utilizará en el proyecto?',
                        'type' => 'checkbox',
                        'required' => true,
                        'options' => ['React/Next.js', 'Vue.js/Nuxt', 'Angular', 'Laravel', 'Django', 'Node.js/Express', 'Python', 'Java/Spring', 'Flutter', 'React Native', 'PHP', 'Ruby on Rails', 'Go', 'Rust'],
                    ],
                    [
                        'text' => '¿Qué tipo de aplicación necesita desarrollar?',
                        'type' => 'select',
                        'required' => true,
                        'options' => ['Aplicación Web', 'Aplicación Móvil', 'Software de Escritorio', 'API/Servicios', 'Sistema Empresarial', 'Plataforma SaaS'],
                    ],
                    [
                        'text' => '¿Requiere integración con sistemas externos?',
                        'type' => 'radio',
                        'required' => true,
                        'options' => ['Sí, con APIs de terceros', 'Sí, con sistemas internos', 'No', 'No estoy seguro'],
                    ],
                    [
                        'text' => '¿Qué tipo de base de datos necesita?',
                        'type' => 'select',
                        'required' => true,
                        'options' => ['MySQL/PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'No necesito base de datos', 'No estoy seguro'],
                    ],
                    [
                        'text' => '¿Necesita funcionalidades de autenticación y autorización?',
                        'type' => 'radio',
                        'required' => true,
                        'options' => ['Sí, sistema completo', 'Sí, básico', 'No', 'No estoy seguro'],
                    ],
                ];
                break;

            case 'innovación':
                $specificQuestions = [
                    [
                        'text' => '¿Qué tipo de innovación busca desarrollar?',
                        'type' => 'checkbox',
                        'required' => true,
                        'options' => ['Innovación de Producto', 'Innovación de Proceso', 'Innovación de Modelo de Negocio', 'Innovación Tecnológica', 'Innovación Social', 'Innovación de Servicio'],
                    ],
                    [
                        'text' => '¿Cuál es el nivel de innovación del proyecto?',
                        'type' => 'select',
                        'required' => true,
                        'options' => ['Incremental (mejora existente)', 'Radical (nuevo enfoque)', 'Disruptiva (cambia el mercado)', 'Sustentadora (mantiene liderazgo)'],
                    ],
                    [
                        'text' => '¿Tiene patentes o propiedad intelectual relacionada?',
                        'type' => 'radio',
                        'required' => true,
                        'options' => ['Sí, patentes registradas', 'Sí, en proceso de registro', 'No, pero planeamos proteger', 'No'],
                    ],
                    [
                        'text' => '¿Qué problema específico resuelve su innovación?',
                        'type' => 'textarea',
                        'required' => true,
                    ],
                    [
                        'text' => '¿Tiene validación de mercado para su innovación?',
                        'type' => 'radio',
                        'required' => true,
                        'options' => ['Sí, estudios de mercado', 'Sí, prototipos probados', 'Sí, clientes interesados', 'No, necesitamos validar'],
                    ],
                ];
                break;

            case 'sostenibilidad':
                $specificQuestions = [
                    [
                        'text' => '¿Qué aspectos de sostenibilidad aborda su proyecto?',
                        'type' => 'checkbox',
                        'required' => true,
                        'options' => ['Sostenibilidad Ambiental', 'Sostenibilidad Social', 'Sostenibilidad Económica', 'Energía Renovable', 'Gestión de Recursos', 'Reducción de Huella de Carbono', 'Economía Circular'],
                    ],
                    [
                        'text' => '¿Tiene certificaciones de sostenibilidad o planea obtenerlas?',
                        'type' => 'radio',
                        'required' => true,
                        'options' => ['Sí, certificaciones vigentes', 'Sí, en proceso de certificación', 'No, pero planeamos certificar', 'No'],
                    ],
                    [
                        'text' => '¿Cuál es el impacto ambiental esperado de su proyecto?',
                        'type' => 'textarea',
                        'required' => true,
                    ],
                    [
                        'text' => '¿Qué métricas de sostenibilidad planea medir?',
                        'type' => 'checkbox',
                        'required' => false,
                        'options' => ['Huella de Carbono', 'Consumo de Agua', 'Generación de Residuos', 'Eficiencia Energética', 'Impacto Social', 'ROI Sostenible'],
                    ],
                    [
                        'text' => '¿Su proyecto contribuye a los Objetivos de Desarrollo Sostenible (ODS)?',
                        'type' => 'radio',
                        'required' => true,
                        'options' => ['Sí, específicamente a varios ODS', 'Sí, a algunos ODS', 'No estoy seguro', 'No'],
                    ],
                ];
                break;

            case 'marketing digital':
            case 'marketing':
                $specificQuestions = [
                    [
                        'text' => '¿Cuál es su público objetivo principal?',
                        'type' => 'textarea',
                        'required' => true,
                    ],
                    [
                        'text' => '¿Qué canales de marketing digital planea utilizar?',
                        'type' => 'checkbox',
                        'required' => true,
                        'options' => ['Redes Sociales (Instagram, Facebook, TikTok)', 'Email Marketing', 'Publicidad Online (Google Ads, Facebook Ads)', 'Influencer Marketing', 'Content Marketing', 'SEO/SEM', 'LinkedIn Marketing', 'YouTube Marketing', 'WhatsApp Business'],
                    ],
                    [
                        'text' => '¿Cuál es el estado actual de su presencia digital?',
                        'type' => 'select',
                        'required' => true,
                        'options' => ['Sin presencia digital', 'Presencia básica (redes sociales)', 'Presencia moderada (web + redes)', 'Presencia avanzada (estrategia completa)', 'Presencia consolidada'],
                    ],
                    [
                        'text' => '¿Cuál es su objetivo principal de marketing digital?',
                        'type' => 'select',
                        'required' => true,
                        'options' => ['Aumentar ventas', 'Generar leads', 'Mejorar engagement', 'Construir marca', 'Educar al mercado', 'Retener clientes'],
                    ],
                    [
                        'text' => '¿Tiene un presupuesto específico para marketing digital?',
                        'type' => 'radio',
                        'required' => true,
                        'options' => ['Sí, presupuesto definido', 'Sí, presupuesto flexible', 'No, necesitamos definir', 'No estoy seguro'],
                    ],
                    [
                        'text' => '¿Qué métricas de rendimiento son más importantes para usted?',
                        'type' => 'checkbox',
                        'required' => false,
                        'options' => ['Conversiones/Ventas', 'Alcance/Impresiones', 'Engagement', 'ROI/ROAS', 'Tráfico web', 'Seguidores', 'Leads generados'],
                    ],
                ];
                break;

            case 'desarrollo de software':
            case 'software':
                $specificQuestions = [
                    [
                        'text' => '¿Qué tipo de software necesita desarrollar?',
                        'type' => 'select',
                        'required' => true,
                        'options' => ['Aplicación Web', 'Aplicación Móvil', 'Software de Escritorio', 'Sistema Empresarial (ERP/CRM)', 'API/Servicios Web', 'Plataforma SaaS', 'Aplicación Híbrida'],
                    ],
                    [
                        'text' => '¿Qué tecnologías y lenguajes de programación prefiere?',
                        'type' => 'checkbox',
                        'required' => true,
                        'options' => ['JavaScript/TypeScript', 'Python', 'Java', 'C#/.NET', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin', 'Flutter/Dart', 'React Native'],
                    ],
                    [
                        'text' => '¿Necesita integración con sistemas existentes?',
                        'type' => 'radio',
                        'required' => true,
                        'options' => ['Sí, con sistemas internos', 'Sí, con APIs de terceros', 'Sí, con ambos', 'No', 'No estoy seguro'],
                    ],
                    [
                        'text' => '¿Qué funcionalidades principales necesita el software?',
                        'type' => 'checkbox',
                        'required' => false,
                        'options' => ['Autenticación de usuarios', 'Gestión de roles y permisos', 'Base de datos', 'Reportes y analytics', 'Notificaciones', 'Pagos online', 'Integración con APIs', 'Dashboard administrativo'],
                    ],
                    [
                        'text' => '¿Necesita soporte técnico y mantenimiento?',
                        'type' => 'radio',
                        'required' => true,
                        'options' => ['Sí, soporte completo', 'Sí, mantenimiento básico', 'No, solo desarrollo', 'No estoy seguro'],
                    ],
                    [
                        'text' => '¿Cuál es la complejidad técnica estimada del proyecto?',
                        'type' => 'select',
                        'required' => true,
                        'options' => ['Baja (funcionalidades básicas)', 'Media (funcionalidades moderadas)', 'Alta (funcionalidades complejas)', 'Muy alta (sistema empresarial completo)'],
                    ],
                ];
                break;

            case 'inteligencia artificial':
            case 'ai':
            case 'machine learning':
                $specificQuestions = [
                    [
                        'text' => '¿Qué tipo de inteligencia artificial necesita implementar?',
                        'type' => 'checkbox',
                        'required' => true,
                        'options' => ['Machine Learning', 'Deep Learning', 'Procesamiento de Lenguaje Natural (NLP)', 'Computer Vision', 'Chatbots/Asistentes Virtuales', 'Análisis Predictivo', 'Reconocimiento de Patrones', 'Automatización de Procesos'],
                    ],
                    [
                        'text' => '¿Cuál es el estado actual de sus datos?',
                        'type' => 'select',
                        'required' => true,
                        'options' => ['Tengo datos limpios y estructurados', 'Tengo datos pero necesitan limpieza', 'Tengo datos limitados', 'No tengo datos, necesito recolectar', 'No estoy seguro'],
                    ],
                    [
                        'text' => '¿Cuál es el volumen aproximado de datos disponibles?',
                        'type' => 'select',
                        'required' => true,
                        'options' => ['Menos de 1GB', '1GB - 10GB', '10GB - 100GB', '100GB - 1TB', 'Más de 1TB'],
                    ],
                    [
                        'text' => '¿Qué tipo de datos manejará el sistema de IA?',
                        'type' => 'checkbox',
                        'required' => false,
                        'options' => ['Datos estructurados (tablas)', 'Datos no estructurados (texto)', 'Imágenes', 'Audio', 'Video', 'Datos de sensores', 'Datos de redes sociales'],
                    ],
                    [
                        'text' => '¿Necesita el sistema de IA en tiempo real?',
                        'type' => 'radio',
                        'required' => true,
                        'options' => ['Sí, procesamiento en tiempo real', 'Sí, inferencia en tiempo real', 'No, procesamiento por lotes', 'No estoy seguro'],
                    ],
                    [
                        'text' => '¿Qué infraestructura técnica tiene disponible?',
                        'type' => 'select',
                        'required' => true,
                        'options' => ['Servidores locales', 'Cloud computing (AWS/Azure/GCP)', 'No tengo infraestructura', 'Necesito recomendaciones', 'No estoy seguro'],
                    ],
                    [
                        'text' => '¿Cuál es el objetivo principal del sistema de IA?',
                        'type' => 'textarea',
                        'required' => true,
                    ],
                ];
                break;

            case 'emprendimiento':
                $specificQuestions = [
                    [
                        'text' => '¿En qué fase del emprendimiento se encuentra?',
                        'type' => 'select',
                        'required' => true,
                        'options' => ['Idea conceptual', 'Validación de mercado', 'Desarrollo de MVP', 'Lanzamiento beta', 'Escalamiento', 'Consolidación'],
                    ],
                    [
                        'text' => '¿Cuál es el estado actual de su equipo de trabajo?',
                        'type' => 'radio',
                        'required' => true,
                        'options' => ['Equipo completo formado', 'Equipo parcialmente formado', 'Buscando cofundadores', 'Trabajando solo', 'No estoy seguro'],
                    ],
                    [
                        'text' => '¿Ha participado en programas de incubación o aceleración?',
                        'type' => 'radio',
                        'required' => true,
                        'options' => ['Sí, actualmente en programa', 'Sí, he participado anteriormente', 'No, pero estoy interesado', 'No'],
                    ],
                    [
                        'text' => '¿Cuál es su modelo de negocio principal?',
                        'type' => 'select',
                        'required' => true,
                        'options' => ['B2B (Empresa a Empresa)', 'B2C (Empresa a Consumidor)', 'B2B2C (Empresa a Empresa a Consumidor)', 'Marketplace', 'SaaS (Software as a Service)', 'E-commerce', 'Servicios profesionales'],
                    ],
                    [
                        'text' => '¿Tiene financiamiento o inversión?',
                        'type' => 'radio',
                        'required' => true,
                        'options' => ['Sí, inversión recibida', 'Sí, financiamiento propio', 'Sí, préstamos bancarios', 'No, buscando financiamiento', 'No estoy seguro'],
                    ],
                    [
                        'text' => '¿Qué tipo de apoyo necesita para su emprendimiento?',
                        'type' => 'checkbox',
                        'required' => false,
                        'options' => ['Mentoría empresarial', 'Desarrollo de producto', 'Validación de mercado', 'Estrategia de marketing', 'Financiamiento', 'Networking', 'Aspectos legales', 'Tecnología'],
                    ],
                    [
                        'text' => '¿Cuál es su propuesta de valor única?',
                        'type' => 'textarea',
                        'required' => true,
                    ],
                ];
                break;

            case 'educación':
            case 'education':
                $specificQuestions = [
                    [
                        'text' => '¿Qué tipo de solución educativa necesita desarrollar?',
                        'type' => 'select',
                        'required' => true,
                        'options' => ['Plataforma LMS (Learning Management System)', 'Contenido educativo digital', 'Herramientas de evaluación', 'Sistema de gamificación', 'Realidad virtual/aumentada', 'Tutoría inteligente', 'Plataforma de colaboración'],
                    ],
                    [
                        'text' => '¿Para qué nivel educativo está dirigida la solución?',
                        'type' => 'checkbox',
                        'required' => true,
                        'options' => ['Preescolar', 'Primaria', 'Secundaria', 'Universidad', 'Educación continua', 'Capacitación empresarial', 'Educación especial', 'Educación técnica'],
                    ],
                    [
                        'text' => '¿Necesita integración con sistemas educativos existentes?',
                        'type' => 'radio',
                        'required' => true,
                        'options' => ['Sí, con sistemas institucionales', 'Sí, con plataformas existentes', 'No, solución independiente', 'No estoy seguro'],
                    ],
                    [
                        'text' => '¿Qué funcionalidades educativas son prioritarias?',
                        'type' => 'checkbox',
                        'required' => false,
                        'options' => ['Gestión de cursos', 'Sistema de evaluaciones', 'Seguimiento de progreso', 'Contenido multimedia', 'Foros de discusión', 'Certificaciones', 'Analytics educativos', 'Accesibilidad'],
                    ],
                    [
                        'text' => '¿Cuál es el modelo de implementación preferido?',
                        'type' => 'select',
                        'required' => true,
                        'options' => ['SaaS (Software as a Service)', 'Instalación local', 'Híbrido (cloud + local)', 'Aplicación móvil', 'No estoy seguro'],
                    ],
                    [
                        'text' => '¿Qué desafíos educativos específicos busca resolver?',
                        'type' => 'textarea',
                        'required' => true,
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
