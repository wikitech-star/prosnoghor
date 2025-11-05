import { Link, router, usePage } from "@inertiajs/react";
import Header from "../../../Components/Parts/Header";
import Paginations from "../../../Components/Parts/Paginations";
import React, { useEffect, useRef, useState } from "react";
import { Frown, Link2Icon, Pen, Plus, Trash } from "lucide-react";
import {
    ENGLISH_TO_BANGLA,
    ENGLISH_DATE_TO_BANGLA,
    DAYS_TO_BANGLA_DURATION,
} from "../../../Utils/Helper";

export default function Index({ data, filters }) {
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
                route("ux.seed.index"),
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
                    <h4 className="text-lg font-medium">সকল সিট</h4>
                    <p className="text-sm text-gray-500">
                        আপনার তৈরি সকল সিট এখান থেকে ম্যানেজ করতে পারেন।
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
                        href={route("ux.seed.add")}
                        className="btn btn-primary btn-sm"
                    >
                        <Plus size={13} />
                        নতুন সিট
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
                                <th>টাইটেল</th>
                                <th>মুল্য</th>
                                <th>বিক্রয় মূল্য</th>
                                <th>সর্বমোট দেখেছেন</th>
                                <th>সর্বমোট কিনেছেন</th>
                                <th>তারিখ</th>
                                <th>কার্যক্রম</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.map((item, index) => (
                                <tr key={item.id}>
                                    <th>{ENGLISH_TO_BANGLA(index + 1)}</th>
                                    <td className="flex items-center gap-3">
                                        <div>
                                            {item?.thumbnail ? (
                                                <img
                                                    src={`/uploads/${item.thumbnail}`}
                                                    className="w-8 h-auto bg-white"
                                                />
                                            ) : (
                                                <img
                                                    src="/static/pdf.png"
                                                    className="w-8 h-auto bg-white"
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <p>{item.title}</p>
                                            <Link
                                                href={route("ui.seet.view", {
                                                    slug: item?.slug,
                                                })}
                                                className="text-xs flex items-center gap-1 underline text-neutral font-bold"
                                            >
                                                <Link2Icon size={15} />{" "}
                                                <span>ভিজিট</span>
                                            </Link>
                                        </div>
                                    </td>
                                    <td className="font-bold">
                                        ${ENGLISH_TO_BANGLA(item.price) || "-"}
                                    </td>
                                    <td className="font-bold">
                                        ৳{" "}
                                        {ENGLISH_TO_BANGLA(item.selling_price)}
                                    </td>
                                    <td>
                                        {ENGLISH_TO_BANGLA(item.total_view) ||
                                            "0"}{" "}
                                        জন
                                    </td>
                                    <td>
                                        {ENGLISH_TO_BANGLA(item.total_sales) ||
                                            "0"}{" "}
                                        পিস
                                    </td>
                                    <td>
                                        <p>
                                            <strong>তৈরি করেছেনঃ</strong>{" "}
                                            {ENGLISH_DATE_TO_BANGLA(
                                                item.created_at
                                            )}
                                        </p>
                                        <p>
                                            <strong>সর্বশেষ পরিবর্তনঃ</strong>{" "}
                                            {ENGLISH_DATE_TO_BANGLA(
                                                item.updated_at
                                            )}
                                        </p>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={route("ux.seed.add", {
                                                    id: item?.id,
                                                })}
                                                className="btn btn-xs btn-info btn-circle"
                                            >
                                                <Pen size={12} />
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    confirm(
                                                        "আপনি কি নিশ্চিত সিটটি মুছে ফেলতেচান?"
                                                    ) &&
                                                    router.get(
                                                        route("ux.seed.del", {
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

            <Header title="সকল প্যাকেজ" />
        </div>
    );
}
