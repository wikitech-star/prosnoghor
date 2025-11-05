import React, { useState } from "react";
import GuestLayout from "../../Components/Layouts/GuestLayout";
import Input from "../../Components/Parts/Input";
import { DAYS_TO_BANGLA_DURATION, ENGLISH_TO_BANGLA } from "../../Utils/Helper";
import { Link, useForm } from "@inertiajs/react";

function PriceCheckout({ data }) {
    const pForm = useForm({
        id: data?.package_id,
        getway: "",
    });

    const handlePayment = (e) => {
        e.preventDefault();
        pForm.post(route("price.package.payment"), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <div className="pb-5">
            <div className="bg-white shadow-[0_0_100px_rgba(0,0,0,0.03)]  mt-10 border border-primary/30 rounded-box max-w-xl mx-auto">
                <div className="bg-primary/20 px-5 py-9 text-center">
                    <h1 className="font-black text-xl text-neutral">
                        ১ ক্লিকে প্রশ্ন তৈরীর সফটওয়্যার !
                    </h1>
                    <p className="font-normal text-base text-neutral">
                        চেক আউট
                    </p>
                </div>

                <div className="py-5 px-10 border-b border-gray-100 border-dashed">
                    <h1 className="text-md font-medium text-neutral">
                        {data?.title}
                    </h1>
                    <h1 className="text-2xl font-black">
                        ৳{ENGLISH_TO_BANGLA(data?.selling_price)}
                    </h1>
                </div>

                <div className="">
                    <h1 className="bg-gray-100 text-left py-2 px-3">
                        🎓 শ্রেণীসমূহঃ
                    </h1>
                    <div className="px-9 py-3 space-y-1">
                        {data?.classes.map((val, i) => (
                            <p
                                className="text-sm font-normal text-neutral"
                                key={i}
                            >
                                {ENGLISH_TO_BANGLA(i + 1)}. {val?.name}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="">
                    <h1 className="bg-gray-100 text-left py-2 px-3">
                        📚 বিষয়সমূহঃ
                    </h1>
                    <div className="px-9 py-3 space-y-1">
                        {data?.subjects.map((val, i) => (
                            <p
                                className="text-sm font-normal text-neutral"
                                key={i}
                            >
                                {ENGLISH_TO_BANGLA(i + 1)}. {val?.name}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="">
                    <h1 className="bg-gray-100 text-left py-2 px-4">
                        চেক আউট তথ্যঃ
                    </h1>

                    <div className="px-9 py-5 bg-gray-50">
                        <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm font-normal text-neutral">
                                <p>প্যাকেজঃ-</p>
                                <p>{data?.title}</p>
                            </div>
                            <div className="flex items-center justify-between text-sm font-normal text-neutral">
                                <p>মেয়াদঃ-</p>
                                <p>{DAYS_TO_BANGLA_DURATION(data?.days)}</p>
                            </div>
                            <div className="flex items-center justify-between text-sm font-normal text-neutral">
                                <p>মূল্যঃ-</p>
                                <p>
                                    {ENGLISH_TO_BANGLA(data?.selling_price)}{" "}
                                    টাকা
                                </p>
                            </div>
                            <hr className="border my-2 border-dashed border-neutral" />
                            <div className="flex items-center justify-between text-sm font-bold text-neutral">
                                <p>সর্বমোট মূল্যঃ-</p>
                                <p>{ENGLISH_TO_BANGLA(data?.selling_price)} টাকা</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-9 py-5 space-y-3 border-t border-dashed border-gray-300">
                    {/* get way */}
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => pForm.setData("getway", "bkash")}
                            className={`w-full duration-300 ${
                                pForm.data.getway == "bkash"
                                    ? "border-primary"
                                    : "bg-gray-100"
                            } hover:border-primary border-2  border-dashed border-gray-300 min-h-[60px] px-6 text-lg font-medium flex justify-center gap-3 items-center`}
                        >
                            <img
                                src="/static/bkash.png"
                                className="w-auto h-7 object-fill"
                            />
                        </button>
                        <button
                            onClick={() => pForm.setData("getway", "nagod")}
                            className={`w-full duration-300 ${
                                pForm.data.getway == "nagod"
                                    ? "border-primary"
                                    : "bg-gray-100"
                            } hover:border-primary border-2  border-dashed border-gray-300 min-h-[60px] px-6 text-lg font-medium flex justify-center gap-3 items-center`}
                        >
                            <img
                                src="/static/nagod.png"
                                className="w-auto h-5 object-fill"
                            />
                        </button>
                        <button
                            onClick={() => pForm.setData("getway", "upay")}
                            className={`w-full duration-300 ${
                                pForm.data.getway == "upay"
                                    ? "border-primary"
                                    : "bg-gray-100"
                            } hover:border-primary border-2  border-dashed border-gray-300 min-h-[60px] px-6 text-lg font-medium flex justify-center gap-3 items-center`}
                        >
                            <img
                                src="/static/upay.png"
                                className="w-auto h-6 object-fill"
                            />
                        </button>
                        <button
                            onClick={() => pForm.setData("getway", "rocket")}
                            className={`w-full duration-300 ${
                                pForm.data.getway == "rocket"
                                    ? "border-primary"
                                    : "bg-gray-100"
                            } hover:border-primary border-2  border-dashed border-gray-300 min-h-[60px] px-6 text-lg font-medium flex justify-center gap-3 items-center`}
                        >
                            <img
                                src="/static/rocket.png"
                                className="w-auto h-6 object-fill"
                            />
                        </button>
                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={pForm.processing}
                        className="btn btn-primary w-full"
                    >
                        পেমেন্ট করুন {ENGLISH_TO_BANGLA(data?.selling_price)} টাকা
                    </button>
                </div>

                <Link href={route("ui.contact.index")}>
                    <p className="text-center text-gray-600 w-full text-sm font-medium mb-4 duration-300 hover:underline hover:text-neutral">
                        যে কোন সমাস্যার সমাধান এর জন্য যোগাযোগ করুন।
                    </p>
                </Link>
            </div>
        </div>
    );
}

PriceCheckout.layout = (page) => (
    <GuestLayout children={page} title="মূল্যর বিবরন" />
);
export default PriceCheckout;
