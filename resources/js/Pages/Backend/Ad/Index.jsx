import React, { useEffect, useRef, useState } from "react";
import Model from "../../../Components/Parts/Model";
import Input from "../../../Components/Parts/Input";
import FileInput from "../../../Components/Parts/FileInput";
import Paginations from "../../../Components/Parts/Paginations";
import Header from "../../../Components/Parts/Header";
import { Link, router, useForm } from "@inertiajs/react";
import { Eye, Frown, Plus, Trash } from "lucide-react";
import {
    ENGLISH_TO_BANGLA,
    ENGLISH_DATE_TO_BANGLA,
    BANGLA_TIME_AGO,
} from "../../../Utils/Helper";

export default function Index({ data, filters }) {
    const [model, setModel] = useState(false);
    // search
    const [search, setSearch] = useState(filters.search ?? "");
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            router.get(
                route("ux.ad.list"),
                { search: search },
                {
                    preserveState: true,
                    replace: true,
                }
            );
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    // form
    const qFfrom = useForm({
        id: "",
        title: "",
        url: "",
        image: null,
        OldImage: "",
    });

    const handleForm = (e) => {
        e.preventDefault();
        qFfrom.post(route("ux.ad.post"), {
            preserveScroll: true,
            onSuccess: () => {
                qFfrom.reset();
                setModel(false);
            },
        });
    };

    return (
        <div className="bg-white p-6 rounded-box space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4">
                <div>
                    <h4 className="text-lg font-medium">সকল বিজ্ঞাপন</h4>
                    <p className="text-sm text-gray-500">
                        সকল বিজ্ঞাপন এখান থেকে ম্যানেজ করুন
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <input
                        type="search"
                        className="input input-sm"
                        placeholder="সার্স..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        onClick={() => setModel(!model)}
                        className="btn btn-sm btn-primary"
                    >
                        <Plus size={13} />
                        নতুন বিজ্ঞাপন
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                {data.data.length === 0 ? (
                    <div className="p-6 text-center text-base text-gray-500">
                        <Frown size={20} className="mx-auto mb-3" />
                        কোন তথ্য পাওয়া যায়নি!
                    </div>
                ) : (
                    <table className="table">
                        <thead className="bg-primary text-neutral">
                            <tr>
                                <th></th>
                                <th>টাইটেল</th>
                                <th>লিংক</th>
                                <th>তারিখ</th>
                                <th>কার্যক্রম</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.map((item, index) => (
                                <tr key={item.id}>
                                    <th>{ENGLISH_TO_BANGLA(index + 1)}</th>
                                    <td>
                                        <img src={`/uploads/${item?.image}`} className="w-30 h-auto"/>
                                        <p className="mt-1 text-base font-bold text-neutral">{item?.title}</p>
                                    </td>
                                    <td>
                                        <a href={item.url} className="text-neutral underline" target="_blank">
                                            {item.url}
                                        </a>
                                    </td>
                                    <td>{BANGLA_TIME_AGO(item.created_at)}</td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() =>
                                                    confirm(
                                                        "আপনি কি নিশ্চিত মুছে ফেলতে চান?"
                                                    ) &&
                                                    router.get(
                                                        route("ux.ad.del", {
                                                            id: item.id,
                                                        })
                                                    )
                                                }
                                                className="btn btn-xs btn-error btn-circle"
                                            >
                                                <Trash size={12} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* pagination */}
            <Paginations data={data} />

            <Header title="সকল মতব্যর তালিকা" />

            <Model
                title="নতুন বিজ্ঞাপন"
                model={model}
                setModel={setModel}
                modelClassName="min-w-[400px]"
            >
                <div className="space-y-3">
                    <Input
                        label="টাইটেল*"
                        value={qFfrom.data?.title}
                        onChange={(e) =>
                            qFfrom.setData("title", e.target.value)
                        }
                        error={qFfrom.errors.title}
                    />
                    <Input
                        label="URL"
                        type="text"
                        value={qFfrom.data?.url}
                        onChange={(e) => qFfrom.setData("url", e.target.value)}
                        error={qFfrom.errors.url}
                    />
                    <FileInput
                        accept="image/*"
                        name="image"
                        value={qFfrom.data?.image}
                        old={
                            qFfrom.data.OldImage
                                ? "/uploads/" + qFfrom.data.OldImage
                                : ""
                        }
                        onChange={(file) => qFfrom.setData("image", file)}
                        error={qFfrom.errors.image}
                    />
                    <button
                        onClick={handleForm}
                        disabled={qFfrom.processing}
                        className="btn btn-primary w-full"
                    >
                        সেভ করুন
                    </button>
                </div>
            </Model>
        </div>
    );
}
