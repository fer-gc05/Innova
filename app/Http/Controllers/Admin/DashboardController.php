<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Company;
use App\Models\Student;
use App\Models\Category;
use App\Models\Form;
use App\Models\Challenge;
use App\Models\Answer;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Dashboard principal del administrador
     */
    public function index()
    {
        // Estadísticas generales
        $stats = [
            'users' => User::count(),
            'companies' => Company::count(),
            'students' => Student::count(),
            'categories' => Category::count(),
            'forms' => Form::count(),
            'challenges' => Challenge::count(),
            'answers' => Answer::count(),
        ];

        // Retos por estado
        $challengesByStatus = Challenge::selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();

        // Retos recientes
        $recentChallenges = Challenge::with(['category', 'company'])
            ->latest()
            ->take(5)
            ->get();

        // Usuarios recientes
        $recentUsers = User::with('roles')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('admin/dashboard/index', [
            'stats' => $stats,
            'challengesByStatus' => $challengesByStatus,
            'recentChallenges' => $recentChallenges,
            'recentUsers' => $recentUsers,
        ]);
    }
}
