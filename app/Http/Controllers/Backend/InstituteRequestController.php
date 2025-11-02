<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Institute;
use App\Models\InstitutNameRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InstituteRequestController extends Controller
{
    // index
    public function index(Request $request)
    {
        $query = InstitutNameRequest::query();
        if ($request->query('search')) {
            $query->where('name', 'like', '%' . $request->query('search') . '%');
        }
        $query->with('teacher');
        $data = $query->paginate(10);
        return Inertia::render('Backend/InstituteNameRequest', [
            'data' => $data,
            'filters' => $request->only('search')
        ]);
    }

    // accespt
    public function accept($id)
    {
        try {
            $name = InstitutNameRequest::find($id);
            if (!$name) {
                return redirect()->back()->with('error', 'কিছু একটা সমাস্যা হচ্চে আবার চেস্টা করুন।');
            }

            $institute = Institute::where('teacher_id', $name->teacher_id)->first();
            $institute->name = $name->name;
            $status = $institute->save();
            if ($status) {
                $this->delete($name->id);
            }

            return redirect()->back()->with('success', 'প্রতিষ্ঠানের নাম গ্রহন সফল হয়েছে');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }

    // delete
    public function delete($id)
    {
        try {
            InstitutNameRequest::find($id)->delete();

            return redirect()->back()->with('success', 'প্রতিষ্ঠানের নাম বাতিল হয়েছে');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }
}
