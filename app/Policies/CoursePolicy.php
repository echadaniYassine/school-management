<?php
namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Course;
use App\Models\User;

class CoursePolicy
{
    public function viewAny(?User $user): bool 
    { 
        return true; 
    }
    
    public function view(?User $user, Course $course): bool 
    { 
        return true; 
    }
    
    public function create(User $user): bool 
    { 
        return $user->role === UserRole::ADMIN; 
    }
    
    // FIXED: Corrected model type hint from User to Course.
    public function update(User $user, Course $course): bool 
    { 
        return $user->role === UserRole::ADMIN; 
    }
    
    public function delete(User $user, Course $course): bool 
    { 
        return $user->role === UserRole::ADMIN; 
    }
}