<?php

namespace App\Policies;

use App\Models\Activity;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ActivityPolicy
{
    /**
     * Pre-authorization check for admins.
     * Admins can perform any action on any activity.
     */
    public function before(User $user, string $ability): bool|null
    {
        if ($user->isAdmin()) {
            return true;
        }
        return null; // Let the specific method below decide for other roles
    }

    /**
     * Determine whether the user can view any models.
     * Anyone can view the list of activities.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     * Anyone can view a single activity.
     */
    public function view(User $user, Activity $activity): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     * Only Admins (handled by `before`) and Teachers can create activities.
     */
    public function create(User $user): bool
    {
        return $user->isTeacher();
    }

    /**
     * Determine whether the user can update the model.
     * Only Admins (handled by `before`) and Teachers can update activities.
     */
    public function update(User $user, Activity $activity): bool
    {
        return $user->isTeacher();
    }

    /**
     * Determine whether the user can delete the model.
     * Only Admins (handled by `before`) and Teachers can delete activities.
     */
    public function delete(User $user, Activity $activity): bool
    {
        return $user->isTeacher();
    }

    // Methods for soft deletes, not strictly required but good practice
    public function restore(User $user, Activity $activity): bool
    {
        return $user->isTeacher();
    }

    public function forceDelete(User $user, Activity $activity): bool
    {
        return $user->isTeacher();
    }
}