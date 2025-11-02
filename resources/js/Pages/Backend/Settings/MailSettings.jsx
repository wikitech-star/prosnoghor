import Input from "../../../Components/Parts/Input";
import { Head, useForm } from "@inertiajs/react";
import Header from "../../../Components/Parts/Header";

export default function MailSettings({ data }) {
    const mailForm = useForm({
        mailer: data?.mail_mailer || "",
        host: data?.mail_host || "",
        port: data?.mail_port || "",
        username: data?.mail_username || "",
        password: data?.mail_password || "",
        encryption: data?.mail_encryption || "tls",
        from_address: data?.mail_from_address || "",
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        mailForm.post(route("ux.mail.setting.post"), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <div className="bg-white p-6 rounded-box space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4">
                <div>
                    <h4 className="text-lg font-medium">ইমেইল সেটিংস</h4>
                    <p className="text-sm text-gray-500">
                        এখানে আপনি সাইটের ইমেইল সেটিংস এর তথ্য আপডেট করতে
                        পারবেন।
                    </p>
                </div>
            </div>

            <div className="mt-5">
                <form
                    className="space-y-4"
                    method="post"
                    onSubmit={handleFormSubmit}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                            label="মেইলার নাম*"
                            value={mailForm.data.mailer}
                            onChange={(e) =>
                                mailForm.setData("mailer", e.target.value)
                            }
                            error={mailForm.errors.mailer}
                            type="text"
                        />
                        <Input
                            label="হোস্ট নাম*"
                            value={mailForm.data.host}
                            onChange={(e) =>
                                mailForm.setData("host", e.target.value)
                            }
                            error={mailForm.errors.host}
                            type="text"
                            className="col-span-2"
                        />

                        <Input
                            label="পোর্ট*"
                            value={mailForm.data.port}
                            onChange={(e) =>
                                mailForm.setData("port", e.target.value)
                            }
                            error={mailForm.errors.port}
                            type="number"
                        />
                        <Input
                            label="সিকুরিটি*"
                            value={mailForm.data.encryption}
                            onChange={(e) =>
                                mailForm.setData("encryption", e.target.value)
                            }
                            error={mailForm.errors.encryption}
                            type="text"
                        />
                        <Input
                            label="পাসওয়ার্ড*"
                            value={mailForm.data.password}
                            onChange={(e) =>
                                mailForm.setData("password", e.target.value)
                            }
                            error={mailForm.errors.password}
                            type="text"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="ইউজারনাম*"
                            value={mailForm.data.username}
                            onChange={(e) =>
                                mailForm.setData("username", e.target.value)
                            }
                            error={mailForm.errors.username}
                            type="email"
                        />
                        <Input
                            label="প্রেরক মেইল*"
                            value={mailForm.data.from_address}
                            onChange={(e) =>
                                mailForm.setData("from_address", e.target.value)
                            }
                            error={mailForm.errors.from_address}
                            type="email"
                        />
                    </div>

                    <button
                        disabled={mailForm.processing}
                        type="submit"
                        className="btn btn-sm btn-primary"
                    >
                        আপডেট করুন
                    </button>
                </form>
            </div>

            <Header title="ইমেইল সেটিংস" />
        </div>
    );
}
