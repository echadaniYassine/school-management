<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('code')->nullable()->unique();
            $table->text('description')->nullable();
            $table->string('instructor')->nullable();
            $table->string('category')->nullable(); // Simple string category
            $table->string('level')->default('Beginner');
            $table->string('duration')->nullable();
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->string('thumbnail_url')->nullable();
            $table->decimal('price', 8, 2)->default(0.00);
            $table->softDeletes();
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('courses');
    }
};