<?php

use App\Http\Middleware\Auth;
use App\Http\Middleware\CheckRole;
use App\Http\Middleware\Guest;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\HasNoRole;
use App\Http\Middleware\HasRole;
use App\Http\Middleware\IsMaintance;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            HandleInertiaRequests::class,
        ]);

        $middleware->alias([
            'guest' => Guest::class,
            'auth' => Auth::class,
            'hasRole' => HasRole::class,
            'hasNoRole' => HasNoRole::class,
            'isMaintance' => IsMaintance::class,
            'role' => CheckRole::class
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
