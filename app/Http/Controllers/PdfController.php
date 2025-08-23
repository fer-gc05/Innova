<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Challenge; // Tu modelo que contiene la info

class PdfController extends Controller
{
    public function generatePDF($id)
    {
        // Obtener el registro desde la BD con las relaciones necesarias
        $challenge = Challenge::with(['category', 'company', 'formAnswers.form'])->findOrFail($id);

        // Obtener las respuestas del formulario específico de este reto
        $formAnswers = null;
        $formQuestions = null;
        
        if ($challenge->formAnswers) {
            $formAnswers = $challenge->formAnswers->answers;
            $formQuestions = $challenge->formAnswers->form->questions ?? [];
        }

        // Cargar la vista con los datos
        $pdf = Pdf::loadView('pdf.challenge', compact('challenge', 'formAnswers', 'formQuestions'));

        // Retornar descarga directa
        return $pdf->download('ficha-tecnica.pdf');
    }
}

