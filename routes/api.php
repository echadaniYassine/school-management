<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\TeacherController;
use App\Http\Controllers\StudentParentController;
use App\Http\Controllers\Admin\ActivityController;
use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\Admin\AssignmentController;
use App\Http\Controllers\Admin\NotificationController;

// Authenticated user info
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/me', function (Request $request) {
        return $request->user();
    });
});


// Load role-based routes
require __DIR__ . '/student.php';
require __DIR__ . '/teacher.php';
require __DIR__ . '/admin.php';


Route::apiResource('courses', CourseController::class)->only(['index', 'show']);
Route::apiResource('blog-posts', BlogPostController::class)->only(['index', 'show']);
Route::apiResource('assignments', AssignmentController::class)->only(['index', 'show']);
Route::apiResource('activities', ActivityController::class)->only(['index', 'show']);

// Auth (login/register/password)
require __DIR__ . '/auth.php';
