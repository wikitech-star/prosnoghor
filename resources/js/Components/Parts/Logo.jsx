import { Link, usePage } from "@inertiajs/react";
import React from "react";

export default function Logo({ className }) {
    const { appName, siteSettings } = usePage().props;
    return (
        <Link href="/">
            <img
                src={
                    siteSettings?.site_logo
                        ? `/uploads/${siteSettings?.site_logo}`
                        : "/uploads/logo.svg"
                }
                className={`h-[30px] w-auto ${className}`}
                alt={`${appName} - Logo`}
            />
        </Link>
    );
}
