import React, { useEffect, useRef, useState } from "react";
import Header from "../../../Components/Parts/Header";
import Input from "../../../Components/Parts/Input";
import LatexPreview from "../../../Components/Parts/LatexPreview";
import Paginations from "../../../Components/Parts/Paginations";
import Start from "../../../Components/Parts/Start";
import { BANGLA_INDEX, ENGLISH_TO_BANGLA } from "../../../Utils/Helper";
import { Eye, Save, X } from "lucide-react";
import { Link, router, useForm } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function LoadQuestions({
    paper_data,
    data,
    taqs,
    filters,
    old_added_questions,
}) {
    const searchForm = useForm({
        search: filters?.search || "",
        type: [],
        taqs: filters?.taqs,
    });

    // search with debounce
    const searchRaf = useRef(false);
    useEffect(() => {
        if (searchRaf.current) {
            clearTimeout(searchRaf.current);
        }
        searchRaf.current = setTimeout(() => {
            searchForm.get(route("g.load.questions", { id: paper_data?.id }), {
                preserveState: true,
                preserveScroll: true,
            });
        }, 500);
    }, [searchForm.data]);

    // handle select all questions
    const [needSave, setNeedSave] = useState(false);
    const [selectQuestions, setSelectQuestions] = useState(
        old_added_questions || []
    );
    const handleQuestionSelect = (questionId) => {
        needSave || setNeedSave(true);
        let updatedSelections = [...selectQuestions];
        if (updatedSelections.includes(questionId)) {
            updatedSelections = updatedSelections.filter(
                (id) => id !== questionId
            );
        } else {
            updatedSelections.push(questionId);
        }
        setSelectQuestions(updatedSelections);
    };

    // notify if wan to leave with unsaved changes
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (needSave) {
                e.preventDefault();
                e.returnValue =
                    "আপনি নিশ্চিত যে আপনি এই পেজ ত্যাগ করতে চান? আপনার পরিবর্তনগুলি সংরক্ষিত নাও হতে পারে।";
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [needSave]);

    // handle save questions to paper
    const handleSaveQuestions = (e) => {
        e.preventDefault();

        if (selectQuestions.length === 0) {
            toast.error("কোনো প্রশ্ন নির্বাচন করা হয়নি।");
            return;
        }

        router.post(
            route("g.load.questions.post"),
            {
                id: paper_data?.id,
                data: selectQuestions,
            },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    setNeedSave(false);
                },
            }
        );
    };

    return (
        <div className="flex flex-col md:flex-row gap-10">
            {/* all questions */}
            <div className="w-full md:w-[calc(100%-400px)] h-fit">
                {/* header */}
                <div className="flex items-center justify-between gap-3 bg-white p-3.5 rounded-box border border-gray-200">
                    <div className="flex items-center gap-2">
                        <span>
                            মোট প্রশ্ন:{" "}
                            {ENGLISH_TO_BANGLA(selectQuestions.length)}/
                            {ENGLISH_TO_BANGLA(data?.total || 0)}
                        </span>
                    </div>
                    <div>
                        <h1 className="text-sm font-semibold text-neutral">
                            {paper_data?.program_name}
                        </h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href={route("g.questions.papper.details", {
                                id: paper_data?.id,
                            })}
                            disabled={needSave}
                            className="btn btn-sm btn-soft"
                        >
                            <Eye size={13} /> প্রিভিউ
                        </Link>
                        <button
                            disabled={selectQuestions.length <= 0}
                            onClick={handleSaveQuestions}
                            className="btn btn-primary btn-sm"
                        >
                            <Save size={13} /> সংরক্ষণ
                        </button>
                    </div>
                </div>

                <p className="bg-primary/10 text-neutral font-normal text-sm text-center py-3 rounded-box my-2 px-3">
                    প্রশ্নে ভুল পেলে রিপোর্ট করে প্রশ্নব্যাংক সমৃদ্ধ করুন ।
                </p>

                {/* view questions */}
                <div className="flex flex-col gap-1.5">
                    {data?.data?.map((question, index) => (
                        <button
                            onClick={() => handleQuestionSelect(question.id)}
                            key={index}
                            className={`p-4 bg-white border border-gray-300 rounded-box duration-300 hover:border-l-8 hover:border-r-8 ${
                                selectQuestions.includes(question.id)
                                    ? "hover:border-error"
                                    : "hover:border-primary"
                            } hover:shadow-md ${
                                selectQuestions.includes(question.id)
                                    ? "border-l-8 border-r-8 border-primary shadow-md"
                                    : ""
                            }`}
                        >
                            {/* uddipok */}
                            <div className="flex flex-col gap-4">
                                {(() => {
                                    const metaData =
                                        JSON.parse(question?.meta) || [];

                                    if (!metaData) {
                                        return null;
                                    }

                                    return (
                                        <div className="flex items-center gap-1 justify-end">
                                            <Start
                                                start={
                                                    Number(metaData?.start) || 0
                                                }
                                                max={3}
                                            />
                                            {metaData?.taq && (
                                                <mark className="text-sm font-normal px-1 py-1">
                                                    {metaData?.taq?.join(", ")}
                                                </mark>
                                            )}
                                        </div>
                                    );
                                })()}

                                {(question.type == "cq" ||
                                    question.type == "mcq") && (
                                    <div className="flex gap-2">
                                        <span>
                                            {ENGLISH_TO_BANGLA(index + 1)}.{" "}
                                        </span>
                                        <LatexPreview
                                            content={question?.body}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* questions */}
                            {/* mcq */}
                            {question?.type == "mcq" && (
                                <div className="grid grid-cols-2 gap-1 mt-1">
                                    {question?.options
                                        ?.filter((val) => val.type === "normal")
                                        .map((val, i) => (
                                            <div
                                                className="flex items-center gap-2 py-1.5 bg-gray-200 px-2 rounded-box"
                                                key={i}
                                            >
                                                <p
                                                    className={`rounded-full w-5 h-5 text-xs flex items-center justify-center ${
                                                        val?.is_correct
                                                            ? "bg-neutral text-white"
                                                            : "border border-gray-400"
                                                    }`}
                                                >
                                                    {BANGLA_INDEX(i)}
                                                </p>
                                                <LatexPreview
                                                    content={val?.option_text}
                                                />
                                            </div>
                                        ))}
                                </div>
                            )}
                            {/* mcq hard label */}
                            {question?.type === "mcq" &&
                                question?.mcq_type === "hard" && (
                                    <p className="text-gray-600 text-sm font-normal py-2">
                                        নিচের কোনটি সঠিক?
                                    </p>
                                )}
                            {question?.type === "mcq" &&
                                question?.mcq_type === "hard" && (
                                    <div className="grid grid-cols-2 gap-1">
                                        {question?.options
                                            ?.filter(
                                                (val) => val.type === "hard"
                                            )
                                            .map((val, i) => (
                                                <div
                                                    className="flex items-center gap-2 py-1.5 bg-gray-200 px-2 rounded-box"
                                                    key={i}
                                                >
                                                    <p
                                                        className={`rounded-full w-5 h-5 text-xs flex items-center justify-center ${
                                                            val?.is_correct
                                                                ? "bg-neutral text-white"
                                                                : "border border-gray-400"
                                                        }`}
                                                    >
                                                        {BANGLA_INDEX(i)}
                                                    </p>
                                                    <LatexPreview
                                                        content={
                                                            val?.option_text
                                                        }
                                                    />
                                                </div>
                                            ))}
                                    </div>
                                )}

                            {/* others */}
                            {question?.type !== "mcq" && (
                                <div className="mt-2">
                                    {question?.options?.map((val, i) => (
                                        <div
                                            className="flex items-center gap-2 py-0.5"
                                            key={i}
                                        >
                                            <p>{BANGLA_INDEX(i)}.</p>
                                            <LatexPreview
                                                content={val?.questions}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                {/* pagination */}
                <Paginations data={data} />
            </div>

            {/* filter */}
            <div className="w-full md:w-[400px] h-fit">
                <div className="border border-gray-200 bg-white rounded-box p-4 mb-3">
                    <Input
                        value={searchForm.data.search}
                        onChange={(e) =>
                            searchForm.setData("search", e.target.value)
                        }
                        label="সার্চ করুন"
                        placeholder="সার্চ.."
                    />
                </div>

                <div className="border border-gray-200 bg-white rounded-box mb-3">
                    <div className="font-semibold flex items-center justify-between bg-primary/10 text-neutral px-3 py-2 text-sm rounded-t-box">
                        <span>টাইপ</span>
                        {searchForm.data.type.length > 0 && (
                            <button
                                onClick={() => {
                                    searchForm.setData("type", []);
                                }}
                                className="btn btn-xs btn-error btn-circle"
                            >
                                <X size={12} />
                            </button>
                        )}
                    </div>
                    <div className="flex flex-col">
                        {paper_data?.type == "all" ? (
                            <>
                                {["mcq", "cq", "sq"].map((t) => (
                                    <label
                                        key={t}
                                        className="label text-sm text-neutral border-b border-gray-200 py-2.5 px-4 last:border-0 cursor-pointer flex items-center gap-2"
                                    >
                                        <input
                                            type="radio"
                                            name="type"
                                            value={t}
                                            checked={searchForm.data.type === t}
                                            onChange={(e) => {
                                                searchForm.setData(
                                                    "type",
                                                    e.target.value
                                                );
                                            }}
                                            className="radio"
                                        />
                                        {t === "mcq" && "বহুনির্বাচনী প্রশ্ন"}
                                        {t === "cq" && "সৃজনশীল"}
                                        {t === "sq" && "সংক্ষিপ্ত"}
                                    </label>
                                ))}
                            </>
                        ) : (
                            <label className="label text-sm text-neutral border-b border-gray-200 py-2.5 px-4 last:border-0 cursor-pointer flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="type"
                                    value={paper_data?.type}
                                    checked={
                                        searchForm.data.type ===
                                        paper_data?.type
                                    }
                                    onChange={(e) => {
                                        searchForm.setData(
                                            "type",
                                            e.target.value
                                        );
                                    }}
                                    className="radio"
                                />

                                {paper_data?.type === "mcq"
                                    ? "বহুনির্বাচনী প্রশ্ন"
                                    : paper_data?.type === "cq"
                                    ? "সৃজনশীল"
                                    : "সংক্ষিপ্ত"}
                            </label>
                        )}
                    </div>
                </div>

                <div className="border border-gray-200 bg-white rounded-box mb-3">
                    <div className="font-semibold flex items-center justify-between bg-primary/10 text-neutral px-3 py-2 text-sm rounded-t-box">
                        <span>টাইপ</span>
                        {searchForm.data.taqs && (
                            <button
                                onClick={() => {
                                    searchForm.setData("taqs", "");
                                }}
                                className="btn btn-xs btn-error btn-circle"
                            >
                                <X size={12} />
                            </button>
                        )}
                    </div>
                    {taqs.map((val, i) => (
                        <label
                            key={i}
                            className="label text-sm text-neutral border-b border-gray-200 py-2.5 px-4 last:border-0 cursor-pointer flex items-center gap-2"
                        >
                            <input
                                type="radio"
                                name="taqs"
                                value={val}
                                onChange={(e) => {
                                    searchForm.setData("taqs", e.target.value);
                                }}
                                className="radio"
                            />
                            {val}
                        </label>
                    ))}
                </div>
            </div>
            <Header title="প্রশ্ন বাছায়" />
        </div>
    );
}
