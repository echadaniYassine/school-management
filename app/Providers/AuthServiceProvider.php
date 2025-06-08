<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // This is the correct place for all your policies.
        \App\Models\User::class => \App\Policies\UserPolicy::class,
        \App\Models\Activity::class => \App\Policies\ActivityPolicy::class,
        \App\Models\Assignment::class => \App\Policies\AssignmentPolicy::class,
        \App\Models\BlogPost::class => \App\Policies\BlogPostPolicy::class,
        \App\Models\Course::class => \App\Policies\CoursePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //
    }
}