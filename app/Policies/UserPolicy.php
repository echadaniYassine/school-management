<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    // Admins can do anything.
    public function before(User $user, string $ability): bool|null
    {
        if ($user->role->value === 'admin') {
            return true;
        }
        return null;
    }

    // A user can always view their own profile.
    public function view(User $user, User $model): bool
    {
        return $user->id === $model->id;
    }

    public function create(User $user): bool
    {
        return false; // Denied by default, handled by admin `before` hook.
    }

    // A user can update their own profile. Admin can update any.
    public function update(User $user, User $model): bool
    {
        return $user->id === $model->id;
    }

    public function delete(User $user, User $model): bool
    {
        return false; // Denied by default, handled by admin `before` hook.
    }
}
