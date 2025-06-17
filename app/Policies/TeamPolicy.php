<?php
namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Team;
use App\Models\User;

class TeamPolicy
{
    public function viewAny(User $user): bool { return $user->role === UserRole::ADMIN; }
    public function view(User $user, Team $team): bool { return $user->role === UserRole::ADMIN; }
    public function create(User $user): bool { return $user->role === UserRole::ADMIN; }
    public function update(User $user, Team $team): bool { return $user->role === UserRole::ADMIN; }
    public function delete(User $user, Team $team): bool { return $user->role === UserRole::ADMIN; }
}