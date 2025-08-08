<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('subjects', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique(); // "MATH", "FRENCH", "ARABIC" - system use
            $table->json('name'); // {"fr": "Mathématiques", "ar": "الرياضيات"} - user facing
            $table->string('color', 7)->nullable(); // Hex color for UI
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('subjects');
    }
};
