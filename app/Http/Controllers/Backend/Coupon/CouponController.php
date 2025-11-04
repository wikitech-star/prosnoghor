<?php

namespace App\Http\Controllers\Backend\Coupon;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use App\Models\Pckage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CouponController extends Controller
{
    // index
    public function index(Request $request)
    {
        $data = Coupon::filter($request->only('search'))
            ->latest()
            ->paginate(10);

        return Inertia::render('Backend/Coupon/Index', [
            'data' => $data,
            'filters' => $request->only('search')
        ]);
    }

    // add
    public function add_view(Request $request)
    {
        $packageList = Pckage::pluck('title', 'id')->toArray();

        // update
        if ($request->query('id') && !empty($request->query('id'))) {
            $update = Coupon::find($request->query('id'));
        } else {
            $update = null;
        }

        return Inertia::render('Backend/Coupon/Add', [
            'packageList' => $packageList,
            'update' => $update
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'code' => "required|min:2",
            'value' => "required|numeric",
            'target' => 'nullable|numeric|exists:pckages,id',
            'type' => "required|in:p,t",
            'usages' => "nullable|numeric",
        ], [
            'code.required'  => 'কোড দিতে হবে।',
            'code.min'       => 'কোড কমপক্ষে ২ অক্ষরের হতে হবে।',

            'value.required'  => 'পরিমান দিতে হবে।',
            'value.numeric'       => 'পরিমান অবশ্যই সংখ্যায় হতে হবে।',

            'target.numeric' => 'টার্গেট অবশ্যই সংখ্যায় হতে হবে।',
            'target.exists'  => 'নির্বাচিত টার্গেটটি সঠিক নয়।',

            'type.required'  => 'টাইপ দিতে হবে।',
            'type.in'        => 'টাইপ অবশ্যই পার্সেন্ট অথবা টাকা হতে হবে।',

            'usages.numeric' => 'ইউসেজ অবশ্যই সংখ্যায় হতে হবে।',
        ]);

        try {
            $q = $request->id ? Coupon::find($request->id) : new Coupon();
            if ($request->target) {
                $q->target = $request->target;
            }
            $q->code = $request->code;
            $q->value = $request->value;
            $q->type = $request->type;
            $q->usages = $request->usages;
            $q->save();

            return redirect()->route('ux.cupon.list')->with('success', $request->id ? 'কুপন পরিবর্তন করা হয়ছে' : 'নতুন কুপন যুক্ত হয়েছে');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }

    // delete
    public function delete($id)
    {
        try {
            Coupon::find($id)->delete();

            return redirect()->back()->with('success', 'কুপন মুছে ফেলা হয়ছে');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }

    // getCupon
    public function getCupon(Request $request)
    {
        try {
            $coupon = Coupon::where('code', $request->code)->first();
            if (!$coupon) {
                return response()->json(['error' => 'কুপন পাওয়া যায়নি!'], 404);
            }

            if (!empty($coupon->target)) {
                if ((int) $coupon->target !== (int) $request->package) {
                    return response()->json([
                        'error' => 'এই কুপনটি নির্দিষ্ট প্যাকেজের জন্য প্রযোজ্য নয়!'
                    ], 400);
                }
            }

            if ($coupon->usages) {
                if ($coupon->total_usages >= $coupon->usages) {
                    return response()->json([
                        'error' => 'এই কুপনটির ব্যাবহার পরিমান শেষ।'
                    ], 400);
                }
            }

            return response()->json($coupon);
        } catch (\Exception $th) {
            $msg = 'সার্ভার ত্রুটি! আবার চেষ্টা করুন।';
            if (env('APP_ENV') === 'local') {
                $msg .= ' (' . $th->getMessage() . ')';
            }

            return response()->json(['error' => $msg], 500);
        }
    }
}
