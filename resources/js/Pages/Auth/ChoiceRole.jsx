import React, { useState } from "react";
import BlankLayout from "../../Components/Layouts/BlankLayout";
import { UserCog, UserRoundPen } from "lucide-react";
import { Link, router, usePage } from "@inertiajs/react";
import CustomeSelect from "../../Components/Parts/CustomeSelect";
import Input from "../../Components/Parts/Input";
import toast from "react-hot-toast";

function ChoiceRole({ class_data }) {
    const { auth } = usePage().props;

    const [Role, setRole] = useState("");
    const [groupCLassId, setGroupCLassId] = useState("");
    const [newPassword, setNewPassword] = useState("");

    // class options
    const options = Object.entries(class_data).map(([value, label]) => ({
        value,
        label,
    }));

    // update role function
    const updateRole = () => {
        router.post(
            route("role.select.post"),
            {
                role: Role,
                class: groupCLassId,
                password: newPassword,
            },
            {
                onError: (errors) => {
                    console.log(errors);

                    if (errors.groupCLassId) {
                        toast.error(errors.groupCLassId);
                    }
                },
            }
        );
    };
    return (
        <div className="bg-white rounded-box p-8 md:w-full lg:w-md shadow">
            <h1 className="text-center text-xl text-neutral font-bold">
                ধন্যবাদ আপনাকে
            </h1>
            <p className="text-center text-neutral">
                আপনার একাউন্ট এর ধরন নির্বাচন করুন।
            </p>

            <div className="flex-between mt-5 gap-4">
                <button
                    onClick={() => setRole("teacher")}
                    className={`flex items-center gap-3 border border-primary  rounded-box p-4 hover:bg-primary hover:text-neutral text-neutral text-base font-medium duration-300 w-1/2 justify-center ${
                        Role === "teacher"
                            ? "bg-primary ring-2 ring-primary ring-offset-2"
                            : "bg-primary/10"
                    }`}
                >
                    <UserCog size={20} />
                    <span>শিক্ষক</span>
                </button>
                <button
                    onClick={() => setRole("student")}
                    className={`flex items-center gap-3 border border-primary  rounded-box p-4 hover:bg-primary hover:text-neutral text-neutral text-base font-medium duration-300 w-1/2 justify-center ${
                        Role === "student"
                            ? "bg-primary ring-2 ring-primary ring-offset-2"
                            : "bg-primary/10"
                    }`}
                >
                    <UserRoundPen size={20} />
                    <span>ছাত্র/ছত্রী</span>
                </button>
            </div>

            {/* class */}
            {Role === "student" && (
                <fieldset className="fieldset mt-4">
                    <legend className="fieldset-legend">
                        শ্রেনী বাছায় করুন*
                    </legend>
                    <CustomeSelect
                        onChange={(data) => setGroupCLassId(data.value)}
                        options={options}
                    />
                </fieldset>
            )}

            {auth.google_id && (
                <div className="mt-4">
                    <Input
                        label="পাসওয়ার্ড*"
                        type="password"
                        placeholder="পাসওয়ার্ড দিন"
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                    />
                </div>
            )}

            <button
                onClick={updateRole}
                className="btn btn-primary btn-sm mt-4 w-full mb-4"
                disabled={!Role}
            >
                সম্পন্ন করুন
            </button>
            <div className="text-center">
                <Link href={route("logout")} className="link link-hover">
                    লগআউট করুন
                </Link>
            </div>
        </div>
    );
}

ChoiceRole.layout = (page) => (
    <BlankLayout children={page} title="একাউন্ট ধরন" />
);
export default ChoiceRole;
