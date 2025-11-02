import { Link, useForm } from "@inertiajs/react";
import { Download, Eye, Folder, Pen, Trash } from "lucide-react";
import Model from "../../../Components/Parts/Model";
import Input from "../../../Components/Parts/Input";
import Header from "../../../Components/Parts/Header";
import React, { useState } from "react";

export default function AllPapers({ tree }) {
    // edit model foem
    const editForm = useForm({
        id: "",
        title: "",
    });
    const [model, setModel] = useState(false);
    const closeModel = () => {
        setModel(!model);
        editForm.reset();
    };

    //
    const handleForm = (e) => {
        e.preventDefault();
        editForm.post(route("g.question.paper.update"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                closeModel();
            },
        });
    };

    return (
        <div>
            <div className="bg-primary text-neutral text-lg font-bold px-3 py-2 flex items-center justify-center gap-2 rounded-box">
                <Download size={20} />{" "}
                <span>ক্লাউড থেকে প্রশ্নপত্র লোড করুন</span>
            </div>

            {/* tree */}
            <ul className="menu menu-md bg-white border border-dashed border-primary/50 rounded-box mt-4 w-full">
                {tree.map((classItem, i) => (
                    <li
                        key={i}
                        className="duration-300 hover:bg-white border-b border-gray-200 py-1 last:border-b-0"
                    >
                        <details>
                            <summary>
                                <Folder size={14} />
                                {classItem?.name}
                            </summary>
                            <ul>
                                {classItem.subjects.map((subject, i) => (
                                    <li key={i}>
                                        <details>
                                            <summary>
                                                <Folder size={14} />
                                                {subject.name}
                                            </summary>
                                            <ul>
                                                {subject.lessons.map(
                                                    (lesson, i) => (
                                                        <li key={i}>
                                                            <details>
                                                                <summary>
                                                                    <Folder
                                                                        size={
                                                                            14
                                                                        }
                                                                    />
                                                                    {
                                                                        lesson.name
                                                                    }
                                                                </summary>
                                                                <ul>
                                                                    {lesson.papers.map(
                                                                        (
                                                                            paper,
                                                                            i
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    i
                                                                                }
                                                                                className="border-b py-1 border-gray-200"
                                                                            >
                                                                                <div className="flex items-center justify-between gap-3">
                                                                                    <div className="flex items-center gap-2">
                                                                                        <p className="flex items-center gap-2">
                                                                                            <Folder
                                                                                                size={
                                                                                                    14
                                                                                                }
                                                                                            />
                                                                                            {
                                                                                                paper?.name
                                                                                            }
                                                                                        </p>

                                                                                        <div className="py-0.5 px-2 bg-primary/10 rounded-box border border-dashed border-primary text-xs text-neutral font-semibold">
                                                                                            {
                                                                                                paper?.type
                                                                                            }
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="flex items-center gap-1">
                                                                                        <button
                                                                                            onClick={() => {
                                                                                                editForm.setData(
                                                                                                    "id",
                                                                                                    paper?.id
                                                                                                );
                                                                                                editForm.setData(
                                                                                                    "title",
                                                                                                    paper?.name
                                                                                                );
                                                                                                setModel(
                                                                                                    !model
                                                                                                );
                                                                                            }}
                                                                                            className="btn btn-primary btn-xs"
                                                                                        >
                                                                                            <Pen
                                                                                                size={
                                                                                                    12
                                                                                                }
                                                                                            />
                                                                                            সম্পাদন
                                                                                        </button>
                                                                                        <Link
                                                                                            href={route(
                                                                                                "g.questions.papper.details",
                                                                                                {
                                                                                                    id: paper?.id,
                                                                                                }
                                                                                            )}
                                                                                            className="btn btn-xs btn-info"
                                                                                        >
                                                                                            <Eye
                                                                                                size={
                                                                                                    12
                                                                                                }
                                                                                            />
                                                                                            দেখুন
                                                                                        </Link>
                                                                                        <Link
                                                                                            href={route(
                                                                                                "g.all.questions.papper.delete",
                                                                                                {
                                                                                                    id: paper?.id,
                                                                                                }
                                                                                            )}
                                                                                            preserveScroll
                                                                                            preserveState
                                                                                            onClick={(
                                                                                                e
                                                                                            ) => {
                                                                                                if (
                                                                                                    !confirm(
                                                                                                        "আপনি কি নিশ্চিত যে এই প্রশ্নপত্রটি মুছে ফেলতে চান?"
                                                                                                    )
                                                                                                ) {
                                                                                                    e.preventDefault();
                                                                                                }
                                                                                            }}
                                                                                            className="btn btn-xs btn-error"
                                                                                        >
                                                                                            <Trash
                                                                                                size={
                                                                                                    12
                                                                                                }
                                                                                            />
                                                                                            ডিলেট
                                                                                        </Link>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        )
                                                                    )}
                                                                </ul>
                                                            </details>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </details>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    </li>
                ))}
            </ul>

            {/* model */}
            <Model model={model} title="সম্পাদন করুন" callback={closeModel}>
                <Input
                    label="প্রোগ্রাম নাম"
                    value={editForm.data.title}
                    onChange={(e) => editForm.setData("title", e.target.value)}
                />

                <div className="flex items-center gap-3 mt-3">
                    <button
                        onClick={handleForm}
                        disabled={editForm.processing}
                        className="btn btn-primary btn-md"
                    >
                        সেভ করুন
                    </button>
                    <Link
                        className="text-sm duration-300 hover:underline font-semibold text-neutral"
                        href={route("g.load.questions", {
                            id: editForm.data.id,
                        })}
                    >
                        প্রশ্ন বাতিল/যুক্ত করুন
                    </Link>
                </div>
            </Model>

            <Header title="সকল প্রশ্ন পত্র" />
        </div>
    );
}
