<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\User;
use App\Enums\UserRole;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Register your gates here instead
        Gate::define('admin', function (User $user) {
            if ($user->role instanceof UserRole) {
                return $user->role->value === 'admin';
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