<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Import all your final, versioned controllers
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\PasswordController;
use App\Http\Controllers\Api\V1\DashboardController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\ClassroomController;
use App\Http\Controllers\Api\V1\CourseController;
use App\Http\Controllers\Api\V1\AssignmentController;
use App\Http\Controllers\Api\V1\ExamController;
use App\Http\Controllers\Api\V1\ExamRecordController;
use App\Http\Controllers\Api\V1\AnnouncementController;
use App\Http\Controllers\Api\V1\SchoolStructureController;
use App\Http\Controllers\Api\V1\FinancialController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Your API routes are automatically prefixed with '/api/v1/' by the
| RouteServiceProvider. This is the single source of truth for your API.
|
*/

//======================================================================
// PUBLIC ROUTES (No Authentication Required)
//======================================================================

// --- Authentication & Password Reset ---
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/forgot-password', [PasswordController::class, 'sendResetLink'])->name('password.email');
Route::post('/reset-password', [PasswordController::class, 'resetPassword'])->name('password.store');


//======================================================================
// AUTHENTICATED ROUTES (A Valid Sanctum Token is Required)
//======================================================================
Route::middleware('auth:sanctum')->group(function () {
    
    // --- User-Specific Routes ---
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/user', function (Request $request) {
        // Return the currently authenticated user's data.
        return new \App\Http\Resources\UserResource($request->user());
    })->name('me');

    
    // --- General Read-Only Routes (for All Roles) ---
    // Authorization is handled inside each controller method or by a Policy.
    Route::get('/classrooms', [ClassroomController::class, 'index'])->name('classrooms.index');
    Route::get('/classrooms/{classroom}', [ClassroomController::class, 'show'])->name('classrooms.show');
    
    Route::get('/announcements', [AnnouncementController::class, 'index'])->name('announcements.index');
    Route::get('/announcements/{announcement}', [AnnouncementController::class, 'show'])->name('announcements.show');
    
    Route::get('/assignments', [AssignmentController::class, 'index'])->name('assignments.index');
    Route::get('/assignments/{assignment}', [AssignmentController::class, 'show'])->name('assignments.show');


    // --- Teacher & Admin Routes ---
    // These routes are accessible to both teachers and admins.
    // The specific permissions are handled by Policies.
    Route::post('/announcements', [AnnouncementController::class, 'store'])->name('announcements.store');
    Route::patch('/announcements/{announcement}', [AnnouncementController::class, 'update'])->name('announcements.update');
    Route::delete('/announcements/{announcement}', [AnnouncementController::class, 'destroy'])->name('announcements.destroy');

    Route::apiResource('exams', ExamController::class);
    Route::post('/exam-records', [ExamRecordController::class, 'store'])->name('exam-records.store');
    Route::patch('/exam-records/{record}', [ExamRecordController::class, 'update'])->name('exam-records.update');


    // --- Teacher-Only Routes ---
    Route::middleware('can:teacher')->prefix('teacher')->name('teacher.')->group(function() {
        // Example: Get all courses assigned to the currently authenticated teacher.
        // Route::get('/my-courses', [TeacherDashboardController::class, 'getMyCourses']);
        Route::post('/assignments', [AssignmentController::class, 'store'])->name('assignments.store');
        Route::patch('/assignments/{assignment}', [AssignmentController::class, 'update'])->name('assignments.update');
        Route::delete('/assignments/{assignment}', [AssignmentController::class, 'destroy'])->name('assignments.destroy');
    });


    // --- Admin-Only Routes ---
    // We use the 'admin' Gate we defined in AuthServiceProvider.
    Route::middleware('can:admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard-stats', [DashboardController::class, 'getStats'])->name('dashboard.stats');
        
        // Full management of users and school structure
        Route::apiResource('users', UserController::class);
        Route::apiResource('courses', CourseController::class);
        
        // Endpoints to manage the school's structure
        Route::get('structure/levels', [SchoolStructureController::class, 'getLevels'])->name('structure.levels');
        Route::get('structure/grades', [SchoolStructureController::class, 'getGrades'])->name('structure.grades');
        Route::get('structure/subjects', [SchoolStructureController::class, 'getSubjects'])->name('structure.subjects');

        // Endpoints to manage finances
        Route::get('financials/invoices', [FinancialController::class, 'index'])->name('financials.invoices');
        Route::post('financials/invoices', [FinancialController::class, 'store'])->name('financials.invoices.store');
    });

});