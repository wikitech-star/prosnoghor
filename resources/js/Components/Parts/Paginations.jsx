import React from "react";
import { Link } from "@inertiajs/react";
import { ENGLISH_TO_BANGLA } from "../../Utils/Helper";

export default function Pagination({ data }) {
    if (!data.links || data.links.length <= 3) return null;

    const currentPage = data.current_page;
    const lastPage = data.last_page;

    // Function to generate visible page numbers with ellipsis
    const getPageNumbers = () => {
        let pages = [];

        for (let i = 1; i <= lastPage; i++) {
            if (
                i === 1 || // always show first page
                i === lastPage || // always show last page
                (i >= currentPage - 2 && i <= currentPage + 2) // show 2 before & 2 after current
            ) {
                pages.push(i);
            } else if (
                (i === currentPage - 3 && currentPage > 4) ||
                (i === currentPage + 3 && currentPage < lastPage - 3)
            ) {
                pages.push("...");
            }
        }

        return [...new Set(pages)]; // remove duplicates
    };

    return (
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Page Info */}
            <div className="text-sm text-gray-600">
                পেজ {ENGLISH_TO_BANGLA(data.current_page)} এর {ENGLISH_TO_BANGLA(data.last_page)} &nbsp;|&nbsp; দেখানো
                হচ্ছে {ENGLISH_TO_BANGLA(data.from)} – {ENGLISH_TO_BANGLA(data.to)} এর {ENGLISH_TO_BANGLA(data.total)}
            </div>

            {/* Pagination Buttons */}
            <div className="join">
                {/* Prev Button */}
                <Link
                    href={data.prev_page_url ?? "#"}
                    preserveScroll
                    preserveState
                    className={`join-item btn btn-sm ${
                        !data.prev_page_url ? "btn-disabled" : ""
                    }`}
                >
                    «
                </Link>

                {/* Numbered Buttons */}
                {getPageNumbers().map((page, index) =>
                    page === "..." ? (
                        <button
                            key={index}
                            className="join-item btn btn-sm btn-disabled"
                        >
                            ...
                        </button>
                    ) : (
                        <Link
                            key={index}
                            href={`${data.path}?page=${page}`}
                            preserveScroll
                            preserveState
                            className={`join-item btn btn-sm ${
                                page === currentPage ? "btn-primary" : ""
                            }`}
                        >
                            {ENGLISH_TO_BANGLA(page)}
                        </Link>
                    )
                )}

                {/* Next Button */}
                <Link
                    href={data.next_page_url ?? "#"}
                    preserveScroll
                    preserveState
                    className={`join-item btn btn-sm ${
                        !data.next_page_url ? "btn-disabled" : ""
                    }`}
                >
                    »
                </Link>
            </div>
        </div>
    );
}
