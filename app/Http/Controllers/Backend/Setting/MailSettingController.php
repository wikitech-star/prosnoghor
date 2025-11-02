<?php

namespace App\Http\Controllers\Backend\Setting;

use App\Http\Controllers\Controller;
use App\Models\MailConfig;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MailSettingController extends Controller
{
    // index
    public function index()
    {
        return Inertia::render('Backend/Settings/MailSettings', [
            'data' => MailConfig::first()
        ]);
    }

    // update
    public function update(Request $request)
    {
        $request->validate([
            'mailer' => 'required',
            'host' => 'required',
            'port' => 'required',
            'username' => 'required',
            'password' => 'required',
            'encryption' => 'required',
            'from_address' => 'required'
        ], [
            'mailer.required' => 'মেইলার নাম প্রদান করুন।',
            'host.required' => 'হোস্ট নাম প্রদান করুন।',
            'port.required' => 'পোর্ট প্রদান করুন।',
            'username.required' => 'ইউজার নাম প্রদান করুন।',
            'password.required' => 'পাসওয়ার্ড প্রদান করুন।',
            'encryption.required' => 'সিকুরিটি প্রদান করুন।',
            'from_address.required' => 'প্রেরক মেইল প্রদান করুন।',
        ]);

        try {
            $mail = MailConfig::firstOrNew();
            $mail->mail_mailer = $request->mailer;
            $mail->mail_host = $request->host;
            $mail->mail_port = $request->port;
            $mail->mail_username = $request->username;
            $mail->mail_password = $request->password;
            $mail->mail_encryption = $request->encryption;
            $mail->mail_from_address = $request->from_address;
            $mail->save();

            return redirect()->back()->with('success', 'ইমেইল সেটিংস পরিবর্তন সফল হয়েছে।');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . (env('APP_ENV') == 'local' ? $th->getMessage() : ''));
        }
    }
}
