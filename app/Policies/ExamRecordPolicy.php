<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Exam;
use App\Models\ExamRecord;
use App\Models\User;

class ExamRecordPolicy
{
    private function isTeacherOrAdmin(User $user): bool
    {
        return in_array($user->role, [UserRole::ADMIN, UserRole::TEACHER]);
    }

    // Must be a teacher/admin to view records for a given exam
    public function viewAny(User $user, Exam $exam): bool
    {
        return $this->isTeacherOrAdmin($user);
    }

    // Must be a teacher/admin to view a single record
    public function view(User $user, ExamRecord $record): bool
    {
        return $this->isTeacherOrAdmin($user);
    }

    // Must be a teacher/admin to create a record for a given exam
    public function create(User $user, Exam $exam): bool
    {
        return $this->isTeacherOrAdmin($user);
    }

    // Only the original grader or an admin can update
    public function update(User $user, ExamRecord $record): bool
    {
        return $user->role === UserRole::ADMIN || $user->id === $record->author_id;
    }

    public function delete(User $user, ExamRecord $record): bool
    {
        return $this->update($user, $record);
    }
}