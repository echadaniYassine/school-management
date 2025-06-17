<?php

use App\Http\Controllers\Api\ActivityController;
use App\Http\Controllers\Api\AssignmentController;
use App\Http\Controllers\Api\BlogPostController;
use App\Http\Controllers\Api\ClassTypeController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\ExamController;
use App\Http\Controllers\Api\ExamRecordController;
use App\Http\Controllers\Api\TeamController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

// All routes here are automatically prefixed with '/api/admin' and require ADMIN role.
Route::middleware('role:admin')->prefix('admin')->name('admin.')->group(function () {
    // Full CRUD for all major resources
    Route::apiResource('users', UserController::class);
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