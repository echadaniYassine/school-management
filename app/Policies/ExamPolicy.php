<?php

namespace App\Policies;

use App\Models\Exam;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ExamPolicy
{
    use HandlesAuthorization;

    public function before(User $user, string $ability): bool|null
    {
        if ($user->role->value === 'admin') return true;
        return null;
    }

    public function view(User $user, Exam $exam): bool
    {
        // Logic for viewing an exam would be similar to viewing a course.
        return $user->id === $exam->course->teacher_id ||
            $user->enrollments()->where('classroom_id', $exam->course->classroom_id)->exists();
    }

    public function create(User $user): bool
    {
        return $user->role->value === 'teacher';
    }

    public function update(User $user, Exam $exam): bool
    {
        // THE FIX: Check against the course's teacher_id
        return $user->id === $exam->course->teacher_id;
    }

    public function delete(User $user, Exam $exam): bool
    {
        return $this->update($user, $exam);
    }
}
