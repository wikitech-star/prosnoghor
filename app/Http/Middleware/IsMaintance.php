<?php

namespace App\Http\Middleware;

use App\Models\SiteSetting;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class IsMaintance
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $site_setting = SiteSetting::first();
        if ($site_setting && $site_setting->maintenance_mode == 'on' && (Auth::check() && Auth::user()->role != 'admin')) {
            return to_route('maintenance');
        }
        return $next($request);
    }
}
