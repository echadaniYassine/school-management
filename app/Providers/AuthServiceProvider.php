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
        \App\Models\Invoice::class => \App\Policies\InvoicePolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();

        Gate::define('admin', function (User $user) {
            \Log::info('Admin gate called', [
                'user_id' => $user->id,
                'role' => $user->role,
                'role_value' => $user->role->value ?? 'NO_VALUE',
                'is_instance' => $user->role instanceof UserRole,
            ]);

            if ($user->role instanceof UserRole) {
                $result = $user->role->value === 'admin';
                \Log::info('Admin gate result', ['result' => $result]);
                return $result;
            }

            return false;
        });

        Gate::define('teacher', function (User $user) {
            if ($user->role instanceof UserRole) {
                return $user->role->value === 'teacher';
            }

            return false;
        });
    }
}
