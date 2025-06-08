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
        Schema::create('student_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            // The student's parent is also just another user with the 'parent' role
            $table->foreignId('parent_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('student_id_number')->unique();
            $table->date('date_of_birth');
            $table->enum('gender', ['male', 'female']);
            $table->text('address')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_profiles.php');
    }
};
