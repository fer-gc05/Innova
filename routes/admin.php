<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\FormController;
use App\Http\Controllers\Admin\ChallengeController;
use App\Http\Controllers\Admin\AnswerController;
use Inertia\Inertia;

// Panel administrativo - requiere rol de admin
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {

    // Dashboard principal
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Página de prueba
    Route::get('/test', function () {
        return Inertia::render('admin/dashboard/test');
    })->name('test');

    // Gestión de usuarios
    Route::resource('users', UserController::class);

    // Gestión de categorías
    Route::resource('categories', CategoryController::class);

    // Gestión de formularios
    Route::resource('forms', FormController::class);

    // Gestión de retos
    Route::resource('challenges', ChallengeController::class);
    Route::get('challenges/{challenge}/participants', [ChallengeController::class, 'participants'])
        ->name('challenges.participants');

    // Gestión de respuestas
    Route::resource('answers', AnswerController::class)->except(['create', 'store', 'edit', 'update']);
    Route::get('forms/{form}/answers/export', [AnswerController::class, 'export'])
        ->name('answers.export');

});
