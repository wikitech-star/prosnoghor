import React from "react";

export default function Input({
    label,
    type = "text",
    name,
    placeholder = "",
    error,
    className = "",
    ...props
}) {
    return (
        <fieldset className={`fieldset ${className}`}>
            {label && (
                <legend className="fieldset-legend p-0 pb-0.5">{label}</legend>
            )}
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                className="input"
                {...props}
            />
            {error && <div className="text-xs text-red-500">{error}</div>}
        </fieldset>
    );
}
