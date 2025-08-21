<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Form;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FormController extends Controller
{
    /**
     * Display a listing of forms
     */
    public function index(Request $request)
    {
        $query = Form::with(['category'])->withCount(['answers']);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('description', 'LIKE', "%{$search}%");
            });
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        $forms = $query->orderBy('created_at', 'desc')
            ->paginate(15)
            ->withQueryString();

        $categories = Category::all();

        return Inertia::render('admin/forms/index', [
            'forms' => $forms,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category_id']),
        ]);
    }

    /**
     * Show the form for creating a new form
     */
    public function create()
    {
        $categories = Category::all();

        return Inertia::render('admin/forms/create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created form
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'questions' => 'required|array',
            'questions.*.text' => 'required|string',
            'questions.*.type' => 'required|in:text,textarea,select,radio,checkbox,number,email',
            'questions.*.required' => 'boolean',
            'questions.*.options' => 'array',
        ]);

        Form::create([
            'name' => $request->name,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'questions' => $request->questions,
        ]);

        return redirect()->route('admin.forms.index')
            ->with('success', 'Formulario creado exitosamente.');
    }

    /**
     * Display the specified form
     */
    public function show(Form $form)
    {
        $form->load(['category', 'answers.company']);

        return Inertia::render('admin/forms/show', [
            'form' => $form,
        ]);
    }

    /**
     * Show the form for editing the specified form
     */
    public function edit(Form $form)
    {
        $categories = Category::all();

        return Inertia::render('admin/forms/edit', [
            'form' => $form,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified form
     */
    public function update(Request $request, Form $form)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'questions' => 'required|array',
            'questions.*.text' => 'required|string',
            'questions.*.type' => 'required|in:text,textarea,select,radio,checkbox,number,email',
            'questions.*.required' => 'boolean',
            'questions.*.options' => 'array',
        ]);

        $form->update([
            'name' => $request->name,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'questions' => $request->questions,
        ]);

        return redirect()->route('admin.forms.index')
            ->with('success', 'Formulario actualizado exitosamente.');
    }

    /**
     * Remove the specified form
     */
    public function destroy(Form $form)
    {
        if ($form->answers()->exists()) {
            return back()->withErrors(['error' => 'No se puede eliminar un formulario que tiene respuestas asociadas.']);
        }

        $form->delete();

        return redirect()->route('admin.forms.index')
            ->with('success', 'Formulario eliminado exitosamente.');
    }
}
