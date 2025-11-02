import React, { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

export default function LatexHtmlPreview({
    content,
    className = "",
    style = {},
}) {
    const previewRef = useRef(null);

    useEffect(() => {
        if (!previewRef.current) return;

        // Copy original HTML
        let html = content;

        // Render block LaTeX $$...$$ first
        html =
            html &&
            html.replace(/\$\$(.+?)\$\$/gs, (_, tex) => {
                try {
                    return katex.renderToString(tex, { displayMode: true });
                } catch {
                    return `<span style="color:red;">${tex}</span>`;
                }
            });

        // Render inline LaTeX $...$
        html =
            html &&
            html.replace(/\$(.+?)\$/g, (_, tex) => {
                try {
                    return katex.renderToString(tex, { displayMode: false });
                } catch {
                    return `<span style="color:red;">${tex}</span>`;
                }
            });

        previewRef.current.innerHTML = html;
    }, [content]);

    return <span ref={previewRef} style={style} className={className}></span>;
}
