<?php

namespace App\Policies;

use App\Models\Exam;
use App\Models\ExamRecord;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ExamRecordPolicy
{
    use HandlesAuthorization;

    public function before(User $user, string $ability): bool|null
    {
        if ($user->role->value === 'admin') return true;
        return null;
    }

    public function view(User $user, ExamRecord $record): bool
    {
        // A teacher can view their own graded records. A student can view their own record.
        return $user->id === $record->grader_id || $user->id === $record->student_id;
    }

    public function create(User $user, Exam $exam): bool
    {
        // Only the teacher of the course can create a grade record for that exam.
        return $user->id === $exam->course->teacher_id;
    }

    public function update(User $user, ExamRecord $record): bool
    {
        // THE FIX: Check against grader_id, not author_id
        return $user->id === $record->grader_id;
    }

    public function delete(User $user, ExamRecord $record): bool
    {
        return $this->update($user, $record);
    }
}
