<?php

use App\Http\Controllers\Api\ActivityController;
use App\Http\Controllers\Api\AssignmentController;
use App\Http\Controllers\Api\BlogPostController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//======================================================================
// PUBLIC ROUTES (No Authentication Required)
// Access is controlled by the `viewAny` and `view` methods in policies,
// which are automatically checked by authorizeResource in controllers.
//======================================================================

// Courses
Route::get('/courses', [CourseController::class, 'index'])->name('public.courses.index');
Route::get('/courses/{course}', [CourseController::class, 'show'])->name('public.courses.show');

// Blog Posts
Route::get('/blog-posts', [BlogPostController::class, 'index'])->name('public.blog-posts.index');
Route::get('/blog-posts/{blog_post}', [BlogPostController::class, 'show'])->name('public.blog-posts.show');

// Activities
Route::get('/activities', [ActivityController::class, 'index'])->name('public.activities.index');
Route::get('/activities/{activity}', [ActivityController::class, 'show'])->name('public.activities.show');

// Assignments
Route::get('/assignments', [AssignmentController::class, 'index'])->name('public.assignments.index');
Route::get('/assignments/{assignment}', [AssignmentController::class, 'show'])->name('public.assignments.show');
Route::get('/assignments/{assignment}/download', [AssignmentController::class, 'downloadInstructions'])->name('public.assignments.download');


//======================================================================
// AUTHENTICATION ROUTES (Login, Register, etc.)
//======================================================================
require __DIR__ . '/auth.php';

//======================================================================
// AUTHENTICATED & ROLE-BASED ROUTES
//======================================================================
Route::middleware('auth:sanctum')->group(function () {
    // Get the current authenticated user
    Route::get('/me', fn(Request $request) => new UserResource($request->user()))->name('me');

    // Load role-specific route files
    require __DIR__ . '/admin.php';
    require __DIR__ . '/teacher.php';
    require __DIR__ . '/student.php';
    // Add other role-specific route files if needed (e.g., parent.php)
});