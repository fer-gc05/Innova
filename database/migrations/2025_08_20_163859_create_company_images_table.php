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
        Schema::create('company_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('companies')->onDelete('cascade');
            $table->string('image_path'); // Ruta de la imagen
            $table->string('title')->nullable(); // Título descriptivo de la imagen
            $table->text('description')->nullable(); // Descripción de lo que muestra la imagen
            $table->enum('type', ['product', 'service', 'facility', 'team', 'other'])->default('other'); // Tipo de imagen
            $table->integer('order')->default(0); // Orden de visualización
            $table->boolean('is_active')->default(true); // Si la imagen está activa
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_images');
    }
};
