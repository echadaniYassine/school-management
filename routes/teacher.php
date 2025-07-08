<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ActivityController;
use App\Http\Controllers\Api\AssignmentController;
use App\Http\Controllers\Api\BlogPostController;
use App\Http\Controllers\Api\ClassTypeController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\ExamController;
use App\Http\Controllers\Api\ExamRecordController;
use App\Http\Controllers\Api\TeamController;

// All routes here are automatically prefixed with '/api/teacher' and require TEACHER role.
Route::middleware('role:teacher')->prefix('teacher')->name('teacher.')->group(function () {

    Route::apiResource('courses', CourseController::class);
    Route::apiResource('activities', ActivityController::class);
    Route::apiResource('assignments', AssignmentController::class);
    Route::apiResource('blog-posts', BlogPostController::class);
    Route::apiResource('class-types', ClassTypeController::class);
    Route::apiResource('teams', TeamController::class);
    Route::apiResource('exams', ExamController::class);

    // Nested resource for exam records with shallow routing for update/show/delete
    Route::apiResource('exams.records', ExamRecordController::class)->shallow();
});
