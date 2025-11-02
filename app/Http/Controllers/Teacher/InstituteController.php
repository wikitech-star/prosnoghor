<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Institute;
use App\Models\InstitutNameRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class InstituteController extends Controller
{
    // index
    public function index()
    {
        return Inertia::render('Teacher/Institute');
    }

    // store
    public function store(Request $request)
    {
        $request->validate([
            'name' => "required|min:5",
            'devision' => "required",
            'zila' => "required",
            'upozila' => "required",
            'phone' => 'nullable|min:11|max:15',
            'address' => 'nullable|min:4'
        ], [
            'name.required' => 'প্রতিষ্ঠানের নাম প্রদান করুন',
            'name.min' => 'সর্বনিম্ন ৫ সংখ্যার হতে হবে',
            'devision.required' => 'বিভাগ প্রদান করুন',
            'zila.required' => 'জেলা প্রদান করুন',
            'upozila.required' => 'উপজেলা প্রদান করুন',
            'phone.min' => 'নাম্বার সর্বনিম্ন ১১ সংখ্যার হবে',
            'phone.max' => 'নাম্বার সর্বোচ্চ ১৫ সংখ্যার হবে',
        ]);

        try {

            Institute::updateOrCreate(
                ['teacher_id' => Auth::id()], // শর্ত
                [ // আপডেট বা তৈরি করার ডেটা
                    'name' => $request->name,
                    'devision' => $request->devision,
                    'zila' => $request->zila,
                    'upozila' => $request->upozila,
                    'phone' => $request->phone,
                    'address' => $request->address,
                ]
            );


            return redirect()->back()->with('success', 'প্রতিষ্ঠান সফল্ভাবে যুক্ত হয়েছে।');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }

    // name request
    public function name_request(Request $request)
    {
        $request->validate([
            'name' => 'required|min:5'
        ], [
            'name.required' => 'প্রতিষ্ঠানের নাম প্রদান করুন।',
            'name.min' => 'নাম সর্বনিম্ন ৫ সংখ্যার হতে হবে'
        ]);

        try {
            $requested = InstitutNameRequest::where('teacher_id', Auth::id())->exists();
            if ($requested) {
                return redirect()->back()->with('error', 'প্রতিষ্ঠানের নাম এর জন্য আবেদন করা আছে, আপনি এডমিন এর সাথে যোগাযোগ করুন');
            }

            $q = new InstitutNameRequest();
            $q->teacher_id = Auth::id();
            $q->name = $request->name;
            $q->save();

            return redirect()->back()->with('success', 'প্রতিষ্ঠান নাম পরিবর্তন আবেদন সফল হয়েছে।');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }
}
