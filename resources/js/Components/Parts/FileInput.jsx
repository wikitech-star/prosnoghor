import { PlusCircle } from "lucide-react";
import React, { useState, useEffect } from "react";

export default function FileInput({
    name = "file",
    old = null,
    error = null,
    onChange,
    accept = "*/*",
    className = "",
}) {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    // show old file preview if exists
    useEffect(() => {
        if (old && !file) {
            setPreview(old);
        }
    }, [old, file]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            if (selectedFile.type.startsWith("image/")) {
                setPreview(URL.createObjectURL(selectedFile));
            } else {
                setPreview(null);
            }
        }

        if (onChange) {
            onChange(selectedFile);
        }
    };

    return (
        <>
            <label
                htmlFor={name}
                className={`flex items-center justify-center w-full border-2 min-h-[150px] border-dashed border-gray-300 p-5 rounded-box duration-300 hover:border-primary ${className}`}
            >
                <input
                    type="file"
                    name={name}
                    id={name}
                    onChange={handleFileChange}
                    className="hidden"
                    accept={accept}
                />

                {preview ? (
                    <div>
                        {preview.startsWith("blob:") ||
                        preview.startsWith("data:") ||
                        preview.match(/\.(jpeg|jpg|png|gif|webp)$/i) ? (
                            <img
                                src={preview}
                                alt="Preview"
                                className="max-h-40 rounded-box"
                            />
                        ) : (
                            <p className="text-sm text-gray-600">
                                {file
                                    ? `Selected file: ${file.name}`
                                    : `Existing file: ${old}`}
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                        <PlusCircle size={20} className="text-gray-400" />
                        <p>আপনার ফাইল আপলোড করুন</p>
                    </div>
                )}
            </label>
            {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
        </>
    );
}
