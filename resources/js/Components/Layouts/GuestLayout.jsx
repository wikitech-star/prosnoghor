import React from "react";
import Navbar from "../Ui/Navbar";
import { Head, usePage } from "@inertiajs/react";
import Global from "./Global";

export default function GuestLayout({ title, children }) {
    return (
        <Global className='bg-gray-50 min-h-screen h-auto' title={title}>
            <div>
                <Navbar />
                <div className=" w-full h-auto">{children}</div>
            </div>
        </Global>
    );
}
