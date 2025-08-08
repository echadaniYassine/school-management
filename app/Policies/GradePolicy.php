<?php

namespace App\Policies;

use App\Models\Grade;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class GradePolicy
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
        return in_array($user->role->value, ['teacher', 'student']);
    }

    public function view(User $user, Grade $grade): bool
    {
        return in_array($user->role->value, ['teacher', 'student']);
    }

    public function create(User $user): bool
    {
        return false; // Only admins
    }

    public function update(User $user, Grade $grade): bool
    {
        return false; // Only admins
    }

    public function delete(User $user, Grade $grade): bool
    {
        return false; // Only admins
    }
}
