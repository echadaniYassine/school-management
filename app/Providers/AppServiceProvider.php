<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider; // <-- It should extend the base ServiceProvider

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
        // This is a great place for this logic.
        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url') . "/password-reset/{$token}?email={$notifiable->getEmailForPasswordReset()}";
        });
    }
}
