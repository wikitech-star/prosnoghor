import React, { useEffect, useRef, useState } from "react";
import Header from "../../../Components/Parts/Header";
import Paginations from "../../../Components/Parts/Paginations";
import { Link, router } from "@inertiajs/react";
import { Eye, Frown, Trash } from "lucide-react";
import {
    ENGLISH_TO_BANGLA,
    ENGLISH_DATE_TO_BANGLA,
} from "../../../Utils/Helper";

export default function Contcat({ data, filters }) {
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
                route("ux.contact.index"),
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
                    <h4 className="text-lg font-medium">সকল মতামত</h4>
                    <p className="text-sm text-gray-500">
                        ইউজার থেকে করা সকল মতামত এখানে আছে
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
                                <th>নাম</th>
                                <th>কন্টাক্ট</th>
                                <th>বিষয়</th>
                                <th>তারিখ</th>
                                <th>কার্যক্রম</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className={`${
                                        item?.is_read ? "" : "bg-gray-100"
                                    }`}
                                >
                                    <th>{ENGLISH_TO_BANGLA(index + 1)}</th>
                                    <td>{item?.name}</td>
                                    <td>
                                        <p>
                                            <strong>ফোনঃ-</strong> {item?.phone}
                                        </p>
                                        <p>
                                            <strong>ইমেইলঃ-</strong>{" "}
                                            {item?.email}
                                        </p>
                                    </td>
                                    <td>{item?.subject}</td>
                                    <td>
                                        {ENGLISH_DATE_TO_BANGLA(
                                            item.created_at
                                        )}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={route("ux.contact.view", {
                                                    id: item.id,
                                                })}
                                                className="btn btn-xs btn-info btn-circle"
                                            >
                                                <Eye size={12} />
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    confirm(
                                                        "আপনি কি নিশ্চিত মুছে ফেলতে চান?"
                                                    ) &&
                                                    router.get(
                                                        route(
                                                            "ux.contact.del",
                                                            {
                                                                id: item.id,
                                                            }
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

            <Header title="সকল মতব্যর তালিকা" />
        </div>
    );
}
