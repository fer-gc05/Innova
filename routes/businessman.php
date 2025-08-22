<?php

use App\Http\Controllers\Businessman\ChallengeController;
use App\Http\Controllers\Businessman\CompanyImageController;
use Illuminate\Support\Facades\Route;

// Rutas del panel de empresarios
Route::middleware(['auth', 'verified', 'role:businessman'])->prefix('businessman')->name('businessman.')->group(function () {

    // Gestión de retos
    Route::get('challenges/category-questions', [ChallengeController::class, 'getCategoryQuestions'])
        ->name('challenges.category-questions');
    Route::resource('challenges', ChallengeController::class);
    Route::get('challenges/{challenge}/participants', [ChallengeController::class, 'participants'])
        ->name('challenges.participants');

    // Gestión de imágenes de empresa
    Route::resource('company-images', CompanyImageController::class);
});
