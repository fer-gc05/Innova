<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Answer;
use App\Models\Form;
use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnswerController extends Controller
{
    /**
     * Display a listing of answers
     */
    public function index(Request $request)
    {
        $query = Answer::with(['form.category', 'company']);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->whereHas('company', function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%");
            })->orWhereHas('form', function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%");
            });
        }

        if ($request->filled('form_id')) {
            $query->where('form_id', $request->form_id);
        }

        if ($request->filled('company_id')) {
            $query->where('company_id', $request->company_id);
        }

        $answers = $query->orderBy('created_at', 'desc')
            ->paginate(15)
            ->withQueryString();

        $forms = Form::with('category')->get();
        $companies = Company::all();

        return Inertia::render('admin/answers/index', [
            'answers' => $answers,
            'forms' => $forms,
            'companies' => $companies,
            'filters' => $request->only(['search', 'form_id', 'company_id']),
        ]);
    }

    /**
     * Display the specified answer
     */
    public function show(Answer $answer)
    {
        $answer->load(['form.category', 'company']);

        return Inertia::render('admin/answers/show', [
            'answer' => $answer,
        ]);
    }

    /**
     * Remove the specified answer
     */
    public function destroy(Answer $answer)
    {
        $answer->delete();

        return redirect()->route('admin.answers.index')
            ->with('success', 'Respuesta eliminada exitosamente.');
    }

    /**
     * Export answers for a specific form
     */
    public function export(Form $form)
    {
        $answers = $form->answers()->with('company')->get();

        // Aquí puedes implementar la lógica de exportación (CSV, Excel, etc.)

        return response()->json([
            'message' => 'Exportación completada',
            'data' => $answers
        ]);
    }
}
