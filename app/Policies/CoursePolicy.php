<?php

namespace App\Policies;

use App\Models\Course;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CoursePolicy
{
    public function before(User $user, string $ability)
    {
        if ($user->isAdmin()) return true;
    }
    public function viewAny(User $user)
    {
        return true;
    } // Everyone can see courses
    public function view(User $user, Course $course)
    {
        return true;
    }
    public function create(User $user)
    {
        return $user->isTeacher() || $user->isAdmin();
    }
    public function update(User $user, Course $course)
    {
        return $user->id === $course->teacher_id;
    }
    public function delete(User $user, Course $course)
    {
        return $user->id === $course->teacher_id;
    }
}
