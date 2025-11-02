import { Link, router } from "@inertiajs/react";
import {
    Check,
    Eye,
    Frown,
    Funnel,
    MoveRight,
    Pen,
    Plus,
    Trash,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Header from "../../../Components/Parts/Header";
import Paginations from "../../../Components/Parts/Paginations";
import {
    BANGLA_INDEX,
    ENGLISH_DATE_TO_BANGLA,
    ENGLISH_TO_BANGLA,
} from "../../../Utils/Helper";
import LatexPreview from "../../../Components/Parts/LatexPreview";
import Model from "../../../Components/Parts/Model";
import Start from "../../../Components/Parts/Start";

export default function Index({
    data,
    query,
    class: allCLass,
    subject,
    lassion,
    topic,
}) {
    const [filterOpen, setFilterOpen] = useState(false);
    // search
    const [search, setSearch] = useState(query?.search || "");
    const [searchType, setSearchType] = useState(query?.type || "");
    const [searchSubType, setSearchSubType] = useState(query?.stype || "");
    const [groupClass, setGroupClass] = useState(query?.cid || "");
    const [subClass, setSubClass] = useState(query?.sid || "");
    const [lesClass, setLesClass] = useState(query?.lid || "");
    const [TidClass, setTidClass] = useState(query?.tid || "");
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return; // প্রথমবারে কিছু করবে না
        }

        const delayDebounceFn = setTimeout(() => {
            router.get(
                route("ux.question.all"),
                {
                    search: search,
                    type: searchType,
                    stype: searchSubType,
                    cid: groupClass,
                    sid: subClass,
                    lid: lesClass,
                    tid: TidClass,
                },
                {
                    preserveState: true,
                    replace: true,
                }
            );
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [
        search,
        searchType,
        searchSubType,
        groupClass,
        subClass,
        lesClass,
        TidClass,
    ]);

    // preview
    const [previewModel, setPreviewModel] = useState(false);
    const [viewData, setViewData] = useState(null);
    const closePreviwModel = () => {
        setViewData(null);
        setPreviewModel(false);
    };

    return (
        <div className="bg-white p-6 rounded-box space-y-6">
            {/* header */}
            <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4">
                <div>
                    <h4 className="text-lg font-medium">সকল প্রশ্ন</h4>
                    <p className="text-sm text-gray-500">
                        এখানে আপনি সকল প্রশ্ন এর তথ্য দেখতে পারবেন।
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <input
                        type="search"
                        className="input input-sm"
                        placeholder="সার্স..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Link
                        href={route("ux.question.add")}
                        className="btn btn-primary btn-sm"
                    >
                        <Plus size={13} />
                        নতুন প্রশ্ন তৈরি
                    </Link>
                    <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="btn btn-sm btn-primary"
                    >
                        <Funnel size={14} />
                    </button>
                </div>
            </div>

            {/* filter */}
            <div
                className={`collapse m-0 ${
                    filterOpen ? "collapse-open" : "collapse-close"
                }`}
            >
                <div className="collapse-content text-sm">
                    <div className="flex flex-wrap lg:flex-nowrap items-center gap-3">
                        <select
                            className="select select-sm"
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                        >
                            <option value="" selected disabled>
                                --প্রশ্নের ধরন--
                            </option>
                            <option value="">সকল</option>
                            <option value="mcq">MCQ</option>
                            <option value="cq">CQ</option>
                            <option value="sq">SQ</option>
                        </select>
                        {searchType == "mcq" && (
                            <select
                                className="select select-sm"
                                value={searchSubType}
                                onChange={(e) =>
                                    setSearchSubType(e.target.value)
                                }
                            >
                                <option value="" selected disabled>
                                    --MCQ ধরন--
                                </option>
                                <option value="">সকল</option>
                                <option value="normal">সাধারন</option>
                                <option value="hard">উচ্চতার দক্ষতা</option>
                            </select>
                        )}
                        <select
                            className="select select-sm"
                            value={groupClass}
                            onChange={(e) => setGroupClass(e.target.value)}
                        >
                            <option value="" selected disabled>
                                --প্রশ্নের শ্রেনী--
                            </option>
                            <option value="">সকল</option>
                            {Object.entries(allCLass).map(([key, value], i) => (
                                <option value={key} key={i}>
                                    {value}
                                </option>
                            ))}
                        </select>
                        <select
                            className="select select-sm"
                            value={subClass}
                            onChange={(e) => setSubClass(e.target.value)}
                        >
                            <option value="" selected disabled>
                                --প্রশ্নের বিষয়--
                            </option>
                            <option value="">সকল</option>
                            {Object.entries(subject).map(([key, value], i) => (
                                <option value={key} key={i}>
                                    {value}
                                </option>
                            ))}
                        </select>
                        <select
                            className="select select-sm"
                            value={lesClass}
                            onChange={(e) => setLesClass(e.target.value)}
                        >
                            <option value="" selected disabled>
                                --প্রশ্নের অধ্যায়--
                            </option>
                            <option value="">সকল</option>
                            {Object.entries(lassion).map(([key, value], i) => (
                                <option value={key} key={i}>
                                    {value}
                                </option>
                            ))}
                        </select>
                        <select
                            className="select select-sm"
                            value={TidClass}
                            onChange={(e) => setTidClass(e.target.value)}
                        >
                            <option value="" selected disabled>
                                --প্রশ্নের টপিক--
                            </option>
                            <option value="">সকল</option>
                            {Object.entries(topic).map(([key, value], i) => (
                                <option value={key} key={i}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* table */}
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                {data.data.length === 0 ? (
                    <div className="p-6 text-center text-base text-gray-500">
                        <Frown size={20} className="mx-auto mb-3" />
                        কোন তথ্য পাওয়া যায়নি!
                    </div>
                ) : (
                    <table className="table">
                        <thead className="bg-primary text-neutral">
                            <tr>
                                <th></th>
                                <th>স্কুল</th>
                                <th>উদ্দিপক</th>
                                <th>তৈরি করেছেন</th>
                                <th>সর্বশেষ পরিবর্তন</th>
                                <th>কার্যক্রম</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.map((item, index) => (
                                <tr key={item.id}>
                                    <th>{ENGLISH_TO_BANGLA(index + 1)}</th>
                                    <td className="w-[160px] lg:max-w-[150px] flex gap-1 items-center flex-wrap">
                                        <span className="text-xs">
                                            {item?.class}
                                        </span>
                                        <span>
                                            <MoveRight size={10} />
                                        </span>
                                        <span className="text-xs">
                                            {item?.subject}
                                        </span>
                                        <span>
                                            <MoveRight size={10} />
                                        </span>
                                        <span className="text-xs">
                                            {item?.lession}
                                        </span>
                                        <span>
                                            <MoveRight size={10} />
                                        </span>
                                        <span className="text-xs">
                                            {item?.topics}
                                        </span>
                                        <span>
                                            <MoveRight size={10} />
                                        </span>
                                        <span className="uppercase text-xs">
                                            {item?.question_type}{" "}
                                            {item?.question_type == "mcq" &&
                                                "/" + item?.mcq_label}
                                        </span>
                                    </td>
                                    <td className="min-w-[250px] lg:max-w-[200px]">
                                        {item?.title || item?.body ? (
                                            <>
                                                <p className="text-gray-500">
                                                    {item?.title}
                                                </p>
                                                <LatexPreview
                                                    content={
                                                        item?.body?.length > 100
                                                            ? item.body.substring(
                                                                  0,
                                                                  100
                                                              ) + "..."
                                                            : item.body
                                                    }
                                                />
                                            </>
                                        ) : (
                                            "--"
                                        )}
                                    </td>
                                    <td>
                                        <>
                                            <p className="font-normal text-neutral">
                                                {item?.created_by?.name}
                                            </p>
                                            <p className="font-normal text-neutral">
                                                {item?.created_by?.email}
                                            </p>
                                            <p className="font-normal text text-neutral">
                                                {ENGLISH_DATE_TO_BANGLA(
                                                    item.created_at
                                                )}
                                            </p>
                                        </>
                                    </td>
                                    <td>
                                        <>
                                            <p className="font-normal text-neutral">
                                                {item?.updated_by?.name}
                                            </p>
                                            <p className="font-normal text-neutral">
                                                {item?.updated_by?.email}
                                            </p>
                                            <p className="font-normal text-neutral">
                                                {ENGLISH_DATE_TO_BANGLA(
                                                    item.updated_at
                                                )}
                                            </p>
                                        </>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => {
                                                    setViewData(item);
                                                    setPreviewModel(true);
                                                }}
                                                className="btn btn-xs btn-primary btn-circle"
                                            >
                                                <Eye size={12} />
                                            </button>
                                            <Link
                                                title="সম্পাদন করুন"
                                                href={route("ux.question.add", {
                                                    editid: item.id,
                                                })}
                                                className="btn btn-xs btn-info btn-circle"
                                            >
                                                <Pen size={12} />
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    confirm(
                                                        `আপনি কি নিশ্চিত ${item?.question_type?.toUpperCase()} প্রশ্নটি মুছে ফেলতেচান?`
                                                    ) &&
                                                    router.get(
                                                        route(
                                                            "ux.question.del",
                                                            { id: item.id }
                                                        )
                                                    )
                                                }
                                                className="btn btn-xs btn-error btn-circle"
                                            >
                                                <Trash size={12} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* pagination */}
            <Paginations data={data} />

            {/* preview model */}
            <Model
                model={previewModel}
                title={
                    viewData
                        ? `${viewData?.question_type.toUpperCase()} প্রশ্নের প্রিভিউ`
                        : "প্রশ্ন প্রিভিউ"
                }
                callback={closePreviwModel}
                modelClassName="min-w-[600px]"
            >
                {viewData && (
                    <>
                        {(() => {
                            const metaData = JSON.parse(viewData?.meta) || [];
                            return (
                                <div className="flex items-center gap-1 justify-end">
                                    <Start
                                        start={Number(metaData?.start) || 0}
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

                        {viewData?.question_type !== "sq" && (
                            <>
                                <h1 className="text-sm text-gray-500 font-bold mb-1">
                                    উদ্দিপকঃ
                                </h1>
                                <LatexPreview
                                    content={
                                        viewData.body.substring(0, 200) + "..."
                                    }
                                />
                            </>
                        )}

                        <div className="mt-3">
                            <p className="text-sm text-gray-500 font-bold mb-1">
                                প্রশ্নঃ
                            </p>
                            {viewData?.question_type !== "mcq" && (
                                <>
                                    {viewData?.options?.map((val, i) => (
                                        <div
                                            className="flex items-center gap-2 py-0.5"
                                            key={i}
                                        >
                                            <p>{BANGLA_INDEX(i)}.</p>
                                            <LatexPreview content={val?.text} />
                                            {viewData?.question_type ===
                                                "mcq" && val?.is_correct ? (
                                                <Check size={13} />
                                            ) : null}
                                        </div>
                                    ))}
                                </>
                            )}

                            {/* mcq */}
                            {viewData?.question_type === "mcq" && (
                                <>
                                    {viewData?.options
                                        ?.filter((val) => val.type === "normal")
                                        .map((val, i) => (
                                            <div
                                                className="flex items-center gap-2 py-0.5"
                                                key={i}
                                            >
                                                <p>{BANGLA_INDEX(i)}.</p>
                                                <LatexPreview
                                                    content={val?.text}
                                                />
                                                {viewData?.question_type ===
                                                    "mcq" && val?.is_correct ? (
                                                    <Check size={13} />
                                                ) : null}
                                            </div>
                                        ))}
                                </>
                            )}
                            {/* mcq hard label */}
                            {viewData?.question_type === "mcq" &&
                                viewData?.mcq_label === "উচ্চতার দক্ষতা" && (
                                    <p className="text-gray-500 font-sm text-bold py-2">
                                        নিচের কোনটি সঠিক?
                                    </p>
                                )}
                            {viewData?.question_type === "mcq" &&
                                viewData?.mcq_label === "উচ্চতার দক্ষতা" && (
                                    <>
                                        {viewData?.options
                                            ?.filter(
                                                (val) => val.type === "hard"
                                            )
                                            .map((val, i) => (
                                                <div
                                                    className="flex items-center gap-2 py-0.5"
                                                    key={i}
                                                >
                                                    <p>{BANGLA_INDEX(i)}.</p>
                                                    <LatexPreview
                                                        content={val?.text}
                                                    />
                                                    {val?.is_correct ? (
                                                        <div className="bg-green-100 rounded-full flex items-center justify-center w-4 h-4 text-green-600">
                                                            <Check size={10} />
                                                        </div>
                                                    ) : null}
                                                </div>
                                            ))}
                                    </>
                                )}
                        </div>

                        <div className="mt-5 flex items-center gap-2 justify-end">
                            <Link
                                href={route("ux.question.add", {
                                    editid: viewData.id,
                                })}
                                className="btn btn-xs btn-info"
                            >
                                <Pen size={11} /> সম্পাদন
                            </Link>
                            <button
                                onClick={() =>
                                    confirm(
                                        `আপনি কি নিশ্চিত ${viewData?.question_type?.toUpperCase()} প্রশ্নটি মুছে ফেলতেচান?`
                                    ) &&
                                    router.get(
                                        route("ux.question.del", {
                                            id: viewData.id,
                                        })
                                    )
                                }
                                className="btn btn-xs btn-error"
                            >
                                <Trash size={11} /> মুছেফেলা
                            </button>
                        </div>
                    </>
                )}
            </Model>

            <Header title="সকল প্রশ্ন" />
        </div>
    );
}
