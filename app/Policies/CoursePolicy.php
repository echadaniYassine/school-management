<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Course;
use App\Models\User;

class CoursePolicy
{
    public function viewAny(?User $user): bool
    {
        return true;
    }

    public function view(?User $user, Course $course): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return in_array($user->role, [UserRole::ADMIN, UserRole::TEACHER]);
    }

    public function update(User $user, Course $course): bool
    {
        if ($user->role === UserRole::ADMIN) {
            return true;
        }

        // --- FIX: Changed 'user_id' to 'author_id' to match the updated model and migration. ---
        if ($user->role === UserRole::TEACHER) {
            return $user->id === $course->author_id;
        }

        return false;
    }

    public function delete(User $user, Course $course): bool
    {
        // This now correctly re-uses the updated logic from the 'update' method.
        return $this->update($user, $course);
    }
}