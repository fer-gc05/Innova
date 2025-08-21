<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Challenge;
use App\Models\Category;
use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChallengeController extends Controller
{
    /**
     * Display a listing of challenges
     */
    public function index(Request $request)
    {
        $query = Challenge::with(['category', 'company'])
            ->withCount(['students', 'companies']);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('description', 'LIKE', "%{$search}%")
                  ->orWhere('objective', 'LIKE', "%{$search}%");
            });
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('difficulty')) {
            $query->where('difficulty', $request->difficulty);
        }

        $challenges = $query->orderBy('created_at', 'desc')
            ->paginate(15)
            ->withQueryString();

        $categories = Category::all();
        $companies = Company::all();
        $statuses = ['draft', 'active', 'completed', 'cancelled'];
        // Align with DB enum('easy','medium','hard')
        $difficulties = ['easy', 'medium', 'hard'];

        return Inertia::render('admin/challenges/index', [
            'challenges' => $challenges,
            'categories' => $categories,
            'companies' => $companies,
            'statuses' => $statuses,
            'difficulties' => $difficulties,
            'filters' => $request->only(['search', 'category_id', 'status', 'difficulty']),
        ]);
    }

    /**
     * Show the form for creating a new challenge
     */
    public function create()
    {
        $categories = Category::all();
        $companies = Company::all();

        return Inertia::render('admin/challenges/create', [
            'categories' => $categories,
            'companies' => $companies,
        ]);
    }

    /**
     * Store a newly created challenge
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'objective' => 'required|string',
            // Align with DB enum
            'difficulty' => 'required|in:easy,medium,hard',
            'requirements' => 'array',
            'status' => 'required|in:draft,active,completed,cancelled',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'link_video' => 'nullable|url',
            'video_id' => 'nullable|string',
            'reward_amount' => 'nullable|numeric|min:0',
            'reward_currency' => 'nullable|string|max:3',
            'reward_description' => 'nullable|string',
            'reward_type' => 'nullable|in:fixed,variable,percentage',
            'category_id' => 'required|exists:categories,id',
            'company_id' => 'required|exists:companies,id',
        ]);

        Challenge::create($request->all());

        return redirect()->route('admin.challenges.index')
            ->with('success', 'Reto creado exitosamente.');
    }

    /**
     * Display the specified challenge
     */
    public function show(Challenge $challenge)
    {
        $challenge->load(['category', 'company', 'students', 'companies']);

        return Inertia::render('admin/challenges/show', [
            'challenge' => $challenge,
        ]);
    }

    /**
     * Show the form for editing the specified challenge
     */
    public function edit(Challenge $challenge)
    {
        $categories = Category::all();
        $companies = Company::all();

        return Inertia::render('admin/challenges/edit', [
            'challenge' => $challenge,
            'categories' => $categories,
            'companies' => $companies,
        ]);
    }

    /**
     * Update the specified challenge
     */
    public function update(Request $request, Challenge $challenge)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'objective' => 'required|string',
            // Align with DB enum
            'difficulty' => 'required|in:easy,medium,hard',
            'requirements' => 'array',
            'status' => 'required|in:draft,active,completed,cancelled',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'link_video' => 'nullable|url',
            'video_id' => 'nullable|string',
            'reward_amount' => 'nullable|numeric|min:0',
            'reward_currency' => 'nullable|string|max:3',
            'reward_description' => 'nullable|string',
            'reward_type' => 'nullable|in:fixed,variable,percentage',
            'category_id' => 'required|exists:categories,id',
            'company_id' => 'required|exists:companies,id',
        ]);

        $challenge->update($request->all());

        return redirect()->route('admin.challenges.index')
            ->with('success', 'Reto actualizado exitosamente.');
    }

    /**
     * Remove the specified challenge
     */
    public function destroy(Challenge $challenge)
    {
        $challenge->delete();

        return redirect()->route('admin.challenges.index')
            ->with('success', 'Reto eliminado exitosamente.');
    }

    /**
     * Show challenge participants
     */
    public function participants(Challenge $challenge)
    {
        $challenge->load(['students', 'companies']);

        return Inertia::render('admin/challenges/participants', [
            'challenge' => $challenge,
        ]);
    }
}
