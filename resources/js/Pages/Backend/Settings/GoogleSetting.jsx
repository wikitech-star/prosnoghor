import Input from "../../../Components/Parts/Input";
import { router, useForm } from "@inertiajs/react";
import Header from "../../../Components/Parts/Header";

export default function GoogleSetting({ data, callback_url }) {
    const authForm = useForm({
        client_id: data?.client_id || "",
        client_secrate: data?.client_secrate || "",
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        authForm.post(route("ux.goolge.auth.setting.post"), {
            preserveScroll: true,
        });
    };

    return (
        <>
            <div className="bg-white p-6 rounded-box space-y-6">
                <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4">
                    <div>
                        <h4 className="text-lg font-medium">
                            গুগল লগইন সেটিংস
                        </h4>
                        <p className="text-sm text-gray-500">
                            এখানে আপনার সাইটের গুগল লগইন সেটিংস এর তথ্য আপডেট
                            করতে পারবেন।
                        </p>
                    </div>
                </div>

                <div className="mt-5">
                    <form
                        className="space-y-4"
                        method="post"
                        onSubmit={handleFormSubmit}
                    >
                        <Input
                            label="ক্লাইন্ট আইডি*"
                            value={authForm.data.client_id}
                            onChange={(e) =>
                                authForm.setData("client_id", e.target.value)
                            }
                            error={authForm.errors.client_id}
                            type="text"
                        />
                        <Input
                            label="ক্লাইন্ট সিকরেট*"
                            value={authForm.data.client_secrate}
                            onChange={(e) =>
                                authForm.setData(
                                    "client_secrate",
                                    e.target.value
                                )
                            }
                            error={authForm.errors.client_secrate}
                            type="text"
                        />
                        <Input
                            label="লিংক"
                            value={callback_url}
                            type="url"
                            readonly
                        />

                        {/* status */}
                        <div className="flex items-center gap-3">
                            <h1 className="text-sm text-neutral">
                                গুগল লগিন বন্ধ/চালু করুন
                            </h1>
                            <div className="flex-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={
                                        data?.status == "active" ? true : false
                                    }
                                    onChange={(e) =>
                                        router.get(
                                            route(
                                                "ux.goolge.auth.setting.status"
                                            ),
                                            {
                                                status: e.target.checked
                                                    ? "active"
                                                    : "inactive",
                                            },
                                            {
                                                preserveScroll: true,
                                                preserveState: true,
                                            }
                                        )
                                    }
                                    className="toggle"
                                />
                                <span className="text-sm text-neutral">
                                    {data?.status == "active" ? "চালু" : "বন্ধ"}
                                </span>
                            </div>
                        </div>

                        <button
                            disabled={authForm.processing}
                            type="submit"
                            className="btn btn-sm btn-primary"
                        >
                            আপডেট করুন
                        </button>
                    </form>
                </div>
            </div>

            <Header title="গুগল সেটিংস" />
        </>
    );
}
