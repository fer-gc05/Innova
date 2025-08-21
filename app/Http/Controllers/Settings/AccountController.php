<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    /**
     * Display the authenticated user's account profile with role-specific data.
     */
    public function show(Request $request): Response
    {
        $user = $request->user()->load([
            'company.activeImages',
            'students',
        ]);

        $roles = $user->roles->pluck('name');

        return Inertia::render('settings/MiCuenta', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'created_at' => $user->created_at,
                'roles' => $roles,
            ],
            'company' => $user->company ? [
                'id' => $user->company->id,
                'name' => $user->company->name,
                'nit' => $user->company->nit,
                'responsible_name' => $user->company->responsible_name,
                'responsible_email' => $user->company->responsible_email,
                'responsible_phone' => $user->company->responsible_phone,
                'responsible_position' => $user->company->responsible_position,
                'address' => $user->company->address,
                'logo_url' => $user->company->logo_url,
                'images' => $user->company->activeImages->map(function ($image) {
                    return [
                        'id' => $image->id,
                        'url' => $image->image_url,
                        'title' => $image->title,
                        'description' => $image->description,
                        'type' => $image->type_label,
                        'order' => $image->order,
                    ];
                }),
            ] : null,
            'student' => $user->students ? [
                'id' => $user->students->id,
                'is_leader' => (bool) $user->students->is_leader,
            ] : null,
        ]);
    }
}


