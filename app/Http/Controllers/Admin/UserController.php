<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Challenge;
use App\Models\Answer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of users
     */
    public function index(Request $request)
    {
        $query = User::with(['roles', 'company', 'students']);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('email', 'LIKE', "%{$search}%")
                  ->orWhere('username', 'LIKE', "%{$search}%");
            });
        }

        if ($request->filled('role')) {
            $query->role($request->role);
        }

        $users = $query->orderBy('created_at', 'desc')
            ->paginate(15)
            ->withQueryString();

        $roles = Role::all();

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'roles' => $roles,
            'filters' => $request->only(['search', 'role']),
        ]);
    }

    /**
     * Show the form for creating a new user
     */
    public function create()
    {
        $roles = Role::all();

        return Inertia::render('admin/users/create', [
            'roles' => $roles,
        ]);
    }

    /**
     * Store a newly created user
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'username' => 'nullable|string|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|exists:roles,name',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'username' => $request->username,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole($request->role);

        return redirect()->route('admin.users.index')
            ->with('success', 'Usuario creado exitosamente.');
    }

    /**
     * Display the specified user
     */
    public function show(User $user)
    {
        $user->load(['roles', 'company', 'students']);

        return Inertia::render('admin/users/show', [
            'user' => $user,
        ]);
    }

    /**
     * Show the form for editing the specified user
     */
    public function edit(User $user)
    {
        $user->load('roles');
        $roles = Role::all();

        return Inertia::render('admin/users/edit', [
            'user' => $user,
            'roles' => $roles,
        ]);
    }

    /**
     * Update the specified user
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'username' => 'nullable|string|max:255|unique:users,username,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'role' => 'required|exists:roles,name',
        ]);

        $updateData = [
            'name' => $request->name,
            'email' => $request->email,
            'username' => $request->username,
        ];

        if ($request->filled('password')) {
            $updateData['password'] = Hash::make($request->password);
        }

        $user->update($updateData);
        $user->syncRoles([$request->role]);

        return redirect()->route('admin.users.index')
            ->with('success', 'Usuario actualizado exitosamente.');
    }

    /**
     * Remove the specified user
     */
    public function destroy(User $user)
    {
        if ($user->id === auth()->id()) {
            return back()->withErrors(['error' => 'No puedes eliminar tu propio usuario.']);
        }

        try {
            // Verificar si el usuario tiene relaciones antes de intentar eliminar
            $errorMessage = $this->checkUserRelationships($user);

            if ($errorMessage) {
                return back()->withErrors(['error' => $errorMessage]);
            }

            $user->delete();

            return redirect()->route('admin.users.index')
                ->with('success', 'Usuario eliminado exitosamente.');

        } catch (\Illuminate\Database\QueryException $e) {
            // Capturar errores de integridad referencial
            $errorMessage = $this->getIntegrityConstraintMessage($e, $user);

            return back()->withErrors(['error' => $errorMessage]);
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Error inesperado al eliminar el usuario: ' . $e->getMessage()]);
        }
    }

    /**
     * Verificar las relaciones del usuario antes de eliminar
     */
    private function checkUserRelationships(User $user): ?string
    {
        // Verificar si es empresario con retos creados
        if ($user->hasRole('businessman')) {
            $company = $user->company;
            if ($company) {
                $challengesCount = \App\Models\Challenge::where('company_id', $company->id)->count();
                if ($challengesCount > 0) {
                    return "No se puede eliminar este usuario porque es un empresario con {$challengesCount} reto(s) creado(s). Primero debe eliminar todos los retos asociados.";
                }
            }
        }

        // Verificar si es estudiante con participaciones en retos
        if ($user->hasRole('student')) {
            $student = $user->students;
            if ($student) {
                $participationsCount = \DB::table('challenge_student')
                    ->where('student_id', $student->id)
                    ->count();
                if ($participationsCount > 0) {
                    return "No se puede eliminar este usuario porque es un estudiante con {$participationsCount} participación(es) en reto(s). Primero debe salir de todos los retos.";
                }
            }
        }

        // Verificar si tiene respuestas de formularios
        if ($user->company) {
            $answersCount = \App\Models\Answer::where('company_id', $user->company->id)->count();
            if ($answersCount > 0) {
                return "No se puede eliminar este usuario porque tiene {$answersCount} respuesta(s) de formulario(s) asociada(s).";
            }
        }

        return null;
    }

    /**
     * Obtener mensaje específico para errores de integridad referencial
     */
    private function getIntegrityConstraintMessage(\Illuminate\Database\QueryException $e, User $user): string
    {
        $errorCode = $e->getCode();
        $errorMessage = $e->getMessage();

        // Error de integridad referencial (1451 en MySQL)
        if ($errorCode == 23000 && str_contains($errorMessage, '1451')) {
            if ($user->hasRole('businessman')) {
                return "No se puede eliminar este usuario porque es un empresario con retos creados. Primero debe eliminar todos los retos asociados a su empresa.";
            } elseif ($user->hasRole('student')) {
                return "No se puede eliminar este usuario porque es un estudiante con participaciones en retos. Primero debe salir de todos los retos.";
            } else {
                return "No se puede eliminar este usuario porque tiene datos relacionados en el sistema.";
            }
        }

        return "Error de base de datos al eliminar el usuario: " . $errorMessage;
    }
}
