<?php
use Illuminate\Support\Facades\Route;

// All routes here are automatically prefixed with '/student' and require STUDENT role.
Route::middleware('role:student')->prefix('student')->name('student.')->group(function () {
  // There are no student-only routes at the moment, as all read actions
    // are handled by the public routes in api.php.

    // If a student-only action is needed in the future, it would go here.
    // For example:
    // Route::post('assignments/{assignment}/submit', [SubmissionController::class, 'store'])->name('assignments.submit');
});