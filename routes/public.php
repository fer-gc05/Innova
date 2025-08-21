<?php

use App\Http\Controllers\Public\CompanyController;
use App\Http\Controllers\Public\ChallengeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Rutas públicas
Route::get('/', function () {
    return Inertia::render('public/welcome/index');
})->name('welcome');

Route::get('/empresas', [CompanyController::class, 'index'])->name('empresas.index');
Route::get('/empresas/{company}', [CompanyController::class, 'show'])->name('empresas.show');

Route::get('/retos-actuales', [ChallengeController::class, 'index'])->name('retos-actuales');
Route::get('/retos-actuales/{challenge}', [ChallengeController::class, 'show'])->name('retos-actuales.show');
