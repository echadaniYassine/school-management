<?php

namespace App\Policies;

use App\Models\Subject;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class SubjectPolicy
{
    use HandlesAuthorization;

    public function before(User $user, string $ability): bool|null
    {
        if ($user->role->value === 'admin') {
            return true;
        }
        return null;
    }

    public function viewAny(User $user): bool
    {
        // Teachers and students can view subjects
        return in_array($user->role->value, ['teacher', 'student']);
    }

    public function view(User $user, Subject $subject): bool
    {
        return in_array($user->role->value, ['teacher', 'student']);
    }

    public function create(User $user): bool
    {
        return false; // Only admins (handled by before())
    }

    public function update(User $user, Subject $subject): bool
    {
        return false; // Only admins (handled by before())
    }

    public function delete(User $user, Subject $subject): bool
    {
        return false; // Only admins (handled by before())
    }
}
