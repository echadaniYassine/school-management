<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ActivityController;
use App\Http\Controllers\Api\AssignmentController;

// All routes here are automatically prefixed with '/api/teacher' and require TEACHER role.
Route::middleware('role:teacher')->prefix('teacher')->name('teacher.')->group(function () {

    Route::apiResource('activities', ActivityController::class);
    Route::apiResource('assignments', AssignmentController::class);
});
