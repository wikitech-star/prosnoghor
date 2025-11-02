<?php

namespace App\Http\Controllers\Backend\Setting;

use App\Http\Controllers\Controller;
use App\Models\GoogleAuth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GoogleAuthController extends Controller
{
    //index
    public function index()
    {
        $server_base_url = config('app.url') ?? url('/');
        $redirect_url = $server_base_url . '/auth/google/callback';

        return Inertia::render('Backend/Settings/GoogleSetting', [
            'data' => GoogleAuth::first(),
            'callback_url' => $redirect_url
        ]);
    }

    // update
    public function update(Request $request)
    {
        $request->validate([
            'client_id' => 'required',
            'client_secrate' => 'required'
        ], [
            'client_id.required' => 'ক্লাইন্ট আইডি প্রদান করুন।',
            'client_secrate.required' => 'ক্লাইন্ট সিকরেট প্রদান করুন।'
        ]);

        try {
            $auth = GoogleAuth::firstOrNew();
            $auth->client_id = $request->client_id;
            $auth->client_secrate = $request->client_secrate;
            $auth->save();

            return redirect()->back()->with('success', 'গুগল লগিন কনফিগ পরিবর্তন সফল হয়েছে।');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . (env('APP_ENV') == 'local' ? $th->getMessage() : ''));
        }
    }

    // update status
    public function updateStatus(Request $request)
    {
        try {
            $auth = GoogleAuth::firstOrNew();
            $auth->status = $request->status;
            $auth->save();

            return redirect()->back()->with('success', 'গুগল লগিন অবস্থা পরিবর্তন সফল হয়েছে।');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . (env('APP_ENV') == 'local' ? $th->getMessage() : ''));
        }
    }
}
