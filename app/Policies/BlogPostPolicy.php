<?php

namespace App\Policies;

use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class BlogPostPolicy
{
    /**
     * Pre-authorization check for admins.
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
     * Publicly viewable.
     */
    public function viewAny(?User $user): bool // Note: ?User allows guests to view
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     * Publicly viewable.
     */
    public function view(?User $user, BlogPost $blogPost): bool // Guests can view
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     * Any authenticated user can create a blog post.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     * Only the author can update their own post.
     */
    public function update(User $user, BlogPost $blogPost): bool
    {
        return $user->id === $blogPost->author_id;
    }

    /**
     * Determine whether the user can delete the model.
     * Only the author can delete their own post.
     */
    public function delete(User $user, BlogPost $blogPost): bool
    {
        return $user->id === $blogPost->author_id;
    }
}