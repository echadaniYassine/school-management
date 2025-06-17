<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

// BEST PRACTICE: Extend AuthServiceProvider for policy registration
class AppServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        \App\Models\User::class => \App\Policies\UserPolicy::class,
        \App\Models\Activity::class => \App\Policies\ActivityPolicy::class,
        \App\Models\Assignment::class => \App\Policies\AssignmentPolicy::class,
        \App\Models\BlogPost::class => \App\Policies\BlogPostPolicy::class,
        \App\Models\Course::class => \App\Policies\CoursePolicy::class,
        \App\Models\Team::class => \App\Policies\TeamPolicy::class,
        \App\Models\ClassType::class => \App\Policies\ClassTypePolicy::class,
        \App\Models\Exam::class => \App\Policies\ExamPolicy::class,
        \App\Models\ExamRecord::class => \App\Policies\ExamRecordPolicy::class, // ADDED
    ];

    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // This registers all policies defined in the $policies array.
        $this->registerPolicies();

        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url') . "/password-reset/{$token}?email={$notifiable->getEmailForPasswordReset()}";
        });
    }
}