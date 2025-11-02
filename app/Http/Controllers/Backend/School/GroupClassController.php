<?php

namespace App\Http\Controllers\Backend\School;

use App\Http\Controllers\Controller;
use App\Models\GroupClass;
use App\Models\Questions;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GroupClassController extends Controller
{
    // index
    public function index(Request $request)
    {
        $querySearch = $request->only("search");
        $class = GroupClass::filter($querySearch)
            ->latest()
            ->paginate(10)
            ->through(fn($cls) => [
                'id' => $cls->id,
                'name' => $cls->name,
                'created_at' => $cls->created_at->format('d M, Y'),
                'updated_at' => $cls->updated_at->format('d M, Y'),
            ])
            ->withQueryString();

        return Inertia::render("Backend/School/GroupClass", [
            'data' => $class,
            'filters' => $querySearch,
        ]);
    }

    // store
    public function store(Request $request)
    {
        $request->validate([
            'class_name' => 'required|string|max:255|unique:group_classes,name',
        ], [
            'class_name.required' => 'ক্লাস নাম অবশ্যক।',
            'class_name.string' => 'ক্লাস নাম অবশ্যক।',
            'class_name.max' => 'ক্লাস নাম সর্বোচ্চ ২৫৫ অক্ষর হতে পারে।',
        ]);

        try {
            GroupClass::updateOrCreate(
                ['id' => $request->id],
                ['name' => $request->class_name]
            );

            return redirect()->back()->with('success', $request->id ? 'ক্লাস পরিবর্তন সফল হয়েছে।' : 'ক্লাস তৈরি সফল হয়েছে।.');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }

    // ajax data
    public function show($id)
    {
        try {
            $class = GroupClass::find($id);
            if (!$class) {
                return response()->json(['error' => 'ক্লাস পাওয়া যায়নি।'], 404);
            }
            return response()->json(['data' => $class], 200);
        } catch (\Exception $th) {
            return response()->json(['error' => 'সার্ভার সমাস্যা আবার চেষ্টা করুন।' . env('APP_ENV') == 'local' ?? $th->getMessage()], 500);
        }
    }

    // destroy
    public function destroy($id)
    {
        try {
            // if any subject assigned to this class, then don't allow to delete
            if (Subject::where('class_id', $id)->count() > 0) {
                return redirect()->back()->with('error', 'এই ক্লাসে সাবজেক্ট অ্যাসাইন করা আছে, তাই এটি মুছে ফেলা যাবে না।');
            }

            // if any subject assigned to this class, then don't allow to delete
            if (Questions::where('class_id', $id)->count() > 0) {
                return redirect()->back()->with('error', 'এই শ্রেনী ব্যাবহার করে প্রশ্ন তৈরি করা আছে, তাই এটি মুছে ফেলা যাবে না।');
            }

            $class = GroupClass::find($id);
            if (!$class) {
                return redirect()->back()->with('error', 'ক্লাস পাওয়া যায়নি।');
            }
            $class->delete();
            return redirect()->back()->with('success', 'ক্লাস মুছে ফেলা সফল হয়েছে।');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন।' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }
}
