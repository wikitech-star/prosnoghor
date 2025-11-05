import Header from "../../Components/Parts/Header";
import Paginations from "../../Components/Parts/Paginations";
import { Link, router } from "@inertiajs/react";
import { Eye, Frown, ShoppingCart, Trash } from "lucide-react";
import {
    ENGLISH_TO_BANGLA,
    ENGLISH_DATE_TO_BANGLA,
    BANGLA_TIME_AGO,
    DAYS_TO_BANGLA_DURATION,
    BANGLA_DAY_LEFT,
} from "../../Utils/Helper";

export default function Packages({ data }) {
    console.log(data);
    return (
        <div className="bg-white p-6 rounded-box space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4">
                <div>
                    <h4 className="text-lg font-medium">সকল প্যাকেজ</h4>
                    <p className="text-sm text-gray-500">
                        আপনার ক্রয়কৃত সক প্যাকেজ তালিকা
                    </p>
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
                                <th>প্যাকেজ নাম</th>
                                <th>দাম</th>
                                <th>মেয়াদ</th>
                                <th>ক্রয় করা হয়েছে</th>
                                <th>মেয়াদ আছে</th>
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
                                    <td>{item?.packages?.title}</td>
                                    <td>
                                        ৳
                                        {ENGLISH_TO_BANGLA(
                                            item?.packages?.selling_price
                                        )}
                                    </td>
                                    <td>
                                        {DAYS_TO_BANGLA_DURATION(
                                            item.packages.days
                                        )}
                                    </td>
                                    <td>{BANGLA_TIME_AGO(item.created_at)}</td>
                                    <td>
                                        <span
                                            className={`badge py-2 ${
                                                !BANGLA_DAY_LEFT(
                                                    item.created_at,
                                                    item.packages.days
                                                )
                                                    ? "badge-error text-white"
                                                    : "badge-success"
                                            }`}
                                        >
                                            {BANGLA_DAY_LEFT(
                                                item.created_at,
                                                item.packages.days
                                            ) || "মেয়াদ শেষ"}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={route("price.details", {
                                                    id: item.package_id,
                                                })}
                                                className="btn btn-xs btn-info btn-circle"
                                            >
                                                <ShoppingCart size={12} />
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

            <Header title="সকল প্যাকেজ তালিকা" />
        </div>
    );
}
