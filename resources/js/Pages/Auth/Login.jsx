import React from "react";
import BlankLayout from "../../Components/Layouts/BlankLayout";
import Input from "../../Components/Parts/Input";
import { Form, Link } from "@inertiajs/react";

function Login({ google_auth_status }) {
    return (
        <div className="bg-white rounded-box p-8 md:w-full lg:w-md shadow">
            <h1 className="text-center text-xl text-neutral font-bold">
                আপনাকে স্বাগতম
            </h1>
            <p className="text-center text-neutral">
                আপনার তথ্য দিয়ে একাউন্ট লগইন করুন।
            </p>

            {google_auth_status?.status == "active" &&
                google_auth_status?.client_id &&
                google_auth_status?.client_secrate && (
                    <a
                        href={route("google.redirect")}
                        className="btn bg-white text-black border-[#e5e5e5] w-full mt-5"
                    >
                        <img
                            src="/static/google_logo.svg"
                            alt="Google logo"
                            className="inline-block mr-2"
                        />
                        গুগল দিয়ে লগইন করুন
                    </a>
                )}

            <Form
                method="post"
                action={route("login.post")}
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

                        <div className="relative">
                            <Input
                                label="পাসওয়ার্ড*"
                                type="password"
                                name="password"
                                placeholder="******"
                                error={errors.password}
                            />
                            <Link
                                href={route("forgate")}
                                className="absolute bottom- right-0 text-sm text-gray-500 hover:text-neutral duration-300 hover:underline"
                            >
                                পাসওয়ার্ড ভুলে গেছেন?
                            </Link>
                        </div>

                        <label className="label text-sm text-neutral gap-3 mt-3">
                            <input
                                type="checkbox"
                                name="remeber"
                                className="checkbox"
                            />
                            আমাকে লগইন অবস্থায় রাখুন
                        </label>

                        <button
                            disabled={processing}
                            type="submit"
                            className="btn btn-primary btn-sm"
                        >
                            লগইন করুন
                        </button>

                        <Link
                            href={route("singup")}
                            className="link link-hover text-center mt-3"
                        >
                            নতুন একাউন্ট তৈরি করুন।
                        </Link>
                    </>
                )}
            </Form>
        </div>
    );
}

Login.layout = (page) => <BlankLayout children={page} title="লগিন একাউন্ট" />;
export default Login;
