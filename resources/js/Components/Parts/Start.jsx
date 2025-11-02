import { Star } from "lucide-react";
import React from "react";

export default function Start({
    start = 0,
    max = 5,
    hidden = true,
    size = 24,
    iconSize = 13,
}) {
    const visibleStars = hidden ? start : max;

    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: visibleStars }).map((_, i) => (
                <div
                    key={i}
                    style={{
                        width: size + "px",
                        height: size + "px",
                    }}
                    className="rounded-box flex justify-center items-center bg-neutral text-primary"
                >
                    <Star size={iconSize} />
                </div>
            ))}
        </div>
    );
}
