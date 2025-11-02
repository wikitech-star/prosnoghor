import Select from "react-select";

export default function CustomSelect({ options, className, onChange, defaultInputValue }) {
    return (
        <Select
            onChange={(selectedOption) => onChange(selectedOption)}
            options={options}
            defaultInputValue={defaultInputValue}
            className={`w-full rounded-box ${className}`}
            classNames={{
                control: ({ isFocused }) =>
                    `border rounded-box duration-300 transition-all ${
                        isFocused
                            ? "border-primary ring-0"
                            : "border-gray-300 hover:border-primary"
                    }`,
                option: ({ isFocused, isSelected }) =>
                    `px-3 py-2 cursor-pointer ${
                        isSelected
                            ? "bg-primary text-white" // ✅ Primary color instead of black
                            : isFocused
                            ? "bg-primary/20" // ✅ Soft primary hover
                            : "bg-white text-gray-900"
                    }`,
                menu: () => "mt-1 border border-gray-200 rounded-box bg-white",
                menuList: () => "py-1",
                placeholder: () => "text-gray-400 px-2",
                singleValue: () => "text-gray-800 px-2",
                input: () => "px-2",
            }}
            theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                    ...theme.colors,
                    primary25: "#fcbf4959", // can also map this to Tailwind `theme("colors.primary.200")`
                    primary: "#fcbf49", // optional: replace with your Tailwind primary HEX if you want
                },
            })}
        />
    );
}
