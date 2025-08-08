<?php

namespace App\Policies;

use App\Models\Course;
use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Auth\Access\HandlesAuthorization;

class CoursePolicy
{
    use HandlesAuthorization;

    // Only an admin can perform any action on courses.
    public function before(User $user, string $ability): bool|null
    {
        // Handle both enum and string cases for admin check
        if ($user->role instanceof UserRole) {
            if ($user->role->value === 'admin') {
                return true;
            }
        } elseif ($user->role === 'admin') {
            return true;
        }

        return null; // Continue to individual policy methods
    }

    // ADD THIS METHOD - it was missing!
    public function viewAny(User $user): bool
    {
        // Teachers can view courses they teach
        // Students can view courses in their enrolled classrooms
        // Parents can view courses of their children's classrooms
        return in_array($user->role->value ?? $user->role, ['teacher', 'student', 'parent']);
    }

    // A teacher can view a course if they teach it. A student if they are in its class.
    public function view(User $user, Course $course): bool
    {
        $roleValue = $user->role instanceof UserRole ? $user->role->value : $user->role;

        if ($roleValue === 'teacher') {
            return $user->id === $course->teacher_id;
        }
        if ($roleValue === 'student') {
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
