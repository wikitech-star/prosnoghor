import React, { useState } from "react";
import Header from "../../../Components/Parts/Header";
import Input from "../../../Components/Parts/Input";
import Textarea from "../../../Components/Parts/Textarea";
import Model from "../../../Components/Parts/Model";
import { ENGLISH_TO_BANGLA } from "../../../Utils/Helper";
import { useForm } from "@inertiajs/react";
import { Expand } from "lucide-react";

export default function Add({ group_class, subjects, update }) {
    // create questionForm
    const qFrom = useForm({
        id: update?.id || "",
        title: update?.title || "",
        details: update?.details || "",
        selling_price: update?.selling_price || "",
        price: update?.price || "",
        days: update?.days || "",
        class_id: update?.classes ? JSON.parse(update?.classes) : [],
        subjects: update?.subjects ? JSON.parse(update?.subjects) : [],
    });

    const handleForm = (e) => {
        e.preventDefault();
        qFrom.post(route("ux.package.post"), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    // subject model
    const [classesModel, setClassesModel] = useState(false);
    const [subjectModel, setSubjectModel] = useState(false);

    return (
        <div>
            <div className="bg-white rounded-box border border-gray-200 mx-auto max-w-xl">
                <h1 className="text-center text-md py-3 px-3 font-bold text-neutral bg-primary">
                    মূল্য তৈরি করুন
                </h1>
                <div className="mt-3 p-5 space-y-4">
                    <Input
                        label="টাইটেল*"
                        value={qFrom.data.title}
                        onChange={(e) => qFrom.setData("title", e.target.value)}
                        error={qFrom.errors.title}
                    />
                    <Textarea
                        label="বিস্তারিত*"
                        value={qFrom.data.details}
                        onChange={(e) =>
                            qFrom.setData("details", e.target.value)
                        }
                        error={qFrom.errors.details}
                    />

                    <div className="flex items-center justify-between gap-3">
                        <Input
                            label="মূল্য"
                            className="w-full"
                            type="number"
                            step="0.01"
                            value={qFrom.data.price}
                            onChange={(e) =>
                                qFrom.setData("price", e.target.value)
                            }
                            error={qFrom.errors.price}
                        />
                        <Input
                            label="বিক্রয় মূল্য*"
                            className="w-full"
                            type="number"
                            step="0.01"
                            value={qFrom.data.selling_price}
                            onChange={(e) =>
                                qFrom.setData("selling_price", e.target.value)
                            }
                            error={qFrom.errors.selling_price}
                        />
                    </div>

                    <div>
                        <button
                            className="input cursor-pointer text-left w-full flex justify-between items-center"
                            onClick={() => setClassesModel(!classesModel)}
                        >
                            <p>
                                শ্রেণি{" "}
                                {qFrom.data.class_id.length > 0 &&
                                    ENGLISH_TO_BANGLA(
                                        qFrom.data.class_id.length
                                    ) +
                                        "+" +
                                        " " +
                                        "এটি"}
                            </p>
                            <Expand size={14} />
                        </button>
                        {qFrom.errors.class_id && (
                            <p className="text-sm text-error">
                                {qFrom.errors.class_id}
                            </p>
                        )}
                    </div>

                    <div>
                        <button
                            className="input cursor-pointer text-left w-full flex justify-between items-center"
                            disabled={Boolean(qFrom.data.class_id == "")}
                            onClick={() => setSubjectModel(!subjectModel)}
                        >
                            <p>
                                বিষয়{" "}
                                {qFrom.data.subjects.length > 0 &&
                                    ENGLISH_TO_BANGLA(
                                        qFrom.data.subjects.length
                                    ) +
                                        "+" +
                                        " " +
                                        "এটি বিষয়"}
                            </p>
                            <Expand size={14} />
                        </button>
                        {qFrom.errors.subjects && (
                            <p className="text-sm text-error">
                                {qFrom.errors.subjects}
                            </p>
                        )}
                    </div>

                    <Input
                        label="সময়* (দিন হিসেবে)"
                        value={qFrom.data.days}
                        onChange={(e) => qFrom.setData("days", e.target.value)}
                        error={qFrom.errors.days}
                        type="number"
                        step='0'
                    />

                    <button
                        disabled={qFrom.processing}
                        onClick={handleForm}
                        className="btn btn-primary btn-sm w-full"
                    >
                        সেভ করুন
                    </button>
                </div>
            </div>

            <Header title="প্যাকেজ তৈরি" />

            {/* class model */}
            <Model
                title="শ্রেণি সিলেক্ট করুন"
                model={classesModel}
                setModel={setClassesModel}
            >
                <div className="flex flex-col space-y-1 max-h-[500px] overflow-y-auto">
                    {group_class ? (
                        Object.entries(group_class).map(([key, value], i) => (
                            <label
                                key={key}
                                htmlFor={key}
                                className="w-full px-3 py-1.5 border border-gray-200 rounded-box flex items-center gap-3 duration-300 hover:bg-gray-100"
                            >
                                <input
                                    type="checkbox"
                                    id={key}
                                    value={key}
                                    checked={qFrom.data.class_id?.includes(Number(key))}
                                    onChange={(e) => {
                                        const selectedSubjects =
                                            qFrom.data.class_id || [];

                                        if (e.target.checked) {
                                            qFrom.setData("class_id", [
                                                ...selectedSubjects,
                                                Number(key),
                                            ]);
                                        } else {
                                            qFrom.setData(
                                                "class_id",
                                                selectedSubjects.filter(
                                                    (id) => id !== Number(key)
                                                )
                                            );
                                        }
                                    }}
                                    className="checkbox"
                                />
                                <span>{value}</span>
                            </label>
                        ))
                    ) : (
                        <p className="text-center text-sm text-gray-500">
                            কোন শ্রেণি নেই!
                        </p>
                    )}
                </div>
                <div className="grid grid-cols-2 gap-1 mt-3">
                    <button
                        onClick={() => setClassesModel(!classesModel)}
                        className="btn btn-sm btn-primary"
                    >
                        সিলেক্ট করুন
                    </button>
                    <button
                        className="btn btn-sm btn-error"
                        onClick={() => qFrom.reset("class_id")}
                    >
                        রিসেট করুন
                    </button>
                </div>
            </Model>

            {/* subject model */}
            <Model
                title="বিষয় সিলেক্ট করুন"
                model={subjectModel}
                setModel={setSubjectModel}
            >
                <div className="flex flex-col space-y-1 max-h-[500px] overflow-y-auto">
                    {subjects && qFrom.data.class_id.length > 0 ? (
                        subjects
                            .filter((sub) =>
                                qFrom.data.class_id.includes(
                                    Number(sub.class_id)
                                )
                            )
                            .map((val, i) => (
                                <label
                                    key={i}
                                    htmlFor={`sub-${val?.id}`}
                                    className="w-full px-3 py-1.5 border border-gray-200 rounded-box flex items-center gap-3 duration-300 hover:bg-gray-100"
                                >
                                    <input
                                        type="checkbox"
                                        id={`sub-${val?.id}`}
                                        value={val?.id}
                                        checked={qFrom.data.subjects?.includes(
                                            val?.id
                                        )}
                                        onChange={(e) => {
                                            const selected =
                                                qFrom.data.subjects || [];
                                            if (e.target.checked) {
                                                qFrom.setData("subjects", [
                                                    ...selected,
                                                    val?.id,
                                                ]);
                                            } else {
                                                qFrom.setData(
                                                    "subjects",
                                                    selected.filter(
                                                        (sid) => sid !== val?.id
                                                    )
                                                );
                                            }
                                        }}
                                        className="checkbox"
                                    />
                                    <span>{val?.name}</span>
                                </label>
                            ))
                    ) : (
                        <p className="text-center text-sm text-gray-500">
                            কোন বিষয় নেই!
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-1 mt-3">
                    <button
                        onClick={() => setSubjectModel(!subjectModel)}
                        className="btn btn-sm btn-primary"
                    >
                        সিলেক্ট করুন
                    </button>
                    <button
                        className="btn btn-sm btn-error"
                        onClick={() => qFrom.reset("subjects")}
                    >
                        রিসেট করুন
                    </button>
                </div>
            </Model>
        </div>
    );
}
