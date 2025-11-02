import { Head, usePage } from "@inertiajs/react";
import React from "react";

export default function Header({ title }) {
    const { appName, siteSettings } = usePage().props;

    const pageTitle = (title ?? "পেজ টাইটেল") + " - " + appName;
    return (
        <Head>
            <title>{pageTitle}</title>
            <meta name="description" content={siteSettings?.meta_description} />
            <meta name="keywords" content={siteSettings?.meta_keywords} />
            <link
                rel="icon"
                type="image/x-icon"
                href={`/uploads/${siteSettings?.site_favicon}`}
            />
        </Head>
    );
}
