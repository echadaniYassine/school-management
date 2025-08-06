<?php

namespace App\Policies;

use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    // Admins can do anything.
    public function before(User $user, string $ability): bool|null
    {
        // Handle both enum and string cases for admin check
        if ($user->role instanceof UserRole) {
            if ($user->role === UserRole::ADMIN) {
                return true;
            }
        } elseif ($user->role === 'admin') {
            return true;
        }
        
        return null;
    }

    // A user can always view their own profile.
    // This method is now only checked for non-admins.
    public function viewAny(User $user): bool
    {
        // For non-admins, deny access to view all users
        return false;
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