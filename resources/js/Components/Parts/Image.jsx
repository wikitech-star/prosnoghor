import React from "react";

export default function Image({ path, className }) {
    return <img src={path ?? "/uploads/blank.jpg"} className={className} />;
}
