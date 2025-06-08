<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // courses table is mostly fine, just ensure the foreign key is solid.
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            // A course is taught by a teacher (who is a user)
            $table->foreignId('teacher_id')->constrained('users')->onDelete('cascade');
            $table->string('name');
            $table->string('code')->unique();
            $table->text('description')->nullable();
            $table->string('category')->nullable();
            $table->string('thumbnail_url')->nullable();
            $table->foreignId('category_id')->nullable()->constrained();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
