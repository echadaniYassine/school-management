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
        Schema::create('enrollments', function (Blueprint $table) {
            $table->id();
            // A student is just a user. A class is a class.
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('class_id')->constrained('classes')->onDelete('cascade');
            $table->unique(['user_id', 'class_id']); // Prevent duplicate enrollments
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enrollments.php');
    }
};
