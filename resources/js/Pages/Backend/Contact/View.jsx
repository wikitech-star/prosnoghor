import Header from "../../../Components/Parts/Header";
import {
    ENGLISH_DATE_TO_BANGLA,
} from "../../../Utils/Helper";
import { ArrowLeft, Calendar, Mail, Phone, Trash, User } from "lucide-react";
import { Link, router } from "@inertiajs/react";

export default function View({ data }) {
    return (
        <div>
            <div className="bg-white shadow-[0_0_100px_rgba(0,0,0,0.03)] border border-primary/30 rounded-box max-w-xl mx-auto">
                <div className="bg-primary/20 px-5 py-9 text-center">
                    <h1 className="font-black text-xl text-neutral">
                        {data?.subject}
                    </h1>
                    <p className="font-normal text-base text-neutral">
                        ইউজার মন্তব্য
                    </p>
                </div>

                <div>
                    {data?.user && (
                        <div className="border border-neutral border-dashed rounded-box p-7 mx-7 mt-5">
                            <h1 className="text-lg font-bold mb-2">
                                রেজিস্টার ইউজার তথ্যঃ
                            </h1>
                            <p className="text-sm font-normal">
                                <strong>ইউজার আইডিঃ- </strong>
                                {data?.user?.id || "নেই!"}
                            </p>
                            <p className="text-sm font-normal">
                                <strong>নামঃ- </strong>
                                {data?.user?.name || "নেই!"}
                            </p>
                            <p className="text-sm font-normal">
                                <strong>ফোনঃ- </strong>
                                {data?.user?.phone || "নেই!"}
                            </p>
                            <p className="text-sm font-normal">
                                <strong>ইমেইলঃ- </strong>
                                {data?.user?.email || "নেই!"}
                            </p>
                        </div>
                    )}

                    <div className="p-7">
                        <p className="flex items-center gap-3 text-base">
                            <User size={13} />
                            <span>{data?.name}</span>
                        </p>
                        <p className="flex items-center gap-3 text-base">
                            <Mail size={13} />
                            <span>{data?.email}</span>
                        </p>
                        <p className="flex items-center gap-3 text-base">
                            <Phone size={13} />
                            <span>{data?.phone}</span>
                        </p>
                        <p className="flex items-center gap-3 text-base">
                            <Calendar size={13} />
                            <span>{ENGLISH_DATE_TO_BANGLA( data?.created_at)}</span>
                        </p>
                        <p className="text-base mt-3">{data?.message}</p>
                    </div>

                    <div className="flex items-center justify-end gap-2 px-5 py-4">
                        <Link
                            href={route("ux.contact.index")}
                            className="btn btn-xs btn-info"
                        >
                            <ArrowLeft size={12} />
                            <span>ফিরে যান</span>
                        </Link>
                        <button
                            onClick={() =>
                                confirm("আপনি কি নিশ্চিত মুছে ফেলতে চান?") &&
                                router.get(
                                    route("ux.contact.del", {
                                        id: data.id,
                                    })
                                )
                            }
                            className="btn btn-xs btn-error"
                        >
                            <Trash size={12} />
                            <span>মুছে ফেলুন</span>
                        </button>
                    </div>
                </div>
            </div>

            <Header title="সম্পূর্ন মতব্য" />
        </div>
    );
}
