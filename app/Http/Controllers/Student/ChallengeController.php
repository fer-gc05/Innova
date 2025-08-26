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
     * Obtener datos del estudiante autenticado
     */
    private function getAuthenticatedStudent()
    {
        $student = DB::table('students')
            ->join('users', 'students.user_id', '=', 'users.id')
            ->where('students.user_id', auth()->id())
            ->select('students.*', 'users.name', 'users.email')
            ->first();

        if (!$student) {
            throw new \Exception('No tienes un perfil de estudiante válido.');
        }

        return $student;
    }

    /**
     * Verificar si el estudiante ya está inscrito
     */
    private function isStudentRegistered(Challenge $challenge, $studentId)
    {
        $existingParticipation = DB::table('challenge_student')
            ->where('challenge_id', $challenge->id)
            ->where('student_id', $studentId)
            ->first();

        $existingMembership = DB::table('group_members')
            ->join('challenge_student', 'group_members.challenge_student_id', '=', 'challenge_student.id')
            ->where('challenge_student.challenge_id', $challenge->id)
            ->where('group_members.student_id', $studentId)
            ->first();

        return $existingParticipation || $existingMembership;
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

    // ========================================
    // PROCESO DE INSCRIPCIÓN PASO A PASO
    // ========================================

    /**
     * Paso 1: Selección del tipo de participación
     */
    public function showRegistrationStep1(Challenge $challenge)
    {
        try {
            $student = $this->getAuthenticatedStudent();

            if ($this->isStudentRegistered($challenge, $student->id)) {
                return redirect()->route('public.retos-actuales.show', $challenge->id)
                    ->with('error', 'Ya estás inscrito en este reto.');
            }

            return Inertia::render('student/challenges/registration/step1', [
                'challenge' => $challenge,
                'student' => $student,
            ]);
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Procesar Paso 1
     */
    public function processStep1(Request $request, Challenge $challenge)
    {
        try {
            $student = $this->getAuthenticatedStudent();

            $request->validate([
                'participation_type' => 'required|in:individual,leader,join_group',
                'join_group_code' => 'required_if:participation_type,join_group|string|size:8',
            ]);

            // Guardar en sesión para el siguiente paso
            session([
                'registration_step1' => [
                    'participation_type' => $request->participation_type,
                    'join_group_code' => $request->join_group_code,
                ]
            ]);

            return redirect()->route('student.challenges.register.step2', $challenge->id);
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Paso 2: Información personal (pre-llenada)
     */
    public function showRegistrationStep2(Challenge $challenge)
    {
        try {
            $student = $this->getAuthenticatedStudent();

            $step1Data = session('registration_step1');
            if (!$step1Data) {
                return redirect()->route('student.challenges.register.step1', $challenge->id);
            }

            return Inertia::render('student/challenges/registration/step2', [
                'challenge' => $challenge,
                'student' => $student,
                'step1Data' => $step1Data,
            ]);
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Procesar Paso 2
     */
    public function processStep2(Request $request, Challenge $challenge)
    {
        try {
            $student = $this->getAuthenticatedStudent();

            $step1Data = session('registration_step1');
            if (!$step1Data) {
                return redirect()->route('student.challenges.register.step1', $challenge->id);
            }

            $request->validate([
                'full_name' => 'required|string|max:255',
                'email' => 'required|email',
                'phone_number' => 'required|string|max:20',
                'motivation' => 'nullable|string|max:1000',
            ]);

            // Guardar en sesión para el siguiente paso
            session([
                'registration_step2' => [
                    'full_name' => $request->full_name,
                    'email' => $request->email,
                    'phone_number' => $request->phone_number,
                    'motivation' => $request->motivation,
                ]
            ]);

            return redirect()->route('student.challenges.register.step3', $challenge->id);
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Paso 3: Información del prototipo y confirmación
     */
    public function showRegistrationStep3(Challenge $challenge)
    {
        try {
            $student = $this->getAuthenticatedStudent();

            $step1Data = session('registration_step1');
            $step2Data = session('registration_step2');

            if (!$step1Data || !$step2Data) {
                return redirect()->route('student.challenges.register.step1', $challenge->id);
            }

            return Inertia::render('student/challenges/registration/step3', [
                'challenge' => $challenge,
                'student' => $student,
                'step1Data' => $step1Data,
                'step2Data' => $step2Data,
            ]);
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Procesar Paso 3 - Finalizar inscripción
     */
    public function processStep3(Request $request, Challenge $challenge)
    {
        try {
            $student = $this->getAuthenticatedStudent();

            $step1Data = session('registration_step1');
            $step2Data = session('registration_step2');

            if (!$step1Data || !$step2Data) {
                return redirect()->route('student.challenges.register.step1', $challenge->id);
            }

            $request->validate([
                'prototype_price' => 'required|numeric|min:0',
                'estimated_delivery_days' => 'required|integer|min:1|max:365',
                'group_name' => 'required_if:participation_type,leader|string|max:255',
                'group_max_participants' => 'required_if:participation_type,leader|integer|min:2|max:20',
            ]);

            DB::beginTransaction();

            // Procesar según el tipo de participación
            if ($step1Data['participation_type'] === 'join_group') {
                // Unirse a grupo existente
                $leader = DB::table('challenge_student')
                    ->where('challenge_id', $challenge->id)
                    ->where('group_code', $step1Data['join_group_code'])
                    ->where('is_group_leader', true)
                    ->first();

                if (!$leader) {
                    throw new \Exception('Código de grupo inválido.');
                }

                // Verificar espacio en el grupo
                $currentMembers = DB::table('group_members')
                    ->where('challenge_student_id', $leader->id)
                    ->count() + 1;

                if ($currentMembers >= $leader->group_max_participants) {
                    throw new \Exception('El grupo está lleno.');
                }

                // Insertar como miembro del grupo
                DB::table('group_members')->insert([
                    'challenge_student_id' => $leader->id,
                    'student_id' => $student->id,
                    'full_name' => $step2Data['full_name'],
                    'email' => $step2Data['email'],
                    'phone_number' => $step2Data['phone_number'],
                    'motivation' => $step2Data['motivation'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                $message = 'Te has unido al grupo exitosamente.';
            } else {
                // Individual o líder
                $groupCode = null;
                if ($step1Data['participation_type'] === 'leader') {
                    $groupCode = $this->generateUniqueGroupCode($challenge);
                }

                // Insertar en challenge_student
                DB::table('challenge_student')->insert([
                    'challenge_id' => $challenge->id,
                    'student_id' => $student->id,
                    'status' => 'pending',
                    'participation_type' => $step1Data['participation_type'],
                    'group_name' => $request->group_name ?? null,
                    'group_code' => $groupCode,
                    'group_max_participants' => $request->group_max_participants ?? null,
                    'is_group_leader' => $step1Data['participation_type'] === 'leader',
                    'motivation' => $step2Data['motivation'],
                    'full_name' => $step2Data['full_name'],
                    'email' => $step2Data['email'],
                    'phone_number' => $step2Data['phone_number'],
                    'prototype_price' => $request->prototype_price,
                    'estimated_delivery_days' => $request->estimated_delivery_days,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                if ($step1Data['participation_type'] === 'leader' && $groupCode) {
                    $message = "Grupo creado exitosamente. Tu código es: {$groupCode}";
                } else {
                    $message = 'Inscripción exitosa';
                }
            }

            DB::commit();

            // Limpiar datos de sesión
            session()->forget(['registration_step1', 'registration_step2']);

            return redirect()->route('public.retos-actuales.show', $challenge->id)
                ->with('success', $message)
                ->with('groupCode', $groupCode ?? null);

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Mostrar todas las propuestas de inscripción (solo para inscritos)
     */
    public function showSubmissions(Challenge $challenge)
    {
        try {
            $student = $this->getAuthenticatedStudent();

            if (!$this->isStudentRegistered($challenge, $student->id)) {
                return redirect()->route('public.retos-actuales.show', $challenge->id)
                    ->with('error', 'Debes estar inscrito para ver las propuestas.');
            }

            // Obtener todas las inscripciones del reto
            $submissions = DB::table('challenge_student')
                ->where('challenge_id', $challenge->id)
                ->get();

            // Obtener miembros de grupos
            $groupMembers = DB::table('group_members')
                ->join('challenge_student', 'group_members.challenge_student_id', '=', 'challenge_student.id')
                ->where('challenge_student.challenge_id', $challenge->id)
                ->select('group_members.*', 'challenge_student.group_name')
                ->get();

            return Inertia::render('student/challenges/submissions', [
                'challenge' => $challenge,
                'submissions' => $submissions,
                'groupMembers' => $groupMembers,
            ]);
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Editar propuesta propia
     */
    public function editSubmission(Challenge $challenge)
    {
        try {
            $student = $this->getAuthenticatedStudent();

            // Obtener la inscripción del estudiante
            $submission = DB::table('challenge_student')
                ->where('challenge_id', $challenge->id)
                ->where('student_id', $student->id)
                ->first();

            if (!$submission) {
                return redirect()->route('public.retos-actuales.show', $challenge->id)
                    ->with('error', 'No tienes una propuesta para editar.');
            }

            return Inertia::render('student/challenges/edit-submission', [
                'challenge' => $challenge,
                'submission' => $submission,
                'student' => $student,
            ]);
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Actualizar propuesta
     */
    public function updateSubmission(Request $request, Challenge $challenge)
    {
        try {
            $student = $this->getAuthenticatedStudent();

            $request->validate([
                'prototype_price' => 'required|numeric|min:0',
                'estimated_delivery_days' => 'required|integer|min:1|max:365',
                'motivation' => 'nullable|string|max:1000',
            ]);

            // Actualizar la inscripción
            DB::table('challenge_student')
                ->where('challenge_id', $challenge->id)
                ->where('student_id', $student->id)
                ->update([
                    'prototype_price' => $request->prototype_price,
                    'estimated_delivery_days' => $request->estimated_delivery_days,
                    'motivation' => $request->motivation,
                    'updated_at' => now(),
                ]);

            return redirect()->route('student.challenges.submissions', $challenge->id)
                ->with('success', 'Propuesta actualizada exitosamente.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
