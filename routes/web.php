<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Settings\AccountController;

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
            return Inertia::render('businessman/panel');
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
