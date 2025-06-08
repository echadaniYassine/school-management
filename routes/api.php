<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\Api\ChatController; // Assuming this is where we put it

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| These routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group.
|
*/

// --- Public / Guest Routes ---
// Authentication routes (login, register, forgot password, etc.)
// These must be accessible to guests.
require __DIR__ . '/auth.php';

// --- Authenticated User Routes ---
// All routes within this group require a valid Sanctum token.
Route::middleware(['auth:sanctum'])->group(function () {

    // Route to get the currently logged-in user's information
    Route::get('/me', function (Request $request) {
        // We load profiles to ensure the frontend has all necessary data
        $user = $request->user();
        if ($user->isStudent()) $user->load('studentProfile.parent');
        if ($user->isTeacher()) $user->load('teacherProfile');
        return new \App\Http\Resources\UserResource($user);
    });

    /*
     * Resourceful Routes
     * Authorization is handled by the Policies (e.g., UserPolicy, CoursePolicy)
     * which are called from each controller's __construct() method.
     */
    Route::apiResource('users', UserController::class); // Manages Admins, Teachers, Students, Parents
    Route::apiResource('courses', CourseController::class);
    Route::apiResource('activities', ActivityController::class);
    Route::apiResource('assignments', AssignmentController::class);
    Route::apiResource('blog-posts', BlogPostController::class);
    // Route::apiResource('categories', CategoryController::class); // Adjust permissions in policy as needed

    // Special single-action routes
    Route::get('/assignments/{assignment}/download-instructions', [AssignmentController::class, 'downloadInstructions'])
         ->name('assignments.downloadInstructions');

    /*
     * Settings Routes (Protected by a Gate/Policy inside the controller)
     */
    // Route::get('settings', [SettingController::class, 'index'])->name('settings.index');
    // Route::put('settings/{section}', [SettingController::class, 'updateSection'])->name('settings.updateSection');
    // Route::post('settings/actions/clear-cache', [SettingController::class, 'clearCache'])->name('settings.clearCache');
    
    /*
     * Chat Routes
     * Everyone can contact everyone, so these are available to all authenticated users.
     */
    // Route::prefix('chat')->name('chat.')->group(function () {
    //     Route::get('/users', [ChatController::class, 'getUsers'])->name('users.index');
    //     Route::get('/conversations', [ChatController::class, 'getConversations'])->name('conversations.index');
    //     Route::post('/conversations', [ChatController::class, 'createConversation'])->name('conversations.store');
    //     Route::get('/conversations/{conversation}/messages', [ChatController::class, 'getMessages'])->name('messages.index');
    //     Route::post('/conversations/{conversation}/messages', [ChatController::class, 'storeTextMessage'])->name('messages.store.text');
    //     Route::post('/conversations/{conversation}/messages/audio', [ChatController::class, 'storeAudioMessage'])->name('messages.store.audio');
    // });

});