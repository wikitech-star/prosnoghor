<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    // index
    public function index()
    {
        return Inertia::render("Backend/Dashboard");
    }
}
