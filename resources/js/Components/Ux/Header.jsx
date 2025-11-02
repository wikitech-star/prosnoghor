import React from "react";
import Image from "../Parts/Image";
import { Globe, Lock, PowerOff, SidebarOpen, User } from "lucide-react";
import { Link, router } from "@inertiajs/react";

export default function Header({ sidebarOpen, setSidebarOpen }) {
    return (
        <div className="bg-white min-h-[70px] flex-between px-5 shadow w-full sticky top-0 z-50 print:hidden">
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="btn btn-sm btn-circle btn-primary"
            >
                <SidebarOpen size={15} />
            </button>

            {/* profile */}
            <div className="flex items-center gap-4">
                <Link href={route("home")} className="btn btn-xs">
                    <Globe size={16} />
                    <span>সাইট দেখুন</span>
                </Link>
                <div className="dropdown dropdown-bottom dropdown-end">
                    <div className="avatar" tabIndex={0} role="button">
                        <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
                            <Image />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                    >
                        <li>
                            <Link>
                                <User size={15} className="mr-1" />
                                প্রোফাইল
                            </Link>
                        </li>
                        <li>
                            <Link>
                                <Lock size={15} className="mr-1" />
                                সিকিউরিটি
                            </Link>
                        </li>
                        <li className="hover:bg-error/20 hover:text-error">
                            <button
                                onClick={() =>
                                    confirm("আপনি নিশ্চিত?") &&
                                    router.get(route('logout'))
                                }
                                as="button"
                            >
                                <PowerOff size={15} className="mr-1" />
                                লগআউট
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
