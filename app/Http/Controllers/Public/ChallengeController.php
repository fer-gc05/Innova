<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Challenge;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ChallengeController extends Controller
{
    public function index(Request $request)
    {
        $query = Challenge::with(['category', 'company'])
            ->where('publication_status', 'published')
            ->orderBy('created_at', 'desc');

        // Filtros
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('difficulty')) {
            $query->where('difficulty', $request->difficulty);
        }

        $challenges = $query->get();
        $categories = Category::all();

        return Inertia::render('public/retos-actuales/index', [
            'challenges' => $challenges,
            'categories' => $categories,
            'filters' => $request->only(['category_id', 'difficulty']),
        ]);
    }

    public function show(Challenge $challenge)
    {
        $challenge->load(['category', 'company']);

        $isRegistered = false;
        $userGroupCode = null;
        $isGroupLeader = false;
        $groupInfo = null;

        if (auth()->check()) {
            // Buscar el student_id del usuario autenticado
            $student = DB::table('students')
                ->where('user_id', auth()->id())
                ->first();

            if ($student) {
                // Verificar si es líder o individual
                $participation = DB::table('challenge_student')
                    ->where('challenge_id', $challenge->id)
                    ->where('student_id', $student->id)
                    ->first();

                if ($participation) {
                    $isRegistered = true;
                    $isGroupLeader = $participation->is_group_leader;

                    // Si es líder, obtener su código
                    if ($isGroupLeader && $participation->group_code) {
                        $userGroupCode = $participation->group_code;
                    }
                } else {
                    // Verificar si es miembro de grupo
                    $memberInfo = DB::table('group_members')
                        ->join('challenge_student', 'group_members.challenge_student_id', '=', 'challenge_student.id')
                        ->join('students', 'challenge_student.student_id', '=', 'students.id')
                        ->join('users', 'students.user_id', '=', 'users.id')
                        ->where('group_members.student_id', $student->id)
                        ->where('challenge_student.challenge_id', $challenge->id)
                        ->select(
                            'challenge_student.group_name',
                            'challenge_student.group_max_participants',
                            'users.name as leader_name',
                            'challenge_student.group_code',
                            'challenge_student.id as leader_id'
                        )
                        ->first();

                    if ($memberInfo) {
                        $isRegistered = true;
                        $isGroupLeader = false; // Es miembro, no líder

                        // Contar miembros actuales
                        $currentMembers = DB::table('group_members')
                            ->where('challenge_student_id', $memberInfo->leader_id)
                            ->count() + 1; // +1 por el líder

                        $groupInfo = [
                            'group_name' => $memberInfo->group_name,
                            'leader_name' => $memberInfo->leader_name,
                            'current_members' => $currentMembers,
                            'max_participants' => $memberInfo->group_max_participants,
                            'group_code' => $memberInfo->group_code
                        ];
                    }
                }
            }
        }

        return Inertia::render('public/retos-actuales/show', [
            'challenge' => $challenge,
            'isRegistered' => $isRegistered,
            'userGroupCode' => $userGroupCode,
            'isGroupLeader' => $isGroupLeader,
            'groupInfo' => $groupInfo,
        ]);
    }
}
