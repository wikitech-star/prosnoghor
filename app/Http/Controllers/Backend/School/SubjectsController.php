<?php

namespace App\Http\Controllers\Backend\School;

use App\Http\Controllers\Controller;
use App\Models\GroupClass;
use App\Models\Lassion;
use App\Models\Questions;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubjectsController extends Controller
{
    // index
    public function index(Request $request)
    {
        return Inertia::render('Backend/School/Subject', [
            'data' => Subject::with('classes')
                ->latest()
                ->filter($request->only('search'))
                ->paginate(10)
                ->through(fn($subject) => [
                    'id' => $subject->id,
                    'code' => $subject->code ? $subject->code : 'নেই',
                    'name' => $subject->name,
                    'class' => $subject->classes ? $subject->classes->name : 'নেই',
                    'created_at' => $subject->created_at->format('d M, Y'),
                    'updated_at' => $subject->updated_at->format('d M, Y'),
                ])
                ->withQueryString(),
            'filters' => $request->only('search'),
            'class_data' => GroupClass::pluck('name', 'id')->toArray(),
        ]);
    }

    // store or update
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'class_id' => 'required|exists:group_classes,id',
            'subject_code' => 'nullable|numeric',
        ], [
            'class_id.required' => 'শ্রেনী নির্বাচন করুন।',
            'class_id.exists' => 'নির্বাচিত শ্রেণীটি সঠিক নয়।',
            'name.required' => 'বিষয়ের নাম অবশ্যই প্রয়োজন।',
            'name.string' => 'বিষয়ের নাম অবশ্যই একটি স্ট্রিং হতে হবে।',
            'name.max' => 'বিষয়ের নাম সর্বচ্চো ২৫৫ অক্ষররের হতে পারবে।',
            'subject_code.numeric' => 'বিষয়ের কোড সংখ্যা হতে পারবে।',
        ]);

        try {
            Subject::updateOrCreate(
                ['id' => $request->id],
                [
                    'name' => $request->name,
                    'class_id' => $request->class_id,
                    'code' => $request->subject_code,
                ]
            );

            return redirect()->back()->with('success', $request->id ? 'বিষয় সফলভাবে আপডেট করা হয়েছে।' : 'বিষয় সফলভাবে সংরক্ষণ করা হয়েছে।');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . (env('APP_ENV') == 'local' ? $e->getMessage() : ''));
        }
    }

    // ajax data
    public function show($id)
    {
        try {
            $subject = Subject::find($id);
            if (!$subject) {
                return response()->json(['error' => 'বিষয় পাওয়া যায়নি।'], 404);
            }
            return response()->json(['data' => $subject], 200);
        } catch (\Exception $th) {
            return response()->json(['error' => 'সার্ভার সমাস্যা আবার চেষ্টা করুন।' . env('APP_ENV') == 'local' ?? $th->getMessage()], 500);
        }
    }

    // delete
    public function destroy($id)
    {
        try {

            // if any sine lassion
            if (Lassion::where('subject_id', $id)->count() > 0) {
                return redirect()->back()->with('error', 'এই বিষয়ের সাথে অধ্যায় অ্যাসাইন করা আছে, তাই এটি মুছে ফেলা যাবে না।');
            }

            // if any subject assigned to this class, then don't allow to delete
            if (Questions::where('subject_id', $id)->count() > 0) {
                return redirect()->back()->with('error', 'এই বিষয় ব্যাবহার করে প্রশ্ন তৈরি করা আছে, তাই এটি মুছে ফেলা যাবে না।');
            }

            $subject = Subject::find($id);
            if (!$subject) {
                return redirect()->back()->with('error', 'বিষয় পাওয়া যায়নি।');
            }
            $subject->delete();
            return redirect()->back()->with('success', 'বিষয় সফলভাবে মুছে ফেলা হয়েছে।');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন।' . (env('APP_ENV') == 'local' ? $th->getMessage() : ''));
        }
    }
}
