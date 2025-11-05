import React, { useEffect } from "react";
import Header from "../../../Components/Parts/Header";
import Input from "../../../Components/Parts/Input";
import TextEditor from "../../../Components/Parts/TextEditor";
import FileInput from "../../../Components/Parts/FileInput";
import Textarea from "../../../Components/Parts/Textarea";
import { useForm } from "@inertiajs/react";

export default function Add({ update }) {
    const seedFrom = useForm({
        id: update?.id || "",
        title: update?.title || "",
        slug: update?.slug || "",
        details: update?.details || "",
        price: update?.price || "",
        selling_price: update?.selling_price || "",
        thumbnail: null,
        thumbnailOld: update?.thumbnail || null,
        product: null,
        keyword: update?.seo_taqs || "",
        seo_details: update?.seo_description || "",
    });

    // Auto-generate slug when title changes
    useEffect(() => {
        if (seedFrom.data.title) {
            const slug = seedFrom.data.title
                .toLowerCase()
                .trim()
                // বাংলা (অথবা যেকোন ইউনিকোড) অক্ষর রাখতে
                .replace(/[^\p{L}\p{N}\s-]/gu, "")
                // ফাঁকা জায়গা (-) এ রূপান্তর
                .replace(/\s+/g, "-")
                // একাধিক ড্যাশ একসাথে থাকলে একটিতে নামিয়ে আনা
                .replace(/-+/g, "-");

            seedFrom.setData("slug", slug);
        } else {
            seedFrom.setData("slug", "");
        }
    }, [seedFrom.data.title]);

    const handleSubmit = (e) => {
        e.preventDefault();
        seedFrom.post(route("ux.seed.post"), {
            preserveScroll: true,
            preserveState: true,
        });
    };
    return (
        <div>
            <div className="max-w-4xl mx-auto border border-gray-200 rounded-box">
                <div className="bg-primary/30 text-center py-8 px-3">
                    <h1 className="text-center font-bold text-lg text-neutral">
                        সিট ম্যানেজ করুন
                    </h1>
                    <p className="text-base text-neutral">
                        নতুন সিট যিক্ত করুন অথবা পরিবর্তন করুন।
                    </p>
                </div>

                <div className="p-7 rounded-box bg-white space-y-4">
                    <div>
                        <Input
                            value={seedFrom.data.title}
                            onChange={(e) =>
                                seedFrom.setData("title", e.target.value)
                            }
                            error={seedFrom.errors.title}
                            label="টাইটেল*"
                        />
                        <small>{seedFrom.data.slug}</small>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input
                            value={seedFrom.data.price}
                            onChange={(e) =>
                                seedFrom.setData("price", e.target.value)
                            }
                            error={seedFrom.errors.price}
                            label="মূল্য"
                            type="number"
                            step="0.01"
                        />
                        <Input
                            value={seedFrom.data.selling_price}
                            onChange={(e) =>
                                seedFrom.setData(
                                    "selling_price",
                                    e.target.value
                                )
                            }
                            error={seedFrom.errors.selling_price}
                            label="বিক্রয় মূল্য*"
                            type="number"
                            step="0.01"
                        />
                    </div>

                    <div>
                        <small>বিস্তারিত*</small>
                        <TextEditor name="details" form={seedFrom} />
                        {seedFrom.errors.details && (
                            <small className="text-error">
                                {seedFrom.errors.details}
                            </small>
                        )}
                    </div>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">
                            প্রোডাক্ট* (ZIP ফাইল হবে শুধু)
                        </legend>
                        <input
                            onChange={(e) => {
                                seedFrom.setData("product", e.target.files[0]);
                            }}
                            className="file-input"
                            type="file"
                            accept=".zip"
                        />
                        {seedFrom.errors.product && (
                            <small className="text-error">
                                {seedFrom.errors.product}
                            </small>
                        )}
                    </fieldset>

                    <div className="divider">SEO</div>

                    <div>
                        <small>ফিচার ইমেজ</small>
                        <FileInput
                            name="thumbnail"
                            old={
                                seedFrom.data.thumbnailOld
                                    ? "/uploads/" + seedFrom.data.thumbnailOld
                                    : ""
                            }
                            error={seedFrom.errors.image}
                            accept="image/*"
                            onChange={(file) =>
                                seedFrom.setData("thumbnail", file)
                            }
                        />
                    </div>
                    <Textarea
                        value={seedFrom.data.keyword}
                        error={seedFrom.errors.keyword}
                        onChange={(e) =>
                            seedFrom.setData("keyword", e.target.value)
                        }
                        label="কিওয়ার্ড"
                        placeholder="কিওয়ার্ড,কিওয়ার্ড"
                    />
                    <Textarea
                        value={seedFrom.data.seo_details}
                        error={seedFrom.errors.seo_details}
                        onChange={(e) =>
                            seedFrom.setData("seo_details", e.target.value)
                        }
                        label="ডিসক্রিবসন"
                    />

                    <button
                        onClick={handleSubmit}
                        disabled={seedFrom.processing}
                        className="btn btn-primary w-full"
                    >
                        সেভ করুন
                    </button>
                </div>
            </div>

            <Header title="সিট ম্যানেজ" />
        </div>
    );
}
