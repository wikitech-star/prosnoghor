<?php

namespace App\Http\Controllers\Backend\School;

use App\Http\Controllers\Controller;
use App\Models\Question_type;
use App\Models\Questions;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionTypeController extends Controller
{
    // indxe
    public function index(Request $request)
    {
        $querySearch = $request->only("search");
        $class = Question_type::filter($querySearch)
            ->latest()
            ->paginate(10)
            ->through(fn($cls) => [
                'id' => $cls->id,
                'name' => $cls->name,
                'created_at' => $cls->created_at->format('d M, Y'),
                'updated_at' => $cls->updated_at->format('d M, Y'),
            ])
            ->withQueryString();

        return Inertia::render('Backend/School/QuestionType', [
            'data' => $class,
            'filters' => $querySearch,
        ]);
    }

    // store
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:question_types,name',
        ], [
            'name.required' => 'প্রশ্নের ধরন নাম অবশ্যক।',
            'name.string' => 'প্রশ্নের ধরন নাম অবশ্যক।',
            'name.max' => 'প্রশ্নের ধরন নাম সর্বোচ্চ ২৫৫ অক্ষর হতে পারে।',
        ]);

        try {
            Question_type::updateOrCreate(
                ['id' => $request->id],
                ['name' => $request->name]
            );
            return redirect()->back()->with('success', $request->id ? 'প্রশ্নের ধরন পরিবর্তন সফল হয়েছে।' : 'প্রশ্নের ধরন তৈরি সফল হয়েছে।');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }

    // show
    public function show($id)
    {
        try {
            $class = Question_type::find($id);
            if (!$class) {
                return response()->json(['error' => 'প্রশ্নের ধরন পাওয়া যায়নি।'], 404);
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
            if (Questions::where('q_type_id', $id)->count() > 0) {
                return redirect()->back()->with('error', 'এই টপিক ব্যাবহার করে প্রশ্ন তৈরি করা আছে, তাই এটি মুছে ফেলা যাবে না।');
            }

            $class = Question_type::find($id);
            if (!$class) {
                return redirect()->back()->with('error', 'প্রশ্নের ধরন পাওয়া যায়নি।');
            }
            $class->delete();
            return redirect()->back()->with('success', 'প্রশ্নের ধরন মুছে ফেলা সফল হয়েছে।');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন।' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }
}
