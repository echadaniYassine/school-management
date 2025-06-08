<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('assignments', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable(); // Optional detailed description
            $table->string('course')->nullable(); // Or foreign key to a 'courses' table
            // $table->unsignedBigInteger('course_id')->nullable();
            // $table->foreign('course_id')->references('id')->on('courses')->onDelete('set null');
            $table->date('due_date');
            $table->string('status')->default('draft'); // e.g., draft, published, archived, graded
            $table->text('assigned_to_description')->nullable(); // e.g., "All Grade 10 Students", "Section A - Grade 11"
            // For more granular assignment targets, you might use a pivot table or JSON field
            // $table->json('assigned_to_ids')->nullable(); // e.g., [user_ids] or [group_ids]
            $table->text('instructions_file_path')->nullable(); // Path to an attached instructions file

            $table->foreignId('created_by_id')->constrained('users')->onDelete('cascade'); // The user (teacher/admin) who created it
            $table->foreignId('course_id')->constrained()->onDelete('cascade');


            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('assignments');
    }
};
