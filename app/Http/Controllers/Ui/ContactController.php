<?php

namespace App\Http\Controllers\Ui;

use App\Http\Controllers\Controller;
use App\Models\Contcat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ContactController extends Controller
{
    // index
    public function index()
    {
        return Inertia::render('Ui/Contact');
    }

    // contact submit
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'nullable|email',
            'phone' => 'required|min:11|max:15',
            'subject' => 'required|min:2',
            'message' => 'required|min:5'
        ], [
            'name.required' => 'নাম দিতে হবে।',
            'email.email' => 'সঠিক ইমেইল ঠিকানা দিন।',
            'phone.required' => 'ফোন নম্বর দিতে হবে।',
            'phone.min' => 'ফোন নম্বর কমপক্ষে ১১ অঙ্কের হতে হবে।',
            'phone.max' => 'ফোন নম্বর সর্বাধিক ১৫ অঙ্কের হতে পারে।',
            'subject.required' => 'বিষয় লিখতে হবে।',
            'subject.min' => 'বিষয় অন্তত ২ অক্ষরের হতে হবে।',
            'message.required' => 'বার্তা লিখতে হবে।',
            'message.min' => 'বার্তা অন্তত ৫ অক্ষরের হতে হবে।',
        ]);


        try {
            $q = new Contcat();
            if (Auth::check()) {
                $q->auth_id = Auth::id();
            }
            $q->name = $request->name;
            $q->email = $request->email;
            $q->phone = $request->phone;
            $q->subject = $request->subject;
            $q->message = $request->message;
            $q->save();

            return redirect()->back()->with('success', 'আপনার মতামত আমাদের কাছে গ্রহন হয়েছে। অতি দ্রুত আপনার সাথে যোগাযোগ করা হবে। ধন্যবাদ');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }
}
