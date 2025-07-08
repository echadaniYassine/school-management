<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Activity;
use App\Models\User;

class ActivityPolicy
{
    /**
     * Determine whether the user can view any models.
     * Anyone, including guests, can see the list of activities.
     */
    public function viewAny(?User $user): bool 
    { 
        return true; 
    }

    /**
     * Determine whether the user can view the model.
     * Anyone, including guests, can see a single activity.
     */
    public function view(?User $user, Activity $activity): bool 
    { 
        return true; 
    }
    
    /**
     * Determine whether the user can create models.
     * Both Admins and Teachers can create activities.
     */
    public function create(User $user): bool 
    {
        return in_array($user->role, [UserRole::ADMIN, UserRole::TEACHER]);
    }
    
    /**
     * Determine whether the user can update the model.
     * An Admin can update any activity. A Teacher can only update their own.
     */
    public function update(User $user, Activity $activity): bool 
    {
        return $user->role === UserRole::ADMIN || $user->id === $activity->author_id;
    }

    /**
     * Determine whether the user can delete the model.
     * The rules are the same as updating.
     */
    public function delete(User $user, Activity $activity): bool 
    {
        return $this->update($user, $activity); // Re-uses the update logic for consistency.
    }
}