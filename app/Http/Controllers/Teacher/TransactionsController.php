<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\PaymentSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TransactionsController extends Controller
{
    // index
    public function index(Request $request)
    {
        $data = PaymentSession::where('user_id', Auth::id())
            ->filter($request->only('search'))
            ->latest()
            ->orderByRaw("FIELD(status, 'pending', 'unpaid', 'approved', 'rejected')")
            ->paginate(10);

        return Inertia::render('Teacher/Transactions', [
            'data' => $data,
            'filters' => $request->only('search')
        ]);
    }
}
