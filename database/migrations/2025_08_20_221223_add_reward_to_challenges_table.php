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
            $table->decimal('reward_amount', 10, 2)->nullable()->after('video_id')->comment('Monto de la recompensa económica');
            $table->string('reward_currency', 3)->default('COP')->after('reward_amount')->comment('Moneda de la recompensa (COP, USD, EUR)');
            $table->text('reward_description')->nullable()->after('reward_currency')->comment('Descripción detallada de la recompensa');
            $table->enum('reward_type', ['fixed', 'variable', 'percentage'])->default('fixed')->after('reward_description')->comment('Tipo de recompensa: fija, variable o porcentaje');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('challenges', function (Blueprint $table) {
            $table->dropColumn(['reward_amount', 'reward_currency', 'reward_description', 'reward_type']);
        });
    }
};
