<?php

namespace App\Providers;

// Import all your Models and Policies
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

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Announcement::class => AnnouncementPolicy::class,
        Assignment::class   => AssignmentPolicy::class,
        Classroom::class    => ClassroomPolicy::class,
        Course::class       => CoursePolicy::class,
        Exam::class         => ExamPolicy::class,
        ExamRecord::class   => ExamRecordPolicy::class,
        User::class         => UserPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        // This is the line that reads the $policies array and makes them work.
        // It is often here by default in new Laravel projects.
        $this->registerPolicies();

        // This is the correct place to define your Gates.
        Gate::define('admin', function (User $user) {
            return $user->role->value === 'admin';
        });
    }
}
