<?php

namespace App\Http\Controllers\Backend\Setting;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiteSettingController extends Controller
{
    // index
    public function index()
    {
        return Inertia::render('Backend/Settings/SiteSetting');
    }

    // update
    public function update(Request $request)
    {
        $request->validate([
            'site_name' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:500',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'favicon' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,ico|max:1024',
        ], [
            'site_name.string' => 'সাইট নাম অবশ্যই স্ট্রিং হতে হবে',
            'site_name.max' => 'সাইট নাম সর্বোচ্চ ২৫৫ অক্ষর হতে পারে',
            'meta_description.string' => 'মেটা বর্ণনা অবশ্যই স্ট্রিং হতে হবে',
            'meta_description.max' => 'মেটা বর্ণনা সর্বোচ্চ ৫০০ অক্ষর হতে পারে',
            'meta_keywords.string' => 'মেটা কীওয়ার্ড অবশ্যই স্ট্রিং হতে হবে',
            'meta_keywords.max' => 'মেটা কীওয়ার্ড সর্বোচ্চ ৫০০ অক্ষর হতে পারে',
            'logo.image' => 'লোগো অবশ্যই একটি ছবি হতে হবে',
            'logo.mimes' => 'লোগো ফাইলের ধরন হতে হবে: jpeg, png, jpg',
            'logo.max' => 'লোগো সর্বোচ্চ ২ মেগাবাইট হতে পারে',
            'favicon.image' => 'ফেভিকন অবশ্যই একটি ছবি হতে হবে',
            'favicon.mimes' => 'ফেভিকন ফাইলের ধরন হতে হবে: jpeg, png, jpg, ico',
            'favicon.max' => 'ফেভিকন সর্বোচ্চ ১ মেগাবাইট হতে পারে',
        ]);

        try {
            $setting = SiteSetting::firstOrNew();

            if ($request->hasFile('logo')) {
                $logo = $request->file('logo');
                $logoName = 'logo_' . time() . '.' . $logo->getClientOriginalExtension();
                $logo->move(public_path('uploads'), $logoName);
                if ($setting && $setting->site_logo && file_exists(public_path('uploads/' . $setting->site_logo))) {
                    unlink(public_path('uploads/' . $setting->site_logo));
                }
                $setting->site_logo = $logoName;
            }
            if ($request->hasFile('favicon')) {
                $favicon = $request->file('favicon');
                $faviconName = 'favicon_' . time() . '.' . $favicon->getClientOriginalExtension();
                $favicon->move(public_path('uploads'), $faviconName);
                if ($setting && $setting->site_favicon && file_exists(public_path('uploads/' . $setting->site_favicon))) {
                    unlink(public_path('uploads/' . $setting->site_favicon));
                }
                $setting->site_favicon = $faviconName;
            }
            $setting->site_name = $request->site_name;
            $setting->meta_description = $request->meta_description;
            $setting->meta_keywords = $request->meta_keywords;
            $setting->save();

            return redirect()->back()->with('success', 'সাইট সেটিংস সফলভাবে আপডেট হয়েছে।');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . (env('APP_ENV') == 'local' ? $th->getMessage() : ''));
        }
    }

    // updateMaintenance
    public function updateMaintenance(Request $request)
    {
        $maintenance_mode = $request->get('maintenance_mode', 'off');

        if (!in_array($maintenance_mode, ['on', 'off'])) {
            return redirect()->back()->with('error', "রক্ষণাবেক্ষণ মোডের মান সঠিক নয়।");
        }

        try {
            $setting = SiteSetting::first();
            if (!$setting) {
                $setting = new SiteSetting();
            }
            $setting->maintenance_mode = $maintenance_mode;
            $setting->save();

            return redirect()->back()->with('success', 'রক্ষণাবেক্ষণ মোড সফলভাবে আপডেট হয়েছে।');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . (env('APP_ENV') == 'local' ? $th->getMessage() : ''));
        }
    }
}
