<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Admin\ActivityController;
use App\Http\Controllers\Admin\AssignmentController;
use App\Http\Controllers\Admin\BlogPostController;

Route::middleware(['auth:sanctum', 'ability:teacher'])->prefix('teacher')->group(function () {
    Route::apiResource('courses', CourseController::class);
    Route::apiResource('activities', ActivityController::class);
    Route::apiResource('assignments', AssignmentController::class);
    Route::apiResource('blog-posts', BlogPostController::class);
});
