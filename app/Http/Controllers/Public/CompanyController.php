<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    /**
     * Mostrar el listado público de empresas
     */
    public function index()
    {
        $companies = Company::with(['images' => function ($query) {
            $query->active()->ordered();
        }])
        ->orderBy('name')
        ->get();

        return Inertia::render('public/empresas/index', [
            'companies' => $companies
        ]);
    }

    /**
     * Mostrar el detalle de una empresa específica
     */
    public function show(Company $company)
    {
        $company->load(['images' => function ($query) {
            $query->active()->ordered();
        }, 'challenges']);

        return Inertia::render('public/empresas/show', [
            'company' => $company
        ]);
    }
}
