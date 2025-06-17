<?php
use Illuminate\Support\Facades\Route;

// All routes here are automatically prefixed with '/student' and require STUDENT role.
Route::middleware('role:student')->prefix('student')->name('student.')->group(function () {
    // Students can only view (index/show) these resources.
    Route::apiResource('courses', \App\Http\Controllers\Api\CourseController::class)->only(['index', 'show']);
    Route::apiResource('activities', \App\Http\Controllers\Api\ActivityController::class)->only(['index', 'show']);
    Route::apiResource('assignments', \App\Http\Controllers\Api\AssignmentController::class)->only(['index', 'show']);
    Route::apiResource('blog-posts', \App\Http\Controllers\Api\BlogPostController::class)->only(['index', 'show']);

    // Special routes
    Route::get('assignments/{assignment}/download', [\App\Http\Controllers\Api\AssignmentController::class, 'downloadInstructions'])->name('assignments.download');
});