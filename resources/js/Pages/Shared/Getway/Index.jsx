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
        <div className="safearea justify-center">
            <div className="w-full md:w-[300px]">
                <div className="w-full mx-auto flex flex-col items-center">
                    <img
                        src={`/static/${data?.method}.png`}
                        className="h-[30px] w-auto mb-3"
                    />
                    <h1 className="text-dark font-black text-center text-lg">
                        স্বাগতম {appName}-এ
                    </h1>
                    <p className="text-center text-gray-600 text-sm mb-4">
                        আপনার ডিপোজিট অনুরোধ গ্রহণ করা হয়েছে। {getWay} পেমেন্ট
                        সম্পন্ন করতে নিচের ধাপগুলো অনুসরণ করুন:
                    </p>

                    <ol className="list-decimal list-inside text-dark mt-3 text-sm font-semibold text-left flex flex-col gap-2">
                        <li>
                            <span className="bg-primary/50 font-bold text-neutral px-1 rounded-base text-sm">
                                *247#
                            </span>{" "}
                            ডায়াল করে {getWay} মোবাইল মেন্যুতে যান, বা অ্যাপ
                            ব্যবহার করুন।
                        </li>
                        <li> "সেন্ড মানি" সিলেক্ট করুন।</li>
                        <li>
                            আমাদের {getWay} একাউন্ট নাম্বারটি{" "}
                            <span className="bg-primary/50 font-bold text-neutral px-1 rounded-base text-sm">
                                +8801
                            </span>{" "}
                            প্রবেশ করুন।
                        </li>
                        <li>
                            প্যাকেজ এর মোট{" "}
                            <span className="bg-primary/50 font-bold text-neutral px-1 rounded-base text-sm">
                                500
                            </span>{" "}
                            টাকা এবং গেটওয়ে ফি{" "}
                            <span className="bg-primary/50 font-bold text-neutral px-1 rounded-base text-sm">
                                90
                            </span>{" "}
                            টাকা।
                        </li>
                        <li>
                            মোট{" "}
                            <span className="bg-primary/50 font-bold text-neutral px-1 rounded-base text-sm">
                                590
                            </span>{" "}
                            টাকা পাঠান।
                        </li>
                        <li>
                            রেফারেন্স হিসেবে{" "}
                            <span className="bg-primary/50 font-bold text-neutral px-1 rounded-base text-sm">
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
                        <Link href={route("ui.contact.index")}>
                            <p className="text-center max-w-[80%] mx-auto text-gray-600 w-full text-sm font-medium mt-3 duration-300 hover:underline hover:text-neutral">
                                যে কোন সমাস্যার সমাধান এর জন্য যোগাযোগ করুন।
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => <NoneLayout children={page} title="পেমেন্ট সিস্টেম" />;
export default Index;
