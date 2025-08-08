<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{
    AuthController,
    ExamController,
    UserController,
    CourseController,
    PasswordController,
    ClassroomController,
    DashboardController,
    FinancialController,
    AssignmentController,
    ExamRecordController,
    AnnouncementController,
    SchoolStructureController
};

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/forgot-password', [PasswordController::class, 'sendResetLink'])->name('password.email');
Route::post('/reset-password', [PasswordController::class, 'resetPassword'])->name('password.store');

// Authenticated routes
Route::middleware('auth:sanctum')->group(function () {

    // User management
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/user', function (Request $request) {
        return new \App\Http\Resources\UserResource($request->user());
    })->name('me');

    // Read-only routes for authenticated users
    Route::get('/classrooms', [ClassroomController::class, 'index'])->name('classrooms.index');
    Route::get('/classrooms/{classroom}', [ClassroomController::class, 'show'])->name('classrooms.show');
    Route::get('/announcements', [AnnouncementController::class, 'index'])->name('announcements.index');
    Route::get('/announcements/{announcement}', [AnnouncementController::class, 'show'])->name('announcements.show');
    Route::get('/assignments', [AssignmentController::class, 'index'])->name('assignments.index');
    Route::get('/assignments/{assignment}', [AssignmentController::class, 'show'])->name('assignments.show');

    // Teacher routes
    Route::middleware('can:teacher')->prefix('teacher')->name('teacher.')->group(function () {
        Route::apiResource('assignments', AssignmentController::class)->except(['index', 'show']);
        Route::apiResource('exams', ExamController::class)->except(['index', 'show']);
        Route::apiResource('exam-records', ExamRecordController::class)->except(['index', 'show']);
        Route::apiResource('announcements', AnnouncementController::class)->except(['index', 'show']);
    });

    // Admin routes
    Route::middleware('can:admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard-stats', [DashboardController::class, 'getStats'])->name('dashboard.stats');

        // Full CRUD for admin resources
        Route::apiResource('users', UserController::class);
        Route::apiResource('courses', CourseController::class);
        Route::apiResource('classrooms', ClassroomController::class)->except(['index', 'show']);
        Route::apiResource('announcements', AnnouncementController::class)->except(['index', 'show']);

        // School structure management
        Route::get('structure/levels', [SchoolStructureController::class, 'getLevels'])->name('structure.levels');
        Route::get('structure/grades', [SchoolStructureController::class, 'getGrades'])->name('structure.grades');
        Route::get('structure/subjects', [SchoolStructureController::class, 'getSubjects'])->name('structure.subjects');

        // Financial management
        Route::prefix('financials')->name('financials.')->group(function () {
            Route::get('invoices', [FinancialController::class, 'index'])->name('invoices.index');
            Route::post('invoices', [FinancialController::class, 'store'])->name('invoices.store');
        });
    });

    // Parent routes
    Route::middleware('can:parent')->prefix('parent')->name('parent.')->group(function () {
        Route::get('/children', [UserController::class, 'getChildren'])->name('children');
        Route::get('/children/{child}/grades', [ExamRecordController::class, 'getChildGrades'])->name('child.grades');
        Route::get('/children/{child}/assignments', [AssignmentController::class, 'getChildAssignments'])->name('child.assignments');
    });
});
