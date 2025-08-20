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
        Schema::create('challenges', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nombre del reto.
            $table->string('description'); // Descripcion del reto.
            $table->string('objective'); // Objetivo del reto.
            $table->enum('difficulty', ['easy', 'medium', 'hard']); // Dificultad del reto.
            $table->jsonb('requirements'); // Requisitos del reto.
            $table->string('status'); // Estado del reto.
            $table->string('start_date'); // Fecha de inicio del reto.
            $table->string('end_date'); // Fecha de fin del reto.
            $table->string('link_video')->nullable(); // Link del video del reto youtube.
            $table->string('video_id')->nullable(); // ID del video en el storage(se implementa en caso de subir un video al servidor).

            $table->foreignId('category_id')->constrained('categories'); // La categoria del reto.
            $table->foreignId('company_id')->constrained('companies'); // La empresa que crea el reto.
            $table->timestamps();
        });


        Schema::create('challenge_student', function (Blueprint $table) {
            $table->id();
            $table->foreignId('challenge_id')->constrained('challenges'); // El reto al que se suscribe el estudiante.
            $table->foreignId('student_id')->constrained('students'); // El estudiante que se suscribe al reto.
            $table->string('status'); // Estado del suscripcion del estudiante al reto.
            $table->timestamps();
        });

        Schema::create('challenge_company', function (Blueprint $table) {
            $table->id();
            $table->foreignId('challenge_id')->constrained('challenges'); // El reto al que se suscribe la empresa.
            $table->foreignId('company_id')->constrained('companies'); // La empresa que se suscribe al reto.
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('challenges');
    }
};
