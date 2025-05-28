<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\TeacherController;
use App\Http\Controllers\StudentParentController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Admin\ActivityController;
use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\Admin\AssignmentController;

Route::middleware(['auth:sanctum', 'ability:admin'])->prefix('admin')->group(function () {
    Route::apiResources([
        'parents' => StudentParentController::class,
        'students' => StudentController::class,
        'courses' => CourseController::class,
        'teachers' => TeacherController::class,
        'activities' => ActivityController::class,
        'blog-posts' => BlogPostController::class,
        'assignments' => AssignmentController::class,
    ]);

    Route::apiResource('categories', CategoryController::class)->only(['index']);

    // Settings
    Route::get('system-settings', [SettingController::class, 'index']);
    Route::put('system-settings/{section}', [SettingController::class, 'updateSection']);
    Route::post('system-actions/clear-cache', [SettingController::class, 'clearCache']);
});
