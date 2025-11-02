<?php

namespace App\Http\Controllers\Ui;

use App\Http\Controllers\Controller;
use App\Models\Pckage;
use Illuminate\Http\Request;
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
}
