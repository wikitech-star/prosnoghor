import { Head, Link, usePage } from "@inertiajs/react";
import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import Global from "./Global";

export default function BlankLayout({ title, children }) {
    return (
        <Global title={title}>
            <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-cover bg-no-repeat bg-center bg-[url('/uploads/loginbg.svg')] relative">
                {children}

                {/* navbar */}
                <div className="absolute top-0 container py-5">
                    <Link
                        href={route("home")}
                        className="flex items-center gap-2 text-white text-sm duration-300 hover:text-primary hover:underline group"
                    >
                        <ArrowLeftIcon
                            className="duration-300 group-hover:mr-2"
                            size={14}
                        />
                        <span>ফিরে যান</span>
                    </Link>
                </div>
            </div>
        </Global>
    );
}
