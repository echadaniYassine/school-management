<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Laravel\Sanctum\Http\Middleware\CheckAbilities;
use Laravel\Sanctum\Http\Middleware\CheckForAnyAbility;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            //
        ]);

        $middleware->api(prepend: [
            // \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ]);

        $middleware->alias([
            'role' => \App\Http\Middleware\CheckRole::class,
            // 'verified' => \App\Http\Middleware\EnsureEmailIsVerified::class,
        ]);
    })
    ->withBroadcasting(
        __DIR__.'/../routes/channels.php', // <-- UNCOMMENT THIS LINE
        ['prefix' => 'api', 'middleware' => ['api', 'auth:sanctum']] // <-- AND THIS ONE
    )
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
