import React, { useEffect, useRef, useState } from "react";
import Header from "../../Components/Parts/Header";
import Paginations from "../../Components/Parts/Paginations";
import { Link, router } from "@inertiajs/react";
import { Check, Frown, Pen, Plus, Trash, X } from "lucide-react";
import { ENGLISH_TO_BANGLA, ENGLISH_DATE_TO_BANGLA } from "../../Utils/Helper";

export default function Transactions({ data, filters }) {
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
                route("tech.transactions.list"),
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
                    <h4 className="text-lg font-medium">সকল পেমেন্ট</h4>
                    <p className="text-sm text-gray-500">
                        সকল ধরনের পেমেন্ট রিকুয়েষ্ট এখান থেকে ম্যানেজ করতে
                        পারেন।
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
                                <th>লেনদেন আইডি</th>
                                <th>পরিমান</th>
                                <th>পেমেন্ট সিস্টেম</th>
                                <th>পেমেন্ট কারণ</th>
                                <th>অবস্থা</th>
                                <th>পেমেন্ট তথ্য</th>
                                <th>পেমেন্ট করেছেন</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.map((item, index) => (
                                <tr key={item.id}>
                                    <th>{ENGLISH_TO_BANGLA(index + 1)}</th>
                                    <td>{item.uid}</td>
                                    <td className="text-lg font-bold text-neutral">
                                        ৳
                                        {ENGLISH_TO_BANGLA(item.amount) ||
                                            "0.00"}
                                    </td>
                                    <td>
                                        <span className="uppercase text-xs font-bold bg-primary/30 text-neutral py-1 px-2">
                                            {item?.method}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="badge badge-info">
                                            {item?.type == "package"
                                                ? "প্যাকেজ"
                                                : "সিট"}
                                        </div>
                                    </td>
                                    <td>
                                        <span
                                            className={`uppercase text-xs font-bold py-1 px-2 ${
                                                item?.status === "pending"
                                                    ? "bg-primary/30 text-neutral"
                                                    : item?.status === "unpaid"
                                                    ? "bg-primary/40 text-neutral"
                                                    : item?.status ===
                                                      "rejected"
                                                    ? "bg-red-200 text-red-800"
                                                    : "bg-green-200 text-green-800"
                                            }`}
                                        >
                                            {item?.status}
                                        </span>
                                    </td>
                                    <td>
                                        <p className="font-semibold text-neutral">
                                            <span>ফোনঃ</span> {item?.phone}
                                        </p>
                                        <p className="font-semibold text-neutral">
                                            <span>TRX:</span> {item?.tex}
                                        </p>
                                    </td>
                                    <td>
                                        {ENGLISH_DATE_TO_BANGLA(
                                            item.created_at
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* pagination */}
            <Paginations data={data} />

            <Header title="সকল পেমেন্ট রিকুয়েষ্ট" />
        </div>
    );
}
