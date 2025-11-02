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

export default function Lassion({ data, filters, class_data, subject_data }) {
    const [modelOpen, setModleOpen] = useState(false);
    const [subjects, setSubjects] = useState(null);

    // search
    const [search, setSearch] = useState(filters.search ?? "");
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            router.get(
                route("ux.lassion"),
                { search: search },
                {
                    preserveState: true,
                    replace: true,
                }
            );
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    // form
    const lassionForm = useForm({
        id: "",
        lassion_name: "",
        class_id: "",
        subject_id: "",
    });

    const submitLassionForm = (e) => {
        e.preventDefault();
        lassionForm.post(route("ux.lassion.store"), {
            onSuccess: () => {
                setModleOpen(false);
                lassionForm.reset();
            },
        });
    };

    // get edit data
    const [editDataGetingProcess, setEditDataGetingProcessing] =
        useState(false);
    const getEditData = (id) => {
        setEditDataGetingProcessing(true);
        axios
            .get(route("ux.lassion.show", id))
            .then((res) => {
                if (res.status === 200) {
                    lassionForm.setData("id", res.data.data.id);
                    lassionForm.setData("lassion_name", res.data.data.name);
                    lassionForm.setData("class_id", res.data.data.class_id);
                    lassionForm.setData("subject_id", res.data.data.subject_id);
                    setModleOpen(true);
                    setEditDataGetingProcessing(false);
                }
            })
            .catch((err) => {
                setEditDataGetingProcessing(false);
                toast.error("অধায়ের তথ্য পাওয়া যায়নি, আবার চেষ্টা করুন!");
            });
    };

    // set pre data
    useEffect(() => {
        if (lassionForm.data.class_id) {
            const subjectObject = Object.fromEntries(
                subject_data
                    .filter((s) =>
                        lassionForm.data.class_id?.includes(s.class_id)
                    )
                    .map(({ id, name }) => [id, name])
            );
            setSubjects(subjectObject);
        }
    }, [lassionForm.data.class_id]);

    return (
        <div className="bg-white p-6 rounded-box space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4">
                <div>
                    <h4 className="text-lg font-medium">সকল অধ্যায়</h4>
                    <p className="text-sm text-gray-500">
                        এখানে আপনি সকল অধ্যায় এর তথ্য দেখতে পারবেন।
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
                        নতুন অধ্যায়
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
                                <th>বিষয়</th>
                                <th>অধ্যায়</th>
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
                                    <td>{item.subject}</td>
                                    <td>{item.name}</td>
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
                                                        "আপনি কি নিশ্চিত শ্রেনীটি মুছে ফেলতেচান?"
                                                    ) &&
                                                    router.get(
                                                        route(
                                                            "ux.lassion.del",
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
                title={lassionForm.data.id ? "অধ্যায় আপডেট" : "নতুন অধ্যায়"}
                setModel={setModleOpen}
            >
                <form onSubmit={submitLassionForm}>
                    <div className="space-y-4">
                        <Select
                            label="শ্রেণী*"
                            name="class_id"
                            options={class_data}
                            value={lassionForm.data.class_id}
                            onChange={(e) => {
                                lassionForm.setData("class_id", e.target.value);
                            }}
                            error={lassionForm.errors.class_id}
                        />

                        <Select
                            label="বিষয়*"
                            name="subject_data"
                            options={subjects || {}}
                            value={lassionForm.data.subject_id}
                            disabled={!lassionForm.data.class_id}
                            onChange={(e) =>
                                lassionForm.setData(
                                    "subject_id",
                                    e.target.value
                                )
                            }
                            error={lassionForm.errors.subject_id}
                        />

                        <Input
                            label="অধ্যায়ের নাম*"
                            name="lassion_name"
                            type="text"
                            placeholder="অধ্যায়ের নাম লিখুন"
                            value={lassionForm.data.lassion_name}
                            onChange={(e) =>
                                lassionForm.setData(
                                    "lassion_name",
                                    e.target.value
                                )
                            }
                            error={lassionForm.errors.lassion_name}
                        />

                        <button
                            type="submit"
                            disabled={lassionForm.processing}
                            className="btn btn-sm btn-primary w-full"
                        >
                            {lassionForm.data.id ? "আপডেট" : "সংরক্ষণ"} করুন
                        </button>
                    </div>
                </form>
            </Model>

            <Header title="সকল অধ্যায়" />
        </div>
    );
}
