<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Challenge;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ChallengeController extends Controller
{
    /**
     * Generar código único para grupo
     */
    private function generateUniqueGroupCode(Challenge $challenge)
    {
        do {
            $code = strtoupper(substr(md5(uniqid(rand(), true)), 0, 8));
        } while (DB::table('challenge_student')
            ->where('challenge_id', $challenge->id)
            ->where('group_code', $code)
            ->exists());

        return $code;
    }
    /**
     * Inscribir al estudiante en un reto
     */
    public function join(Request $request, Challenge $challenge)
    {
        try {
            // Obtener el student_id real del usuario autenticado
            $student = DB::table('students')
                ->where('user_id', auth()->id())
                ->first();
                
            if (!$student) {
                return back()->withErrors(['error' => 'No tienes un perfil de estudiante válido.']);
            }
            
            // Verificar si ya está inscrito en el reto
            $existingParticipation = DB::table('challenge_student')
                ->where('challenge_id', $challenge->id)
                ->where('student_id', $student->id)
                ->first();
                
            $existingMembership = DB::table('group_members')
                ->join('challenge_student', 'group_members.challenge_student_id', '=', 'challenge_student.id')
                ->where('challenge_student.challenge_id', $challenge->id)
                ->where('group_members.student_id', $student->id)
                ->first();
                
            if ($existingParticipation || $existingMembership) {
                return back()->withErrors(['error' => 'Ya estás inscrito en este reto.']);
            }
            
            // Validación según tipo de participación
            if ($request->participation_type === 'join_group') {
                // Para unirse a grupo
                $request->validate([
                    'participation_type' => 'required|in:join_group',
                    'join_group_code' => 'required|string|size:8',
                    'full_name' => 'required|string|max:255',
                    'email' => 'required|email',
                    'phone_number' => 'required|string',
                    'motivation' => 'nullable|string',
                ]);
                
                // Verificar que el código de grupo existe
                $leader = DB::table('challenge_student')
                    ->where('challenge_id', $challenge->id)
                    ->where('group_code', $request->join_group_code)
                    ->where('is_group_leader', true)
                    ->first();
                    
                if (!$leader) {
                    return back()->withErrors(['join_group_code' => 'Código de grupo inválido.']);
                }
                
                // Contar miembros actuales
                $currentMembers = DB::table('group_members')
                    ->where('challenge_student_id', $leader->id)
                    ->count() + 1; // +1 por el líder
                    
                if ($currentMembers >= $leader->group_max_participants) {
                    return back()->withErrors(['join_group_code' => 'El grupo está lleno.']);
                }
                
                // Insertar en group_members
                DB::table('group_members')->insert([
                    'challenge_student_id' => $leader->id,
                    'student_id' => $student->id,
                    'full_name' => $request->full_name,
                    'email' => $request->email,
                    'phone_number' => $request->phone_number,
                    'motivation' => $request->motivation,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                
                return back()->with('success', 'Te has unido al grupo exitosamente.');
                
            } else {
                // Para individual y leader
                $request->validate([
                    'participation_type' => 'required|in:individual,leader',
                    'full_name' => 'required|string|max:255',
                    'email' => 'required|email',
                    'phone_number' => 'required|string',
                    'prototype_price' => 'required|numeric|min:0',
                    'estimated_delivery_days' => 'required|integer|min:1',
                    'motivation' => 'nullable|string',
                    'group_name' => $request->participation_type === 'leader' ? 'required|string|max:255' : 'nullable',
                    'group_max_participants' => $request->participation_type === 'leader' ? 'required|integer|min:2|max:20' : 'nullable',
                ]);
                
                $groupCode = null;
                if ($request->participation_type === 'leader') {
                    $groupCode = $this->generateUniqueGroupCode($challenge);
                }
                
                // Insertar en challenge_student
                DB::table('challenge_student')->insert([
                    'challenge_id' => $challenge->id,
                    'student_id' => $student->id,
                    'status' => 'pending',
                    'participation_type' => $request->participation_type,
                    'group_name' => $request->group_name,
                    'group_code' => $groupCode,
                    'group_max_participants' => $request->group_max_participants,
                    'is_group_leader' => $request->participation_type === 'leader',
                    'motivation' => $request->motivation,
                    'full_name' => $request->full_name,
                    'email' => $request->email,
                    'phone_number' => $request->phone_number,
                    'prototype_price' => $request->prototype_price,
                    'estimated_delivery_days' => $request->estimated_delivery_days,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                
                if ($request->participation_type === 'leader' && $groupCode) {
                    return redirect()->back()
                        ->with('success', 'Grupo creado exitosamente. Tu código es: ' . $groupCode)
                        ->with('groupCode', $groupCode)
                        ->with('showCode', true);
                }
                
                return back()->with('success', 'Inscripción exitosa');
            }
            
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Error: ' . $e->getMessage()]);
        }
    }

    /**
     * Verificar código de grupo
     */
    public function verifyGroupCode(Request $request, Challenge $challenge)
    {
        $request->validate([
            'group_code' => 'required|string|size:8'
        ]);



        // Buscar el líder del grupo
        $leaderParticipation = DB::table('challenge_student')
            ->join('students', 'challenge_student.student_id', '=', 'students.id')
            ->join('users', 'students.user_id', '=', 'users.id')
            ->where('challenge_student.challenge_id', $challenge->id)
            ->where('challenge_student.group_code', $request->group_code)
            ->where('challenge_student.is_group_leader', true)
            ->select(
                'challenge_student.group_name',
                'challenge_student.group_max_participants',
                'users.name as leader_name'
            )
            ->first();



        if (!$leaderParticipation) {
            return response()->json(['error' => 'Código de grupo inválido'], 404);
        }

        // Contar miembros actuales del grupo (líder + miembros en group_members)
        $leader = DB::table('challenge_student')
            ->where('challenge_id', $challenge->id)
            ->where('group_code', $request->group_code)
            ->where('is_group_leader', true)
            ->first();
            
        $currentMembers = DB::table('group_members')
            ->where('challenge_student_id', $leader->id)
            ->count() + 1; // +1 por el líder

        $availableSpots = $leaderParticipation->group_max_participants - $currentMembers;

        return response()->json([
            'success' => true,
            'group_name' => $leaderParticipation->group_name,
            'leader_name' => $leaderParticipation->leader_name,
            'current_members' => $currentMembers,
            'max_participants' => $leaderParticipation->group_max_participants,
            'available_spots' => $availableSpots,
            'is_full' => $availableSpots <= 0
        ]);
    }

    /**
     * Cancelar inscripción
     */
    public function leave(Challenge $challenge)
    {
        try {
            // Obtener el student_id real del usuario autenticado
            $student = DB::table('students')
                ->where('user_id', auth()->id())
                ->first();
                
            if (!$student) {
                return back()->withErrors(['error' => 'No tienes un perfil de estudiante válido.']);
            }

            // Verificar si es líder (en challenge_student)
            $participation = DB::table('challenge_student')
                ->where('challenge_id', $challenge->id)
                ->where('student_id', $student->id)
                ->first();

            // Verificar si es miembro de grupo (en group_members)
            $membership = DB::table('group_members')
                ->join('challenge_student', 'group_members.challenge_student_id', '=', 'challenge_student.id')
                ->where('challenge_student.challenge_id', $challenge->id)
                ->where('group_members.student_id', $student->id)
                ->select('group_members.*', 'challenge_student.group_name')
                ->first();

            if (!$participation && !$membership) {
                return back()->withErrors(['error' => 'No estás inscrito en este reto.']);
            }

            DB::beginTransaction();

            if ($participation) {
                // Es líder o individual
                if ($participation->is_group_leader) {
                    // Si es líder, verificar que no tenga miembros
                    $memberCount = DB::table('group_members')
                        ->where('challenge_student_id', $participation->id)
                        ->count();

                    if ($memberCount > 0) {
                        DB::rollBack();
                        return back()->withErrors(['error' => 'No puedes salir del reto siendo líder con miembros en tu grupo. Primero transfiere el liderazgo o elimina el grupo.']);
                    }
                }

                // Eliminar participación (individual o líder sin miembros)
                DB::table('challenge_student')
                    ->where('id', $participation->id)
                    ->delete();
                    
                $message = $participation->is_group_leader ? 'Has salido del reto y tu grupo ha sido eliminado.' : 'Has salido del reto exitosamente.';
            } else {
                // Es miembro de grupo
                DB::table('group_members')
                    ->where('id', $membership->id)
                    ->delete();
                    
                $message = 'Has salido del grupo "' . $membership->group_name . '" exitosamente.';
            }

            DB::commit();
            return back()->with('success', $message);
            
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Error al salir del reto: ' . $e->getMessage()]);
        }
    }
}
