import React, { useEffect, useState } from "react";
import Header from "../../../Components/Parts/Header";
import Input from "../../../Components/Parts/Input";
import Select from "../../../Components/Parts/Select";
import Model from "../../../Components/Parts/Model";
import { ENGLISH_TO_BANGLA } from "../../../Utils/Helper";
import { Link, router, useForm } from "@inertiajs/react";
import { ArrowRight, Expand, Ribbon } from "lucide-react";

export default function Index({ group_class, subjects, lassion }) {
    // create questionForm
    const qFrom = useForm({
        program_name: "",
        class_id: "",
        subjects: [],
        lassions: [],
        types: "",
    });

    // form submit
    const handleFormSubmit = (e) => {
        e.preventDefault();

        qFrom.post(route("g.create.new.questions.paper"), {
            onSuccess: (res) => {
                qFrom.reset();
            },
            preserveScroll: true,
            preserveState: true,
        });
    };

    // reset preset subject or lession
    useEffect(() => {
        qFrom.reset("lassions", "subjects");
    }, [qFrom.data.class_id]);

    // subject model
    const [subjectModel, setSubjectModel] = useState(false);
    const [lessionModel, setLessionModel] = useState(false);

    return (
        <div className="w-full flex items-center justify-center">
            {/* card */}
            <div className="card bg-base-100 w-[600px] border border-dotted border-neutral/80">
                {/* heade */}
                <div className="bg-primary/10 px-5 py-8 text-center border-b border-primary">
                    <h1 className="text-neutral text-2xl md:text-3xl font-bold">
                        ১ ক্লিকে প্রশ্ন তৈরীর করুন!
                    </h1>
                    <p className="text-neutral text-base">
                        আপনার ক্লাস আরও স্মার্ট হতে পারে!
                    </p>
                    <Link href={route('price.list')} className="btn btn-sm btn-primary mt-4">
                        <Ribbon size={14} /> সাবস্ক্রাইব কিনুন
                    </Link>
                </div>

                {/* body */}
                <div className="card-body space-y-3">
                    <Input
                        label="পরিক্ষার নাম*"
                        type="text"
                        value={qFrom.data.program_name}
                        onChange={(e) =>
                            qFrom.setData("program_name", e.target.value)
                        }
                        error={qFrom.errors.program_name}
                        placeholder="প্রোগ্রাম/পরিক্ষার নাম লিখুন"
                    />
                    <Select
                        label="শ্রেণি*"
                        options={group_class}
                        oldVal={qFrom.data.class_id}
                        error={qFrom.errors.class_id}
                        onChange={(e) =>
                            qFrom.setData("class_id", e.target.value)
                        }
                    />
                    <div>
                        <button
                            className="input cursor-pointer text-left"
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

                    <div>
                        <button
                            onClick={() => setLessionModel(!lessionModel)}
                            disabled={Boolean(qFrom.data.subjects.length <= 0)}
                            className="input text-left cursor-pointer"
                        >
                            <p>
                                অধ্যায়{" "}
                                {qFrom.data.lassions.length > 0 &&
                                    ENGLISH_TO_BANGLA(
                                        qFrom.data.lassions.length
                                    ) +
                                        "+" +
                                        " " +
                                        "এটি অধ্যায়"}
                            </p>
                            <Expand size={14} />
                        </button>
                        {qFrom.errors.lassions && (
                            <p className="text-sm text-error">
                                {qFrom.errors.lassions}
                            </p>
                        )}
                    </div>

                    <Select
                        onChange={(e) => qFrom.setData("types", e.target.value)}
                        oldVal={qFrom.data.types}
                        label="প্রশ্নের ধরণ*"
                        error={qFrom.errors.types}
                        options={{
                            mcq: "বহুনির্বাচনী",
                            cq: "সৃজনশীল",
                            sq: "সাধারণ জ্ঞান",
                            all: "(বহু, সৃজন, জ্ঞান) সব একসাথে",
                        }}
                    />
                    <button
                        onClick={handleFormSubmit}
                        disabled={qFrom.processing}
                        className="btn btn-primary group"
                    >
                        প্রশ্ন তৈরি করুন{" "}
                        <ArrowRight
                            className="duration-300 group-hover:ml-2"
                            size={14}
                        />
                    </button>
                </div>
            </div>

            {/* subject model */}
            <Model
                title="বিষয় সিলেক্ট করুন"
                model={subjectModel}
                setModel={setSubjectModel}
            >
                <div className="flex flex-col space-y-1 max-h-[500px] overflow-y-auto">
                    {subjects ? (
                        subjects
                            .filter(
                                (val) =>
                                    val.class_id === Number(qFrom.data.class_id)
                            )
                            .map((val, i) => (
                                <label
                                    key={i}
                                    htmlFor={i}
                                    className="w-full px-3 py-1.5 border border-gray-200 rounded-box flex items-center gap-3 duration-300 hover:bg-gray-100"
                                >
                                    <input
                                        type="checkbox"
                                        id={i}
                                        value={val.id}
                                        checked={qFrom.data.subjects?.includes(
                                            val.id
                                        )}
                                        onChange={(e) => {
                                            const selectedSubjects =
                                                qFrom.data.subjects || [];

                                            if (e.target.checked) {
                                                qFrom.setData("subjects", [
                                                    ...selectedSubjects,
                                                    val.id,
                                                ]);
                                            } else {
                                                qFrom.setData(
                                                    "subjects",
                                                    selectedSubjects.filter(
                                                        (id) => id !== val.id
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

            {/* lession model */}
            <Model
                title="অধ্যায় সিলেক্ট করুন"
                model={lessionModel}
                setModel={setLessionModel}
            >
                <div className="flex flex-col space-y-1 max-h-[500px] overflow-y-auto">
                    {lassion ? (
                        lassion
                            .filter(
                                (val) =>
                                    val.class_id === Number(qFrom.data.class_id)
                            )
                            .filter((val) =>
                                qFrom.data.subjects?.includes(val.subject_id)
                            )
                            .map((val, i) => (
                                <label
                                    key={i}
                                    htmlFor={`lesson-${val.id}`}
                                    className="w-full px-3 py-1.5 border border-gray-200 rounded-box flex items-center gap-3 duration-300 hover:bg-gray-100"
                                >
                                    <input
                                        type="checkbox"
                                        id={`lesson-${val.id}`}
                                        value={val.id}
                                        checked={qFrom.data.lassions?.includes(
                                            val.id
                                        )}
                                        onChange={(e) => {
                                            const selectedLession =
                                                qFrom.data.lassions || [];

                                            const updatedLessions = e.target
                                                .checked
                                                ? [...selectedLession, val.id]
                                                : selectedLession.filter(
                                                      (id) => id !== val.id
                                                  );

                                            // ✅ merge করে update করা
                                            qFrom.setData({
                                                ...qFrom.data,
                                                lassions: updatedLessions,
                                            });
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
                        onClick={() => setLessionModel(!lessionModel)}
                        className="btn btn-sm btn-primary"
                    >
                        সিলেক্ট করুন
                    </button>
                    <button
                        className="btn btn-sm btn-error"
                        onClick={() => qFrom.reset("lassions")}
                    >
                        রিসেট করুন
                    </button>
                </div>
            </Model>

            <Header title="নতুন প্রশ্ন তৈরি" />
        </div>
    );
}
