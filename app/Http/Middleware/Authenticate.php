<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Closure;

class Authenticate extends Middleware
{
    // /**
    //  * Get the path the user should be redirected to when they are not authenticated.
    //  *
    //  * @param  \Illuminate\Http\Request  $request
    //  * @param  array  $guards
    //  * @return string|null
    //  */
    // public function handle($request, Closure $next, ...$guards)
    // {
    //     if (!Auth::guard($guards)->check()) {
    //         return redirect('/login');
    //     }

    //     return $next($request);
    // }

    // protected function redirectTo($request)
    // {
    //     if (! $request->expectsJson()) {
    //         return redirect('/login');
    //     }
    // }
    // public function handle($request, Closure $next)
    // {
    //     if (!Auth::check()) {
    //         // ログインしていない場合、ログインページにリダイレクト
    //         return redirect('/login');
    //     }
    //     return $next($request);
    // }
}

