<?php

namespace App\Http\Controllers\Backend\Package;

use App\Http\Controllers\Controller;
use App\Models\GroupClass;
use App\Models\Pckage;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PackageController extends Controller
{
    // index
    public function index(Request $request)
    {
        $data = Pckage::filter($request->only('search'))
            ->paginate(10);

        return Inertia::render('Backend/Package/Index', [
            'data' => $data,
            'filters' => $request->only('search')
        ]);
    }

    // add
    public function add_view(Request $request)
    {
        // class
        $group_class = GroupClass::pluck('name', 'id')->toArray();
        // subjects
        $subjects = Subject::get(['id', 'class_id', 'name'])
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'class_id' => $item->class_id,
                    'name' => $item->name,
                ];
            });


        if ($request->query('id') && !empty($request->id)) {
            $update = Pckage::find($request->query('id'));
        } else {
            $update = null;
        }

        return Inertia::render('Backend/Package/Add', [
            'group_class' => $group_class,
            'subjects' => $subjects,
            'update' => $update
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => "required|min:2",
            'details' => 'required|min:5',
            'price' => 'nullable|numeric',
            'selling_price' => 'required|numeric',
            'class_id' => 'required|array',
            'subjects' => 'required|array',
            'days' => 'required|numeric'
        ], [
            'title.required' => 'শিরোনাম অবশ্যই দিতে হবে।',
            'title.min' => 'শিরোনাম কমপক্ষে ২ অক্ষরের হতে হবে।',

            'details.required' => 'বিস্তারিত লিখা অবশ্যই দিতে হবে।',
            'details.min' => 'বিস্তারিত কমপক্ষে ৫ অক্ষরের হতে হবে।',

            'price.required' => 'মূল্য অবশ্যই দিতে হবে।',
            'price.numeric' => 'মূল্য অবশ্যই সংখ্যায় হতে হবে।',

            'selling_price.required' => 'বিক্রয়মূল্য অবশ্যই দিতে হবে।',
            'selling_price.numeric' => 'বিক্রয়মূল্য অবশ্যই সংখ্যায় হতে হবে।',

            'class_id.required' => 'অন্তত একটি শ্রেণি নির্বাচন করতে হবে।',
            'class_id.array' => 'শ্রেণির তথ্য সঠিক নয়।',

            'subjects.required' => 'অন্তত একটি বিষয় নির্বাচন করতে হবে।',
            'subjects.array' => 'বিষয়ের তথ্য সঠিক নয়।',

            'days.required' => 'সময় অবশ্যই দিতে হবে।',
            'days.numeric' => 'সময় অবশ্যই সংখ্যায় হতে হবে।',
        ]);

        try {
            if ($request->price &&  (int)$request->price <= (int)$request->selling_price) {
                return redirect()->back()->with('price', 'মূল্য অবশ্যই বিক্রয়মূল্যের চেয়ে বেশি হতে হবে।');
            }

            $q = $request->id ? Pckage::find($request->id) : new Pckage();
            $q->title = $request->title;
            $q->details = $request->details;
            if ($request->price) {
                $q->price = $request->price;
            }
            $q->selling_price = $request->selling_price;
            $q->classes = json_encode($request->class_id);
            $q->subjects = json_encode($request->subjects);
            $q->days = $request->days;
            $q->save();

            return redirect()->route('ux.package.list')->with('success', $request->id ? 'প্যাকেজ পরিবর্তন সফল হয়েছে।' : 'নতুন প্যাকেজ যুক্ত হয়েছে।');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }

    public function delete($id)
    {
        try {
            Pckage::find($id)->delete();

            return redirect()->back()->with('success', 'প্যাকেজ মুছে ফেলা হয়ছে।');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }
}
