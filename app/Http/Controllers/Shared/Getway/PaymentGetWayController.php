<?php

namespace App\Http\Controllers\Shared\Getway;

use App\Http\Controllers\Controller;
use App\Models\PaymentSession;
use Inertia\Inertia;

class PaymentGetWayController extends Controller
{
    // index
    public function index($id)
    {
        $session = PaymentSession::where('uid', $id)->first();
        if (!$session) {
            return redirect()->back()->with('error', 'কিছু একটা সমাস্যা হয়ছে আবার চেস্টা করুন।');
        }

        if ($session->status !== 'pending') {
            return redirect()->route('g.payment.predone', ['id' => $id]);
        }


        return Inertia::render('Shared/Getway/Index', [
            'data' => $session
        ]);
    }

    // cancel
    public function cancel_payment($id)
    {
        $q  = PaymentSession::where('uid', $id);
        if (!$q) {
            return redirect()->back()->with('error', 'কিছু একটা সমাস্যা হয়েছে আবার চেস্টা করুন');
        }
        $q->delete();

        return Inertia::render('Shared/Getway/Cancel');
    }

    // predone
    public function predone_view()
    {
        return Inertia::render('Shared/Getway/Predone');
    }
}
