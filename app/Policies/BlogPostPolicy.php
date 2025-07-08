<?php

namespace App\Policies;

use App\Enums\UserRole; // Make sure you have this Enum or use strings 'admin', 'teacher'
use App\Models\BlogPost;
use App\Models\User;

class BlogPostPolicy
{
    /**
     * Determine whether the user can view any models.
     * Anyone, including guests, can see the list of blog posts.
     */
    public function viewAny(?User $user): bool 
    { 
        return true; 
    }
    
    /**
     * Determine whether the user can view the model.
     * Anyone, including guests, can see a single blog post.
     */
    public function view(?User $user, BlogPost $blogPost): bool 
    { 
        return true; 
    }
    
    /**
     * Determine whether the user can create models.
     * --- UPDATED: Both Admins and Teachers can now create blog posts. ---
     */
    public function create(User $user): bool 
    { 
        return in_array($user->role, [UserRole::ADMIN, UserRole::TEACHER]);
    }
    
    /**
     * Determine whether the user can update the model.
     * --- UPDATED: An Admin can update any post. A Teacher can only update their own. ---
     */
    public function update(User $user, BlogPost $blogPost): bool 
    { 
        // An admin has universal update permission.
        if ($user->role === UserRole::ADMIN) {
            return true;
        }

        // A teacher can only update a post they authored.
        if ($user->role === UserRole::TEACHER) {
            return $user->id === $blogPost->author_id;
        }

        return false;
    }
    
    /**
     * Determine whether the user can delete the model.
     * --- UPDATED: Re-uses the same logic as the update method. ---
     */
    public function delete(User $user, BlogPost $blogPost): bool 
    { 
        // A user can delete a post if they are allowed to update it.
        return $this->update($user, $blogPost);
    }
}