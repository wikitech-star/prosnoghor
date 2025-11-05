import React from "react";
import GuestLayout from "../../Components/Layouts/GuestLayout";
import { ENGLISH_TO_BANGLA, DAYS_TO_BANGLA_DURATION } from "../../Utils/Helper";
import { ShoppingCart, Verified } from "lucide-react";
import { Link } from "@inertiajs/react";

function Price({ data }) {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* title */}
            <div className="bg-primary">
                <div className="container py-15">
                    <div className="max-w-[600px] mx-auto text-center">
                        <h1 className="text-3xl font-bold text-neutral">
                            মূল্য তালিকা
                        </h1>
                        <p className="text-base font-normal mt-3 text-neutral">
                            আমাদের সেবাসমূহের সর্বশেষ মূল্য তালিকা দেখুন এবং
                            আপনার প্রয়োজন অনুযায়ী উপযুক্ত প্যাকেজটি বেছে নিন।
                            চাইলে আপনি নিজের মতো করে একটি কাস্টম প্যাকেজও তৈরি
                            করতে পারেন — সম্পূর্ণ আপনার চাহিদা ও বাজেট অনুযায়ী।
                        </p>
                    </div>
                </div>
            </div>

            {/* prices */}
            <div className="mt-10 container pb-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-center gap-3">
                    {data.map((val, i) => (
                        <div
                            key={i}
                            className="bg-white flex flex-col justify-between rounded-box border border-dashed border-primary/40 p-2 shadow-[0_0_100px_rgba(0,0,0,0.05)] duration-300 hover:shadow-[0_0_80px_rgba(0,0,0,0.1)]"
                        >
                            {/* heade */}
                            <div>
                                <div className="w-full relative bg-primary/15 rounded-box p-5">
                                    <h1 className="text-neutral font-bold text-xl">
                                        {val?.title}
                                    </h1>
                                    <p className="text-sm text-gray-600">
                                        {val?.details}
                                    </p>
                                    <h1 className="text-3xl font-extrabold text-neutral mt-3">
                                        ৳{ENGLISH_TO_BANGLA(val?.selling_price)}
                                        <span className="text-sm font-bold text-neutral">
                                            /
                                            {DAYS_TO_BANGLA_DURATION(val?.days)}
                                        </span>
                                    </h1>

                                    {Number(val?.price) ? (
                                        <span className="bg-primary rounded-box text-xs font-semibold text-neutral absolute right-0 top-0 px-3 py-0.5">
                                            সেভ{" "}
                                            {ENGLISH_TO_BANGLA(
                                                Math.round(
                                                    ((val.price -
                                                        val.selling_price) /
                                                        val.price) *
                                                        100
                                                )
                                            )}
                                            %
                                        </span>
                                    ) : null}

                                    <Link
                                        href={route("price.details", {
                                            id: val?.package_id,
                                        })}
                                        className="btn btn-sm btn-primary w-full mt-4"
                                    >
                                        <ShoppingCart size={14} />
                                        ক্রয় করুন
                                    </Link>
                                </div>

                                <div className="mt-4 p-5">
                                    <h1 className="text-sm font-extrabold text-neutral mb-2">
                                        🎓 আপনি যেসব শ্রেণি পাচ্ছেন
                                    </h1>
                                    <div className="flex flex-col gap-1 pl-3">
                                        {val?.classes.map((val, i) => (
                                            <h1
                                                key={i}
                                                className="flex items-center gap-2 text-sm font-normal"
                                            >
                                                <Verified
                                                    size={14}
                                                    className="text-green-500"
                                                />
                                                <span>{val?.name}</span>
                                            </h1>
                                        ))}
                                    </div>
                                    <h1 className="text-sm font-extrabold text-neutral mt-3 mb-2">
                                        📚 আপনি যেসব বিষয় পাচ্ছেন
                                    </h1>
                                    <div className="flex flex-col gap-1 pl-3">
                                        {val?.subjects.map((val, i) => (
                                            <h1
                                                key={i}
                                                className="flex items-center gap-2 text-sm font-normal"
                                            >
                                                <Verified
                                                    size={14}
                                                    className="text-green-500"
                                                />
                                                <span>{val?.name}</span>
                                            </h1>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

Price.layout = (page) => <GuestLayout children={page} title="মূল্য তালিকা" />;
export default Price;
