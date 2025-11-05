<?php

namespace App\Http\Controllers\Ui;

use App\Http\Controllers\Controller;
use App\Models\Sete;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    // index
    public function index()
    {
        $seed = Sete::paginate(4);
        return Inertia::render("Ui/Home", [
            'seed' => $seed
        ]);
    }
}
