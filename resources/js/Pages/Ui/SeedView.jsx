import React from "react";
import GuestLayout from "../../Components/Layouts/GuestLayout";
import { ENGLISH_DATE_TO_BANGLA, ENGLISH_TO_BANGLA } from "../../Utils/Helper";
import { Link, useForm } from "@inertiajs/react";
import { Eye, ShoppingBag, ShoppingCart } from "lucide-react";

function SeedView({ data }) {
    const pForm = useForm({
        id: data?.id,
        getway: "",
    });

    const handlePayment = (e) => {
        e.preventDefault();
        pForm.post(route("ui.seet.post"), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <>
            <div className="pb-5">
                <div className="bg-white shadow-[0_0_100px_rgba(0,0,0,0.03)]  mt-10 border border-primary/30 rounded-box max-w-xl mx-auto">
                    <img
                        src={
                            data.thumbnail
                                ? "/uploads/" + data.thumbnail
                                : "/static/pdf.png"
                        }
                        className="w-full object-cover h-[300px]"
                    />
                    <div className="mt-5 p-5">
                        <div className="flex items-start justify-between gap-3">
                            <h1 className="text-lg font-bold text-neutral">
                                {data?.title}
                            </h1>
                            <h1 className="flex items-end gap-1 text-2xl font-black text-neutral justify-center">
                                <p>৳{ENGLISH_TO_BANGLA(data?.selling_price)}</p>
                                {data?.price && (
                                    <p className="text-sm font-bold text-gray-700">
                                        ৳{ENGLISH_TO_BANGLA(data?.price)}
                                    </p>
                                )}
                            </h1>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                            <small className="text-gray-700 text-sm">
                                {ENGLISH_DATE_TO_BANGLA(data?.created_at)}
                            </small>
                            <div className="flex items-center gap-1">
                                <p className="badge badge-md bg-primary/20 rounded-full text-xs font-bold text-neutral">
                                    {ENGLISH_TO_BANGLA(data?.total_view)}{" "}
                                    <Eye size={10} />
                                </p>
                                <p className="badge badge-md bg-primary/20 rounded-full text-xs font-bold text-neutral">
                                    {ENGLISH_TO_BANGLA(data?.total_sales)}{" "}
                                    <ShoppingCart size={10} />
                                </p>
                                <Link className="badge badge-md bg-primary/20 rounded-full text-xs font-bold text-neutral">
                                    <ShoppingBag size={10} /> ক্রয় করুন
                                </Link>
                            </div>
                        </div>

                        {/* controller */}
                        <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-400 border-dashed">
                            <button
                                onClick={() => pForm.setData("getway", "bkash")}
                                className={`w-full duration-300 ${
                                    pForm.data.getway == "bkash"
                                        ? "border-primary"
                                        : "bg-gray-100"
                                } hover:border-primary border-2  border-dashed border-gray-300 min-h-[60px] px-6 text-lg font-medium flex justify-center gap-3 items-center`}
                            >
                                <img
                                    src="/static/bkash.png"
                                    className="w-auto h-7 object-fill"
                                />
                            </button>
                            <button
                                onClick={() => pForm.setData("getway", "nagod")}
                                className={`w-full duration-300 ${
                                    pForm.data.getway == "nagod"
                                        ? "border-primary"
                                        : "bg-gray-100"
                                } hover:border-primary border-2  border-dashed border-gray-300 min-h-[60px] px-6 text-lg font-medium flex justify-center gap-3 items-center`}
                            >
                                <img
                                    src="/static/nagod.png"
                                    className="w-auto h-5 object-fill"
                                />
                            </button>
                            <button
                                onClick={() => pForm.setData("getway", "upay")}
                                className={`w-full duration-300 ${
                                    pForm.data.getway == "upay"
                                        ? "border-primary"
                                        : "bg-gray-100"
                                } hover:border-primary border-2  border-dashed border-gray-300 min-h-[60px] px-6 text-lg font-medium flex justify-center gap-3 items-center`}
                            >
                                <img
                                    src="/static/upay.png"
                                    className="w-auto h-6 object-fill"
                                />
                            </button>
                            <button
                                onClick={() =>
                                    pForm.setData("getway", "rocket")
                                }
                                className={`w-full duration-300 ${
                                    pForm.data.getway == "rocket"
                                        ? "border-primary"
                                        : "bg-gray-100"
                                } hover:border-primary border-2  border-dashed border-gray-300 min-h-[60px] px-6 text-lg font-medium flex justify-center gap-3 items-center`}
                            >
                                <img
                                    src="/static/rocket.png"
                                    className="w-auto h-6 object-fill"
                                />
                            </button>
                        </div>
                        <button
                            onClick={handlePayment}
                            disabled={pForm.processing}
                            className="btn btn-primary btn-md mt-4 w-full"
                        >
                            ক্রয় করুন ৳{ENGLISH_TO_BANGLA(data?.selling_price)}
                        </button>
                        <Link href={route("ui.contact.index")}>
                            <p className="text-center text-gray-600 mt-3 w-full text-sm font-medium mb-4 duration-300 hover:underline hover:text-neutral">
                                যে কোন সমাস্যার সমাধান এর জন্য যোগাযোগ করুন।
                            </p>
                        </Link>

                        <div
                            className="prose max-w-none mt-4 pt-4 border-t border-gray-400 border-dashed"
                            dangerouslySetInnerHTML={{ __html: data?.details }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

// SeedView.layout = (page) => {
//     console.log(page?.props?.data?.seo_description);
// }
SeedView.layout = (page) => (
    <GuestLayout
        title={page.props?.data?.slug}
        description={page.props?.data?.seo_description}
        keyword={page.props?.data?.seo_taqs}
    >
        {page}
    </GuestLayout>
);
export default SeedView;
