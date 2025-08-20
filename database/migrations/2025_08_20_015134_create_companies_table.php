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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nombre de la empresa.
            $table->string('nit')->unique(); // Nit de la empresa.
            $table->string('responsible_name')->required(); // Nombre del responsable de la empresa.
            $table->string('responsible_email')->required(); // Email del responsable de la empresa.
            $table->string('responsible_phone')->required(); // Telefono del responsable de la empresa.
            $table->string('responsible_position')->required(); // Cargo del responsable de la empresa.
            $table->string('address'); // Direccion de la empresa.
            $table->string('logo')->nullable();
            $table->foreignId('user_id')->constrained('users'); // El usuario que crea la empresa.
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
