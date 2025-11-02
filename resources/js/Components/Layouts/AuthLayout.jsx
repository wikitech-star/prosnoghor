import { Head, usePage } from "@inertiajs/react";
import React, { use, useEffect, useState } from "react";
import Global from "./Global";
import Sidebar from "../Ux/Sidebar";
import Header from "../Ux/Header";

export default function AuthLayout({ title, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    useEffect(() => {
        if (window.innerWidth < 768) {
            setSidebarOpen(false); // mobile এ ডিফল্ট বন্ধ
        }
    }, []);
    return (
        <Global title={title}>
            <div className="flex items-start">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                <div
                    className={`w-full min-h-screen max-h-auto bg-gray-100 ${
                        sidebarOpen ? "md:ml-[300px]" : ""
                    } duration-300`}
                >
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />
                    <div className="p-5">{children}</div>
                </div>
            </div>
        </Global>
    );
}
