<?php

namespace App\Http\Controllers\Ui;

use App\Http\Controllers\Controller;
use App\Models\Sete;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeedController extends Controller
{
    // index
    public function index(Request $request)
    {
        $data = Sete::latest()
            ->filter($request->only('search'))
            ->paginate(10);

        return Inertia::render('Ui/Seed', [
            'data' => $data,
            'filters' => $request->only('search')
        ]);
    }
}
