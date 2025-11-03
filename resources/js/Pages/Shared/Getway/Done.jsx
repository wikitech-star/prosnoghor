import React from "react";
import NoneLayout from "../../../Components/Layouts/NoneLayout";
import { Link } from "@inertiajs/react";
import { ENGLISH_DATE_TO_BANGLA, ENGLISH_TO_BANGLA } from "../../../Utils/Helper";

function Done({ data }) {
    return (
        <div class="safearea justify-center">
            <div class="w-full md:w-[400px]">
                <div class="w-full mx-auto flex flex-col items-center border border-gray-200 shadow-[0_0_10px_rgba(0,0,0,0.02)] rounded-box p-6">
                    <img src="/static/predone.svg" className="w-15 h-15" />
                    <h1 className="mt-5 text-success font-bold text-2xl text-center">
                        পেমেন্ট সফল হয়েছে
                    </h1>
                    <p className="text-neutral font-normal text-center">
                        আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে। ধন্যবাদ আমাদের সেবা
                        ব্যবহারের জন্য!
                    </p>

                    <div className="bg-gray-100 rounded-box p-4 w-full mt-4 space-y-2">
                        <div className="flex items-center text-sm justify-between border-b border-gray-300 pb-2 mb-2">
                            <span>পরিমান</span>
                            <span className="font-bold">
                                ৳{ENGLISH_TO_BANGLA(data?.amount)}
                            </span>
                        </div>
                        <div className="flex items-center text-sm justify-between">
                            <span>লেনদেন আইডি</span>
                            <span className="font-bold border border-gray-200 bg-white/40 px-2">
                                {ENGLISH_TO_BANGLA(data?.uid)}
                            </span>
                        </div>
                        <div className="flex items-center text-sm justify-between">
                            <span>পেমেন্ট পদ্ধতি</span>
                            <span className="font-bold uppercase">
                                {ENGLISH_TO_BANGLA(data?.method)}
                            </span>
                        </div>
                        <div className="flex items-center text-sm justify-between">
                            <span>তারিখ</span>
                            <span className="font-bold uppercase">
                                {ENGLISH_DATE_TO_BANGLA(data?.created_at)}
                            </span>
                        </div>
                        <div className="flex items-center text-sm justify-between">
                            <span>অবস্থান</span>
                            <span className="font-bold border border-gray-200 bg-white/40 px-2 uppercase">
                                {data?.status}
                            </span>
                        </div>
                    </div>

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

Done.layout = (page) => <NoneLayout children={page} title="পেমেন্ট সম্পন্ন" />;
export default Done;
