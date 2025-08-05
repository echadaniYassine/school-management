<?php

namespace App\Policies;

use App\Models\Level; // Change this to the specific model (e.g., Payment, Level)
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class LevelPolicy // Change this to the specific Policy name (e.g., PaymentPolicy)
{
    use HandlesAuthorization;

    /**
     * Perform pre-authorization checks.
     * This method runs before any other method in the policy.
     */
    public function before(User $user, string $ability): bool|null
    {
        // If the user is an admin, they are granted all permissions immediately.
        if ($user->role->value === 'admin') {
            return true;
        }
        return null; // Let other methods decide for non-admins.
    }

    // By default, deny all actions for non-admins.
    // The `before` method will have already granted access to admins.
    public function viewAny(User $user): bool
    {
        return false;
    }
    public function view(User $user, Level $invoice): bool
    {
        return false;
    } // Change Invoice to the model
    public function create(User $user): bool
    {
        return false;
    }
    public function update(User $user, Level $invoice): bool
    {
        return false;
    } // Change Invoice to the model
    public function delete(User $user, Level $invoice): bool
    {
        return false;
    } // Change Invoice to the model
}
