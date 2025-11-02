import React from "react";
import GuestLayout from "../../Components/Layouts/GuestLayout";
import { ArrowRight, Book, Database } from "lucide-react";
import { Link } from "@inertiajs/react";

function Home() {
    return (
        <div>
            {/* banner */}
            <section className="bg-gradient-to-t from-transparent to-primary text-white p-10">
                <div className="container py-[80px]">
                    <p className="text-center text-base font-normal mt-4 text-white w-full mx-auto max-w-fit bg-neutral px-4 py-1">
                        স্কুল পরীক্ষার সেরা প্রশ্নব্যাংক
                    </p>
                    <h1 className="text-center text-3xl lg:text-6xl font-black text-neutral w-full mx-auto lg:w-[650px] mt-8">
                        প্রতিটি ক্লাস ও প্রতিটি বিষয়ের জন্য সাজানো প্রশ্ন ও
                        সমাধান।
                    </h1>
                    <p className="text-center text-base font-normal mt-4 text-neutral w-full mx-auto lg:w-[600px]">
                        আমাদের ওয়েবসাইটে পাবেন ক্লাসভিত্তিক অধ্যায়ভিত্তিক
                        প্রশ্নপত্র, মডেল টেস্ট ও সঠিক সমাধান। সহজ ভাষায় তৈরি,
                        যাতে যেকোনো ছাত্রছাত্রী ঘরে বসেই পরীক্ষার প্রস্তুতি নিতে
                        পারে। এখন থেকে পড়াশোনা হোক আরও সহজ ও কার্যকরী।
                    </p>

                    <div className="flex-center gap-4 mt-10">
                        <Link
                            href={route("login")}
                            className="btn btn-sm btn-dark group"
                        >
                            <ArrowRight
                                size={13}
                                className="duration-300 group-hover:mr-2"
                            />
                            প্রশ্ন তৈরি করুন
                        </Link>
                        <Link className="btn btn-sm btn-secondary group">
                            <Book
                                size={13}
                                className="duration-300 group-hover:mr-2"
                            />
                            লেকচার শিট
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
Home.layout = (page) => <GuestLayout children={page} title="হোম পেজ" />;

export default Home;
