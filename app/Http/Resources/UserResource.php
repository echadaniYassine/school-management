<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $user = auth()->user();

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role,
            'isActive' => $this->is_active,
            'createdAt' => $this->created_at,

            // Conditional fields based on permissions
            'phone' => $this->when(
                $user && ($user->can('admin') || $user->id === $this->id),
                $this->phone
            ),
            'address' => $this->when(
                $user && ($user->can('admin') || $user->id === $this->id),
                $this->address
            ),
            'dateOfBirth' => $this->when(
                $user && ($user->can('admin') || $user->id === $this->id),
                $this->date_of_birth?->format('Y-m-d')
            ),
            'gender' => $this->when(
                $user && ($user->can('admin') || $user->id === $this->id),
                $this->gender
            ),
            'lastLoginAt' => $this->when(
                $user && $user->can('admin'),
                $this->last_login_at
            ),
        ];
    }
}
