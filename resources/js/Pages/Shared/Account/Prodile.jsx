import React from "react";
import Header from "../../../Components/Parts/Header";
import Input from "../../../Components/Parts/Input";
import Select from "../../../Components/Parts/Select";
import Textarea from "../../../Components/Parts/Textarea";
import FileInput from "../../../Components/Parts/FileInput";
import { useForm, usePage } from "@inertiajs/react";

export default function Prodile() {
    const { auth } = usePage().props;

    const { data, setData, reset, post, processing, errors } = useForm({
        name: auth?.name || "",
        phone: auth?.phone || "",
        genader: auth?.gender || "",
        blood: auth?.blod_group || "",
        date_of_birth: auth?.date_of_birth || "",
        address: auth?.address || "",
        avatar: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("g.account.post"), {
            preserveScroll: true,
        });
    };
    return (
        <div>
            <div className="bg-white rounded-box max-w-[600px] mx-auto">
                <div className="bg-primary/20 py-5 px-3 text-center">
                    <h1 className="text-lg font-bold text-neutral">প্রোফাইল</h1>
                </div>
                <div className="grid grid-cols-1 gap-3 p-5">
                    <FileInput
                        name="avatar"
                        error={errors.avatar}
                        old={auth.avatar ? "/uploads/" + auth?.avatar : ""}
                        onChange={(file) => setData("avatar", file)}
                    />
                    <Input
                        label="নাম*"
                        value={data.name}
                        error={errors.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    <Input
                        label="ফোন নাম্বার"
                        value={data.phone}
                        error={errors.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                    />
                    <Select
                        label="লিঙ্গ"
                        options={{
                            male: "পূরুষ",
                            female: "মহিলা",
                        }}
                        error={errors.genader}
                        oldVal={data.genader}
                        onChange={(e) => setData("genader", e.target.value)}
                    />
                    <Input
                        label="রক্তের গ্রুপ"
                        value={data.blood}
                        error={errors.blood}
                        onChange={(e) => setData("blood", e.target.value)}
                    />
                    <Input
                        label="জন্ম তারিখ"
                        value={data.date_of_birth}
                        type="date"
                        error={errors.date_of_birth}
                        onChange={(e) =>
                            setData("date_of_birth", e.target.value)
                        }
                    />
                    <Textarea
                        label="ঠিকানা"
                        value={data.address}
                        error={errors.address}
                        onChange={(e) => setData("address", e.target.value)}
                    />
                    <button
                        onClick={handleSubmit}
                        disabled={processing}
                        className="btn btn-primary btn-md w-full"
                    >
                        সেভ করুন
                    </button>
                </div>
            </div>

            <Header title="একাউন্ট" />
        </div>
    );
}
