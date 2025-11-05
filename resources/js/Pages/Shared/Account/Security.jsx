import React from "react";
import Header from "../../../Components/Parts/Header";
import Input from "../../../Components/Parts/Input";
import { useForm, usePage } from "@inertiajs/react";

export default function Security() {
    const { data, setData, processing, errors, post, reset } = useForm({
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("g.security.post"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };
    return (
        <div>
            <div className="bg-white rounded-box max-w-[600px] mx-auto">
                <div className="bg-primary/20 py-5 px-3 text-center">
                    <h1 className="text-lg font-bold text-neutral">সিকুরিটি</h1>
                </div>
                <div className="grid grid-cols-1 gap-3 p-5">
                    <Input
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        error={errors.password}
                        label="নতুন পাসওয়ার্ড*"
                        type="password"
                    />
                    <Input
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        error={errors.password_confirmation}
                        label="আবার দিন পাসওয়ার্ড"
                        type="password"
                    />
                    <button
                        onClick={handleSubmit}
                        disabled={processing}
                        className="btn btn-md btn-primary w-full"
                    >
                        সেভ করুন
                    </button>
                </div>
            </div>

            <Header title="সিকুরিটি" />
        </div>
    );
}
