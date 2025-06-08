<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    /**
     * Grant all permissions to admins.
     */
    public function before(User $user, string $ability): bool|null
    {
        if ($user->isAdmin()) {
            return true;
        }
        return null;
    }

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        // Only admins and teachers can see the list of all users.
        return $user->isAdmin() || $user->isTeacher();
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, User $model): bool
    {
        // Admins/teachers can see anyone. A user can see their own profile.
        return $user->isAdmin() || $user->isTeacher() || $user->id === $model->id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        // Only admins can create new users.
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, User $model): bool
    {
        // Admins can update anyone. A user can update their own profile.
        return $user->isAdmin() || $user->id === $model->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function destroy(User $user, User $model): bool
    {
        // Only admins can delete users, and they can't delete themselves.
        return $user->isAdmin() && $user->id !== $model->id;
    }
}