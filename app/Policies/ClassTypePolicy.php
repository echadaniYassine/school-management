<?php
namespace App\Policies;

use App\Enums\UserRole;
use App\Models\ClassType;
use App\Models\User;

class ClassTypePolicy
{
    public function viewAny(User $user): bool { return $user->role === UserRole::ADMIN; }
    public function view(User $user, ClassType $classType): bool { return $user->role === UserRole::ADMIN; }
    public function create(User $user): bool { return $user->role === UserRole::ADMIN; }
    public function update(User $user, ClassType $classType): bool { return $user->role === UserRole::ADMIN; }
    public function delete(User $user, ClassType $classType): bool { return $user->role === UserRole::ADMIN; }
}