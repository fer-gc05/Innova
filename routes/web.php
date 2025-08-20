<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/empresas', function () {
    return Inertia::render('empresas');
})->name('empresas');

Route::get('/cluster-turistico', function () {
    return Inertia::render('cluster-turistico');
})->name('cluster-turistico');

Route::get('/casos-negocio', function () {
    return Inertia::render('casos-negocio');
})->name('casos-negocio');

Route::get('/retos-actuales', function () {
    return Inertia::render('retos-actuales');
})->name('retos-actuales');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
