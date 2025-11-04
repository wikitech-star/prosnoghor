<?php

namespace App\Http\Controllers\Backend\Seed;

use App\Http\Controllers\Controller;
use App\Models\Sete;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeedController extends Controller
{
    // index
    public function index(Request $request)
    {
        $data = Sete::latest()
            ->filter($request->only('search'))
            ->paginate(10);

        return Inertia::render('Backend/Seed/Index', [
            'data' => $data,
            'filters' => $request->only('search')
        ]);
    }
    public function add_view(Request $request)
    {
        if ($request->query('id') && !empty($request->query('id'))) {
            $update = Sete::find($request->query('id'));
        } else {
            $update = null;
        }

        return Inertia::render('Backend/Seed/Add', [
            'update' => $update
        ]);
    }

    // store or update
    public function store(Request $request)
    {
        $request->validate([
            'title' => "required|min:3",
            'slug' => "required",
            'details' => 'required|min:10',
            'price' => "nullable|numeric",
            'selling_price' => "required|numeric",
            'thumbnail' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'product' => $request->id ? 'nullable|file|mimes:zip' : 'required|file|mimes:zip',
            'keyword' => 'nullable|min:2',
            'seo_details' => "nullable|min:10"
        ], [
            'title.required' => 'শিরোনাম অবশ্যই দিতে হবে।',
            'title.min' => 'শিরোনাম অন্তত ৩ অক্ষরের হতে হবে।',

            'slug.required' => 'স্লাগ অবশ্যই দিতে হবে।',

            'details.required' => 'বিস্তারিত বিবরণ দিতে হবে।',
            'details.min' => 'বিস্তারিত বিবরণ অন্তত ১০ অক্ষরের হতে হবে।',

            'price.numeric' => 'মূল দাম অবশ্যই সংখ্যায় হতে হবে।',

            'selling_price.required' => 'বিক্রয়মূল্য দিতে হবে।',
            'selling_price.numeric' => 'বিক্রয়মূল্য অবশ্যই সংখ্যায় হতে হবে।',

            'thumbnail.image' => 'থাম্বনেইল অবশ্যই একটি ছবি হতে হবে।',
            'thumbnail.mimes' => 'থাম্বনেইল শুধুমাত্র JPG, JPEG, PNG বা WEBP ফরম্যাটে হতে পারবে।',
            'thumbnail.max' => 'থাম্বনেইলের সাইজ সর্বোচ্চ ২MB হতে পারবে।',

            'files.required' => 'একটি ZIP ফাইল দিতে হবে।',
            'files.file' => 'ফাইল ইনপুটটি সঠিক নয়।',
            'files.mimes' => 'শুধুমাত্র ZIP ফাইল আপলোড করা যাবে।',

            'keyword.min' => 'কীওয়ার্ড অন্তত ২ অক্ষরের হতে হবে।',

            'seo_details.min' => 'SEO বিস্তারিত অন্তত ১০ অক্ষরের হতে হবে।',
        ]);

        try {
            if ($request->price &&  (int)$request->price < (int)$request->selling_price) {
                return redirect()->back()->with('error', 'মূল্য থেকে বিক্রয়মূল্য বেশি হতে পারবে না।');
            }

            $q = $request->id ? Sete::find($request->id) : new Sete();
            $q->title = $request->title;
            $q->slug = $request->slug;
            $q->details     = $request->details;
            if ($request->price) {
                $q->price = $request->price;
            }
            $q->selling_price = $request->selling_price;
            $q->seo_taqs = $request->keyword;
            $q->seo_description = $request->seo_details;

            if ($request->hasFile('thumbnail')) {
                $favicon = $request->file('thumbnail');
                $imageName = 'thumbnail_' . time() . '.' . $favicon->getClientOriginalExtension();
                $favicon->move(public_path('uploads'), $imageName);
                if ($q && $q->thumbnail && file_exists(public_path('uploads/' . $q->thumbnail))) {
                    unlink(public_path('uploads/' . $q->thumbnail));
                }
                $q->thumbnail = $imageName;
            }

            if ($request->hasFile('product')) {
                $zipFile = $request->file('product');
                $fileName = 'product_' . time() . '.' . $zipFile->getClientOriginalExtension();
                $destinationPath = public_path('uploads/product');
                if (!file_exists($destinationPath)) {
                    mkdir($destinationPath, 0777, true);
                }
                $zipFile->move($destinationPath, $fileName);
                if ($q && $q->files && file_exists($destinationPath . '/' . $q->files)) {
                    unlink($destinationPath . '/' . $q->files);
                }
                $q->files = $fileName;
            }

            $q->save();

            return redirect()->route('ux.seed.index')->with('success', $request->id ? 'সিট পরিবর্তন সফল হয়েছে' : 'নতুন সিট যুক্ত হয়েছে।');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }

    // delete
    public function delete($id)
    {
        try {
            $q = Sete::find($id);
            if (!$q) {
                return redirect()->back()->with('error', 'কিছু একটা সমাস্যা হয়েছে আবার চেষ্টা করুন।');
            }

            // delete thumbnail
            if ($q->thumbnail && file_exists(public_path('uploads/' . $q->thumbnail))) {
                unlink(public_path('uploads/' . $q->thumbnail));
            }

            // delet seed
            if ($q->files) {
                $destinationPath = public_path('uploads/product');
                if (file_exists($destinationPath . '/' . $q->files)) {
                    unlink($destinationPath . '/' . $q->files);
                }
            }

            $q->delete();

            return redirect()->back()->with('success', 'সিট মুছে ফেলা হয়ছে।');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }
}
