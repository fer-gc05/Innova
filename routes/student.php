<?php

use App\Http\Controllers\Student\ChallengeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Student Routes
|--------------------------------------------------------------------------
|
| Rutas específicas para estudiantes autenticados
|
*/

// Ruta de prueba simple
Route::post('/test-route', function () {
    return response()->json(['message' => 'Test route works!', 'timestamp' => now()]);
})->name('test.route');

// Rutas temporales para debug (sin middleware de roles)
Route::middleware(['auth'])->prefix('student')->name('student.')->group(function () {

    // Rutas para retos
    Route::prefix('challenges')->name('challenges.')->group(function () {
        // Proceso de inscripción paso a paso
        Route::get('/{challenge}/register/step1', [ChallengeController::class, 'showRegistrationStep1'])->name('register.step1');
        Route::get('/{challenge}/register/step2', [ChallengeController::class, 'showRegistrationStep2'])->name('register.step2');
        Route::get('/{challenge}/register/step3', [ChallengeController::class, 'showRegistrationStep3'])->name('register.step3');
        Route::post('/{challenge}/register/step1', [ChallengeController::class, 'processStep1'])->name('register.step1.process');
        Route::post('/{challenge}/register/step2', [ChallengeController::class, 'processStep2'])->name('register.step2.process');
        Route::post('/{challenge}/register/step3', [ChallengeController::class, 'processStep3'])->name('register.step3.process');

        // Rutas existentes
        Route::post('/{challenge}/join', [ChallengeController::class, 'join'])->name('join');
        Route::delete('/{challenge}/leave', [ChallengeController::class, 'leave'])->name('leave');
        Route::post('/{challenge}/verify-group-code', [ChallengeController::class, 'verifyGroupCode'])->name('verify-group-code');

        // Nuevas rutas para gestión de inscripciones
        Route::get('/{challenge}/submissions', [ChallengeController::class, 'showSubmissions'])->name('submissions');
        Route::get('/{challenge}/submission/edit', [ChallengeController::class, 'editSubmission'])->name('submission.edit');
        Route::put('/{challenge}/submission/update', [ChallengeController::class, 'updateSubmission'])->name('submission.update');
    });

});
