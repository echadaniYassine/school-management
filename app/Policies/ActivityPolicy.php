<?php
namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Activity;
use App\Models\User;

class ActivityPolicy
{
    // Anyone, including guests (null user), can view activities.
    public function viewAny(?User $user): bool 
    { 
        return true; 
    }

    public function view(?User $user, Activity $activity): bool 
    { 
        return true; 
    }
    
    public function create(User $user): bool 
    {
        return in_array($user->role, [UserRole::ADMIN, UserRole::TEACHER]);
    }
    
    // The original author or an admin can update/delete.
    public function update(User $user, Activity $activity): bool 
    {
        return $user->id === $activity->author_id || $user->role === UserRole::ADMIN;
    }

    public function delete(User $user, Activity $activity): bool 
    {
        return $this->update($user, $activity);
    }
}