import React from "react";

export default function Textarea({
    label,
    name,
    placeholder = "",
    error,
    ...props
}) {
    return (
        <fieldset className="fieldset">
            {label && (
                <legend className="fieldset-legend p-0 pb-0.5">{label}</legend>
            )}
            <textarea
                placeholder={placeholder}
                name={name}
                className="textarea"
                {...props}
            />
            {error && <div className="text-xs text-red-500">{error}</div>}
        </fieldset>
    );
}
