<?php

namespace App\Http\Controllers\Shared\Getway;

use App\Http\Controllers\Controller;
use App\Models\PaymentSession;
use Illuminate\Http\Request;
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

        if ($session->status == 'pending' || $session->status == 'approved') {
            return redirect()->route('g.payment.predone', ['id' => $id]);
        }

        if ($session->status == 'rejected') {
            return redirect()->route('home');
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

    // payment done view
    public function payemntDoneVIew($id)
    {
        $data = PaymentSession::where('uid', $id)->first();
        if (!$data) {
            return redirect()->route('g.payment.cancel', ['id' => $id]);
        }
        return Inertia::render('Shared/Getway/Done', [
            'data' => $data
        ]);
    }

    // done
    public function paymentDone(Request $request)
    {
        $request->validate([
            'phone' => 'required|min:11|max:16',
            'trx' => 'required'
        ], [
            'phone.required' => 'ফোন নাম্বার প্রদান করুন।',
            'phone.min' => 'ফোন নাম্বার সর্বনিম্ন ১১ সংখ্যরা হবে।',
            'phone.max' => 'ফোন নাম্বার সর্বোচ্চ ৬ সংখ্যরা হতে পারবে।',
            'trx.required' => 'TRX প্রদান করুন।',
        ]);

        try {
            if (!$request->id) {
                return redirect()->back()->with('error', 'কিছু একটা সমাস্যা হয়েছে আবার চেষ্টা করুন।');
            }

            $p = PaymentSession::where('uid', $request->id)->first();
            $p->phone = $request->phone;
            $p->tex = $request->trx;
            $p->status = 'pending';
            $p->save();

            return redirect()->route('g.payment.done', ['id' => $request->id]);
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }
}
