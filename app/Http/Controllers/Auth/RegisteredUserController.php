<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Student;
use App\Models\Company;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration selection page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Show register form for students
     */
    public function createStudent(): Response
    {
        return Inertia::render('auth/register-student');
    }

    /**
     * Register a student
     */
    public function storeStudent(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:'.User::class,
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'is_leader' => 'sometimes|boolean',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        // Assign role and create student profile
        $user->assignRole('student');
        Student::create([
            'user_id' => $user->id,
            'is_leader' => (bool)($validated['is_leader'] ?? false),
        ]);

        event(new Registered($user));
        Auth::login($user);

        return back();
    }

    /**
     * Show register form for companies
     */
    public function createCompany(): Response
    {
        return Inertia::render('auth/register-company');
    }

    /**
     * Register a company (and its user)
     */
    public function storeCompany(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            // user fields
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:'.User::class,
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],

            // company fields
            'company_name' => 'required|string|max:255',
            'nit' => 'required|string|max:255|unique:companies,nit',
            'responsible_name' => 'required|string|max:255',
            'responsible_email' => 'required|email|max:255',
            'responsible_phone' => 'required|string|max:50',
            'responsible_position' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'logo' => 'nullable|image|max:2048',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $user->assignRole('businessman');

        $logoPath = null;
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('companies/logos', 'public');
        }

        Company::create([
            'name' => $validated['company_name'],
            'nit' => $validated['nit'],
            'responsible_name' => $validated['responsible_name'],
            'responsible_email' => $validated['responsible_email'],
            'responsible_phone' => $validated['responsible_phone'],
            'responsible_position' => $validated['responsible_position'],
            'address' => $validated['address'],
            'logo' => $logoPath,
            'user_id' => $user->id,
        ]);

        event(new Registered($user));
        Auth::login($user);

        return back();
    }
}
