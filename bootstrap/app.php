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
            // \App\Http\Middleware\VerifyCsrfToken::class,
        ]);

        $middleware->api(prepend: [
            // For SPAs on the same domain, you should uncomment this:
            // \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ]);

        $middleware->alias([
            'verified' => \App\Http\Middleware\EnsureEmailIsVerified::class,
            'abilities' => CheckAbilities::class,
            'ability' => CheckForAnyAbility::class
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })
    ->withProviders([ // <--- MOVED TO THE CORRECT POSITION
        // This is now correctly part of the application configuration.
        App\Providers\AuthServiceProvider::class,
    ])
    ->create(); // <--- THE ONE AND ONLY ->create() CALL, AT THE VERY END.