<?php

namespace App\Http\Controllers\Backend\Contact;

use App\Http\Controllers\Controller;
use App\Models\Contcat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    // index
    public function index(Request $request)
    {
        return Inertia::render('Backend/Contact/Contcat', [
            'data' => Contcat::orderBy('is_read', 'asc')
                ->filter($request->only('search'))
                ->paginate(10),
            'filters' => $request->only('search')
        ]);
    }

    // details
    public function details($id)
    {

        $data = Contcat::with('user')->find($id);
        if (!$data) {
            return redirect()->back()->with('error', 'কিছু একটা সমাস্যা হয়চেহ আবার চেষ্টা করুন।');
        }
        $data->is_read = true;
        $data->save();

        return Inertia::render('Backend/Contact/View', [
            'data' => $data
        ]);
    }

    // delete
    public function delete($id)
    {
        try {
            Contcat::find($id)->delete();

            return redirect()->route('ux.contact.index')->with('success', 'মুছে ফেলা সফল হয়েছে');
        } catch (\Exception $th) {
            return redirect()->back()->with('error', 'সার্ভার সমাস্যা আবার চেষ্টা করুন.' . env('APP_ENV') == 'local' ?? $th->getMessage());
        }
    }
}
