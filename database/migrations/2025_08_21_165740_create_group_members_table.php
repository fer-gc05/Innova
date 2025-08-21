<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('group_members', function (Blueprint $table) {
            $table->id();
            
            // Relación con el líder del grupo (challenge_student)
            $table->foreignId('challenge_student_id')
                  ->constrained('challenge_student')
                  ->onDelete('cascade')
                  ->comment('Referencia al líder del grupo en challenge_student');
            
            // Relación con el estudiante que se une
            $table->foreignId('student_id')
                  ->constrained('students')
                  ->onDelete('cascade');
            
            // Información personal del miembro
            $table->string('full_name');
         $table->string('email');
            $table->string('phone_number');
            
            // Motivación (opcional)
            $table->text('motivation')->nullable();
            
            // Timestamps
            $table->timestamps();
            
            // Índices únicos
            $table->unique(['challenge_student_id', 'student_id'], 'unique_member_per_group');

            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('group_members');
    }
};
