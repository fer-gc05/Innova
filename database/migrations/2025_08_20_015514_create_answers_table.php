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
        Schema::create('answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('form_id')->constrained('forms'); // El formulario al que pertenece la respuesta.
            $table->foreignId('company_id')->constrained('companies'); // La empresa que responde el formulario para crear un reto.
            $table->jsonb('answers'); // Respuestas del formulario.
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('answers');
    }
};
