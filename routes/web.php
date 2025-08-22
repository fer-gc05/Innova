<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Settings\AccountController;
use App\Http\Controllers\PdfController;
//ruta de la plantilla del pdf
Route::get('/pdf/{id}', [PdfController::class, 'generatePDF']);

// Rutas públicas
require __DIR__.'/public.php';

// Rutas de autenticación
require __DIR__.'/auth.php';

// Rutas protegidas por autenticación
Route::middleware(['auth', 'verified'])->group(function () {
    // Panel de administrador
    Route::middleware(['role:admin'])->prefix('admin')->group(function () {
        Route::get('/panel', function () {
            return redirect()->route('admin.dashboard');
        })->name('admin.panel');
    });

    // Panel de empresario
    Route::middleware(['role:businessman'])->prefix('businessman')->group(function () {
        Route::get('/panel', function () {
            $user = auth()->user();
            $company = $user->company;

            if (!$company) {
                return redirect()->route('businessman.challenges.index')
                    ->with('error', 'No tienes una empresa registrada.');
            }

            $challenges = \App\Models\Challenge::where('company_id', $company->id)
                ->with(['category', 'students'])
                ->orderBy('created_at', 'desc')
                ->get();

            $stats = [
                'total' => $challenges->count(),
                'draft' => $challenges->where('publication_status', 'draft')->count(),
                'published' => $challenges->where('publication_status', 'published')->count(),
                'active' => $challenges->where('activity_status', 'active')->count(),
                'completed' => $challenges->where('activity_status', 'completed')->count(),
                'inactive' => $challenges->where('activity_status', 'inactive')->count(),
                'totalParticipants' => $challenges->sum(function($challenge) {
                    return $challenge->students->count();
                }),
            ];

            $recentChallenges = $challenges->take(3)->map(function($challenge) {
                return [
                    'id' => $challenge->id,
                    'name' => $challenge->name,
                    'description' => $challenge->description,
                    'publication_status' => $challenge->publication_status,
                    'activity_status' => $challenge->activity_status,
                    'students_count' => $challenge->students->count(),
                    'end_date' => $challenge->end_date,
                ];
            });

            return Inertia::render('businessman/panel', [
                'stats' => $stats,
                'recentChallenges' => $recentChallenges,
            ]);
        })->name('businessman.panel');
    });

    // Perfil de usuario (Mi Cuenta)
    Route::get('/mi-cuenta', [AccountController::class, 'show'])->name('mi-cuenta');


    // Configuraciones
    require __DIR__.'/settings.php';
});

// Rutas administrativas
require __DIR__.'/admin.php';

// Rutas del panel de empresarios
require __DIR__.'/businessman.php';

// Rutas de estudiantes
require __DIR__.'/student.php';
