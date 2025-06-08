<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('teacher_profiles', function (Blueprint $table) {
            $table->id();
            // This is a 1-to-1 relationship with the users table
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('qualifications')->nullable(); // e.g., "PhD in Physics"
            $table->string('department')->nullable();
            $table->date('date_of_birth');
            $table->enum('gender', ['male', 'female']);
            $table->text('address')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('teacher_profiles');
    }
};
