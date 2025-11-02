import React from "react";
import BlankLayout from "../../Components/Layouts/BlankLayout";
import Input from "../../Components/Parts/Input";
import { Form, Link } from "@inertiajs/react";

function ResetPassword({ token, email }) {
    return (
        <div className="bg-white rounded-box p-8 md:w-full lg:w-md shadow">
            <h1 className="text-center text-xl text-neutral font-bold">
                পাসওয়ার্ড সংশোধন করুন
            </h1>
            <p className="text-center text-neutral">
                আপনার নতুন পাসওয়ার্ড দিয়ে একাউন্ট সংশোধন করুন।
            </p>

            <Form
                method="post"
                action={route("resetpassword.post")}
                className="mt-5 space-y-4 flex flex-col"
            >
                {({ errors, processing }) => (
                    <>
                        <input type="hidden" name="token" value={token} />
                        <input type="hidden" name="email" value={email} />
                        <Input
                            label="পাসওয়ার্ড*"
                            name="password"
                            type="password"
                            placeholder="******"
                            error={errors.password}
                        />
                        <Input
                            label="কনফার্ম পাসওয়ার্ড*"
                            name="password_confirmation"
                            type="password"
                            placeholder="******"
                            error={errors.password_confirmation}
                        />

                        <button
                            disabled={processing}
                            type="submit"
                            className="btn btn-primary btn-sm"
                        >
                            পাসওয়ার্ড পরিবর্তন করুন
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

ResetPassword.layout = (page) => (
    <BlankLayout children={page} title="পাসওয়ার্ড পরিবর্তন করুন" />
);
export default ResetPassword;
