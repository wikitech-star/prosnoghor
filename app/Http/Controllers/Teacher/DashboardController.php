<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    // index
    public function index()
    {
        return Inertia::render('Teacher/Dashboard');
    }
}
