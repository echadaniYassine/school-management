<?php

namespace App\Policies;

use App\Models\Assignment;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class AssignmentPolicy
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
     * Anyone can view the list of assignments (we can filter in the controller).
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     * For now, we'll let any authenticated user view the details.
     * You could add more complex logic here (e.g., check if the student is in the course).
     */
    public function view(User $user, Assignment $assignment): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     * Only teachers can create assignments.
     */
    public function create(User $user): bool
    {
        return $user->isTeacher();
    }

    /**
     * Determine whether the user can update the model.
     * Only the user who created the assignment can update it.
     */
    public function update(User $user, Assignment $assignment): bool
    {
        return $user->id === $assignment->created_by_id;
    }

    /**
     * Determine whether the user can delete the model.
     * Only the user who created the assignment can delete it.
     */
    public function delete(User $user, Assignment $assignment): bool
    {
        return $user->id === $assignment->created_by_id;
    }
}