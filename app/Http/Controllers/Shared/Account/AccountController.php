<?php

namespace App\Http\Controllers\Shared\Account;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AccountController extends Controller
{
    // account
    public function account()
    {
        return Inertia::render('Shared/Account/Prodile');
    }

    // security
    public function security()
    {
        return Inertia::render('Shared/Account/Security');
    }

    // 
    public function account_post(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'phone' => 'nullable|min:11|max:15',
            'genader' => 'nullable|in:male,female',
            'blood' => 'nullable',
            'avatar' => 'nullable|image|mimes:jpg,jpeg,png,webp,gif|max:2048',
            'date_of_birth' => 'nullable',
            'address' => 'nullable|min:3',
        ], [
            'name.required' => 'নাম ফিল্ডটি অবশ্যই দিতে হবে।',

            'phone.min' => 'ফোন নম্বর কমপক্ষে ১১ সংখ্যার হতে হবে।',
            'phone.max' => 'ফোন নম্বর সর্বোচ্চ ১৫ সংখ্যার হতে পারবে।',

            'genader.in' => 'লিঙ্গ ফিল্ডের মান শুধুমাত্র পুরুষ বা মহিলা হতে পারবে।',

            'address.min' => 'ঠিকানা কমপক্ষে ৩ অক্ষরের হতে হবে।',

            'avatar.image' => 'অ্যাভাটার অবশ্যই একটি ইমেজ হতে হবে।',
            'avatar.mimes' => 'অ্যাভাটার ফাইলের ধরন অবশ্যই jpg, jpeg, png, webp অথবা gif হতে হবে।',
            'avatar.max' => 'অ্যাভাটার ফাইলের আকার ২ মেগাবাইটের বেশি হতে পারবে না।',
        ]);

        try {
            $q = User::find(Auth::id());
            $q->name = $request->name;
            $q->phone = $request->phone;
            $q->gender = $request->genader;
            $q->blod_group = $request->blood;
            $q->date_of_birth = $request->date_of_birth;
            $q->address = $request->address;

            if ($request->hasFile('avatar')) {
                $favicon = $request->file('avatar');
                $imageName = 'prodile_' . time() . '.' . $favicon->getClientOriginalExtension();
                $favicon->move(public_path('uploads'), $imageName);
                if ($q && $q->avatar && file_exists(public_path('uploads/' . $q->avatar))) {
                    unlink(public_path('uploads/' . $q->avatar));
                }
                $q->avatar = $imageName;
            }

            $q->save();

            return redirect()->back()->with('success', 'প্রোফাইল পরিবর্তন সফল হয়েছে');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }

    // chnage password
    public function updateSecurity(Request $request)
    {
        $request->validate([
            'password' => 'required|min:6|confirmed',
            'password_confirmation' => 'required'
        ], [
            'password.required' => 'পাসওয়ার্ড ফিল্ডটি অবশ্যই দিতে হবে।',
            'password.min' => 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।',
            'password.confirmed' => 'পাসওয়ার্ড এবং নিশ্চিত পাসওয়ার্ড এক হতে হবে।',

            'password_confirmation.required' => 'নিশ্চিত পাসওয়ার্ড ফিল্ডটি অবশ্যই দিতে হবে।',
        ]);

        try {
            $q = User::find(Auth::id());
            $q->password = Hash::make($request->password);
            $q->save();

            return  redirect()->back()->with('success', 'নতুন পাসওয়ার্ড সেট সফল হয়েছে।');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }
}
