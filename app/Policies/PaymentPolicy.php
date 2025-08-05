<?php

namespace App\Policies;

use App\Models\Payment; // Change this to the specific model (e.g., Payment, Level)
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PaymentPolicy // Change this to the specific Policy name (e.g., PaymentPolicy)
{
    use HandlesAuthorization;

    /**
     * Perform pre-authorization checks.
     * This method runs before any other method in the policy.
     */
    public function before(User $user, string $ability): bool|null
    {
        if ($user->role->value === 'admin') return true; // Admins can still do anything.
        return null;
    }

    // By default, deny all actions for non-admins.
    // The `before` method will have already granted access to admins.
    public function viewAny(User $user): bool
    {
        return $user->role->value === 'parent';
    }
    public function view(User $user, Payment $payment): bool
    {
        // Deny if the user is not a parent.
        if ($user->role->value !== 'parent') {
            return false;
        }

        // Eager load the invoice and the student associated with it for efficiency.
        $payment->load('invoice.student');

        // Allow if the authenticated user is a guardian of the student on the invoice.
        return $payment->invoice->student->guardians()->where('guardian_id', $user->id)->exists();
    }
    public function create(User $user): bool
    {
        return $user->role->value === 'parent';
    }
    public function update(User $user, Payment $invoice): bool
    {
        return false;
    } // Change Invoice to the model
    public function delete(User $user, Payment $invoice): bool
    {
        return false;
    } // Change Invoice to the model
}
