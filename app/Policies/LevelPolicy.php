<?php

namespace App\Policies;

use App\Models\Level;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class LevelPolicy
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

    public function view(User $user, Level $level): bool
    {
        return in_array($user->role->value, ['teacher', 'student']);
    }

    public function create(User $user): bool
    {
        return false; // Only admins
    }

    public function update(User $user, Level $level): bool
    {
        return false; // Only admins
    }

    public function delete(User $user, Level $level): bool
    {
        return false; // Only admins
    }
}
