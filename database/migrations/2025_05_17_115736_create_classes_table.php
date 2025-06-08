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
         Schema::create('classes', function (Blueprint $table) { // Renamed for clarity
        $table->id();
        $table->string('name'); // e.g., "Grade 10 - Section A"
        // The teacher is just a user with the 'teacher' role.
        $table->foreignId('teacher_id')->nullable()->constrained('users')->onDelete('set null');
        $table->timestamps();
        $table->softDeletes();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classes');
    }
};
