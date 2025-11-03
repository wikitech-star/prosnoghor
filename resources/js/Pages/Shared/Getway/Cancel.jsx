import React from "react";
import NoneLayout from "../../../Components/Layouts/NoneLayout";
import { Link } from "@inertiajs/react";

function Cancel() {
    return (
        <div class="safearea justify-center">
            <div class="w-full md:w-[400px]">
                <div class="w-full mx-auto flex flex-col items-center border border-gray-200 shadow-[0_0_10px_rgba(0,0,0,0.02)] rounded-box p-6">
                    <img
                        src="/static/payment_cancel.svg"
                        className="w-15 h-15"
                    />
                    <h1 className="mt-5 text-error font-bold text-2xl text-center">
                        পেমেন্ট বাতিল
                    </h1>
                    <p className="text-neutral font-normal text-center">
                        আপনার পেমেন্ট সম্পন্ন হয়নি, প্রয়োজনে সাপোর্ট টিমের সাথে
                        যোগাযোগ করুন।
                    </p>

                    <Link
                        href={route("home")}
                        className="btn btn-sm btn-primary w-full mt-4"
                    >
                        ফিরে যান
                    </Link>
                    <Link>
                        <p className="text-center max-w-[80%] mx-auto text-gray-600 w-full text-sm font-medium mt-4 duration-300 hover:underline hover:text-neutral">
                            যে কোন সমাস্যার সমাধান এর জন্য যোগাযোগ করুন।
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

Cancel.layout = (page) => <NoneLayout children={page} title="পেমেন্ট বাতিল" />;
export default Cancel;
