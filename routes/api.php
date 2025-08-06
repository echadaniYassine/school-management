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
    Route::middleware('can:teacher')->prefix('teacher')->name('teacher.')->group(function () {
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



// Temporarily register the gate here for testing
use Illuminate\Support\Facades\Gate;
use App\Enums\UserRole;

Gate::define('admin', function (\App\Models\User $user) {
    if ($user->role instanceof UserRole) {
        return $user->role->value === 'admin';
    }
    return false;
});

// Add this temporary route to your api.php for debugging
Route::middleware('auth:sanctum')->get('/debug-user', function (Request $request) {
    $user = $request->user();

    return response()->json([
        'user_id' => $user->id,
        'user_email' => $user->email,
        'role' => $user->role,
        'role_value' => $user->role->value ?? 'NO_VALUE',
        'role_type' => gettype($user->role),
        'is_admin_gate' => $user->can('admin'),
        'can_view_any_users' => $user->can('viewAny', \App\Models\User::class),
        'raw_role' => $user->getRawOriginal('role'), // Get the actual DB value
        'role_is_instance_of_enum' => $user->role instanceof \App\Enums\UserRole,
        'role_equals_admin_string' => $user->role === 'admin',
        'gate_exists_now' => Gate::has('admin'),
    ]);
});

// Add this to your api.php routes file
Route::middleware('auth:sanctum')->get('/debug-detailed', function (Request $request) {
    $user = $request->user();

    // Test the gate logic manually
    $roleInstance = $user->role instanceof \App\Enums\UserRole;
    $roleValue = $roleInstance ? $user->role->value : 'NO_VALUE';
    $valueEquals = $roleValue === 'admin';

    return response()->json([
        'user_id' => $user->id,
        'role' => $user->role,
        'role_class' => get_class($user->role),
        'role_is_instance_of_enum' => $roleInstance,
        'role_value' => $roleValue,
        'role_value_equals_admin' => $valueEquals,
        'manual_gate_test' => $roleInstance && $valueEquals,
        'laravel_gate_result' => $user->can('admin'),
        'gate_exists' => \Illuminate\Support\Facades\Gate::has('admin'),
    ]);
});
