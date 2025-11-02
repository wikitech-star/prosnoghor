import React, { useEffect, useState } from "react";
import { ENGLISH_DATE_TO_BANGLA } from "../../Utils/Helper";
import { useForm, usePage } from "@inertiajs/react";
import Image from "../../Components/Parts/Image";
import Model from "../../Components/Parts/Model";
import Input from "../../Components/Parts/Input";
import Textarea from "../../Components/Parts/Textarea";
import Header from "../../Components/Parts/Header";
import { Edit, X } from "lucide-react";

export default function Institute() {
    const { institute, auth } = usePage().props;

    // avility for chnage institite name
    const [canRequestName, setCanRequestName] = useState(false);
    useEffect(() => {
        if (institute) {
            const updatedAt = new Date(institute.updated_at);
            const today = new Date();
            const diffTime = today - updatedAt;
            const diffDays = diffTime / (1000 * 60 * 60 * 24);
            if (diffDays <= 30) {
                setCanRequestName(false);
            } else {
                setCanRequestName(true);
            }
        }
    }, [institute]);

    // ADDRESS
    const [model, setModel] = useState(false);
    const addressForm = useForm({
        name: institute?.name || "",
        devision: institute?.devision || "",
        zila: institute?.zila || "",
        upozila: institute?.upozila || "",
        phone: institute?.phone || "",
        address: institute?.address || "",
    });
    const handleform = (e) => {
        e.preventDefault();
        addressForm.post(route("tech.institute.post"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                addressForm.reset();
                setModel(false);
            },
        });
    };

    // name chnage request
    const [nameChangeModel, setNameChangeModel] = useState(false);
    const nameForm = useForm({
        name: "",
    });
    const handleNameRequest = (e) => {
        e.preventDefault();
        nameForm.post(route("tech.institute.name.request"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                nameForm.reset();
                setNameChangeModel(false);
            },
        });
    };

    return (
        <>
            <div>
                <div className="bg-primary flex flex-col items-center justify-center py-5">
                    <h1 className="text-neutral font-bold text-xl text-center">
                        {institute?.name}
                    </h1>
                    <p className="text-neutral text-base font-normal">
                        যুক্ত হয়েছেঃ{" "}
                        {ENGLISH_DATE_TO_BANGLA(institute?.created_at)}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-8 max-w-[700px] mx-auto">
                    <div className="col-span-3 border-b border-neutral/20 text-center mb-3">
                        <h1 className="font-bold text-md mb-1">
                            আমাদের শিক্ষকবৃন্দ
                        </h1>
                    </div>

                    <div className="card bg-white flex flex-col items-center justify-center py-6 border border-gray-200 shadow-base">
                        <Image
                            path={auth.avatar && `/uploads/${auth.avatar}`}
                            className="w-15 h-15 rounded-full border-2 border-primary"
                        />
                        <h1 className="text-lg font-semibold text-neutral mt-3">
                            {auth?.name}
                        </h1>
                        <p className="text-sm text-gray-600 font-normal">
                            {auth?.email}
                        </p>
                        {institute?.teacher_id == auth.id && (
                            <div className="badge badge-warning mt-2">
                                মালিক
                            </div>
                        )}
                    </div>

                    <div className="card bg-white flex flex-col items-center justify-center p-4 border border-gray-200 shadow-base col-span-3">
                        <h1 className="bg-gray-100 w-full px-3 py-2.5 text-center font-semibold text-neutral text-sm">
                            প্রতিষ্ঠানের ঠিকানা{" "}
                            <button
                                onClick={() => setModel(!model)}
                                className="btn btn-xs btn-ghost"
                            >
                                <Edit size={13} />
                            </button>
                        </h1>
                        <table className="w-full text-left border-collapse rounded-box mt-3">
                            <tbody className="border border-gray-200">
                                <tr className="border-b border-gray-200 text-sm">
                                    <td className="bg-gray-50 text-neutral px-5 py-2 w-1/3">
                                        ঠিকানা
                                    </td>
                                    <td className="px-5 py-2">
                                        {institute?.address || "—"}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 text-sm">
                                    <td className="bg-gray-50 font-medium px-5 py-2">
                                        উপজেলা
                                    </td>
                                    <td className="px-5 py-2">
                                        {institute?.upozila || "—"}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200 text-sm">
                                    <td className="bg-gray-50 font-medium px-5 py-2">
                                        জেলা
                                    </td>
                                    <td className="px-5 py-2">
                                        {institute?.zila || "—"}
                                    </td>
                                </tr>
                                <tr className="text-sm">
                                    <td className="bg-gray-50 font-medium px-5 py-2 rounded-bl-lg">
                                        বিভাগ
                                    </td>
                                    <td className="px-5 py-2 rounded-br-lg">
                                        {institute?.devision || "—"}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="card bg-white flex flex-row py-8 items-center justify-between p-4 border border-gray-200 shadow-base col-span-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/20">
                                <Edit size={16} />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-neutral">
                                    প্রতিষ্ঠানের নাম পরিবর্তন করা প্রয়োজন?
                                </h1>
                                <p className="text-sm font-normal text-gray-600">
                                    বাটনে ক্লিক করে নাম পরিবর্তনের ফর্ম সাবমিট
                                    করুন।
                                </p>
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={() => setNameChangeModel(true)}
                                className="btn btn-primary btn-sm"
                            >
                                নাম পরিবর্তন করুন
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* institute */}
            <Model title="প্রতিষ্ঠানের নাম" model={model} setModel={setModel}>
                <div className="space-y-1">
                    {!institute?.id && (
                        <Input
                            value={addressForm.data.name}
                            onChange={(e) =>
                                addressForm.setData("name", e.target.value)
                            }
                            label="প্রতিষ্ঠানের নাম"
                            error={addressForm.errors.name}
                        />
                    )}
                    <Input
                        value={addressForm.data.devision}
                        onChange={(e) =>
                            addressForm.setData("devision", e.target.value)
                        }
                        label="বিভাগ*"
                        error={addressForm.errors.devision}
                    />
                    <Input
                        value={addressForm.data.zila}
                        onChange={(e) =>
                            addressForm.setData("zila", e.target.value)
                        }
                        label="জেলা*"
                        error={addressForm.errors.zila}
                    />
                    <Input
                        value={addressForm.data.upozila}
                        onChange={(e) =>
                            addressForm.setData("upozila", e.target.value)
                        }
                        label="উপজেলা*"
                        error={addressForm.errors.upozila}
                    />
                    <Input
                        value={addressForm.data.phone}
                        onChange={(e) =>
                            addressForm.setData("phone", e.target.value)
                        }
                        label="ফোন"
                        error={addressForm.errors.phone}
                    />
                    <Textarea
                        value={addressForm.data.address}
                        onChange={(e) =>
                            addressForm.setData("address", e.target.value)
                        }
                        placeholder="নির্দিষ্ট ঠিকানা লিখুন (যদি থাকে) । এখানে জেলা বা উপজেলা লিখবেন না ।"
                    />
                    <button
                        onClick={handleform}
                        disabled={addressForm.processing}
                        className="btn btn-sm btn-primary w-full"
                    >
                        সেভ করুন
                    </button>
                </div>
            </Model>

            {/* institute name chnage  */}
            <Model
                title="প্রতিষ্ঠানের নাম পরিবর্তন ফর্ম"
                model={nameChangeModel}
                setModel={setNameChangeModel}
                modelClassName="max-w-[400px]"
            >
                <div className="mb-3">
                    <h1 className="text-lg text-error font-semibold">
                        শর্তাবলী
                    </h1>
                    <p className="text-sm font-normal text-gray-800 mt-2 mb-1">
                        ১। নামটি অবশ্যই প্রাতিষ্ঠানিক নাম হতে হবে। নিউট্রাল কোন
                        নাম এপ্রুভ হবে না (যেমন - অধ্যায়ভিত্তিক পরীক্ষা, টিউটর,
                        সাপ্তাহিক পরীক্ষা, মুল্যায়ন ইত্যাদি)
                    </p>
                    <p className="text-sm font-normal text-gray-800">
                        ২। নাম পরিবর্তনের ৩০ দিনের মধ্যে নতুন করে পরিবর্তন করতে
                        পারবেন না
                    </p>
                </div>

                {canRequestName ? (
                    <>
                        <Input
                            label="নতুন নাম"
                            value={nameForm.data.name}
                            error={nameForm.errors.name}
                            onChange={(e) =>
                                nameForm.setData("name", e.target.value)
                            }
                        />
                        <button
                            onClick={handleNameRequest}
                            disabled={nameForm.processing}
                            className="btn btn-primary btn-sm mt-2 w-full"
                        >
                            সাবমিট করুন
                        </button>
                    </>
                ) : (
                    <div className="border border-dashed border-neutral px-4 py-5 rounded-box flex flex-col items-center justify-center">
                        <div className="w-8 h-8 rounded-full text-error bg-error/20 flex items-center justify-center">
                            <X size={14}/>
                        </div>
                        <p className="mt-3 text-center text-sm text-neutral">৩০ দিনের মধ্যে আপনার প্রতিষ্ঠানের নাম পরিবর্তন হয়েছে। আপনার যদি পরিবর্তন করতে হয়ছে সরাসরি এডমিন এর সাথে যোগাযোগ করুন</p>
                    </div>
                )}
            </Model>

            <Header title="প্রতিষ্ঠান" />
        </>
    );
}
