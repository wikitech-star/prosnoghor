import React, { useEffect, useState } from "react";
import MathEditor from "../../../Components/Parts/MathEditor";
import LatexPreview from "../../../Components/Parts/LatexPreview";
import { Link, router, useForm } from "@inertiajs/react";
import Header from "../../../Components/Parts/Header";
import Select from "../../../Components/Parts/Select";
import FileInput from "../../../Components/Parts/FileInput";
import Input from "../../../Components/Parts/Input";
import DynamicMathEditor from "../../../Components/Parts/DynamicMathEditor";
import DynamicMathEditorBoth from "../../../Components/Parts/DynamicMathEditorBoth";
import { BANGLA_INDEX } from "../../../Utils/Helper";
import {
    ArrowUpFromDot,
    BrushCleaning,
    Check,
    LoaderIcon,
    RefreshCcw,
    X,
} from "lucide-react";

export default function Add({
    class_data,
    subject,
    lassion,
    question_type,
    update,
}) {
    const [schoolCollaps, setSchoolCollaps] = useState(true);
    const [mediaCollaps, setMediaCollaps] = useState(false);
    const [uddipokCollaps, setUddipokCollaps] = useState(true);
    const [cqsqCollaps, setCqSqCollaps] = useState(true);
    const [mcqCollAnsaps, setMcqAnsCollaps] = useState(true);
    const [mcqHCollAnsaps, setMcqHAnsCollaps] = useState(true);
    const [taqsCollaps, setTaqsCollaps] = useState(true);

    const qFrom = useForm({
        // required data
        id: update?.id || "",
        question_type: update?.type || "",
        question_label: update?.mcq_type || "",
        class_id: update?.class_id || "",
        subject_id: update?.subject_id || "",
        lassion_id: update?.lesson_id || "",
        type_id: update?.q_type_id || "",

        // media
        image: null,
        imageOld: (update?.image && "/uploads/" + update?.image) || "",
        imagePosition: update?.image_align || "center",
        videoUrl: update?.youtube_url || "",

        // question
        searchTtitle: update?.title || "",
        questionTtitle: update?.body || "",

        // cq sq
        cqsqQuestion: [],

        // mcq
        mcqQuestion: [],
        mcqQuestionhard: [],

        // taqs
        tags: [],
        start: 0,
    });
    useEffect(() => {
        const taqJson = update?.meta ? JSON.parse(update?.meta) : [];
        if (taqJson) {
            qFrom.setData("tags", taqJson?.taq || []);
            qFrom.setData("yars", taqJson?.yars || []);
            qFrom.setData("start", taqJson?.start || []);
        }
    }, [update]);

    // taqs state
    const [tagInput, setTagInput] = useState("");
    const addTag = (e) => {
        e.preventDefault();
        const newTag = tagInput.trim();
        if (newTag !== "" && !qFrom?.data.tags.includes(newTag)) {
            qFrom.setData("tags", [...qFrom?.data.tags, newTag]);
            setTagInput("");
        }
    };
    const removeTag = (tagToRemove) => {
        qFrom.setData(
            "tags",
            qFrom?.data.tags.filter((t) => t !== tagToRemove)
        );
    };

    // set update
    useEffect(() => {
        // for mcq
        if (update?.type === "mcq") {
            const normalOptions =
                update?.options
                    ?.filter((val) => val.type === "normal")
                    ?.map((opt) => ({
                        id: opt.id,
                        value: opt.option_text,
                        isRight: !!opt.is_correct,
                    })) || [];

            const hardOptions =
                update?.options
                    ?.filter((val) => val.type === "hard")
                    ?.map((opt) => ({
                        id: opt.id,
                        value: opt.option_text,
                        isRight: !!opt.is_correct,
                    })) || [];

            qFrom.setData("mcqQuestion", normalOptions);
            qFrom.setData("mcqQuestionhard", hardOptions);
        }

        if (update?.type === "cq" || update?.type === "sq") {
            const sqcqoptions =
                update?.options?.map((opt) => ({
                    id: opt.id,
                    question: opt.questions,
                    answer: opt?.ans,
                })) || [];
            qFrom.setData("cqsqQuestion", sqcqoptions);
        }
    }, [update]);

    // create form submit
    const submitQuestion = (e) => {
        e.preventDefault();
        qFrom.post(route("ux.question.post"), {
            onSuccess: () => {
                qFrom.setData("image", null);
                qFrom.setData("videoUrl", "");
                qFrom.setData("searchTtitle", "");
                qFrom.setData("questionTtitle", "");
                qFrom.setData("cqsqQuestion", []);
                qFrom.setData("mcqQuestion", []);
                qFrom.setData("mcqQuestionhard", []);
            },
            preserveState: true,
            preserveScroll: true,
        });
    };

    // reset
    useEffect(() => {
        if (update?.id) return;
        if (qFrom.data.question_type == "mcq") {
            qFrom.setData("cqsqQuestion", []);
        }
        if (qFrom.data.question_type !== "mcq") {
            qFrom.setData("question_label", "");
            qFrom.setData("cqsqQuestion", []);
            qFrom.setData("mcqQuestionhard", []);
            qFrom.setData("mcqQuestion", []);
        }
    }, [qFrom.data.question_type]);

    // pre data
    const [subjectData, setSubjectData] = useState(null);
    const [lessionData, setLessionData] = useState(null);
    useEffect(() => {
        if (qFrom.data.class_id) {
            // subject data preparing
            const subjectObject = Object.fromEntries(
                subject
                    .filter((s) => Number(qFrom?.data?.class_id) === s.class_id)
                    .map(({ id, name }) => [id, name])
            );

            // lession data preparing
            const lessionObject = Object.fromEntries(
                (lassion || [])
                    .filter(
                        (l) =>
                            Number(qFrom?.data?.class_id) === Number(l.class_id)
                    )
                    .filter(
                        (l) =>
                            Number(qFrom?.data?.subject_id) ===
                            Number(l.subject_id)
                    )
                    .map(({ id, name }) => [id, name])
            );

            // store in state
            setLessionData(lessionObject);
            setSubjectData(subjectObject);
        }
    }, [qFrom.data, update]);

    return (
        <div className="bg-white p-6 rounded-box space-y-6">
            {/* page title */}
            <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-5">
                <div>
                    <h4 className="text-lg font-medium">নতুন প্রশ্ন তৈরী</h4>
                    <p className="text-sm text-gray-500">
                        নতুন প্রশ্ন তৈরী করুন, * চিহ্ন দেওয়া সকল ফিল্ড
                        বাধ্যামূল্যক।
                    </p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between gap-3">
                {/* form */}
                <div className="space-y-3 w-full lg:w-[60%]">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => {
                                setSchoolCollaps(false);
                                setMediaCollaps(false);
                                setUddipokCollaps(false);
                                setCqSqCollaps(false);
                                setMcqAnsCollaps(false);
                                setMcqHAnsCollaps(false);
                                setTaqsCollaps(false);
                            }}
                            className="btn btn-primary btn-xs"
                        >
                            <ArrowUpFromDot size={14} /> সব গুটিয়ে ফেলুন
                        </button>
                        <button
                            onClick={() => {
                                if (confirm("আপনি কি নিশ্চিত?")) {
                                    qFrom.reset();
                                    router.visit(route("ux.question.add"), {
                                        preserveScroll: true,
                                        preserveState: true,
                                    });
                                }
                            }}
                            className="btn btn-xs btn-error"
                        >
                            <RefreshCcw size={14} /> সব পরিষ্কার করুন
                        </button>
                    </div>

                    {/* required data */}
                    <div
                        tabIndex={0}
                        className={`collapse ${
                            schoolCollaps ? "collapse-open" : "collapse-close"
                        } collapse-plus bg-base-100 border-base-300 border`}
                    >
                        <div
                            className="collapse-title font-semibold text-sm bg-primary text-neutral"
                            onClick={() => setSchoolCollaps(!schoolCollaps)}
                        >
                            বাধ্যামূল্যক তথ্য*
                        </div>
                        <div
                            className={`collapse-content space-y-4 ${
                                schoolCollaps && "pt-3"
                            }`}
                        >
                            <Select
                                label="প্রশ্নের ধরন*"
                                disabled={update?.id}
                                options={{ mcq: "MCQ", cq: "CQ", sq: "SQ" }}
                                oldVal={qFrom.data.question_type}
                                onChange={(e) =>
                                    qFrom.setData(
                                        "question_type",
                                        e.target.value
                                    )
                                }
                                error={qFrom.errors.question_type}
                            />
                            {qFrom.data.question_type === "mcq" && (
                                <Select
                                    label="MCQ ধরন*"
                                    disabled={update?.id}
                                    options={{
                                        normal: "সাধারন",
                                        hard: "উচ্চতার দক্ষতা",
                                    }}
                                    oldVal={qFrom.data.question_label}
                                    onChange={(e) =>
                                        qFrom.setData(
                                            "question_label",
                                            e.target.value
                                        )
                                    }
                                    error={qFrom.errors.question_label}
                                />
                            )}

                            <Select
                                label="শ্রেনী*"
                                name="class_id"
                                options={class_data || {}}
                                oldVal={qFrom.data.class_id}
                                onChange={(e) =>
                                    qFrom.setData("class_id", e.target.value)
                                }
                                error={qFrom.errors.class_id}
                            />
                            <Select
                                label="বিষয়*"
                                options={subjectData || {}}
                                disabled={subjectData == null}
                                oldVal={qFrom.data.subject_id}
                                onChange={(e) =>
                                    qFrom.setData("subject_id", e.target.value)
                                }
                                error={qFrom.errors.subject_id}
                            />
                            <Select
                                label="অধ্যায়*"
                                options={lessionData || {}}
                                disabled={lessionData == null}
                                oldVal={qFrom.data.lassion_id}
                                onChange={(e) =>
                                    qFrom.setData("lassion_id", e.target.value)
                                }
                                error={qFrom.errors.lassion_id}
                            />
                            <Select
                                label="টপিক*"
                                disabled={question_type == null}
                                options={question_type || {}}
                                oldVal={qFrom.data.type_id}
                                onChange={(e) =>
                                    qFrom.setData("type_id", e.target.value)
                                }
                                error={qFrom.errors.type_id}
                            />
                        </div>
                    </div>

                    {/* media */}
                    <div
                        tabIndex={0}
                        className={`collapse ${
                            mediaCollaps ? "collapse-open" : "collapse-close"
                        } collapse-plus bg-base-100 border-base-300 border`}
                    >
                        <div
                            className="collapse-title font-semibold text-sm bg-primary text-neutral"
                            onClick={() => setMediaCollaps(!mediaCollaps)}
                        >
                            মেডিয়া
                        </div>
                        <div
                            className={`collapse-content space-y-4 ${
                                mediaCollaps && "pt-3"
                            }`}
                        >
                            <FileInput
                                onChange={(f) => qFrom.setData("image", f)}
                                old={qFrom.data.imageOld}
                                error={qFrom.errors.image}
                                accept="image/png,.jpg,.jpeg"
                            />
                            <Select
                                label="ইমাজে পজিশন"
                                oldVal={qFrom.data.imagePosition}
                                onChange={(e) =>
                                    qFrom.setData(
                                        "imagePosition",
                                        e.target.value
                                    )
                                }
                                options={{
                                    left: "বামে",
                                    center: "মাঝে",
                                    right: "ডানে",
                                }}
                            />
                            <Input
                                label="ভিডিও লিংক"
                                value={qFrom.data.videoUrl}
                                onChange={(e) =>
                                    qFrom.setData("videoUrl", e.target.value)
                                }
                                error={qFrom.errors.videoUrl}
                            />
                        </div>
                    </div>

                    {/* title */}
                    <div
                        tabIndex={0}
                        className={`collapse ${
                            uddipokCollaps ? "collapse-open" : "collapse-close"
                        } collapse-plus bg-base-100 border-base-300 border`}
                    >
                        <div
                            className="collapse-title font-semibold text-sm bg-primary text-neutral"
                            onClick={() => setUddipokCollaps(!uddipokCollaps)}
                        >
                            উদ্দিপক*
                        </div>
                        <div
                            className={`collapse-content space-y-4 ${
                                uddipokCollaps && "pt-3"
                            }`}
                        >
                            <Input
                                label="সার্স টাইটেল"
                                value={qFrom.data.searchTtitle}
                                error={qFrom.errors.searchTtitle}
                                onChange={(e) =>
                                    qFrom.setData(
                                        "searchTtitle",
                                        e.target.value
                                    )
                                }
                            />
                            {qFrom.data.question_type !== "sq" && (
                                <MathEditor
                                    value={qFrom.data.questionTtitle}
                                    onChange={(val) =>
                                        qFrom.setData("questionTtitle", val)
                                    }
                                    error={qFrom.errors.questionTtitle}
                                />
                            )}
                        </div>
                    </div>

                    {/* cq || sq */}
                    {(qFrom.data.question_type === "cq" ||
                        qFrom.data.question_type === "sq") && (
                        <div
                            tabIndex={0}
                            className={`collapse ${
                                cqsqCollaps ? "collapse-open" : "collapse-close"
                            } collapse-plus bg-base-100 border-base-300 border`}
                        >
                            <div
                                className="collapse-title font-semibold text-sm bg-primary text-neutral uppercase"
                                onClick={() => setCqSqCollaps(!cqsqCollaps)}
                            >
                                {qFrom.data.question_type} প্রশ্ন*
                            </div>
                            <div
                                className={`collapse-content space-y-4 ${
                                    cqsqCollaps && "pt-3"
                                }`}
                            >
                                <DynamicMathEditorBoth
                                    qFrom={qFrom}
                                    name="cqsqQuestion"
                                    defaultCount={0}
                                    defaultValues={qFrom.data.cqsqQuestion}
                                />
                            </div>
                        </div>
                    )}

                    {/* mcq */}
                    {qFrom.data.question_type === "mcq" &&
                        (qFrom.data.question_label === "normal" ||
                            qFrom.data.question_label === "hard") && (
                            <div
                                tabIndex={0}
                                className={`collapse ${
                                    mcqCollAnsaps
                                        ? "collapse-open"
                                        : "collapse-close"
                                } collapse-plus bg-base-100 border-base-300 border`}
                            >
                                <div
                                    className="collapse-title font-semibold text-sm bg-primary text-neutral uppercase"
                                    onClick={() =>
                                        setMcqAnsCollaps(!mcqCollAnsaps)
                                    }
                                >
                                    {qFrom.data.question_type} প্রশ্ন সাধারন*
                                </div>
                                <div
                                    className={`collapse-content space-y-4 ${
                                        mcqCollAnsaps && "pt-3"
                                    }`}
                                >
                                    <DynamicMathEditor
                                        qFrom={qFrom}
                                        name="mcqQuestion"
                                        defaultCount={1}
                                        type="normal"
                                        defaultValues={qFrom.data.mcqQuestion}
                                    />
                                </div>
                            </div>
                        )}

                    {qFrom.data.question_type === "mcq" &&
                        qFrom.data.question_label === "hard" && (
                            <div
                                tabIndex={0}
                                className={`collapse ${
                                    mcqHCollAnsaps
                                        ? "collapse-open"
                                        : "collapse-close"
                                } collapse-plus bg-base-100 border-base-300 border`}
                            >
                                <div
                                    className="collapse-title font-semibold text-sm bg-primary text-neutral uppercase"
                                    onClick={() =>
                                        setMcqHAnsCollaps(!mcqHCollAnsaps)
                                    }
                                >
                                    {qFrom.data.question_type} প্রশ্ন উচ্চতার
                                    দক্ষতা*
                                </div>
                                <div
                                    className={`collapse-content space-y-4 ${
                                        mcqHCollAnsaps && "pt-3"
                                    }`}
                                >
                                    <DynamicMathEditor
                                        qFrom={qFrom}
                                        name="mcqQuestionhard"
                                        defaultCount={1}
                                        type="hard"
                                        defaultValues={
                                            qFrom.data.mcqQuestionhard
                                        }
                                    />
                                </div>
                            </div>
                        )}

                    {/* taqs */}
                    <div
                        tabIndex={0}
                        className={`collapse ${
                            taqsCollaps ? "collapse-open" : "collapse-close"
                        } collapse-plus bg-base-100 border-base-300 border`}
                    >
                        <div
                            className="collapse-title font-semibold text-sm bg-primary text-neutral"
                            onClick={() => setTaqsCollaps(!taqsCollaps)}
                        >
                            ট্যাগ
                        </div>
                        <div
                            className={`collapse-content space-y-4 ${
                                taqsCollaps && "pt-3"
                            }`}
                        >
                            {/* board */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">
                                    বোর্ড
                                </legend>
                                <div className="flex flex-wrap gap-2 border border-gray-300 rounded-box p-2">
                                    {qFrom?.data.tags.map((tag, index) => (
                                        <div
                                            key={index}
                                            className="bg-primary/20 text-neutral px-2 py-1 rounded-box flex items-center gap-1"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(tag)}
                                                className="text-red-500 font-bold"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) =>
                                            setTagInput(e.target.value)
                                        }
                                        onKeyDown={(e) =>
                                            e.key === "Enter" && addTag(e)
                                        }
                                        className="flex p-1 focus:outline-none"
                                        placeholder="Type and press Enter"
                                    />
                                </div>
                            </fieldset>

                            {/* star */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">
                                    স্টার
                                </legend>
                                <div className="w-full">
                                    <input
                                        type="range"
                                        min={1}
                                        max={3}
                                        value={Number(qFrom?.data?.start)}
                                        onChange={(e) =>
                                            qFrom.setData(
                                                "start",
                                                e.target.value
                                            )
                                        }
                                        className="range w-full"
                                        step={1}
                                    />
                                    <div className="flex justify-between px-2.5 mt-2 text-xs">
                                        <span>|</span>
                                        <span>|</span>
                                        <span>|</span>
                                    </div>
                                    <div className="flex justify-between px-2.5 mt-2 text-xs">
                                        <span>১</span>
                                        <span>২</span>
                                        <span>৩</span>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                        <button
                            onClick={submitQuestion}
                            disabled={qFrom.processing}
                            className="btn btn-primary btn-sm"
                        >
                            {qFrom.processing && (
                                <LoaderIcon
                                    size={13}
                                    className="animate-spin"
                                />
                            )}{" "}
                            {update?.id ? "পরিবর্তন করুন" : "সেভ করুন"}
                        </button>

                        {update?.id && (
                            <Link
                                href={route("ux.question.all")}
                                className="text-sm font-normal text-error flex items-center gap-1"
                            >
                                <X size={12} /> বাতিল করুন
                            </Link>
                        )}
                    </div>
                </div>

                {/* preview */}
                <div className="border border-gray-400 border-dashed rounded-box p-5 max-h-fit sticky top-25 w-full lg:w-[40%]">
                    {(qFrom.data.searchTtitle ||
                        qFrom.data.questionTtitle ||
                        qFrom.data?.cqsqQuestion.length > 0) && (
                        <h1 className="text-md font-bold mb-4 text-gray-500">
                            প্রশ্নের ডেমু
                        </h1>
                    )}

                    {qFrom.data.imageOld && (
                        <div
                            className={`mb-3 flex items-center justify-${
                                qFrom.data.imagePosition === "center"
                                    ? "center"
                                    : qFrom.data.imagePosition === "left"
                                    ? "start"
                                    : "end"
                            }`}
                        >
                            <img
                                src={qFrom.data.imageOld}
                                className="max-h-[150px] w-auto"
                            />
                        </div>
                    )}

                    {/* search title */}
                    <h1 className="text-sm text-neutral">
                        {qFrom.data.searchTtitle}
                    </h1>

                    {/* uddipok */}
                    <LatexPreview content={qFrom.data.questionTtitle} />

                    {/* cq sq */}
                    {(qFrom.data.question_type === "cq" ||
                        qFrom.data.question_type === "sq") && (
                        <>
                            <div className="mt-3 pl-4">
                                {qFrom.data?.cqsqQuestion.map((val, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2"
                                    >
                                        <p>{BANGLA_INDEX(i)}.</p>
                                        <LatexPreview
                                            content={val["question"]}
                                        />
                                    </div>
                                ))}
                            </div>

                            {qFrom.data?.cqsqQuestion.length > 0 && (
                                <h1 className="text-xs font-bold mt-3 text-neutral">
                                    প্রশ্নের উত্তর
                                </h1>
                            )}
                            <div className="mt-1 pl-4">
                                {qFrom.data?.cqsqQuestion.map((val, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2"
                                    >
                                        <p>{BANGLA_INDEX(i)}.</p>
                                        <LatexPreview content={val["answer"]} />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* mcq */}
                    {qFrom.data.question_type === "mcq" && (
                        <div className="mt-3 pl-4">
                            {qFrom.data?.mcqQuestion.map((val, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-2"
                                >
                                    <p>{BANGLA_INDEX(i)}.</p>
                                    <LatexPreview content={val["value"]} />
                                    {val["isRight"] && <Check size={10} />}
                                </div>
                            ))}
                        </div>
                    )}
                    {qFrom.data?.mcqQuestionhard.length > 0 &&
                        qFrom.data.question_label === "hard" && (
                            <h1 className="text-xs font-bold mt-3 text-neutral">
                                নিচের কোনটি সঠিক?
                            </h1>
                        )}
                    {qFrom.data.question_type === "mcq" &&
                        qFrom.data.question_label === "hard" && (
                            <div className="mt-3 pl-4">
                                {qFrom.data?.mcqQuestionhard.map((val, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2"
                                    >
                                        <p>{BANGLA_INDEX(i)}.</p>
                                        <LatexPreview content={val["value"]} />
                                        {val["isRight"] && <Check size={10} />}
                                    </div>
                                ))}
                            </div>
                        )}

                    {/* emoty */}
                    {(!qFrom.data.questionTtitle ||
                        qFrom.data?.cqsqQuestion.length < 0 ||
                        qFrom.data?.mcqQuestionhard.length < 0 ||
                        qFrom.data?.mcqQuestion.length < 0) && (
                        <div className="flex flex-col items-center p-10">
                            <BrushCleaning
                                size={20}
                                className="text-gray-400"
                            />
                            <p className="text-sm font-medium text-gray-400 mt-2">
                                কোন লেখা নেই!
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <Header title="নতুন প্রশ্ন তৈরী" />
        </div>
    );
}
