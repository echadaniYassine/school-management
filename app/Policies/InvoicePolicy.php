<?php

namespace App\Policies;

use App\Models\Invoice;
use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Auth\Access\HandlesAuthorization;

class InvoicePolicy
{
    use HandlesAuthorization;

    // Admins can do anything with invoices
    public function before(User $user, string $ability): bool|null
    {
        if ($user->role instanceof UserRole) {
            if ($user->role->value === 'admin') {
                return true;
            }
        } elseif ($user->role === 'admin') {
            return true;
        }

        return null;
    }

    // Who can view all invoices
    public function viewAny(User $user): bool
    {
        $roleValue = $user->role instanceof UserRole ? $user->role->value : $user->role;

        // Only admins can view all invoices
        // Parents and students will have their own endpoints to view their invoices
        return $roleValue === 'admin';
    }

    // Who can view a specific invoice
    public function view(User $user, Invoice $invoice): bool
    {
        $roleValue = $user->role instanceof UserRole ? $user->role->value : $user->role;

        if ($roleValue === 'student') {
            return $user->id === $invoice->student_id;
        }

        if ($roleValue === 'parent') {
            // Assuming there's a parent-child relationship
            return $user->children()->where('id', $invoice->student_id)->exists();
        }

        return false;
    }

    // Who can create invoices
    public function create(User $user): bool
    {
        // Only handled by admin in the before() method
        return false;
    }

    // Who can update invoices
    public function update(User $user, Invoice $invoice): bool
    {
        // Only handled by admin in the before() method
        return false;
    }

    // Who can delete invoices
    public function delete(User $user, Invoice $invoice): bool
    {
        // Only handled by admin in the before() method
        return false;
    }
}
