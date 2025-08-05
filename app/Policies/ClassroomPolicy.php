<?php

namespace App\Policies;

use App\Models\Classroom;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ClassroomPolicy
{
    use HandlesAuthorization;

    public function before(User $user, string $ability): bool|null
    {
        if ($user->role->value === 'admin') return true;
        return null;
    }

    // A teacher can view a classroom if they are the main teacher.
    // A student can view the classroom they are enrolled in.
    public function view(User $user, Classroom $classroom): bool
    {
        if ($user->role->value === 'teacher') {
            return $user->id === $classroom->main_teacher_id;
        }
        if ($user->role->value === 'student') {
            return $user->enrollments()->where('classroom_id', $classroom->id)->exists();
        }
        return false;
    }

    // Deny create/update/delete to non-admins by default.
    public function create(User $user): bool
    {
        return false;
    }
    public function update(User $user, Classroom $classroom): bool
    {
        return false;
    }
    public function delete(User $user, Classroom $classroom): bool
    {
        return false;
    }
}
