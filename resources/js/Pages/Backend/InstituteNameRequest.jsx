import { Link, router } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import Paginations from "../../Components/Parts/Paginations";
import Header from "../../Components/Parts/Header";
import { ENGLISH_TO_BANGLA, ENGLISH_DATE_TO_BANGLA } from "../../Utils/Helper";
import { Check, Frown, X } from "lucide-react";

export default function InstituteNameRequest({ data, filters }) {
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
                route("ux.institute.name.request"),
                { search: search },
                {
                    preserveState: true,
                    replace: true,
                }
            );
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    return (
        <div className="bg-white p-6 rounded-box space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4">
                <div>
                    <h4 className="text-lg font-medium">প্রতিষ্ঠানের নাম</h4>
                    <p className="text-sm text-gray-500">
                        এখানে সকল প্রতিষ্ঠানের নাম পরিবর্তন করার জন্য আবেদন।
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
                                <th>আবেদনকারী</th>
                                <th>নতুন নাম</th>
                                <th>আবেদন করেছেন</th>
                                <th>কার্যক্রম</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.map((item, index) => (
                                <tr key={item.id}>
                                    <th>{ENGLISH_TO_BANGLA(index + 1)}</th>
                                    <td>
                                        <div>
                                            <p className="text-sm font-medium text-neutral">
                                                <span>নামঃ</span>{" "}
                                                {item?.teacher?.name}
                                            </p>
                                            <p className="text-sm font-medium text-neutral">
                                                <span>ইমেইলঃ</span>{" "}
                                                {item?.teacher?.email}
                                            </p>
                                            <p className="text-sm font-medium text-neutral">
                                                <span>ফোনঃ</span>{" "}
                                                {item?.teacher?.phone ?? "-"}
                                            </p>
                                        </div>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>
                                        {ENGLISH_DATE_TO_BANGLA(
                                            item.created_at
                                        )}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => {
                                                    if (
                                                        confirm(
                                                            "আপন কি নিশ্চিত?"
                                                        )
                                                    ) {
                                                        router.get(
                                                            route(
                                                                "ux.institute.name.request.accept",
                                                                {
                                                                    id: item.id,
                                                                }
                                                            )
                                                        );
                                                    }
                                                }}
                                                className="btn btn-xs btn-info"
                                            >
                                                <Check size={12} /> গ্রহন করুন
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (
                                                        confirm(
                                                            "আপন কি নিশ্চিত?"
                                                        )
                                                    ) {
                                                        router.get(
                                                            route(
                                                                "ux.institute.name.request.del",
                                                                {
                                                                    id: item.id,
                                                                }
                                                            )
                                                        );
                                                    }
                                                }}
                                                className="btn btn-xs btn-error"
                                            >
                                                <X size={12} /> বাতিল করুন
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

            <Header title="প্রতিষ্ঠানের নাম" />
        </div>
    );
}
