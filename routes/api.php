<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentParentController;

// Student-only routes
Route::prefix('student')->middleware(['auth:sanctum', 'ability:student'])->group(function () {
    Route::get('/', function (Request $request) {
        return $request->user();
    });
});

// Admin-only routes
Route::prefix('admin')->middleware(['auth:sanctum', 'ability:admin'])->group(function () {
    Route::get('/', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('parents', StudentParentController::class);
});

// Teacher-only routes
Route::prefix('teacher')->middleware(['auth:sanctum', 'ability:teacher'])->group(function () {
    Route::get('/', function (Request $request) {
        return $request->user();
    });
});

require __DIR__ . '/auth.php';
