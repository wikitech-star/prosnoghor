import React from "react";
import Input from "../../../Components/Parts/Input";
import Header from "../../../Components/Parts/Header";
import Select from "../../../Components/Parts/Select";
import { useForm } from "@inertiajs/react";

export default function Add({ packageList, update }) {
    const from = useForm({
        id: update?.id || "",
        code: update?.code || "",
        value: update?.value || "",
        target: update?.target || "",
        type: update?.type || "",
        usages: update?.usages || "",
    });

    const handleForm = (e) => {
        e.preventDefault();
        from.post(route("ux.cupon.post"), {
            preserveScroll: true,
            preserveState: true,
        });
    };
    return (
        <div>
            <div className="bg-white rounded-box border border-gray-200 mx-auto max-w-xl">
                <h1 className="text-center text-md py-3 px-3 font-bold text-neutral bg-primary">
                    কুপন তৈরি করুন
                </h1>
                <div className="mt-3 p-5 space-y-4">
                    <Input
                        label="কুপন কোড*"
                        value={from.data.code}
                        onChange={(e) => from.setData("code", e.target.value)}
                        error={from.errors.code}
                    />

                    <Input
                        label="পরিমান*"
                        type="number"
                        step="1"
                        value={from.data.value}
                        onChange={(e) => from.setData("value", e.target.value)}
                        error={from.errors.value}
                    />

                    <Select
                        oldVal={from.data.target}
                        onChange={(e) => from.setData("target", e.target.value)}
                        label="নির্দিষ্ট প্যাকেজ"
                        options={packageList}
                        error={from.errors.target}
                    />

                    <Select
                        oldVal={from.data.type}
                        onChange={(e) => from.setData("type", e.target.value)}
                        label="ছাড় এর ধরণ*"
                        options={{
                            p: "পার্সেন্ট(%)",
                            t: "টাকা(৳)",
                        }}
                        error={from.errors.type}
                    />

                    <Input
                        label="ব্যাবহার লিমিট* (কিছু না দিলে লিমিট থাকবে না)"
                        type="number"
                        step="1"
                        value={from.data.usages}
                        onChange={(e) => from.setData("usages", e.target.value)}
                    />

                    <button
                        disabled={from.processing}
                        onClick={handleForm}
                        className="btn btn-primary btn-sm w-full"
                    >
                        সেভ করুন
                    </button>
                </div>
            </div>

            <Header title="কুপন তৈরি" />
        </div>
    );
}
