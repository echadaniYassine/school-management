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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Changed 'name' to 'title' to match frontend
            $table->string('code')->nullable()->unique(); // Course code, optional but unique if present
            $table->text('description')->nullable();
            $table->string('instructor')->nullable();
            $table->string('category')->nullable();
            $table->string('level')->default('Beginner'); // e.g., Beginner, Intermediate, Advanced
            $table->string('duration')->nullable(); // e.g., 8 Weeks
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->string('thumbnail_url')->nullable();
            $table->decimal('price', 8, 2)->default(0.00); // Price with 2 decimal places

            // Consider adding foreign keys if you have related tables
            // $table->foreignId('user_id')->constrained()->comment('Instructor or creator');
            $table->foreignId('category_id')->nullable()->constrained();

            $table->softDeletes();
            $table->timestamps(); // created_at and updated_at
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