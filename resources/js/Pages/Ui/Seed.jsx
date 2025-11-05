import React, { useEffect, useRef, useState } from "react";
import GuestLayout from "../../Components/Layouts/GuestLayout";
import { Link, router } from "@inertiajs/react";
import { Eye, Frown, ShoppingBag } from "lucide-react";
import { ENGLISH_TO_BANGLA } from "../../Utils/Helper";
import Paginations from "../../Components/Parts/Paginations";

function Seed({ data, filters }) {
    // search
    const [search, setSearch] = useState(filters.search || "");
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            router.get(
                route("ui.seet.index"),
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
        <div className="bg-gray-50">
            <div className="container py-8">
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input w-full"
                    placeholder="সার্স..."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
                    {data.data.length > 0 ? (
                        data.data.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white shadow-[0_0_100px_rgba(0,0,0,0.05)] border border-gray-200"
                            >
                                <div className="bg-white flex items-center justify-center h-[220px] overflow-hidden p-4">
                                    <img
                                        src={
                                            item.thumbnail
                                                ? "/uploads/" + item.thumbnail
                                                : "/static/pdf.png"
                                        }
                                        className="w-auto object-cover h-full"
                                    />
                                </div>
                                <div className="p-4 flex flex-col items-center justify-center border-t border-dashed border-gray-200 text-center">
                                    <div>
                                        <Link
                                            href={route("ui.seet.view", {
                                                slug: item?.slug,
                                            })}
                                        >
                                            <h1 className="text-base font-bold duration-300 hover:underline hover:text-primary text-center max-w-[80%] mx-auto">
                                                {item?.title}
                                            </h1>
                                        </Link>
                                        <h1 className="flex items-end gap-1 text-2xl font-black text-neutral justify-center my-2">
                                            <p>
                                                ৳
                                                {ENGLISH_TO_BANGLA(
                                                    item?.selling_price
                                                )}
                                            </p>
                                            {item?.price && (
                                                <p className="text-sm font-bold text-gray-700">
                                                    ৳
                                                    {ENGLISH_TO_BANGLA(
                                                        item?.price
                                                    )}
                                                </p>
                                            )}
                                        </h1>
                                    </div>
                                    <Link href={route("ui.seet.view", {
                                                    slug: item?.slug,
                                                })} className="btn btn-primary btn-sm w-full">
                                        <ShoppingBag size={14} /> ক্রয় করুন
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="border border-gray-300 border-dashed rounded-box col-span-4 flex flex-col items-center justify-center py-10 px-3">
                            <Frown size={20} />
                            <p className="text-gray-500 font-semibold text-center mt-2">
                                কোন সিট পাওয়া যায়নি!
                            </p>
                            <Link
                                href={route("ui.contact.index")}
                                className="btn btn-xs btn-primary mt-3"
                            >
                                যোগাযোগ করুন
                            </Link>
                        </div>
                    )}
                </div>
                {/* pagination */}
                <Paginations data={data} />
            </div>
        </div>
    );
}

Seed.layout = (page) => <GuestLayout children={page} title="লেকচার সিট" />;
export default Seed;
