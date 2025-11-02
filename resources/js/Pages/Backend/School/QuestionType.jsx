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
import { Form, router, useForm } from "@inertiajs/react";
import axios from "axios";
import toast from "react-hot-toast";

export default function GroupClass({ data, filters }) {
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
                route("ux.question.type"),
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
    const classForm = useForm({
        id: "",
        name: "",
    });

    const submitClassForm = (e) => {
        e.preventDefault();
        classForm.post(route("ux.question.type.store"), {
            onSuccess: () => {
                setModleOpen(false);
                classForm.reset();
            },
        });
    };

    // get edit data
    const [editDataGetingProcess, setEditDataGetingProcessing] =
        useState(false);
    const getEditData = (id) => {
        setEditDataGetingProcessing(true);
        axios
            .get(route("ux.question.type.show", id))
            .then((res) => {
                if (res.status === 200) {
                    classForm.setData("id", res.data.data.id);
                    classForm.setData("name", res.data.data.name);
                    setModleOpen(true);
                    setEditDataGetingProcessing(false);
                }
            })
            .catch((err) => {
                setEditDataGetingProcessing(false);
                toast.error("প্রশ্নের ধরন তথ্য পাওয়া যায়নি, আবার চেষ্টা করুন!");
            });
    };

    return (
        <div className="bg-white p-6 rounded-box space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4">
                <div>
                    <h4 className="text-lg font-medium">প্রশ্নের ধরন</h4>
                    <p className="text-sm text-gray-500">
                        এখানে আপনি সকল প্রশ্নের ধরন এর তথ্য দেখতে পারবেন।
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
                        নতুন প্রশ্নের ধরন
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
                                <th>ধরন নাম</th>
                                <th>তৈরি করেছেন</th>
                                <th>সর্বশেষ পরিবর্তন</th>
                                <th>কার্যক্রম</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.map((item, index) => (
                                <tr key={item.id}>
                                    <th>{ENGLISH_TO_BANGLA(index + 1)}</th>
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
                                                            "ux.question.type.del",
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
                title={
                    classForm.data.id
                        ? "প্রশ্নের ধরন আপডেট"
                        : "নতুন প্রশ্নের ধরন"
                }
                setModel={setModleOpen}
            >
                <form onSubmit={submitClassForm}>
                    <div className="space-y-4">
                        <Input
                            label="প্রশ্নের ধরন নাম*"
                            name="name"
                            type="text"
                            placeholder="প্রশ্নের ধরন নাম লিখুন"
                            value={classForm.data.name}
                            onChange={(e) =>
                                classForm.setData("name", e.target.value)
                            }
                            error={classForm.errors.name}
                        />

                        <button
                            type="submit"
                            disabled={classForm.processing}
                            className="btn btn-sm btn-primary w-full"
                        >
                            {classForm.data.id ? "আপডেট" : "সংরক্ষণ"} করুন
                        </button>
                    </div>
                </form>
            </Model>

            <Header title="প্রশ্নের ধরন" />
        </div>
    );
}
