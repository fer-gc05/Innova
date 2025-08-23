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
        $draftChallenges = $challenges->where('publication_status', 'draft');
        $publishedChallenges = $challenges->where('publication_status', 'published');
        $activeChallenges = $challenges->where('activity_status', 'active');
        $completedChallenges = $challenges->where('activity_status', 'completed');
        $inactiveChallenges = $challenges->where('activity_status', 'inactive');

        return Inertia::render('businessman/challenges/index', [
            'challenges' => [
                'all' => $challenges,
                'draft' => $draftChallenges,
                'published' => $publishedChallenges,
                'active' => $activeChallenges,
                'completed' => $completedChallenges,
                'inactive' => $inactiveChallenges,
            ],
            'stats' => [
                'total' => $challenges->count(),
                'draft' => $draftChallenges->count(),
                'published' => $publishedChallenges->count(),
                'active' => $activeChallenges->count(),
                'completed' => $completedChallenges->count(),
                'inactive' => $inactiveChallenges->count(),
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
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();
        $company = $user->company;

        if (!$company) {
            return redirect()->route('businessman.panel')
                ->with('error', 'No tienes una empresa registrada.');
        }

        return Inertia::render('businessman/challenges/create', [
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
        try {
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
            'requirements.*nullable.*array',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'category_id' => 'required|exists:categories,id',
            'link_video' => 'nullable|url',
            'acquisition_type' => 'required|in:license,purchase',
            'acquisition_details' => 'nullable|string|max:2000',
            'acquisition_terms' => 'nullable|string|max:2000',
            'reward_amount' => 'nullable|numeric|min:0|max:99999999.99',
            'reward_currency' => 'nullable|string|max:3',
            'reward_description' => 'nullable|string',
            'reward_delivery_type' => 'required|in:prototype,final_software',
            'reward_delivery_details' => 'nullable|string|max:2000',
            'category_questions' => 'nullable|array',
        ]);

        \Log::info('Datos validados:', $validated);

        // Crear el reto
        $challenge = Challenge::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'objective' => $validated['objective'],
            'difficulty' => $validated['difficulty'],
            'requirements' => $validated['requirements'] ?? [],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'category_id' => $validated['category_id'],
            'link_video' => $validated['link_video'],
            'acquisition_type' => $validated['acquisition_type'],
            'acquisition_details' => $validated['acquisition_details'],
            'acquisition_terms' => $validated['acquisition_terms'],
            'reward_amount' => $validated['reward_amount'],
            'reward_currency' => $validated['reward_currency'],
            'reward_description' => $validated['reward_description'],
            'reward_delivery_type' => $validated['reward_delivery_type'],
            'reward_delivery_details' => $validated['reward_delivery_details'],
            'company_id' => $company->id,
            'publication_status' => 'draft', // Por defecto en borrador
            'activity_status' => 'active', // Por defecto activo
        ]);

        // Guardar las respuestas del formulario único en la tabla answers
        $categoryQuestions = $validated['category_questions'] ?? [];
        if (!empty($categoryQuestions)) {
            // Obtener el formulario de la categoría
            $form = \App\Models\Form::where('category_id', $validated['category_id'])->first();

            if ($form) {
                \App\Models\Answer::create([
                    'form_id' => $form->id,
                    'company_id' => $company->id,
                    'challenge_id' => $challenge->id,
                    'answers' => $categoryQuestions,
                ]);
            }
        }

        return redirect()->route('businessman.challenges.index')
            ->with('success', 'Reto creado exitosamente en estado borrador. Un administrador lo revisará y lo publicará.');
        } catch (\Exception $e) {
            \Log::error('Error al crear reto:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'data' => $request->all()
            ]);

            $errorMessage = 'Error al crear el reto. ';

            if (str_contains($e->getMessage(), 'reward_amount')) {
                $errorMessage .= 'El monto de la recompensa es demasiado alto. El valor máximo permitido es 99,999,999.99.';
            } else {
                $errorMessage .= $e->getMessage();
            }

            return back()->withErrors(['error' => $errorMessage]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Challenge $challenge)
    {
        try {
            $user = Auth::user();
            $company = $user->company;

            \Log::info('Accediendo a reto:', [
                'challenge_id' => $challenge->id,
                'challenge_name' => $challenge->name,
                'user_id' => $user->id,
                'user_name' => $user->name,
                'company_id' => $company ? $company->id : null,
                'challenge_company_id' => $challenge->company_id
            ]);

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
                'activeParticipants' => 0, // Por ahora, no hay estado específico
                'completedParticipants' => 0, // Por ahora, no hay estado específico
                'pendingParticipants' => 0, // Por ahora, no hay estado específico
            ];

            \Log::info('Datos del reto cargados:', [
                'challenge' => $challenge->toArray(),
                'stats' => $stats,
                'participants_count' => $challenge->students->count()
            ]);

            return Inertia::render('businessman/challenges/show', [
                'challenge' => $challenge,
                'stats' => $stats,
                'participants' => $challenge->students->map(function($student) {
                    return [
                        'id' => $student->id,
                        'name' => $student->user->name,
                        'email' => $student->user->email,
                        'status' => 'active', // Por defecto
                        'registered_at' => $student->created_at,
                    ];
                })
            ]);
        } catch (\Exception $e) {
            \Log::error('Error al mostrar reto:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'challenge_id' => $challenge->id ?? null
            ]);

            return back()->withErrors(['error' => 'Error al cargar el reto.']);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Challenge $challenge)
    {
        try {
            $user = Auth::user();
            $company = $user->company;

            if (!$company || $challenge->company_id !== $company->id) {
                abort(403, 'No tienes permisos para editar este reto.');
            }

            $challenge->load('category');

            // Cargar las respuestas del formulario específico si existen
            $categoryAnswers = null;
            if ($challenge->category) {
                $answer = \App\Models\Answer::where('challenge_id', $challenge->id)->first();
                if ($answer) {
                    $categoryAnswers = $answer->answers;
                }
            }

            return Inertia::render('businessman/challenges/edit', [
                'challenge' => $challenge,
                'categoryAnswers' => $categoryAnswers,
                'categories' => \App\Models\Category::orderBy('name')->get(),
                'forms' => \App\Models\Form::with('category')->get(),
                'difficulties' => [
                    ['value' => 'easy', 'label' => 'Fácil'],
                    ['value' => 'medium', 'label' => 'Medio'],
                    ['value' => 'hard', 'label' => 'Difícil'],
                ]
            ]);
        } catch (\Exception $e) {
            \Log::error('Error al cargar formulario de edición:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()->withErrors(['error' => 'Error al cargar el formulario de edición.']);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Challenge $challenge)
    {
        try {
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
            'requirements.*nullable.*array',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'category_id' => 'required|exists:categories,id',
            'link_video' => 'nullable|url',
            'reward_amount' => 'nullable|numeric|min:0|max:99999999.99',
            'reward_currency' => 'nullable|string|max:3',
            'reward_description' => 'nullable|string',
            'reward_type' => 'nullable|in:fixed,variable,percentage',
            'category_questions' => 'nullable|array',
        ]);

        // Actualizar el reto
        $challenge->update([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'objective' => $validated['objective'],
            'difficulty' => $validated['difficulty'],
            'requirements' => $validated['requirements'] ?? [],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'category_id' => $validated['category_id'],
            'link_video' => $validated['link_video'],
            'reward_amount' => $validated['reward_amount'],
            'reward_currency' => $validated['reward_currency'],
            'reward_description' => $validated['reward_description'],
            'reward_type' => $validated['reward_type'],
        ]);

        // Manejar las respuestas del formulario único
        $categoryQuestions = $validated['category_questions'] ?? [];

        // Verificar si cambió la categoría
        $categoryChanged = $challenge->category_id != $validated['category_id'];

        if ($categoryChanged) {
            // Si cambió la categoría, eliminar todas las respuestas anteriores de este reto
            \App\Models\Answer::where('challenge_id', $challenge->id)->delete();
        }

        // Guardar las nuevas respuestas si existen
        if (!empty($categoryQuestions)) {
            $form = \App\Models\Form::where('category_id', $validated['category_id'])->first();

            if ($form) {
                // Eliminar respuestas anteriores de este reto si existen
                \App\Models\Answer::where('challenge_id', $challenge->id)->delete();

                // Crear nueva respuesta
                \App\Models\Answer::create([
                    'form_id' => $form->id,
                    'company_id' => $company->id,
                    'challenge_id' => $challenge->id,
                    'answers' => $categoryQuestions,
                ]);
            }
        }

        return redirect()->route('businessman.challenges.index')
            ->with('success', 'Reto actualizado exitosamente.');
        } catch (\Exception $e) {
            \Log::error('Error al actualizar reto:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'data' => $request->all()
            ]);

            $errorMessage = 'Error al actualizar el reto. ';

            if (str_contains($e->getMessage(), 'reward_amount')) {
                $errorMessage .= 'El monto de la recompensa es demasiado alto. El valor máximo permitido es 99,999,999.99.';
            } else {
                $errorMessage .= $e->getMessage();
            }

            return back()->withErrors(['error' => $errorMessage]);
        }
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
