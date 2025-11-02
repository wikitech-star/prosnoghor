import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import Logo from "../Parts/Logo";
import { SITE_MENU } from "../../Data/Menu";

export default function Menu({ sideMenuOpen }) {
    const { url } = usePage();
    const [sidemenuOpen, setSidemenuOpen] = useState(sideMenuOpen || false);

    return (
        <div
            className={`fixed lg:static bg-neutral shadow-sm lg:bg-transparent lg:shadow-none top-0 w-[80%] md:w-[300px] lg:w-auto h-screen lg:h-auto overflow-y-auto lg:overflow-hidden duration-300 ${
                sideMenuOpen ? "left-0" : "-left-full"
            }`}
        >
            {/* header */}
            <div className="flex-between lg:hidden px-5 py-4 border-b border-white/30 sticky top-0 bg-neutral">
                <Logo />
            </div>

            {/* menu */}
            <nav
                className="flex flex-col lg:flex-row p-5 lg:p-0 lg:items-center gap-5"
                id="frontendSidemenu"
            >
                {SITE_MENU.map((menu, i) => {
                    const isActive = menu.active.some((r) =>
                        url.startsWith(route(r))
                    );

                    return (
                        <Link
                            key={i}
                            href={menu.url}
                            className={`duration-300 hover:text-primary lg:hover:text-neutral text-base font-medium ${
                                isActive ? "text-secondary" : "text-white lg:text-neutral"
                            }`}
                        >
                            {menu.name}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
