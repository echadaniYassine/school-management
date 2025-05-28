<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Admin\ActivityController;
use App\Http\Controllers\Admin\AssignmentController;
use App\Http\Controllers\Admin\BlogPostController;

Route::middleware(['auth:sanctum', 'ability:student'])->prefix('student')->group(function () {
    Route::apiResource('courses', CourseController::class)->only(['index', 'show']);
    Route::apiResource('activities', ActivityController::class)->only(['index', 'show']);
    Route::apiResource('assignments', AssignmentController::class)->only(['index', 'show']);
    Route::apiResource('blog-posts', BlogPostController::class)->only(['index', 'show']);
});
