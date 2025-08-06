<?php

namespace App\Enums;

enum UserRole: string
{
    case ADMIN = 'admin';
    case TEACHER = 'teacher';
    case STUDENT = 'student';
    case PARENT = 'parent';

    // Optional: Add a helper method for easier comparison
    public function isAdmin(): bool
    {
        return $this === self::ADMIN;
    }
}