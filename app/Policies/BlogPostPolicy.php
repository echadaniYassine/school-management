<?php
namespace App\Policies;

use App\Enums\UserRole;
use App\Models\BlogPost;
use App\Models\User;

class BlogPostPolicy
{
    public function viewAny(?User $user): bool 
    { 
        return true; 
    }
    
    public function view(?User $user, BlogPost $blogPost): bool 
    { 
        return true; 
    }
    
    public function create(User $user): bool 
    { 
        return $user->role === UserRole::ADMIN; 
    }
    
    // FIXED: Only admin can update/delete blog posts, as per the original logic.
    public function update(User $user, BlogPost $blogPost): bool 
    { 
        return $user->role === UserRole::ADMIN; 
    }
    
    public function delete(User $user, BlogPost $blogPost): bool 
    { 
        return $user->role === UserRole::ADMIN; 
    }
}