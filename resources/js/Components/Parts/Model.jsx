import { LoaderIcon, X } from "lucide-react";
import React from "react";

export default function Model({
    model,
    setModel = null,
    callback = null,
    title,
    modelClassName,
    children,
    loading = false,
}) {
    return (
        <dialog className="modal modal-bottom sm:modal-middle" open={model}>
            <div className={`modal-box relative ${modelClassName}`}>
                <div className="flex-between mb-4 border-b pb-4 border-base-content/10">
                    <h1 className="text-neutral font-semibold">{title}</h1>
                    <button
                        onClick={() => {
                            if (callback) {
                                callback();
                            } else {
                                setModel(false);
                            }
                        }}
                        className="btn btn-circle btn-xs btn-error"
                    >
                        <X size={12} />
                    </button>
                </div>
                {children}

                {/* loading */}
                {loading && (
                    <div className="absolute inset-0 bg-black/20 flex-center">
                        <div className="btn btn-md btn-circle btn-primary shadow-lg">
                            <LoaderIcon size={15} className="animate-spin" />
                        </div>
                    </div>
                )}
            </div>
        </dialog>
    );
}
