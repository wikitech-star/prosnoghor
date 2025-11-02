import React, { useEffect, useRef, useState } from "react";
import Header from "../../../Components/Parts/Header";
import Paginations from "../../../Components/Parts/Paginations";
import { Link, router } from "@inertiajs/react";
import { Frown, Pen, Plus, Trash } from "lucide-react";
import {
    ENGLISH_TO_BANGLA,
    ENGLISH_DATE_TO_BANGLA,
} from "../../../Utils/Helper";

function Index({ data, filters }) {
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
                route("ux.cupon.list"),
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
                    <h4 className="text-lg font-medium">সকল কুপন</h4>
                    <p className="text-sm text-gray-500">
                        আপনার তৈরি সকল কুপন এখান থেকে ম্যানেজ করতে পারেন।
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
                    <Link
                        href={route("ux.cupon.add")}
                        className="btn btn-primary btn-sm"
                    >
                        <Plus size={13} />
                        নতুন কুপন
                    </Link>
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
                                <th>কোড</th>
                                <th>পরিমান</th>
                                <th>লিমিট</th>
                                <th>ব্যাবহার করেছেন</th>
                                <th>তৈরি করেছেন</th>
                                <th>সর্বশেষ পরিবর্তন</th>
                                <th>কার্যক্রম</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.map((item, index) => (
                                <tr key={item.id}>
                                    <th>{ENGLISH_TO_BANGLA(index + 1)}</th>
                                    <td>{item.code}</td>
                                    <td>
                                        ৳
                                        {ENGLISH_TO_BANGLA(item.value) || "N/A"}
                                        {' - '}
                                        {item?.type == 'p' ? 'পারসেন্ট' : 'টাকা'}
                                    </td>
                                    <td>
                                        {ENGLISH_TO_BANGLA(item.usages)} টাইম
                                    </td>
                                    <td>
                                        {ENGLISH_TO_BANGLA(item.total_usages)} টাইম
                                    </td>
                                    <td>
                                        {ENGLISH_DATE_TO_BANGLA(
                                            item.created_at
                                        )}
                                    </td>
                                    <td>
                                        {ENGLISH_DATE_TO_BANGLA(
                                            item.updated_at
                                        )}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={route("ux.cupon.add", {
                                                    id: item?.id,
                                                })}
                                                className="btn btn-xs btn-info btn-circle"
                                            >
                                                <Pen size={12} />
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    confirm(
                                                        "আপনি কি নিশ্চিত কুপন মুছে ফেলতেচান?"
                                                    ) &&
                                                    router.get(
                                                        route(
                                                            "ux.cupon.del",
                                                            { id: item.id }
                                                        )
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

            <Header title="সকল প্যাকেজ" />
        </div>
    );
}

export default Index;
