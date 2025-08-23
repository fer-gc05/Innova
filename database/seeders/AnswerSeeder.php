<?php

namespace Database\Seeders;

use App\Models\Answer;
use App\Models\Challenge;
use App\Models\Form;
use Illuminate\Database\Seeder;

class AnswerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtener todos los retos existentes
        $challenges = Challenge::with(['category'])->get();

        foreach ($challenges as $challenge) {
            // Buscar el formulario correspondiente a la categoría del reto
            $form = Form::where('category_id', $challenge->category_id)->first();

            if ($form && $form->questions) {
                // Crear respuestas de ejemplo basadas en las preguntas del formulario
                $answers = [];

                foreach ($form->questions as $question) {
                    switch ($question['type']) {
                        case 'text':
                            $answers[$question['text']] = 'Respuesta de ejemplo para: ' . $question['text'];
                            break;

                        case 'textarea':
                            $answers[$question['text']] = 'Esta es una respuesta detallada de ejemplo para la pregunta: ' . $question['text'] . '. Incluye información relevante sobre el proyecto y los objetivos del reto.';
                            break;

                        case 'select':
                            if (isset($question['options']) && count($question['options']) > 0) {
                                $answers[$question['text']] = $question['options'][array_rand($question['options'])];
                            }
                            break;

                        case 'radio':
                            if (isset($question['options']) && count($question['options']) > 0) {
                                $answers[$question['text']] = $question['options'][array_rand($question['options'])];
                            }
                            break;

                        case 'checkbox':
                            if (isset($question['options']) && count($question['options']) > 0) {
                                // Seleccionar 1-3 opciones aleatorias
                                $numOptions = min(rand(1, 3), count($question['options']));
                                $selectedOptions = array_rand($question['options'], $numOptions);
                                if (!is_array($selectedOptions)) {
                                    $selectedOptions = [$selectedOptions];
                                }
                                $answers[$question['text']] = array_map(function($index) use ($question) {
                                    return $question['options'][$index];
                                }, $selectedOptions);
                            }
                            break;

                        default:
                            $answers[$question['text']] = 'Respuesta por defecto';
                            break;
                    }
                }

                // Crear la respuesta en la base de datos
                Answer::create([
                    'form_id' => $form->id,
                    'company_id' => $challenge->company_id,
                    'challenge_id' => $challenge->id,
                    'answers' => $answers,
                ]);
            }
        }

        $this->command->info('Respuestas de formularios creadas exitosamente para todos los retos.');
    }
}
