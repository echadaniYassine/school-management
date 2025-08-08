<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->index('role');
            $table->index('is_active');
            $table->index('email_verified_at');
        });

        Schema::table('courses', function (Blueprint $table) {
            $table->index(['classroom_id', 'is_active']);
            $table->index('teacher_id');
        });

        Schema::table('assignments', function (Blueprint $table) {
            $table->index('due_date');
            $table->index(['course_id', 'due_date']);
        });

        Schema::table('exams', function (Blueprint $table) {
            $table->index('exam_date');
            $table->index(['course_id', 'exam_date']);
        });

        Schema::table('exam_records', function (Blueprint $table) {
            $table->index(['student_id', 'exam_id']);
            $table->index('grader_id');
        });

        Schema::table('announcements', function (Blueprint $table) {
            $table->index('published_at');
            $table->index(['is_active', 'published_at']);
            $table->index('author_id');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['role']);
            $table->dropIndex(['is_active']);
            $table->dropIndex(['email_verified_at']);
        });

        Schema::table('courses', function (Blueprint $table) {
            $table->dropIndex(['classroom_id', 'is_active']);
            $table->dropIndex(['teacher_id']);
        });

        Schema::table('assignments', function (Blueprint $table) {
            $table->dropIndex(['due_date']);
            $table->dropIndex(['course_id', 'due_date']);
        });

        Schema::table('exams', function (Blueprint $table) {
            $table->dropIndex(['exam_date']);
            $table->dropIndex(['course_id', 'exam_date']);
        });

        Schema::table('exam_records', function (Blueprint $table) {
            $table->dropIndex(['student_id', 'exam_id']);
            $table->dropIndex(['grader_id']);
        });

        Schema::table('announcements', function (Blueprint $table) {
            $table->dropIndex(['published_at']);
            $table->dropIndex(['is_active', 'published_at']);
            $table->dropIndex(['author_id']);
        });
    }
};
