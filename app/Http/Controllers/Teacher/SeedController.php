<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\SeedBuyed;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SeedController extends Controller
{
    // index
    public function index(Request $request)
    {
        $data = SeedBuyed::with('seed')
            ->filter($request->only('search'))
            ->latest()
            ->where('user_id', Auth::id())
            ->paginate(10);

        return Inertia::render('Teacher/Seed', [
            'data' => $data,
            'filters' => $request->only('search')
        ]);
    }

    // delete
    public function delete($id)
    {
        try {
            SeedBuyed::find($id)->delete();

            return redirect()->back()->with('success', 'সিট মুছে ফেলা হয়েছে।');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }
}
