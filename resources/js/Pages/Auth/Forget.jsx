import React from "react";
import BlankLayout from "../../Components/Layouts/BlankLayout";
import Input from "../../Components/Parts/Input";
import { Form, Link } from "@inertiajs/react";

function Forget() {
    return (
        <div className="bg-white rounded-box p-8 md:w-full lg:w-md shadow">
            <h1 className="text-center text-xl text-neutral font-bold">
                পাসওয়ার্ড সংশোধন করুন
            </h1>
            <p className="text-center text-neutral">
                আপনার ইমেইল ঠিকানা লিখুন, আমরা আপনার পাসওয়ার্ড রিসেট করার জন্য একটি লিঙ্ক পাঠাবো।
            </p>

            <Form
                method="post"
                action={route("forgate.post")}
                className="mt-5 space-y-4 flex flex-col"
            >
                {({ errors, processing }) => (
                    <>
                        <Input
                            label="ইমেইল*"
                            name="email"
                            type="emial"
                            placeholder="ইমেইল"
                            error={errors.email}
                        />

                        <button
                            disabled={processing}
                            type="submit"
                            className="btn btn-primary btn-sm"
                        >
                            পাসওয়ার্ড রিসেট লিঙ্ক পাঠান
                        </button>

                        <Link
                            href={route("login")}
                            className="link link-hover text-center mt-3"
                        >
                            পাসওয়ার্ড মনে পড়ে গেছে? লগইন করুন
                        </Link>
                    </>
                )}
            </Form>
        </div>
    );
}

Forget.layout = (page) => <BlankLayout children={page} title="পাসওয়ার্ড সংশোধন করুন" />;
export default Forget;
