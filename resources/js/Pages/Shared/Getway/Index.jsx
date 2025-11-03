import React, { useEffect, useState } from "react";
import NoneLayout from "../../../Components/Layouts/NoneLayout";
import { Link, useForm, usePage } from "@inertiajs/react";

function Index({ data }) {
    const { appName } = usePage().props;

    const [getWay, setGetway] = useState("");
    useEffect(() => {
        if (data?.method == "bkash") {
            setGetway("বিকাশ");
        } else if (data?.method == "nagod") {
            setGetway("নগদ");
        } else if (data?.method == "rocket") {
            setGetway("রকেট");
        } else {
            setGetway("উপায়");
        }
    }, []);

    // done
    const doneForm = useForm({
        id: data?.uid,
        phone: "",
        trx: "",
    });
    const handleForm = (e) => {
        e.preventDefault();
        doneForm.post(route("g.payment.done.post"));
    };
    return (
        <div class="safearea justify-center">
            <div class="w-full md:w-[300px]">
                <div class="w-full mx-auto flex flex-col items-center">
                    <img
                        src={`/static/${data?.method}.png`}
                        class="h-[30px] w-auto mb-3"
                    />
                    <h1 class="text-dark font-black text-center text-lg">
                        স্বাগতম {appName}-এ
                    </h1>
                    <p class="text-center text-gray-600 text-sm mb-4">
                        আপনার ডিপোজিট অনুরোধ গ্রহণ করা হয়েছে। {getWay} পেমেন্ট
                        সম্পন্ন করতে নিচের ধাপগুলো অনুসরণ করুন:
                    </p>

                    <ol class="list-decimal list-inside text-dark mt-3 text-sm font-semibold text-left flex flex-col gap-2">
                        <li>
                            <span class="bg-primary/50 font-bold text-neutral px-1 rounded-base text-sm">
                                *247#
                            </span>{" "}
                            ডায়াল করে {getWay} মোবাইল মেন্যুতে যান, বা অ্যাপ
                            ব্যবহার করুন।
                        </li>
                        <li> "সেন্ড মানি" সিলেক্ট করুন।</li>
                        <li>
                            আমাদের {getWay} একাউন্ট নাম্বারটি{" "}
                            <span class="bg-primary/50 font-bold text-neutral px-1 rounded-base text-sm">
                                +8801
                            </span>{" "}
                            প্রবেশ করুন।
                        </li>
                        <li>
                            প্যাকেজ এর মোট{" "}
                            <span class="bg-primary/50 font-bold text-neutral px-1 rounded-base text-sm">
                                500
                            </span>{" "}
                            টাকা এবং গেটওয়ে ফি{" "}
                            <span class="bg-primary/50 font-bold text-neutral px-1 rounded-base text-sm">
                                90
                            </span>{" "}
                            টাকা।
                        </li>
                        <li>
                            মোট{" "}
                            <span class="bg-primary/50 font-bold text-neutral px-1 rounded-base text-sm">
                                590
                            </span>{" "}
                            টাকা পাঠান।
                        </li>
                        <li>
                            রেফারেন্স হিসেবে{" "}
                            <span class="bg-primary/50 font-bold text-neutral px-1 rounded-base text-sm">
                                123
                            </span>{" "}
                            লিখুন।
                        </li>
                    </ol>

                    <div className="mt-5 w-full space-y-2">
                        <input
                            type="tel"
                            value={doneForm.data.phone}
                            onChange={(e) =>
                                doneForm.setData("phone", e.target.value)
                            }
                            className="input input-sm w-full"
                            placeholder="একাউন্ট নাম্বার"
                        />
                        {doneForm.errors.phone && (
                            <p className="text-sm text-error">
                                {doneForm.errors.phone}
                            </p>
                        )}
                        <input
                            type="text"
                            value={doneForm.data.trx}
                            onChange={(e) =>
                                doneForm.setData("trx", e.target.value)
                            }
                            className="input input-sm w-full"
                            placeholder="TRX নাম্বার"
                        />
                        {doneForm.errors.trx && (
                            <p className="text-sm text-error">
                                {doneForm.errors.trx}
                            </p>
                        )}
                        <button
                            onClick={handleForm}
                            disabled={doneForm.processing}
                            className="btn btn-sm btn-primary w-full"
                        >
                            সম্পন্ন করুন
                        </button>
                        <Link
                            href={route("g.payment.cancel", {
                                id: data.uid,
                            })}
                            className="btn btn-sm btn-error w-full"
                        >
                            বাতিল করুন
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => <NoneLayout children={page} title="পেমেন্ট সিস্টেম" />;
export default Index;
