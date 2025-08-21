<?php

namespace App\Http\Controllers\Businessman;

use App\Http\Controllers\Controller;
use App\Models\Challenge;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChallengeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $company = $user->company;

        if (!$company) {
            return redirect()->route('businessman.panel')
                ->with('error', 'No tienes una empresa registrada.');
        }

        $challenges = Challenge::where('company_id', $company->id)
            ->with(['category', 'students.user'])
            ->orderBy('created_at', 'desc')
            ->get();

        // Agrupar por estado
        $activeChallenges = $challenges->where('status', 'active');
        $pendingChallenges = $challenges->where('status', 'pending');
        $completedChallenges = $challenges->where('status', 'completed');

        return Inertia::render('businessman/challenges/index', [
            'challenges' => [
                'all' => $challenges,
                'active' => $activeChallenges,
                'pending' => $pendingChallenges,
                'completed' => $completedChallenges,
            ],
            'stats' => [
                'total' => $challenges->count(),
                'active' => $activeChallenges->count(),
                'pending' => $pendingChallenges->count(),
                'completed' => $completedChallenges->count(),
                'totalParticipants' => $challenges->sum(function($challenge) {
                    return $challenge->students->count();
                }),
            ],
            'categories' => \App\Models\Category::orderBy('name')->get(),
            'forms' => \App\Models\Form::with('category')->get(),
            'difficulties' => [
                ['value' => 'easy', 'label' => 'Fácil'],
                ['value' => 'medium', 'label' => 'Medio'],
                ['value' => 'hard', 'label' => 'Difícil'],
            ]
        ]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $company = $user->company;

        if (!$company) {
            return back()->withErrors(['error' => 'No tienes una empresa registrada.']);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'objective' => 'required|string|max:500',
            'difficulty' => 'required|in:easy,medium,hard',
            'requirements' => 'required|array',
            'start_date' => 'required|date|after:today',
            'end_date' => 'required|date|after:start_date',
            'category_id' => 'required|exists:categories,id',
            'link_video' => 'nullable|url',
            'reward_amount' => 'nullable|numeric|min:0',
            'reward_currency' => 'nullable|string|max:3',
            'reward_description' => 'nullable|string',
            'reward_type' => 'nullable|in:fixed,variable,percentage',
            'category_questions' => 'nullable|array',
        ]);

        // Obtener las preguntas específicas de la categoría
        $categoryQuestions = $validated['category_questions'] ?? [];

        // Agregar las respuestas de las preguntas específicas a los requisitos
        $requirements = $validated['requirements'] ?? [];
        if (!empty($categoryQuestions)) {
            $requirements[] = 'Información específica de la categoría:';
            foreach ($categoryQuestions as $question => $answer) {
                if (!empty($answer)) {
                    if (is_array($answer)) {
                        $requirements[] = "- {$question}: " . implode(', ', $answer);
                    } else {
                        $requirements[] = "- {$question}: {$answer}";
                    }
                }
            }
        }

        $challenge = Challenge::create([
            ...$validated,
            'requirements' => $requirements,
            'company_id' => $company->id,
            'status' => 'pending', // Por defecto pendiente de aprobación
        ]);

        return redirect()->route('businessman.challenges.index')
            ->with('success', 'Reto creado exitosamente. Está pendiente de aprobación.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Challenge $challenge)
    {
        $user = Auth::user();
        $company = $user->company;

        if (!$company || $challenge->company_id !== $company->id) {
            abort(403, 'No tienes permisos para ver este reto.');
        }

        $challenge->load([
            'category',
            'students.user',
            'students' => function($query) {
                $query->orderBy('created_at', 'desc');
            }
        ]);

        // Estadísticas del reto
        $stats = [
            'totalParticipants' => $challenge->students->count(),
            'activeParticipants' => $challenge->students->where('status', 'active')->count(),
            'completedParticipants' => $challenge->students->where('status', 'completed')->count(),
            'pendingParticipants' => $challenge->students->where('status', 'pending')->count(),
        ];

        return Inertia::render('businessman/challenges/show', [
            'challenge' => $challenge,
            'stats' => $stats,
            'participants' => $challenge->students->map(function($student) {
                return [
                    'id' => $student->id,
                    'name' => $student->user->name,
                    'email' => $student->user->email,
                    'status' => $student->pivot->status,
                    'registered_at' => $student->pivot->created_at,
                ];
            })
        ]);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Challenge $challenge)
    {
        $user = Auth::user();
        $company = $user->company;

        if (!$company || $challenge->company_id !== $company->id) {
            abort(403, 'No tienes permisos para editar este reto.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'objective' => 'required|string|max:500',
            'difficulty' => 'required|in:easy,medium,hard',
            'requirements' => 'required|array',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'category_id' => 'required|exists:categories,id',
            'link_video' => 'nullable|url',
            'reward_amount' => 'nullable|numeric|min:0',
            'reward_currency' => 'nullable|string|max:3',
            'reward_description' => 'nullable|string',
            'reward_type' => 'nullable|in:fixed,variable,percentage',
            'category_questions' => 'nullable|array',
        ]);

        // Obtener las preguntas específicas de la categoría
        $categoryQuestions = $validated['category_questions'] ?? [];

        // Agregar las respuestas de las preguntas específicas a los requisitos
        $requirements = $validated['requirements'] ?? [];
        if (!empty($categoryQuestions)) {
            $requirements[] = 'Información específica de la categoría:';
            foreach ($categoryQuestions as $question => $answer) {
                if (!empty($answer)) {
                    if (is_array($answer)) {
                        $requirements[] = "- {$question}: " . implode(', ', $answer);
                    } else {
                        $requirements[] = "- {$question}: {$answer}";
                    }
                }
            }
        }

        $challenge->update([
            ...$validated,
            'requirements' => $requirements,
        ]);

        return redirect()->route('businessman.challenges.index')
            ->with('success', 'Reto actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Challenge $challenge)
    {
        $user = Auth::user();
        $company = $user->company;

        if (!$company || $challenge->company_id !== $company->id) {
            abort(403, 'No tienes permisos para eliminar este reto.');
        }

        // Solo permitir eliminar retos que no tengan participantes
        if ($challenge->students->count() > 0) {
            return back()->withErrors(['error' => 'No se puede eliminar un reto que tiene participantes.']);
        }

        $challenge->delete();

        return redirect()->route('businessman.challenges.index')
            ->with('success', 'Reto eliminado exitosamente.');
    }

    /**
     * Obtener estadísticas de participantes por reto
     */
    public function participants(Challenge $challenge)
    {
        $user = Auth::user();
        $company = $user->company;

        if (!$company || $challenge->company_id !== $company->id) {
            abort(403, 'No tienes permisos para ver este reto.');
        }

        $participants = $challenge->students()
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function($student) {
                return [
                    'id' => $student->id,
                    'name' => $student->user->name,
                    'email' => $student->user->email,
                    'status' => $student->pivot->status,
                    'registered_at' => $student->pivot->created_at,
                    'updated_at' => $student->pivot->updated_at,
                ];
            });

        return response()->json([
            'challenge' => $challenge->load('category'),
            'participants' => $participants,
            'stats' => [
                'total' => $participants->count(),
                'active' => $participants->where('status', 'active')->count(),
                'completed' => $participants->where('status', 'completed')->count(),
                'pending' => $participants->where('status', 'pending')->count(),
            ]
        ]);
    }

    /**
     * Get questions for a specific category
     */
    public function getCategoryQuestions(Request $request)
    {
        $categoryId = $request->input('category_id');

        $form = \App\Models\Form::where('category_id', $categoryId)->first();

        if ($form) {
            return response()->json([
                'questions' => $form->questions
            ]);
        }

        return response()->json([
            'questions' => []
        ]);
    }
}
