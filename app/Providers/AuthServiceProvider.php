<?php

namespace App\Providers;

use App\Models\{
    Announcement,
    Assignment,
    Classroom,
    Course,
    Exam,
    ExamRecord,
    Grade,
    Invoice,
    Level,
    Payment,
    Subject,
    User
};
use App\Policies\{
    AnnouncementPolicy,
    AssignmentPolicy,
    ClassroomPolicy,
    CoursePolicy,
    ExamPolicy,
    ExamRecordPolicy,
    GradePolicy,
    InvoicePolicy,
    LevelPolicy,
    PaymentPolicy,
    SubjectPolicy,
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
        Grade::class        => GradePolicy::class,
        Invoice::class      => InvoicePolicy::class,
        Level::class        => LevelPolicy::class,
        Payment::class      => PaymentPolicy::class,
        Subject::class      => SubjectPolicy::class,
        User::class         => UserPolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();

        // Define gates for role-based access
        Gate::define('admin', function (User $user) {
            return $user->role instanceof UserRole && $user->role === UserRole::ADMIN;
        });

        Gate::define('teacher', function (User $user) {
            return $user->role instanceof UserRole && $user->role === UserRole::TEACHER;
        });

        Gate::define('student', function (User $user) {
            return $user->role instanceof UserRole && $user->role === UserRole::STUDENT;
        });

        Gate::define('parent', function (User $user) {
            return $user->role instanceof UserRole && $user->role === UserRole::PARENT;
        });
    }
}
