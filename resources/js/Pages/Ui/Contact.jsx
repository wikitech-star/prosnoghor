import React from "react";
import GuestLayout from "../../Components/Layouts/GuestLayout";
import Input from "../../Components/Parts/Input";
import Textarea from "../../Components/Parts/Textarea";
import { LocateIcon, Mail, Map, Phone } from "lucide-react";
import { useForm, usePage } from "@inertiajs/react";

function Contact() {
    const { auth } = usePage().props;

    const { data, setData, reset, post, errors, processing } = useForm({
        name: auth?.name || "",
        email: auth?.email || "",
        phone: auth?.phone || "",
        subject: "",
        message: "",
    });

    const submitForm = (e) => {
        e.preventDefault();
        post(route("ui.contact.post"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                reset();
            },
        });
    };
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* title */}
            <div className="bg-primary">
                <div className="container py-15">
                    <div className="max-w-[600px] mx-auto text-center">
                        <h1 className="text-3xl font-bold text-neutral">
                            যোগাযোগ করুন
                        </h1>
                        <p className="text-base font-normal mt-3 text-neutral">
                            যে কোনো প্রশ্ন বা প্রয়োজনের জন্য আমাদের সাথে সরাসরি
                            যোগাযোগ করুন
                        </p>
                    </div>
                </div>
            </div>

            {/* contact info */}
            <div className="mt-10 container">
                <div className="flex flex-col lg:flex-row items-start justify-center gap-10">
                    <div className="space-y-10 w-full lg:w-[300px]">
                        <div className="">
                            <h1 className="font-black text-xl text-neutral">
                                যোগাযোগ তথ্য
                            </h1>
                            <p className="font-normal text-base text-neutral">
                                আপনার অভিযোগ বা সমস্যা আমাদের জানাতে নিচের
                                মাধ্যম ব্যাবহার করুন
                            </p>
                        </div>

                        <div className="flex items-center gap-x-4">
                            <div className="w-10 h-10 bg-primary/40 text-neutral rounded-box flex items-center justify-center">
                                <LocateIcon size={18} />
                            </div>
                            <div>
                                <h1 className="text-lg font-black text-neutral">
                                    ঠিকানা
                                </h1>
                                <p className="text-sm font-semibold">
                                    বাংলাদেশ, ঢাকা
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-4">
                            <div className="w-10 h-10 bg-primary/40 text-neutral rounded-box flex items-center justify-center">
                                <Mail size={18} />
                            </div>
                            <div>
                                <h1 className="text-lg font-black text-neutral">
                                    ইমেইল
                                </h1>
                                <a
                                    href="mailto:info@prosnoghor.com"
                                    className="text-sm font-semibold"
                                >
                                    info@prosnoghor.com
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-4">
                            <div className="w-10 h-10 bg-primary/40 text-neutral rounded-box flex items-center justify-center">
                                <Phone size={18} />
                            </div>
                            <div>
                                <h1 className="text-lg font-black text-neutral">
                                    ফোন নাম্বার
                                </h1>
                                <a
                                    href="tel:01871098"
                                    className="text-sm font-semibold"
                                >
                                    +8801871098**
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-4">
                            <div className="w-10 h-10 bg-primary/40 text-neutral rounded-box flex items-center justify-center">
                                <Map size={18} />
                            </div>
                            <div>
                                <h1 className="text-lg font-black text-neutral">
                                    ম্যাপ
                                </h1>
                                <a
                                    href="https://maps.app.goo.gl/mMaw1h22tPdopUFA8"
                                    target="_blank"
                                    className="text-sm font-semibold"
                                >
                                    ভিজিট করুন
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow-[0_0_100px_rgba(0,0,0,0.03)] border border-primary/30 w-full lg:w-[550px] rounded-box">
                        <div className="bg-primary/20 px-5 py-9 text-center">
                            <h1 className="font-black text-xl text-neutral">
                                অভিযোগ ফর্ম
                            </h1>
                            <p className="font-normal text-base text-neutral">
                                আপনার অভিযোগ বা সমস্যা আমাদের জানান, আমরা দ্রুত
                                সমাধান দেব
                            </p>
                        </div>

                        <div className="space-y-3 p-8">
                            <Input
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                error={errors.name}
                                label="আপনার নাম*"
                            />
                            <Input
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                error={errors.email}
                                label="ইমেইল ঠিকানা"
                                type="email"
                            />
                            <Input
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                error={errors.phone}
                                label="ফোন নাম্বার*"
                                type="tel"
                            />
                            <Input
                                value={data.subject}
                                onChange={(e) =>
                                    setData("subject", e.target.value)
                                }
                                error={errors.subject}
                                label="বিষয়*"
                            />
                            <Textarea
                                value={data.message}
                                onChange={(e) =>
                                    setData("message", e.target.value)
                                }
                                error={errors.message}
                                label="মতামত*"
                            />
                            <button
                                disabled={processing}
                                onClick={submitForm}
                                className="btn btn-primary w-full"
                            >
                                সেন্ড করুন
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Contact.layout = (page) => <GuestLayout children={page} title="যোগাযোগ করুন" />;
export default Contact;
