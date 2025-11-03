<?php

namespace App\Http\Controllers\Backend\Payment;

use App\Http\Controllers\Controller;
use App\Models\PaymentSession;
use App\Models\SubscribePackage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PaymentController extends Controller
{
    // index
    public function index(Request $request)
    {
        $data = PaymentSession::with('user')
            ->filter($request->only('search'))
            ->latest()
            ->orderByRaw("FIELD(status, 'pending', 'unpaid', 'approved', 'rejected')")
            ->paginate(10);

        return Inertia::render('Backend/Payment/Index', [
            'data' => $data,
            'filters' => $request->only('search')
        ]);
    }

    // cancel
    public function cancel($id)
    {
        try {
            $p = PaymentSession::find($id);
            $p->status = 'rejected';
            $p->save();

            return redirect()->back()->with('success', 'পেমেন্ট বাতিল করা হয়ছে।');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }

    // accept
    public function accept($id)
    {
        try {
            $p = PaymentSession::find($id);
            if (!$p) {
                return redirect()->back()->with('error', 'কিছু একটা সমাস্যা হয়েছে।');
            }

            $package = json_decode($p->data)->package;

            $sub = new SubscribePackage();
            $sub->user_id = Auth::id();
            $sub->days = $package->days;
            $sub->classes = json_encode($package->cls);
            $sub->subject = json_encode($package->suj);
            $sub->save();

            PaymentSession::find($id)->delete();

            return redirect()->back()->with('success', 'পেমেন্ট বাতিল করা হয়ছে।');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }

    // delete
    public function delete($id)
    {
        try {
            PaymentSession::find($id)->delete();

            return redirect()->back()->with('success', 'পেমেন্ট মুছে ফেলা হয়ছে।');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }
}
