import React, { useEffect, useState } from "react";
import Logo from "../Parts/Logo";
import { Link } from "@inertiajs/react";
import { ArrowRight, Menu, X } from "lucide-react";
import Mneu from "./Mneu";

export default function Navbar() {
    const [menuToggler, setMenuToggler] = useState(false);

    return (
        <div className={`bg-primary h-[70px] lg:h-[100px] flex-center border-b border-neutral/20`}>
            <div className="container flex-between">
                {/* logo */}
                <Logo className="h-[40px]" />

                {/* menu */}
                <Mneu sideMenuOpen={menuToggler} />

                {/* button */}
                <Link
                    href={route("login")}
                    className="btn btn-dark btn-sm border-0 group hidden lg:flex"
                >
                    <ArrowRight
                        className="duration-300 group-hover:mr-2"
                        size={15}
                    />{" "}
                    <span className="hidden lg:block">প্রশ্ন তৈরি করুন</span>
                </Link>
                <button
                    onClick={() => setMenuToggler(!menuToggler)}
                    className="btn btn-sm btn-dark btn-square lg:hidden"
                >
                    {!menuToggler ? <Menu size={15} /> : <X size={15} />}
                </button>
            </div>
        </div>
    );
}
