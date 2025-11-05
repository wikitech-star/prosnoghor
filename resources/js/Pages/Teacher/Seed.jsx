import Header from "../../Components/Parts/Header";
import Paginations from "../../Components/Parts/Paginations";
import { Link, router } from "@inertiajs/react";
import { Download, Eye, Frown, Trash } from "lucide-react";
import { ENGLISH_TO_BANGLA, ENGLISH_DATE_TO_BANGLA } from "../../Utils/Helper";
import { useEffect, useRef, useState } from "react";

export default function Seed({ data, filters }) {
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
                route("tech.seed.list"),
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
                        আপনার ক্রয়কৃত সকল সিট।
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
                                <th>দাম</th>
                                <th>তারিখ</th>
                                <th>কার্যক্রম</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.map((item, index) => (
                                <tr key={item.id}>
                                    <th>{ENGLISH_TO_BANGLA(index + 1)}</th>
                                    <td>{item?.seed?.title}</td>
                                    <td>
                                        ৳
                                        {ENGLISH_TO_BANGLA(
                                            item?.seed?.selling_price
                                        )}
                                    </td>
                                    <td>
                                        {ENGLISH_DATE_TO_BANGLA(
                                            item.created_at
                                        )}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <a
                                                href={`/uploads/product/${item?.seed?.files}`}
                                                download
                                                className="btn btn-xs btn-info flex items-center gap-1"
                                            >
                                                <Download size={12} /> ডাউনলোড
                                            </a>
                                            <button
                                                onClick={() =>
                                                    confirm(
                                                        "আপনি কি নিশ্চিত মুছে ফেলতে চান?"
                                                    ) &&
                                                    router.get(
                                                        route("tech.seed.del", {
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

            <Header title="সকল সিট" />
        </div>
    );
}
