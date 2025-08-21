<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Challenge; // Tu modelo que contiene la info

class PdfController extends Controller
{
    public function generatePDF($id)
    {
        // Obtener el registro desde la BD
        $challenge = Challenge::findOrFail($id);

        // Cargar la vista con los datos
        $pdf = Pdf::loadView('pdf.challenge', compact('challenge'));


        // Retornar descarga directa
        return $pdf->download('ficha-tecnica.pdf');
    }
}

