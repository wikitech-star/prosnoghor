<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Ad;
use App\Models\PaymentSession;
use App\Models\QuestionPaper;
use App\Models\SeedBuyed;
use App\Models\SubscribePackage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    // index
    public function index()
    {
        $ad = Ad::get();

        $totalPaper = QuestionPaper::where('created_id', Auth::id())->count();
        $totalPackage = SubscribePackage::where('user_id', Auth::id())->count();
        $totaSeed = SeedBuyed::where('user_id', Auth::id())->count();
        $totaTrasnactions = PaymentSession::where('user_id', Auth::id())->count();
        return Inertia::render('Teacher/Dashboard', [
            'ad' => $ad,
            'totalPaper' => $totalPaper,
            'totalPackage' => $totalPackage,
            'totaSeed' => $totaSeed,
            'totaTrasnactions'=>$totaTrasnactions
        ]);
    }
}
