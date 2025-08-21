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
        Route::post('/{challenge}/join', [ChallengeController::class, 'join'])->name('join');
        Route::delete('/{challenge}/leave', [ChallengeController::class, 'leave'])->name('leave');
        Route::post('/{challenge}/verify-group-code', [ChallengeController::class, 'verifyGroupCode'])->name('verify-group-code');
    });
    
});
