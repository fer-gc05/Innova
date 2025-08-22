<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('challenges', function (Blueprint $table) {
            // Agregar los nuevos campos
            $table->enum('publication_status', ['draft', 'published'])->default('draft')->after('status');
            $table->enum('activity_status', ['active', 'completed', 'inactive'])->default('active')->after('publication_status');
        });

        // Migrar datos existentes después de crear los campos
        DB::statement("
            UPDATE challenges
            SET
                publication_status = CASE
                    WHEN status IN ('draft', 'pending') THEN 'draft'
                    WHEN status IN ('published', 'active') THEN 'published'
                    ELSE 'draft'
                END,
                activity_status = CASE
                    WHEN status = 'completed' THEN 'completed'
                    WHEN status = 'inactive' THEN 'inactive'
                    ELSE 'active'
                END
        ");

        // Eliminar el campo status original
        Schema::table('challenges', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('challenges', function (Blueprint $table) {
            // Recrear el campo status original
            $table->string('status')->after('video_id');

            // Migrar datos de vuelta
            DB::statement("
                UPDATE challenges
                SET status = CASE
                    WHEN publication_status = 'draft' THEN 'draft'
                    WHEN publication_status = 'published' AND activity_status = 'active' THEN 'published'
                    WHEN publication_status = 'published' AND activity_status = 'completed' THEN 'completed'
                    WHEN publication_status = 'published' AND activity_status = 'inactive' THEN 'inactive'
                    ELSE 'draft'
                END
            ");

            // Eliminar los nuevos campos
            $table->dropColumn(['publication_status', 'activity_status']);
        });
    }
};
