<?php

namespace App\Http\Controllers\Shared\Getway;

use App\Http\Controllers\Controller;
use App\Models\PaymentSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PaymentGetWayController extends Controller
{
    // index
    public function index()
    {
        return Inertia::render('Shared/Getway/Index');
    }

    // create session
    public function createPaymentSession(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'user_id' => 'required|exists:users,id',
            'type' => 'required|in:seed,package',
            'data' => 'required|array',
        ], [
            'amount.required' => 'পরিমান প্রদান করুন।',
            'amount.numeric' => 'পরিমান নাম্বার হতে হবে।',

            'type.required' => 'টাইপ প্রদান করুন।',
            'type.in' => 'টাইপ সিট অথবা প্যাকেজ হতে হবে',

            'data.required' => 'তথ্য প্রদান করুন।',
            'data.array' => 'তথ্য আরে হতে হবে।'
        ]);

        try {
            $q = new PaymentSession();
            $q->user_id = Auth::id();
            $q->type = $request->type;
            $q->data = json_encode($request->data);
            $q->amount = $request->amount;
            $q->status = 'unpaid';
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }
}
