import React from "react";

export default function Select({
    options = {},
    label,
    name,
    error,
    oldVal = null,
    ...props
}) {
    // যদি object দেওয়া হয় → array বানাই
    const normalizedOptions = Array.isArray(options)
        ? options
        : Object.entries(options).map(([value, label]) => ({
              value,
              label,
          }));

    return (
        <fieldset className="fieldset">
            {label && (
                <legend className="fieldset-legend p-0 pb-0.5">{label}</legend>
            )}
            <select name={name} className="select" {...props}>
                <option value="">--সকল--</option>
                {normalizedOptions.map((option) => (
                    <option
                        selected={oldVal == option.value}
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <div className="text-xs text-red-500">{error}</div>}
        </fieldset>
    );
}
