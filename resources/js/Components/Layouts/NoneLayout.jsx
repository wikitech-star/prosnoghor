import { Head, Link, usePage } from "@inertiajs/react";
import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import Global from "./Global";

export default function NonekLayout({ title, children }) {
    return (
        <Global title={title}>
            <div className="min-h-screen flex flex-col justify-center items-center p-4 relative">
                {children}

                {/* bg */}
                <div class="fixed z-[-1] hidden md:flex -top-30 opacity-25 -right-30 w-96 h-96 bg-primary blur-3xl"></div>
                <div class="fixed z-[-1] -bottom-62 opacity-25 -left-62 w-96 h-96 bg-secondary blur-3xl"></div>
            </div>
        </Global>
    );
}
