import React from "react";
import { ADMIN_SIDEBAR } from "../../Data/Sidebar";
import { Link, usePage } from "@inertiajs/react";
import { Crown } from "lucide-react";

export default function AdminMenu() {
    const { currentRoute, auth } = usePage().props;
    return (
        <div>
            {ADMIN_SIDEBAR.map((item, index) =>
                item.isTitle ? (
                    (item.role?.includes("all") ||
                        item.role?.includes(auth?.role)) && (
                        <h4
                            key={index}
                            className="py-1 px-5 mt-2 text-sm text-white/70 font-semibold"
                        >
                            {item.title}
                        </h4>
                    )
                ) : item.role?.includes("all") ||
                  item.role?.includes(auth?.role) ? (
                    <Link
                        key={index}
                        href={item?.pro ? item?.pro_link : item.link}
                        className={`flex px-5 items-center gap-3 py-3 hover:bg-white/10 text-white ${
                            item.active.includes(currentRoute)
                                ? "bg-white/10"
                                : ""
                        }`}
                    >
                        <div
                            className={`w-7 h-7 rounded-sm flex-center text-neutral text-sm relative ${
                                item.active.includes(currentRoute)
                                    ? "bg-primary"
                                    : "bg-white"
                            }`}
                        >
                            <item.icon size={14} />

                            {/* pro icon */}
                            {item?.pro && (
                                <span className="text-neutral w-[20px] h-[20px] rounded-full flex items-center justify-center absolute -top-1 -right-1 bg-yellow-400 border-2 border-neutral">
                                    <Crown size={10} />
                                </span>
                            )}
                        </div>
                        {item.name}{" "}
                    </Link>
                ) : null
            )}
        </div>
    );
}
