<?php

namespace App\Http\Controllers\Ui;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use App\Models\PaymentSession;
use App\Models\Sete;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SeedController extends Controller
{
    // index
    public function index(Request $request)
    {
        $data = Sete::latest()
            ->filter($request->only('search'))
            ->paginate(10);

        return Inertia::render('Ui/Seed', [
            'data' => $data,
            'filters' => $request->only('search')
        ]);
    }

    // view
    public function detailsView($slug)
    {
        $data = Sete::where('slug', $slug)->first();
        if (!$data) {
            return redirect()->back()->with('error', 'কিছু একটা সমাস্যা হয়ছে, আবার চেষ্টা করুন।');
        }

        $data->total_view = (int)$data->total_view + 1;
        $data->save();

        return Inertia::render('Ui/SeedView', [
            'data' => $data
        ]);
    }

    // create payemnt
    public function create_payment(Request $request)
    {
        try {
            if (empty($request->id)) {
                return redirect()->back()->with('error', 'কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন।');
            }

            if (empty($request->getway)) {
                return redirect()->back()->with('error', 'পেমেন্ট সিস্টেম বাছায় করুন');
            }

            $package = Sete::find($request->id);
            if (!$package) {
                return redirect()->back()->with('error', 'সিট পাওয়া যায়নি।');
            }

            // মূল দাম
            $originalPrice = $package->selling_price;
            $finalPrice = $originalPrice;

            $seedData = [
                'title' => $package->title,
                'file' => $package->files,
            ];

            $p = new PaymentSession();
            $p->user_id = Auth::id();
            $p->method = $request->getway;
            $p->amount = $finalPrice;
            $p->data = json_encode($seedData);
            $p->type = 'seet';
            $p->package_name = $package->title;
            $p->save();

            $package->total_sales = (int)$package->total_sales + 1;
            $package->save();

            return redirect()->route('g.payment.index', ['id' => $p->uid]);
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }
}
