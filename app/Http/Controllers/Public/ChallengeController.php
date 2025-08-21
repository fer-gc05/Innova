<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Challenge;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChallengeController extends Controller
{
    public function index(Request $request)
    {
        $query = Challenge::with(['category', 'company'])
            ->where('status', 'active')
            ->orderBy('created_at', 'desc');

        // Filtros
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('difficulty')) {
            $query->where('difficulty', $request->difficulty);
        }

        $challenges = $query->get();
        $categories = Category::all();

        return Inertia::render('public/retos-actuales/index', [
            'challenges' => $challenges,
            'categories' => $categories,
            'filters' => $request->only(['category_id', 'difficulty']),
        ]);
    }

    public function show(Challenge $challenge)
    {
        $challenge->load(['category', 'company']);

        return Inertia::render('public/retos-actuales/show', [
            'challenge' => $challenge,
        ]);
    }
}
