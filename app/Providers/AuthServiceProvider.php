<?php

namespace App\Providers;

use App\Models\{
    Announcement,
    Assignment,
    Classroom,
    Course,
    Exam,
    ExamRecord,
    User
};
use App\Policies\{
    AnnouncementPolicy,
    AssignmentPolicy,
    ClassroomPolicy,
    CoursePolicy,
    ExamPolicy,
    ExamRecordPolicy,
    UserPolicy
};
use App\Enums\UserRole;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Announcement::class => AnnouncementPolicy::class,
        Assignment::class   => AssignmentPolicy::class,
        Classroom::class    => ClassroomPolicy::class,
        Course::class       => CoursePolicy::class,
        Exam::class         => ExamPolicy::class,
        ExamRecord::class   => ExamRecordPolicy::class,
        User::class         => UserPolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();

        Gate::define('admin', function (User $user) {
            // Option 1: Compare enum values
            return $user->role instanceof UserRole && $user->role->value === 'admin';
            
            // Option 2: Compare enum instances (if you prefer this)
            // return $user->role === UserRole::ADMIN;
            
            // Option 3: Use the helper method (if you added it)
            // return $user->role instanceof UserRole && $user->role->isAdmin();
        });

        Gate::define('teacher', function (User $user) {
            return $user->role instanceof UserRole && $user->role->value === 'teacher';
        });
    }
}