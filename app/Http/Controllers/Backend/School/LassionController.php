<?php

namespace App\Http\Controllers\Backend\School;

use App\Http\Controllers\Controller;
use App\Models\GroupClass;
use App\Models\Lassion;
use App\Models\Questions;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LassionController extends Controller
{
    // index
    public function index(Request $request)
    {

        // class data
        $class_data = GroupClass::pluck('name', 'id')->toArray();

        // subject data
        $subject_data = Subject::select('name', 'class_id', 'id')->get();

        return Inertia::render("Backend/School/Lassion", [
            'data' => Lassion::with(['subject', 'classes'])
                ->filter($request->only("search"))
                ->latest()
                ->paginate(10)
                ->through(fn($lassion) => [
                    'id' => $lassion->id,
                    'name' => $lassion->name,
                    'class' => $lassion->classes->name,
                    'subject' => $lassion->subject->name,
                    'created_at' => $lassion->created_at->format('d M, Y'),
                    'updated_at' => $lassion->updated_at->format('d M, Y'),
                ])
                ->withQueryString(),
            'filters' => $request->only("search"),
            'class_data' => $class_data,
            'subject_data' => $subject_data,
        ]);
    }

    // store
    public function store(Request $request)
    {
        // validation
        $request->validate([
            'lassion_name' => 'required|string|max:255',
            'class_id' => 'required|exists:group_classes,id',
            'subject_id' => 'required|exists:subjects,id',
        ], [
            'lassion_name.required' => 'অধ্যায় নাম প্রদান করুন।',
            'lassion_name.string' => 'অধ্যায় নাম অক্ষর হতে হবে।',
            'lassion_name.max' => 'অধ্যায় নাম 255 অক্ষরের মধ্যে হতে হবে।',
            'class_id.required' => 'শ্রেণী নির্বাচন করুন।',
            'class_id.exists' => 'নির্বাচিত শ্রেণী সঠিক নয়।',
            'subject_id.required' => 'বিষয় নির্বাচন করুন।',
            'subject_id.exists' => 'নির্বাচিত বিষয় সঠিক নয়।',
        ]);

        try {
            Lassion::updateOrCreate([
                'id' => $request->id,
            ], [
                'name' => $request->lassion_name,
                'class_id' => $request->class_id,
                'subject_id' => $request->subject_id,
            ]);

            return redirect()->back()->with('success', $request->id ? 'অধ্যায় সফলভাবে আপডেট করা হয়েছে।' : 'অধ্যায় সফলভাবে সংরক্ষণ করা হয়েছে।');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . (env('APP_ENV') == 'local' ? $e->getMessage() : ''));
        }
    }

    // show
    public function show($id)
    {
        try {
            $lassion = Lassion::find($id);
            if (!$lassion) {
                return response()->json(['error' => 'অধ্যায় পাওয়া যায়নি।'], 404);
            }
            return response()->json(['data' => $lassion], 200);
        } catch (\Exception $th) {
            return response()->json(['error' => 'সার্ভার সমাস্যা আবার চেষ্টা করুন।' . (env('APP_ENV') == 'local' ? $th->getMessage() : '')], 500);
        }
    }


    // delete
    public function destroy($id)
    {
        try {
            // if any subject assigned to this class, then don't allow to delete
            if (Questions::where('lesson_id', $id)->count() > 0) {
                return redirect()->back()->with('error', 'এই অধ্যায় ব্যাবহার করে প্রশ্ন তৈরি করা আছে, তাই এটি মুছে ফেলা যাবে না।');
            }

            $lassion = Lassion::findOrFail($id);
            $lassion->delete();

            return redirect()->back()->with('success', 'অধ্যায় সফলভাবে মুছে ফেলা হয়েছে।');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . (env('APP_ENV') == 'local' ? $e->getMessage() : ''));
        }
    }
}
