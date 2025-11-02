import Input from "../../../Components/Parts/Input";
import Textarea from "../../../Components/Parts/Textarea";
import FileInput from "../../../Components/Parts/FileInput";
import { router, useForm, usePage } from "@inertiajs/react";
import Header from "../../../Components/Parts/Header";

export default function SiteSetting() {
    const { siteSettings } = usePage().props;
    const siteForm = useForm({
        site_name: siteSettings?.site_name || "",
        meta_description: siteSettings?.meta_description || "",
        meta_keywords: siteSettings?.meta_keywords || "",
        logo: null,
        favicon: null,
        logo_old: siteSettings?.site_logo || null,
        favicon_old: siteSettings?.site_favicon || null,
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        siteForm.post(route("ux.site.setting.post"), {
            preserveScroll: true,
        });
    };

    return (
        <>
            <div className="bg-white p-6 rounded-box space-y-6">
                <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4">
                    <div>
                        <h4 className="text-lg font-medium">সাইট সেটিংস</h4>
                        <p className="text-sm text-gray-500">
                            এখানে আপনি সাইটের সকল সেটিংস এর তথ্য আপডেট করতে
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
                        <Input
                            label="সাইট নাম"
                            value={siteForm.data.site_name}
                            onChange={(e) =>
                                siteForm.setData("site_name", e.target.value)
                            }
                            name="site_name"
                            error={siteForm.errors.site_name}
                            type="text"
                        />
                        <Textarea
                            label="মেটা বর্ণনা"
                            name="meta_description"
                            value={siteForm.data.meta_description}
                            onChange={(e) =>
                                siteForm.setData(
                                    "meta_description",
                                    e.target.value
                                )
                            }
                            error={siteForm.errors.meta_description}
                        />
                        <Textarea
                            label="মেটা কীওয়ার্ড (কমা দিয়ে দিয়ে লিখুন)"
                            name="meta_keywords"
                            value={siteForm.data.meta_keywords}
                            onChange={(e) =>
                                siteForm.setData(
                                    "meta_keywords",
                                    e.target.value
                                )
                            }
                            error={siteForm.errors.meta_keywords}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FileInput
                                old={
                                    siteSettings?.site_logo &&
                                    `/uploads/${siteSettings?.site_logo}`
                                }
                                name="logo"
                                onChange={(f) => siteForm.setData("logo", f)}
                                error={siteForm.errors.logo}
                                accept="image/png,.jpg,.jpeg"
                                className="bg-neutral"
                            />
                            <FileInput
                                old={
                                    siteSettings?.site_favicon &&
                                    `/uploads/${siteSettings?.site_favicon}`
                                }
                                name="favicon"
                                onChange={(f) => siteForm.setData("favicon", f)}
                                error={siteForm.errors.favicon}
                                accept="image/png,.jpg,.jpeg"
                                className="bg-neutral"
                            />
                        </div>
                        <button
                            disabled={siteForm.processing}
                            type="submit"
                            className="btn btn-sm btn-primary"
                        >
                            আপডেট করুন
                        </button>
                    </form>
                </div>
            </div>

            {/* maintance */}
            <div className="bg-white p-6 rounded-box mt-6 flex flex-col md:flex-row md:items-center justify-between">
                <div>
                    <h1 className="text-base text-neutral">
                        সাইট রক্ষণাবেক্ষণ
                    </h1>
                    <p className="text-neutral/60 text-sm">
                        এই সেকশনে আপনি সাইটের রক্ষণাবেক্ষণ সংক্রান্ত সেটিংস
                        কনফিগার করতে পারবেন।
                    </p>
                </div>
                <div>
                    <input
                        type="checkbox"
                        checked={
                            siteSettings?.maintenance_mode == "off"
                                ? false
                                : true
                        }
                        onChange={(e) =>
                            router.get(
                                route("ux.site.setting.maintenance"),
                                {
                                    maintenance_mode: e.target.checked
                                        ? "on"
                                        : "off",
                                },
                                {
                                    preserveScroll: true,
                                    preserveState: true,
                                }
                            )
                        }
                        className="toggle"
                    />
                </div>
            </div>

            <Header title="সাইট সেটিংস" />
        </>
    );
}
