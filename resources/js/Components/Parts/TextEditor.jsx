import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useForm } from "@inertiajs/react";

const TextEditor = ({ name, form }) => {
    const editorRef = useRef(null);
    const quillRef = useRef(null);

    useEffect(() => {
        if (editorRef.current && !quillRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: "snow",
                placeholder: "এখানে লিখুন...",
                modules: {
                    toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ["bold", "italic", "underline", "strike"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link", "video"],
                        ["clean"],
                    ],
                },
            });

            // Update Inertia form state on text change
            quillRef.current.on("text-change", () => {
                form.setData(name, quillRef.current.root.innerHTML);
            });
        }
    }, [form, name]);

    // Update editor if form value changes dynamically
    useEffect(() => {
        if (quillRef.current && quillRef.current.root.innerHTML !== form.data[name]) {
            const selection = quillRef.current.getSelection(); // preserve cursor
            quillRef.current.root.innerHTML = form.data[name] || "";
            if (selection) quillRef.current.setSelection(selection);
        }
    }, [form.data, name]);

    return <div ref={editorRef} style={{ height: "300px" }} className="p-5 border rounded" />;
};

export default TextEditor;
