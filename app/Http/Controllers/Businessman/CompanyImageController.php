<?php

namespace App\Http\Controllers\Businessman;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\CompanyImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CompanyImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $images = CompanyImage::with('company')
            ->active()
            ->ordered()
            ->paginate(20);

        return Inertia::render('CompanyImages/Index', [
            'images' => $images
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $companies = Company::orderBy('name')->get();

        return Inertia::render('CompanyImages/Create', [
            'companies' => $companies,
            'imageTypes' => [
                ['value' => 'product', 'label' => 'Producto'],
                ['value' => 'service', 'label' => 'Servicio'],
                ['value' => 'facility', 'label' => 'Instalación'],
                ['value' => 'team', 'label' => 'Equipo'],
                ['value' => 'other', 'label' => 'Otro'],
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'company_id' => 'required|exists:companies,id',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
            'type' => 'required|in:product,service,facility,team,other',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $imagePath = $request->file('image')->store('companies/images', 'public');

        $companyImage = CompanyImage::create([
            'company_id' => $request->company_id,
            'image_path' => $imagePath,
            'title' => $request->title,
            'description' => $request->description,
            'type' => $request->type,
            'order' => $request->order ?? 0,
            'is_active' => $request->is_active ?? true,
        ]);

        return redirect()->route('company-images.index')
            ->with('success', 'Imagen de empresa creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(CompanyImage $companyImage)
    {
        $companyImage->load('company');

        return Inertia::render('CompanyImages/Show', [
            'image' => $companyImage
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CompanyImage $companyImage)
    {
        $companyImage->load('company');
        $companies = Company::orderBy('name')->get();

        return Inertia::render('CompanyImages/Edit', [
            'image' => $companyImage,
            'companies' => $companies,
            'imageTypes' => [
                ['value' => 'product', 'label' => 'Producto'],
                ['value' => 'service', 'label' => 'Servicio'],
                ['value' => 'facility', 'label' => 'Instalación'],
                ['value' => 'team', 'label' => 'Equipo'],
                ['value' => 'other', 'label' => 'Otro'],
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CompanyImage $companyImage)
    {
        $validator = Validator::make($request->all(), [
            'company_id' => 'required|exists:companies,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
            'type' => 'required|in:product,service,facility,team,other',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $data = [
            'company_id' => $request->company_id,
            'title' => $request->title,
            'description' => $request->description,
            'type' => $request->type,
            'order' => $request->order ?? 0,
            'is_active' => $request->is_active ?? true,
        ];

        // Si se subió una nueva imagen
        if ($request->hasFile('image')) {
            // Eliminar la imagen anterior
            if ($companyImage->image_path) {
                Storage::disk('public')->delete($companyImage->image_path);
            }

            $data['image_path'] = $request->file('image')->store('companies/images', 'public');
        }

        $companyImage->update($data);

        return redirect()->route('company-images.index')
            ->with('success', 'Imagen de empresa actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CompanyImage $companyImage)
    {
        // Eliminar la imagen del almacenamiento
        if ($companyImage->image_path) {
            Storage::disk('public')->delete($companyImage->image_path);
        }

        $companyImage->delete();

        return redirect()->route('company-images.index')
            ->with('success', 'Imagen de empresa eliminada exitosamente.');
    }

    /**
     * Obtener imágenes por empresa
     */
    public function byCompany(Company $company)
    {
        $images = $company->activeImages()->get();

        return response()->json([
            'company' => $company,
            'images' => $images
        ]);
    }

    /**
     * Obtener imágenes por tipo
     */
    public function byType(Request $request)
    {
        $type = $request->get('type', 'all');

        $query = CompanyImage::with('company')->active()->ordered();

        if ($type !== 'all') {
            $query->where('type', $type);
        }

        $images = $query->get();

        return response()->json([
            'images' => $images
        ]);
    }
}
