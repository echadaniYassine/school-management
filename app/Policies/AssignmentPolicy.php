<?php

namespace App\Policies;

use App\Models\Assignment;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class AssignmentPolicy
{
    use HandlesAuthorization;

    // An admin can do anything.
    public function before(User $user, string $ability): bool|null
    {
        if ($user->role->value === 'admin') return true;
        return null; // Let other methods decide.
    }

    // A teacher can view assignments in their courses. A student in their class.
    public function view(User $user, Assignment $assignment): bool
    {
        if ($user->role->value === 'teacher') {
            return $user->id === $assignment->course->teacher_id;
        }
        if ($user->role->value === 'student') {
            return $user->enrollments()->where('classroom_id', $assignment->course->classroom_id)->exists();
        }
        return false;
    }

    // Only the teacher of the course can create an assignment for it.
    public function create(User $user): bool
    {
        // This is better handled in the StoreAssignmentRequest where we have the course_id.
        return $user->role->value === 'teacher';
    }

    // Only the teacher who created the assignment can update it.
    public function update(User $user, Assignment $assignment): bool
    {
        return $user->id === $assignment->course->teacher_id;
    }

    public function delete(User $user, Assignment $assignment): bool
    {
        return $this->update($user, $assignment);
    }
}
