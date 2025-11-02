import { useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Header from "../Parts/Header";
import Model from "../Parts/Model";
import Input from "../Parts/Input";
import Textarea from "../Parts/Textarea";

export default function Global({
    title,
    className = "max-h-screen",
    children,
}) {
    const { flash, auth, appName, appurl, institute } = usePage().props;

    const [model, setModel] = useState(false);
    useEffect(() => {
        if (auth?.role == "teacher" && !institute) {
            setModel(true);
        }
    }, []);

    // for flash message
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    // manage clipboard
    useEffect(() => {
        const handleCopy = (e) => {
            e.preventDefault();

            // user যেই text select করেছে সেটা নেওয়া
            const selectedText = window.getSelection().toString().trim();

            if (!selectedText) return; // কিছু select না করলে ignore

            // Default custom message (Bangla warning + website link)
            let customText = "";

            // Admin বা editor হলে original text allow করা
            if (auth && (auth.role === "admin" || auth.role === "editor")) {
                customText = selectedText;
            } else {
                customText = `দুঃখিত, এই লিখা কপি করা অনুমোদিত নেই। দয়া করে এই ওয়েবসাইট থেকে কন্টেন্ট দেখুন: ${appurl} - ${appName}`;
            }

            // Clipboard-এ set করা
            const setClipboard = async () => {
                try {
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        await navigator.clipboard.writeText(customText);
                    } else if (e.clipboardData) {
                        e.clipboardData.setData("text/plain", customText);
                    }
                    console.log("Copied text replaced with:", customText);

                    // Optional: user alert (comment/uncomment as needed)
                    // if (!(auth.role === "admin" || auth.role === "editor")) {
                    //     alert(customText);
                    // }
                } catch (err) {
                    console.error("Clipboard write failed:", err);
                }
            };

            setClipboard();
        };

        document.addEventListener("copy", handleCopy);

        return () => {
            document.removeEventListener("copy", handleCopy);
        };
    }, []);

    // ADDRESS
    const addressForm = useForm({
        name: "",
        devision: "",
        zila: "",
        upozila: "",
        phone: "",
        address: "",
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

    return (
        <div className="w-full">
            <Header title={title} />
            <div className={`${className}`}>{children}</div>
            <Toaster position="top-center" reverseOrder={false} />

            {/* institute */}
            <Model title="প্রতিষ্ঠানের নাম" model={model} setModel={setModel}>
                <div className="space-y-1">
                    <Input
                        value={addressForm.data.name}
                        onChange={(e) =>
                            addressForm.setData("name", e.target.value)
                        }
                        label="প্রতিষ্ঠানের নাম"
                        error={addressForm.errors.name}
                    />
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
        </div>
    );
}
