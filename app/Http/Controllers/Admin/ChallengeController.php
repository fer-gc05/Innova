<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Challenge;
use App\Models\Category;
use App\Models\Company;
use App\Models\Form;
use App\Models\Answer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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

        if ($request->filled('publication_status')) {
            $query->where('publication_status', $request->publication_status);
        }

        if ($request->filled('activity_status')) {
            $query->where('activity_status', $request->activity_status);
        }

        if ($request->filled('difficulty')) {
            $query->where('difficulty', $request->difficulty);
        }

        $challenges = $query->orderBy('created_at', 'desc')
            ->paginate(15)
            ->withQueryString();

        $categories = Category::all();
        $companies = Company::all();
        $publicationStatuses = ['draft', 'published'];
        $activityStatuses = ['active', 'completed', 'inactive'];
        // Align with DB enum('easy','medium','hard')
        $difficulties = [
            ['value' => 'easy', 'label' => 'Fácil'],
            ['value' => 'medium', 'label' => 'Medio'],
            ['value' => 'hard', 'label' => 'Difícil'],
        ];

        return Inertia::render('admin/challenges/index', [
            'challenges' => $challenges,
            'categories' => $categories,
            'companies' => $companies,
            'publicationStatuses' => $publicationStatuses,
            'activityStatuses' => $activityStatuses,
            'difficulties' => $difficulties,
            'filters' => $request->only(['search', 'category_id', 'publication_status', 'activity_status', 'difficulty']),
        ]);
    }

    /**
     * Show the form for creating a new challenge
     */
    public function create()
    {
        $categories = Category::all();
        $companies = Company::all();
        $forms = Form::with('category')->get();

        $publicationStatuses = ['draft', 'published'];
        $activityStatuses = ['active', 'completed', 'inactive'];
        $difficulties = [
            ['value' => 'easy', 'label' => 'Fácil'],
            ['value' => 'medium', 'label' => 'Medio'],
            ['value' => 'hard', 'label' => 'Difícil'],
        ];

        return Inertia::render('admin/challenges/create', [
            'categories' => $categories,
            'companies' => $companies,
            'forms' => $forms,
            'publicationStatuses' => $publicationStatuses,
            'activityStatuses' => $activityStatuses,
            'difficulties' => $difficulties,
        ]);
    }

    /**
     * Store a newly created challenge
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string|max:1000',
                'objective' => 'required|string|max:500',
                'difficulty' => 'required|in:easy,medium,hard',
                'requirements' => 'nullable|array',
                'publication_status' => 'required|in:draft,published',
                'activity_status' => 'required|in:active,completed,inactive',
                'start_date' => 'required|date',
                'end_date' => 'required|date|after:start_date',
                'category_id' => 'required|exists:categories,id',
                'company_id' => 'required|exists:companies,id',
                'link_video' => 'nullable|url',
                'video_file' => 'nullable|file|mimes:mp4,avi,mov,wmv|max:102400', // 100MB máximo
                'acquisition_type' => 'nullable|in:license,purchase',
                'acquisition_details' => 'nullable|string|max:2000',
                'acquisition_terms' => 'nullable|string|max:2000',
                'reward_amount' => 'nullable|numeric|min:0|max:99999999.99',
                'reward_currency' => 'nullable|string|max:3',
                'reward_description' => 'nullable|string',
                'reward_delivery_type' => 'nullable|in:prototype,final_software',
                'reward_delivery_details' => 'nullable|string|max:2000',
                'category_questions' => 'nullable|array',
            ]);

            // Validación personalizada: no permitir URL y archivo al mismo tiempo
            if ($request->filled('link_video') && $request->hasFile('video_file')) {
                return back()->withErrors(['video_error' => 'No puedes usar una URL y subir un archivo al mismo tiempo. Selecciona solo una opción.']);
            }

            \Log::info('Datos validados:', $validated);

            // Manejar el archivo de video si se subió
            $videoId = null;
            if ($request->hasFile('video_file')) {
                $videoFile = $request->file('video_file');
                $videoName = time() . '_' . $videoFile->getClientOriginalName();
                $videoPath = $videoFile->storeAs('videos/challenges', $videoName, 'public');
                $videoId = $videoPath;
            }

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
                'link_video' => $validated['link_video'] ?? null,
                'video_id' => $videoId,
                'acquisition_type' => $validated['acquisition_type'] ?? 'license',
                'acquisition_details' => $validated['acquisition_details'] ?? null,
                'acquisition_terms' => $validated['acquisition_terms'] ?? null,
                'reward_amount' => $validated['reward_amount'] ?? null,
                'reward_currency' => $validated['reward_currency'] ?? 'COP',
                'reward_description' => $validated['reward_description'] ?? null,
                'reward_delivery_type' => $validated['reward_delivery_type'] ?? 'final_software',
                'reward_delivery_details' => $validated['reward_delivery_details'] ?? null,
                'company_id' => $validated['company_id'],
                'publication_status' => $validated['publication_status'],
                'activity_status' => $validated['activity_status'],
            ]);

            // Guardar las respuestas del formulario único en la tabla answers
            $categoryQuestions = $validated['category_questions'] ?? [];
            if (!empty($categoryQuestions)) {
                // Obtener el formulario de la categoría
                $form = Form::where('category_id', $validated['category_id'])->first();

                if ($form) {
                    Answer::create([
                        'form_id' => $form->id,
                        'company_id' => $validated['company_id'],
                        'challenge_id' => $challenge->id,
                        'answers' => $categoryQuestions,
                    ]);
                }
            }

            return redirect()->route('admin.challenges.index')
                ->with('success', 'Reto creado exitosamente.');
        } catch (\Exception $e) {
            \Log::error('Error al crear reto:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'data' => $request->all()
            ]);

            return back()->withErrors(['error' => 'Error al crear el reto. Por favor, verifica los datos e intenta nuevamente.']);
        }
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
        // Cargar las relaciones necesarias
        $challenge->load(['category', 'company', 'formAnswers']);

        $categories = Category::all();
        $companies = Company::all();
        $forms = Form::with('category')->get();

        // Cargar las respuestas del formulario si existen
        $formAnswers = null;
        if ($challenge->formAnswers) {
            $formAnswers = $challenge->formAnswers->answers;
        }

        $publicationStatuses = ['draft', 'published'];
        $activityStatuses = ['active', 'completed', 'inactive'];
        $difficulties = [
            ['value' => 'easy', 'label' => 'Fácil'],
            ['value' => 'medium', 'label' => 'Medio'],
            ['value' => 'hard', 'label' => 'Difícil'],
        ];

        return Inertia::render('admin/challenges/edit', [
            'challenge' => $challenge,
            'categories' => $categories,
            'companies' => $companies,
            'forms' => $forms,
            'formAnswers' => $formAnswers,
            'publicationStatuses' => $publicationStatuses,
            'activityStatuses' => $activityStatuses,
            'difficulties' => $difficulties,
        ]);
    }

    /**
     * Update the specified challenge
     */
    public function update(Request $request, Challenge $challenge)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string|max:1000',
                'objective' => 'required|string|max:500',
                'difficulty' => 'required|in:easy,medium,hard',
                'requirements' => 'nullable|array',
                'publication_status' => 'required|in:draft,published',
                'activity_status' => 'required|in:active,completed,inactive',
                'start_date' => 'required|date',
                'end_date' => 'required|date|after:start_date',
                'category_id' => 'required|exists:categories,id',
                'company_id' => 'required|exists:companies,id',
                'link_video' => 'nullable|url',
                'acquisition_type' => 'nullable|in:license,purchase',
                'acquisition_details' => 'nullable|string|max:2000',
                'acquisition_terms' => 'nullable|string|max:2000',
                'reward_amount' => 'nullable|numeric|min:0|max:99999999.99',
                'reward_currency' => 'nullable|string|max:3',
                'reward_description' => 'nullable|string',
                'reward_delivery_type' => 'nullable|in:prototype,final_software',
                'reward_delivery_details' => 'nullable|string|max:2000',
                'category_questions' => 'nullable|array',
            ]);

            // Validación personalizada: no permitir URL y archivo al mismo tiempo
            if ($request->filled('link_video') && $request->hasFile('video_file')) {
                return back()->withErrors(['video_error' => 'No puedes usar una URL y subir un archivo al mismo tiempo. Selecciona solo una opción.']);
            }

            // Manejar el archivo de video si se subió
            $videoId = $challenge->video_id; // Mantener el video existente por defecto
            if ($request->hasFile('video_file')) {
                // Eliminar el video anterior si existe
                if ($challenge->video_id && Storage::disk('public')->exists($challenge->video_id)) {
                    Storage::disk('public')->delete($challenge->video_id);
                }

                $videoFile = $request->file('video_file');
                $videoName = time() . '_' . $videoFile->getClientOriginalName();
                $videoPath = $videoFile->storeAs('videos/challenges', $videoName, 'public');
                $videoId = $videoPath;
            } elseif ($request->filled('link_video')) {
                // Si se está usando URL, eliminar el video anterior si existe
                if ($challenge->video_id && Storage::disk('public')->exists($challenge->video_id)) {
                    Storage::disk('public')->delete($challenge->video_id);
                }
                $videoId = null;
            }

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
                'link_video' => $validated['link_video'] ?? null,
                'video_id' => $videoId,
                'acquisition_type' => $validated['acquisition_type'] ?? $challenge->acquisition_type ?? 'license',
                'acquisition_details' => $validated['acquisition_details'] ?? null,
                'acquisition_terms' => $validated['acquisition_terms'] ?? null,
                'reward_amount' => $validated['reward_amount'] ?? null,
                'reward_currency' => $validated['reward_currency'] ?? $challenge->reward_currency ?? 'COP',
                'reward_description' => $validated['reward_description'] ?? null,
                'reward_delivery_type' => $validated['reward_delivery_type'] ?? $challenge->reward_delivery_type ?? 'final_software',
                'reward_delivery_details' => $validated['reward_delivery_details'] ?? null,
                'company_id' => $validated['company_id'],
                'publication_status' => $validated['publication_status'],
                'activity_status' => $validated['activity_status'],
            ]);

            // Actualizar las respuestas del formulario único en la tabla answers
            $categoryQuestions = $validated['category_questions'] ?? [];
            if (!empty($categoryQuestions)) {
                // Obtener el formulario de la categoría
                $form = Form::where('category_id', $validated['category_id'])->first();

                if ($form) {
                    // Buscar si ya existe una respuesta para este reto
                    $existingAnswer = Answer::where('challenge_id', $challenge->id)->first();

                    if ($existingAnswer) {
                        $existingAnswer->update([
                            'form_id' => $form->id,
                            'company_id' => $validated['company_id'],
                            'answers' => $categoryQuestions,
                        ]);
                    } else {
                        Answer::create([
                            'form_id' => $form->id,
                            'company_id' => $validated['company_id'],
                            'challenge_id' => $challenge->id,
                            'answers' => $categoryQuestions,
                        ]);
                    }
                }
            }

            return redirect()->route('admin.challenges.index')
                ->with('success', 'Reto actualizado exitosamente.');
        } catch (\Exception $e) {
            \Log::error('Error al actualizar reto:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'data' => $request->all()
            ]);

            return back()->withErrors(['error' => 'Error al actualizar el reto. Por favor, verifica los datos e intenta nuevamente.']);
        }
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
