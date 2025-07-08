<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('assignments', function (Blueprint $table) {
            $table->id();
            // --- FIX: Renamed 'user_id' to 'author_id' to match the Model and Policy. ---
            $table->foreignId('author_id')->constrained('users')->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('course')->nullable();
            $table->date('due_date');
            $table->string('status')->default('draft');
            $table->text('assigned_to_description')->nullable();
            $table->string('instructions_file_path')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('assignments');
    }
};