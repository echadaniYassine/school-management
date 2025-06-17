<?php
namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Assignment;
use App\Models\User;

class AssignmentPolicy
{
    public function viewAny(?User $user): bool 
    { 
        return true; 
    }
    
    public function view(?User $user, Assignment $assignment): bool 
    { 
        return true; 
    }
    
    public function create(User $user): bool 
    { 
        return in_array($user->role, [UserRole::ADMIN, UserRole::TEACHER]); 
    }
    
    public function update(User $user, Assignment $assignment): bool 
    { 
        return $user->id === $assignment->author_id || $user->role === UserRole::ADMIN; 
    }
    
    public function delete(User $user, Assignment $assignment): bool 
    { 
        return $this->update($user, $assignment); 
    }
}