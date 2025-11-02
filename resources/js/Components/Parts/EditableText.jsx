import { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill-new";
import Quill from "quill";
import "react-quill-new/dist/quill.bubble.css";
import {
    Bold,
    Italic,
    Underline,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Plus,
    Minus,
} from "lucide-react";

/* ---------- Register pixel-based font size ---------- */
const SizeStyle = Quill.import("attributors/style/size");
SizeStyle.whitelist = Array.from({ length: 46 }, (_, i) => `${(i + 5) * 2}px`);
Quill.register(SizeStyle, true);

/* ---------- Custom Toolbar ---------- */
function CustomToolbar({ quillRef, fontSize, setFontSize, position }) {
    if (!position) return null;

    const handleFormat = (format, value = true) => {
        const editor = quillRef.current.getEditor();
        const current = editor.getFormat();
        editor.format(format, current[format] ? false : value);
    };

    const handleAlign = (align) => {
        const editor = quillRef.current.getEditor();
        editor.format("align", align);
    };

    const handleColorChange = (e) => {
        const editor = quillRef.current.getEditor();
        editor.format("color", e.target.value);
    };

    // 🔥 পুরো editor-এর font size পরিবর্তন করার logic
    const handleFontSize = (delta) => {
        let newSize = fontSize + delta;
        if (newSize < 10) newSize = 10;
        if (newSize > 100) newSize = 100;
        setFontSize(newSize);

        const editor = quillRef.current.getEditor();
        const length = editor.getLength();

        // ✅ Apply new font size to entire text
        editor.formatText(0, length, "size", `${newSize}px`);

        // ✅ Keep user selection active
        const range = editor.getSelection();
        if (range) editor.setSelection(range.index, range.length);
    };

    return (
        <div
            className="fixed z-50 flex items-center gap-2 bg-white text-neutral shadow-md border border-gray-300 rounded-md px-2 py-1 animate-fadeIn"
            style={{
                top: position.top - 45,
                left: position.left - 150,
            }}
            onMouseDown={(e) => e.preventDefault()}
        >
            {/* Font Size +/- */}
            <div className="flex items-center gap-1 border-gray-300 border-r pr-2">
                <button
                    onClick={() => handleFontSize(-2)}
                    className="p-1 rounded hover:bg-gray-100"
                    title="Decrease Font"
                >
                    <Minus size={16} />
                </button>
                <span className="text-sm font-medium w-10 text-center">
                    {fontSize}px
                </span>
                <button
                    onClick={() => handleFontSize(+2)}
                    className="p-1 rounded hover:bg-gray-100"
                    title="Increase Font"
                >
                    <Plus size={16} />
                </button>
            </div>

            {/* Bold / Italic / Underline */}
            <button
                onClick={() => handleFormat("bold")}
                className="p-1 rounded hover:bg-gray-100"
                title="Bold"
            >
                <Bold size={16} />
            </button>
            <button
                onClick={() => handleFormat("italic")}
                className="p-1 rounded hover:bg-gray-100"
                title="Italic"
            >
                <Italic size={16} />
            </button>
            <button
                onClick={() => handleFormat("underline")}
                className="p-1 rounded hover:bg-gray-100"
                title="Underline"
            >
                <Underline size={16} />
            </button>

            {/* Color Picker */}
            <input
                type="color"
                onChange={handleColorChange}
                title="Text Color"
                className="w-6 h-6 p-0 border border-gray-300 rounded cursor-pointer"
            />

            {/* Alignment */}
            <div className="flex ml-2 border-l pl-2 border-gray-300 gap-1">
                <button
                    onClick={() => handleAlign("")}
                    className="p-1 rounded hover:bg-gray-100"
                    title="Align Left"
                >
                    <AlignLeft size={16} />
                </button>
                <button
                    onClick={() => handleAlign("center")}
                    className="p-1 rounded hover:bg-gray-100"
                    title="Align Center"
                >
                    <AlignCenter size={16} />
                </button>
                <button
                    onClick={() => handleAlign("right")}
                    className="p-1 rounded hover:bg-gray-100"
                    title="Align Right"
                >
                    <AlignRight size={16} />
                </button>
            </div>
        </div>
    );
}

/* ---------- Main EditableText Component ---------- */
export default function EditableText({
    value = "",
    className = "",
    defaultStyle = {},
    fontSize: externalFontSize,
    onFontSizeChange,
}) {
    const [text, setText] = useState(value);
    const [internalFontSize, setInternalFontSize] = useState(16);
    const [position, setPosition] = useState(null);
    const [isManuallyEdited, setIsManuallyEdited] = useState(false); // 🔹 নতুন flag

    const quillRef = useRef();

    const fontSize = externalFontSize ?? internalFontSize;
    const setFontSize = onFontSizeChange ?? setInternalFontSize;

    const modules = { toolbar: false };
    const formats = ["bold", "italic", "underline", "size", "color", "align"];

    const fontMap = {
        "font-noto_serif": "var(--font-noto_serif)",
        "font-noto_sans": "var(--font-noto_sans)",
        "font-baloo": "var(--font-baloo)",
        "font-tiro": "var(--font-tiro)",
        "font-roboto": "var(--font-roboto)",
        "font-base": "var(--font-base)",
    };

    const fontClass = Object.keys(fontMap).find((f) => className.includes(f));
    const appliedFont = fontMap[fontClass] || "var(--font-base)";

    const handleSelectionChange = (range, oldRange, source) => {
        if (range && source === "user") {
            const editor = quillRef.current.getEditor();
            const bounds = editor.getBounds(range.index);
            const container = editor.root.getBoundingClientRect();

            setPosition({
                top: container.top + bounds.top + window.scrollY,
                left: container.left + bounds.left + window.scrollX,
            });
        } else {
            setPosition(null);
        }
    };

    useEffect(() => {
        const editor = quillRef.current?.getEditor();
        if (editor) {
            editor.on("selection-change", handleSelectionChange);
            editor.root.style.fontFamily = appliedFont;

            Object.entries(defaultStyle).forEach(([key, value]) => {
                editor.root.style[key] = value;
            });
        }

        return () => {
            if (editor) {
                editor.off("selection-change", handleSelectionChange);
            }
        };
    }, [appliedFont, defaultStyle]);

    // 🔹 শুধু তখনই global font size apply হবে যদি user manually কিছু না করে
    useEffect(() => {
        if (isManuallyEdited) return; // skip if user already edited
        const editor = quillRef.current?.getEditor();
        if (editor) {
            const length = editor.getLength();
            editor.formatText(0, length, "size", `${fontSize}px`);
        }
    }, [fontSize, isManuallyEdited]);

    // 🔹 Toolbar এ local font change করলে local font size set হবে এবং flag true হবে
    const handleLocalFontSizeChange = (newSize) => {
        setIsManuallyEdited(true); // mark as manual change
        setInternalFontSize(newSize);

        const editor = quillRef.current?.getEditor();
        if (editor) {
            const length = editor.getLength();
            editor.formatText(0, length, "size", `${newSize}px`);
        }
    };

    return (
        <div className={`${className} relative`}>
            {position && (
                <CustomToolbar
                    quillRef={quillRef}
                    fontSize={internalFontSize}
                    setFontSize={handleLocalFontSizeChange} // ⬅️ এখন local fontSize handler
                    position={position}
                />
            )}

            <div
                className={`duration-300 hover:border hover:border-dashed hover:border-primary ${
                    position ? "border border-primary p-0 m-0" : ""
                } rounded-box`}
            >
                <ReactQuill
                    ref={quillRef}
                    theme="bubble"
                    value={text}
                    onChange={setText}
                    modules={modules}
                    formats={formats}
                    className="border-none text-base print:p-0"
                />
            </div>
        </div>
    );
}

