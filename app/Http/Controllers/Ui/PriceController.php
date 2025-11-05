<?php

namespace App\Http\Controllers\Ui;

use App\Http\Controllers\Controller;
use App\Models\PaymentSession;
use App\Models\Pckage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PriceController extends Controller
{
    // index
    public function index()
    {

        $package = Pckage::get();
        $newJson = [];
        foreach ($package as $item) {
            $groupClasses = $item->groupClasses();
            $groupSubjects = $item->allSubjects();
            $newJson[] = [
                'package_id' => $item->id,
                'title' => $item->title ?? null,
                'details' => $item->details ?? null,
                'price' => $item->price,
                'selling_price' => $item->selling_price,
                'days' => $item->days,
                'classes' => $groupClasses->map(function ($class) {
                    return [
                        'name' => $class->name,
                    ];
                }),
                'subjects' => $groupSubjects->map(function ($sub) {
                    return [
                        'name' => $sub->name
                    ];
                })
            ];
        }

        return Inertia::render('Ui/Price', [
            'data' => $newJson
        ]);
    }

    // price details 
    public function details_view($id)
    {
        $package = Pckage::findOrFail($id);
        $newJson = [
            'package_id' => $package->id,
            'title' => $package->title,
            'details' => $package->details,
            'price' => $package->price,
            'days' => $package->days,
            'selling_price' => $package->selling_price,
            'classes' => $package->groupClasses(),
            'subjects' => $package->allSubjects(),
        ];

        return Inertia::render('Ui/PriceCheckout', [
            'data' => $newJson
        ]);
    }

    // create payment
    public function createPyament(Request $request)
    {
        try {
            if (empty($request->id)) {
                return redirect()->back()->with('error', 'কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন।');
            }
            if (empty($request->getway)) {
                return redirect()->back()->with('error', 'পেমেন্ট সিস্টেম বাছায় করুন');
            }

            $package = Pckage::find($request->id);
            if (!$package) {
                return redirect()->back()->with('error', 'প্যাকেজ পাওয়া যায়নি।');
            }

            // মূল দাম
            $originalPrice = $package->selling_price;
            $finalPrice = $originalPrice;

            $packageData = [
                'cls' => $package->classes,
                'suj' => $package->subjects,
                'days' => $package->days
            ];

            $p = new PaymentSession();
            $p->user_id = Auth::id();
            $p->method = $request->getway;
            $p->amount = $finalPrice;
            $p->data = json_encode($packageData);
            $p->type = 'package';
            $p->package_name = $package->title;
            $p->save();

            return redirect()->route('g.payment.index', ['id' => $p->uid]);
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }
}
