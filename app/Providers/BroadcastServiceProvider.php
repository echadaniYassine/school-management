<?php

namespace App\Providers;

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // This line tells Laravel to use the routes defined in routes/channels.php
        // for authorizing private and presence channels.
        Broadcast::routes();

        require base_path('routes/channels.php');
    }
}