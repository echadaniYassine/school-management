<?php
namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Exam;
use App\Models\User;

class ExamPolicy
{
    private function isTeacherOrAdmin(User $user): bool
    {
        return in_array($user->role, [UserRole::ADMIN, UserRole::TEACHER]);
    }

    public function viewAny(User $user): bool
    {
        return $this->isTeacherOrAdmin($user);
    }

    public function view(User $user, Exam $exam): bool
    {
        return $this->isTeacherOrAdmin($user);
    }

    public function create(User $user): bool
    {
        return $this->isTeacherOrAdmin($user);
    }

    public function update(User $user, Exam $exam): bool
    {
        return $user->role === UserRole::ADMIN || $user->id === $exam->author_id;
    }

    public function delete(User $user, Exam $exam): bool
    {
        return $this->update($user, $exam);
    }
}