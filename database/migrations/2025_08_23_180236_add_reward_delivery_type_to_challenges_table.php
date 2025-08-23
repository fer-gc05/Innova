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
            // Tipo de entrega de recompensa
            $table->enum('reward_delivery_type', ['prototype', 'final_software'])->default('final_software')->after('reward_description');

            // Detalles adicionales sobre la entrega de recompensa
            $table->text('reward_delivery_details')->nullable()->after('reward_delivery_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('challenges', function (Blueprint $table) {
            $table->dropColumn(['reward_delivery_type', 'reward_delivery_details']);
        });
    }
};
