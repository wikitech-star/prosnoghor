<?php

namespace App\Http\Controllers;

use App\Mail\GlobalMialer;
use App\Models\GoogleAuth;
use App\Models\GroupClass;
use App\Models\Institute;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{

    // login ===============
    public function login()
    {
        $googleAuth = GoogleAuth::first();
        return Inertia::render("Auth/Login", [
            'google_auth_status' => $googleAuth
        ]);
    }

    public function login_store(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:6'
        ], [
            'email.required' => 'ইমেইল প্রদান করুন',
            'emial.email' => 'ইমেইল সঠিক নয়',
            'email.exists' => 'এই ইমেইলটি খুজে পাওয়া যায়নি',
            'password.required' => 'পাসওয়ার্ড প্রদান করুন',
            'password.min' => "পাসওয়ার্ড সর্বনিম্ন ৬ সংখ্যার হতে পারবে।"
        ]);

        try {
            // login account
            if (Auth::attempt($request->only('email', 'password'), $request->remeber)) {
                if (Auth::user()->role == 'teacher') {
                    return redirect()->intended(route('tech.dashboard'));
                }
                return redirect()->intended(route('ux.dashboard'));
            } else {
                return redirect()->back()->with('error', 'লগিন তথ্য সঠিক নয়.');
            }
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }

    // sing up ================
    public function singup()
    {
        $googleAuth = GoogleAuth::first();
        return Inertia::render("Auth/Signup", [
            'google_auth_status' => $googleAuth
        ]);
    }
    public function singup_update(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6'
        ], [
            'name.required' => 'নাম প্রদান করুন',
            'name.string' => 'নাম সঠিক নয়',
            'name.max' => 'নাম সর্বোচ্চ ২৫৫ অক্ষরের হতে পারবে।',
            'email.required' => 'ইমেইল প্রদান করুন',
            'emial.email' => 'ইমেইল সঠিক নয়',
            'email.unique' => 'এই ইমেইলটি ইতিমধ্যে ব্যবহৃত হয়েছে।',
            'password.required' => 'পাসওয়ার্ড প্রদান করুন',
            'password.min' => "পাসওয়ার্ড সর্বনিম্ন ৬ সংখ্যার হতে পারবে।",
        ]);

        try {
            $use = new User();
            $use->name = $request->name;
            $use->email = $request->email;
            $use->password = bcrypt($request->password);
            $use->save();


            $user = User::find($use->id);

            // login account
            if (Auth::attempt($request->only("email", "password"), true)) {
                if (Auth::user()->role == 'teacher') {
                    return redirect()->route('tech.dashboard');
                }
                return redirect()->route('ux.dashboard');
            } else {
                return redirect()->route('login')->with('success', 'একাউন্ট তৈরি করা সফল হয়েছে। লগইন করুন.');
            }
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }

    // choice role ==============
    public function choice_role()
    {
        return Inertia::render('Auth/ChoiceRole', [
            'class_data' => GroupClass::orderBy('name')->pluck('name', 'id')->toArray(),
        ]);
    }
    public function choice_role_update(Request $request)
    {
        $request->validate([
            'role' => 'required|in:teacher,student',
            'class' => 'nullable|exists:group_classes,id',
            'password' => 'nullable|min:8',
        ], [
            'role.required' => 'একাউন্ট এর ধরন নির্বাচন করুন।',
            'role.in' => 'একাউন্ট এর ধরন সঠিক নয়।',
            'class.required_if' => 'শ্রেনী নির্বাচন করুন।',
            'class.exists' => 'শ্রেনী সঠিক নয়।',
            'password.required_if' => 'পাসওয়ার্ড প্রদান করুন।',
            'password.min' => "পাসওয়ার্ড সর্বনিম্ন ৮ সংখ্যার হতে পারবে।"
        ]);

        try {

            // check if google id and password not set
            if (Auth::user()->google_id && !$request->password) {
                return redirect()->back()->with('error', 'পাসওয়ার্ড প্রদান করুন।');
            }

            // if student role and class not set
            if ($request->role == 'student' && !$request->groupCLassId) {
                return redirect()->back()->with('error', 'শ্রেনী নির্বাচন করুন।');
            }

            $user = Auth::user();
            $user->role = $request->role;
            if ($request->role == 'student') {
                $user->group_class_id = $request->groupCLassId;
            }
            if ($request->role == 'teacher') {
                $in = new Institute();
                $in->teacher_id = $user->id;
                $in->name = $user->name;
                $in->save();
            }
            if ($request->password) {
                $user->password = bcrypt($request->password);
            }
            $user->save();

            if ($request->role == 'teacher') {
                return redirect()->route('tech.dashboard')->with('success', 'একাউন্ট এর ধরন সফলভাবে সংরক্ষিত হয়েছে।');
            }
            return redirect()->route('ux.dashboard')->with('success', 'একাউন্ট এর ধরন সফলভাবে সংরক্ষিত হয়েছে।');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }


    // forgate password ===============
    public function forgate()
    {
        return Inertia::render("Auth/Forget");
    }

    public function forgate_update(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ], [
            'email.required' => 'ইমেইল প্রদান করুন',
            'emial.email' => 'ইমেইল সঠিক নয়',
            'email.exists' => 'এই ইমেইলটি খুজে পাওয়া যায়নি',
        ]);

        try {

            // if has previues token delete it
            Password::deleteToken(User::where('email', $request->email)->first());

            // get user data
            $user = User::where('email', $request->email)->first();

            // টোকেন জেনারেট করো
            $token = Password::createToken($user);

            // Reset URL বানাও
            $resetUrl = url(route('reset.password', [
                'email' => $user->email,
                'token' => $token,
            ], false));

            // Custom mail পাঠাও
            $subject = "রিসেট পাসওয়ার্ড - " . config('app.name');
            $data = [
                'name' => $user->name ?? 'ব্যবহারকারী',
                'resetUrl' => $resetUrl
            ];
            $view = "Mail.forget";

            Mail::to($request->email)->send(new GlobalMialer($subject, $data, $view));

            return redirect()->route('login')->with('success', 'পাসওয়ার্ড রিসেট লিঙ্ক আপনার ইমেইলে পাঠানো হয়েছে।');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }


    // reset password ==============
    public function resetpassword(Request $request)
    {
        // if token and email not set
        if (!$request->token || !$request->email) {
            return redirect()->route('forgate')->with('error', 'পাসওয়ার্ড রিসেট লিঙ্ক সঠিক নয়। আবার চেষ্টা করুন।');
        }

        // check time valid or not
        $status = Password::tokenExists(User::where('email', $request->email)->first(), $request->token);
        if (!$status) {
            return redirect()->route('forgate')->with('error', 'পাসওয়ার্ড রিসেট লিঙ্কের সময়সীমা শেষ হয়ে গেছে। আবার চেষ্টা করুন।');
        }

        return Inertia::render("Auth/ResetPassword", [
            'email' => $request->email,
            'token' => $request->token,
        ]);
    }

    public function update_resetpassword(Request $request)
    {
        $request->validate([
            'password' => 'required|min:6|confirmed'
        ], [
            'password.required' => 'নতুন পাসওয়ার্ড প্রদান করুন',
            'password.min' => "নতুন পাসওয়ার্ড সর্বনিম্ন ৬ সংখ্যার হতে পারবে।",
            'password.confirmed' => "নতুন পাসওয়ার্ড এবং নিশ্চিতকরণ পাসওয়ার্ড মিলছে না।"
        ]);

        try {
            // if token and email not set
            if (!$request->token || !$request->email) {
                return redirect()->route('forgate')->with('error', 'পাসওয়ার্ড রিসেট লিঙ্ক সঠিক নয়। আবার চেষ্টা করুন।');
            }

            // পাসওয়ার্ড রিসেট করো
            $status = Password::reset(
                $request->only('email', 'password', 'password_confirmation', 'token'),
                function ($user, $password) {
                    $user->forceFill([
                        'password' => bcrypt($password)
                    ])->setRememberToken(Str::random(60));

                    $user->save();
                }
            );

            if ($status == Password::PASSWORD_RESET) {
                return redirect()->route('login')->with('success', 'পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে। এখন লগইন করুন।');
            } else {
                return redirect()->back()->with('error', __($status));
            }
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }


    // google loagin =================
    public function google_redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function google_callback()
    {
        try {
            $google_user = Socialite::driver('google')->user();
            $user = User::updateOrCreate([
                'google_id' => $google_user->id,
            ], [
                'name' => $google_user->name,
                'email' => $google_user->email,
                'google_token' => $google_user->token,
                'google_refresh_token' => $google_user->refreshToken,
                'password' => 'qwertyui'
            ]);

            Auth::login($user);

            if (Auth::user()->role == 'teacher') {
                return redirect()->intended(route('tech.dashboard'));
            }
            return redirect()->intended(route('ux.dashboard'));
        } catch (\Exception $th) {
            return redirect()->route('login')->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }

    // logout =================
    public function logout()
    {
        try {
            Auth::logout();
            return redirect()->route('login');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }
}
