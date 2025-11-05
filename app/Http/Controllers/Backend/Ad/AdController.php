<?php

namespace App\Http\Controllers\Backend\Ad;

use App\Http\Controllers\Controller;
use App\Models\Ad;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdController extends Controller
{
    // index
    public function index(Request $request)
    {
        $data = Ad::latest()
            ->filter($request->only('search'))
            ->paginate(10);

        return Inertia::render('Backend/Ad/Index', [
            'filters' => $request->only('search'),
            'data' => $data
        ]);
    }

    // store
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|min:3',
            'url' => 'nullable|url',
            'image' => 'required|image|mimes:png,jpg,webp,gif'
        ], [
            'title.required' => 'শিরোনাম ফিল্ডটি অবশ্যই দিতে হবে।',
            'title.min' => 'শিরোনাম কমপক্ষে ৩ অক্ষরের হতে হবে।',

            'url.url' => 'দয়া করে একটি সঠিক ইউআরএল প্রদান করুন।',

            'image.required' => 'ছবিটি দিতে হবে।',
            'image.image' => 'ফাইলটি অবশ্যই একটি ছবি হতে হবে।',
            'image.mimes' => 'ছবিটি অবশ্যই PNG, JPG, WEBP অথবা GIF ফরম্যাটে হতে হবে।',
        ]);

        try {
            $q = $request->id ? Ad::find($request->id) : new Ad();
            $q->title = $request->title;
            $q->url = $request->url;

            if ($request->hasFile('image')) {
                $favicon = $request->file('image');
                $imageName = 'ad_' . time() . '.' . $favicon->getClientOriginalExtension();
                $favicon->move(public_path('uploads'), $imageName);
                if ($q && $q->image && file_exists(public_path('uploads/' . $q->image))) {
                    unlink(public_path('uploads/' . $q->image));
                }
                $q->image = $imageName;
            }
            $q->save();

            return redirect()->back()->with('success', 'নতুন বিজ্ঞাপন যুক্ত হয়েছে');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }

    // delete
    public function delete($id)
    {
        try {
            $q =  Ad::find($id);
            if ($q && $q->image && file_exists(public_path('uploads/' . $q->image))) {
                unlink(public_path('uploads/' . $q->image));
            }
            $q->delete();
            return redirect()->back()->with('success', 'মুছে ফেলা হয়ছে।');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }
}
