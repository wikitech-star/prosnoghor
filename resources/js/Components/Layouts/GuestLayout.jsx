import React from "react";
import Navbar from "../Ui/Navbar";
import { Head, usePage } from "@inertiajs/react";
import Global from "./Global";
import Footer from "../Ui/Footer";

export default function GuestLayout({
    title,
    keyword = "",
    description = "",
    children,
}) {
    return (
        <Global className="bg-gray-50 min-h-screen h-auto" title={title} description={description} keyword={keyword}>
            <div>
                <Navbar />
                <div className="w-full h-auto">{children}</div>
                <Footer/>
            </div>
        </Global>
    );
}
