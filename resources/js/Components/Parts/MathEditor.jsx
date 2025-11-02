import {
    Bold,
    DecimalsArrowLeft,
    DecimalsArrowRight,
    Italic,
    RedoDot,
    Underline,
    UndoDot,
} from "lucide-react";
import React, { useRef, useEffect } from "react";

export default function CursorSafeEditor({ value, onChange, error }) {
    const editorRef = useRef(null);

    // Set initial content only once
    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.innerHTML = value || "";
        }
    }, []);

    // Bold, Italic, Underline
    const execCommand = (cmd) => {
        document.execCommand(cmd, false, null);
        onChange(editorRef.current.innerHTML);
    };

    // Inline / Block LaTeX
    const wrapSelection = (type) => {
        const sel = window.getSelection();
        if (!sel.rangeCount) return;
        const range = sel.getRangeAt(0);
        const selectedText = sel.toString();
        if (!selectedText) return;

        let wrapped =
            type === "inline" ? `$${selectedText}$` : `$$${selectedText}$$`;
        const textNode = document.createTextNode(wrapped);

        range.deleteContents();
        range.insertNode(textNode);

        // Move cursor after inserted text
        range.setStartAfter(textNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);

        onChange(editorRef.current.innerHTML);
    };

    // Undo / Redo
    const handleUndo = () => {
        document.execCommand("undo", false, null);
        onChange(editorRef.current.innerHTML);
    };

    const handleRedo = () => {
        document.execCommand("redo", false, null);
        onChange(editorRef.current.innerHTML);
    };

    // Handle input without resetting innerHTML
    const handleInput = () => {
        onChange(editorRef.current.innerHTML);
    };

    return (
        <div className="space-y-2 w-full">
            {/* Toolbar */}
            <div className="flex gap-2 mb-1 flex-wrap">
                <div className="tooltip tooltip-right" data-tip="মুটা লেখা">
                    <button
                        onClick={() => execCommand("bold")}
                        className="btn btn-xs btn-primary btn-square"
                    >
                        <Bold size={12} />
                    </button>
                </div>

                <div className="tooltip tooltip-right" data-tip="বাকা লেখা">
                    <button
                        onClick={() => execCommand("italic")}
                        className="btn btn-xs btn-primary btn-square"
                    >
                        <Italic size={12} />
                    </button>
                </div>

                <div
                    className="tooltip tooltip-right"
                    data-tip="আন্ডারলাইন লেখা"
                >
                    <button
                        onClick={() => execCommand("underline")}
                        className="btn btn-xs btn-primary btn-square"
                    >
                        <Underline size={12} />
                    </button>
                </div>

                <div className="tooltip tooltip-right" data-tip="পূর্বাবস্থা">
                    <button
                        onClick={handleUndo}
                        className="btn btn-xs btn-warning btn-square"
                    >
                        <UndoDot size={12} />
                    </button>
                </div>

                <div className="tooltip tooltip-right" data-tip="পুনরায়">
                    <button
                        onClick={handleRedo}
                        className="btn btn-xs btn-success btn-square"
                    >
                        <RedoDot size={12} />
                    </button>
                </div>

                <div
                    className="tooltip tooltip-right"
                    data-tip="ইনলাইন ল্যাটেক্স"
                >
                    <button
                        onClick={() => wrapSelection("inline")}
                        className="btn btn-xs btn-secondary btn-square"
                    >
                        <DecimalsArrowLeft size={12} />
                    </button>
                </div>

                <div
                    className="tooltip tooltip-right"
                    data-tip="ব্লক ল্যাটেক্স"
                >
                    <button
                        onClick={() => wrapSelection("block")}
                        className="btn btn-xs btn-info btn-square"
                    >
                        <DecimalsArrowRight size={12} />
                    </button>
                </div>
            </div>

            {/* Editable div */}
            <div
                ref={editorRef}
                contentEditable
                className="textarea"
                onInput={handleInput}
            ></div>

            {error && <p className="text-sm text-error">{error}</p>}
        </div>
    );
}
