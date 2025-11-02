import React, { useEffect, useRef, useState } from "react";
import {
    ENGLISH_DATE_TO_BANGLA,
    ENGLISH_TO_BANGLA,
} from "../../../Utils/Helper";
import Header from "../../../Components/Parts/Header";
import { Frown, Pen, Plus, Trash } from "lucide-react";
import Model from "../../../Components/Parts/Model";
import Input from "../../../Components/Parts/Input";
import Paginations from "../../../Components/Parts/Paginations";
import Select from "../../../Components/Parts/Select";
import { Form, router, useForm } from "@inertiajs/react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Subject({ data, filters, class_data }) {
    const [modelOpen, setModleOpen] = useState(false);

    // search
    const [search, setSearch] = useState(filters.search ?? "");
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return; // প্রথমবারে কিছু করবে না
        }

        const delayDebounceFn = setTimeout(() => {
            router.get(
                route("ux.subjects"),
                { search: search },
                {
                    preserveState: true,
                    replace: true,
                }
            );
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    // from
    const subjectform = useForm({
        id: "",
        name: "",
        class_id: "",
        subject_code: "",
    });

    const submitSubjectForm = (e) => {
        e.preventDefault();
        subjectform.post(route("ux.subjects.store"), {
            onSuccess: () => {
                setModleOpen(false);
                subjectform.reset();
            },
        });
    };

    // get edit data
    const [editDataGetingProcess, setEditDataGetingProcessing] =
        useState(false);
    const getEditData = (id) => {
        setEditDataGetingProcessing(true);
        axios
            .get(route("ux.subjects.show", id))
            .then((res) => {
                if (res.status === 200) {
                    subjectform.setData("id", res.data.data.id);
                    subjectform.setData("name", res.data.data.name);
                    subjectform.setData("class_id", res.data.data.class_id);
                    subjectform.setData("subject_code", res.data.data.code);
                    setModleOpen(true);
                    setEditDataGetingProcessing(false);
                }
            })
            .catch((err) => {
                setEditDataGetingProcessing(false);
                toast.error("বিষয়ের তথ্য পাওয়া যায়নি, আবার চেষ্টা করুন!");
            });
    };

    return (
        <div className="bg-white p-6 rounded-box space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4">
                <div>
                    <h4 className="text-lg font-medium">সকল বিষয়</h4>
                    <p className="text-sm text-gray-500">
                        এখানে আপনি সকল বিষয় এর তথ্য দেখতে পারবেন।
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
                    <button
                        onClick={() => setModleOpen(true)}
                        className="btn btn-primary btn-sm"
                    >
                        <Plus size={13} />
                        নতুন বিষয়
                    </button>
                </div>
            </div>

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
                                <th>শ্রেনী</th>
                                <th>বিষয়</th>
                                <th>বিষয় কোড</th>
                                <th>তৈরি করেছেন</th>
                                <th>সর্বশেষ পরিবর্তন</th>
                                <th>কার্যক্রম</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.map((item, index) => (
                                <tr key={item.id}>
                                    <th>{ENGLISH_TO_BANGLA(index + 1)}</th>
                                    <td>{item.class}</td>
                                    <td>{item.name}</td>
                                    <td>{item.code}</td>
                                    <td>
                                        {ENGLISH_DATE_TO_BANGLA(
                                            item.created_at
                                        )}
                                    </td>
                                    <td>
                                        {ENGLISH_DATE_TO_BANGLA(
                                            item.updated_at
                                        )}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <button
                                                disabled={editDataGetingProcess}
                                                title="সম্পাদন করুন"
                                                onClick={() =>
                                                    getEditData(item.id)
                                                }
                                                className="btn btn-xs btn-info btn-circle"
                                            >
                                                <Pen size={12} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    confirm(
                                                        "আপনি কি নিশ্চিত বিষয়টি মুছে ফেলতে চান?"
                                                    ) &&
                                                    router.get(
                                                        route(
                                                            "ux.subjects.del",
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

            {/* add or update model */}
            <Model
                model={modelOpen}
                title={subjectform.data.id ? "বিষয় আপডেট" : "নতুন বিষয়"}
                setModel={setModleOpen}
            >
                <form onSubmit={submitSubjectForm}>
                    <div className="space-y-4">
                        <Select
                            label="শ্রেণী*"
                            name="class_name"
                            options={class_data}
                            value={subjectform.data.class_id}
                            onChange={(e) =>
                                subjectform.setData("class_id", e.target.value)
                            }
                            error={subjectform.errors.class_id}
                        />

                        <Input
                            label="বিষয়ের নাম*"
                            name="class_name"
                            type="text"
                            placeholder="বিষয়ের নাম লিখুন"
                            value={subjectform.data.name}
                            onChange={(e) =>
                                subjectform.setData("name", e.target.value)
                            }
                            error={subjectform.errors.name}
                        />

                        <Input
                            label="বিষয়ের কোড"
                            name="subject_code"
                            type="number"
                            placeholder="বিষয়ের কোড লিখুন"
                            value={subjectform.data.subject_code}
                            onChange={(e) =>
                                subjectform.setData(
                                    "subject_code",
                                    e.target.value
                                )
                            }
                            error={subjectform.errors.subject_code}
                        />

                        <button
                            type="submit"
                            disabled={subjectform.processing}
                            className="btn btn-sm btn-primary w-full"
                        >
                            {subjectform.data.id ? "আপডেট" : "সংরক্ষণ"} করুন
                        </button>
                    </div>
                </form>
            </Model>

            <Header title="সকল বিষয়" />
        </div>
    );
}
