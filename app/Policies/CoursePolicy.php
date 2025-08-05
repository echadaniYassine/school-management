<?php

namespace App\Policies;

use App\Models\Course;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CoursePolicy
{
    use HandlesAuthorization;

    // Only an admin can perform any action on courses.
    public function before(User $user, string $ability): bool|null
    {
        if ($user->role->value === 'admin') {
            return true;
        }
        return null;
    }

    // A teacher can view a course if they teach it. A student if they are in its class.
    public function view(User $user, Course $course): bool
    {
        if ($user->role->value === 'teacher') {
            return $user->id === $course->teacher_id;
        }
        if ($user->role->value === 'student') {
            return $user->enrollments()->where('classroom_id', $course->classroom_id)->exists();
        }
        return false;
    }

    // Deny all other actions by default. The `before` method handles the admin case.
    public function create(User $user): bool
    {
        return false;
    }
    public function update(User $user, Course $course): bool
    {
        return false;
    }
    public function delete(User $user, Course $course): bool
    {
        return false;
    }
}
