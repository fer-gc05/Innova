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
        Schema::table('challenges', function (Blueprint $table) {
            // Tipo de adquisición del software
            $table->enum('acquisition_type', ['license', 'purchase'])->default('license')->after('video_id');

            // Detalles adicionales sobre la adquisición
            $table->text('acquisition_details')->nullable()->after('acquisition_type');

            // Términos y condiciones específicos para la adquisición
            $table->text('acquisition_terms')->nullable()->after('acquisition_details');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('challenges', function (Blueprint $table) {
            $table->dropColumn(['acquisition_type', 'acquisition_details', 'acquisition_terms']);
        });
    }
};
