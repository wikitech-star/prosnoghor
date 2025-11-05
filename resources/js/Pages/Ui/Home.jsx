import React from "react";
import GuestLayout from "../../Components/Layouts/GuestLayout";
import {
    ArrowRight,
    Award,
    Book,
    Database,
    FileBadge,
    FileQuestion,
    FileQuestionMark,
    GraduationCap,
    School,
    ShoppingBag,
} from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import { ENGLISH_TO_BANGLA } from "../../Utils/Helper";

function Home({ seed }) {
    const { appName } = usePage().props;
    return (
        <div className="bg-white">
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
                        <Link
                            href={route("ui.seet.index")}
                            className="btn btn-sm btn-secondary group"
                        >
                            <Book
                                size={13}
                                className="duration-300 group-hover:mr-2"
                            />
                            লেকচার শিট
                        </Link>
                    </div>
                </div>
            </section>

            {/* why choice us */}
            <section className="container flex items-center justify-center py-20 border-t border-neutral/30 border-dashed">
                <div className="flex flex-col justify-center">
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-3xl font-bold text-neutral text-center">
                            {appName} কেন বেছে নেবেন?
                        </h1>
                        <p className="text-base text-center font-medium text-neutral w-full md:w-[500px] mt-2">
                            সহজ, নিরাপদ ও নির্ভরযোগ্য — তোমার পেপারলেস পরীক্ষার
                            ওয়েবসাইটকে সামনে নিতে পেপারলেস-ই সেরা সমাধান
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10 w-full md:w-[70%] lg:w-[800px]">
                        <div className="border border-gray-200 bg-white rounded-base p-5 duration-300 hover:scale-[1.02] hover:shadow-lg">
                            <div className="ri-medal-line w-12 h-12 rounded-base flex items-center justify-center text-2xl bg-gray-100 text-primary mb-4">
                                <Award size={20} />
                            </div>
                            <h1 className="text-base font-bold text-dark">
                                সনদপত্র গ্রহণ করুন
                            </h1>
                            <p className="text-gray-600 text-sm mt-1">
                                পরীক্ষা সম্পন্ন করার সাথে সাথে অনলাইনেই পেয়ে
                                যাও তোমার অর্জিত সনদপত্র — সহজ, ঝামেলাহীন ও
                                সম্পূর্ণ পেপারলেস!
                            </p>
                        </div>
                        <div className="border border-gray-200 bg-white rounded-base p-5 duration-300 hover:scale-[1.02] hover:shadow-lg">
                            <div className="ri-user-follow-line w-12 h-12 rounded-base flex items-center justify-center text-2xl bg-gray-100 text-secondary mb-4">
                                <FileBadge size={20} />
                            </div>
                            <h1 className="text-base font-bold text-dark">
                                সদস্যপদ গ্রহণ করুন
                            </h1>
                            <p className="text-gray-600 text-sm mt-1">
                                সদস্য হয়ে বিশেষ সুবিধা উপভোগ করুন — সহজে
                                পরীক্ষায় অংশগ্রহণ, সাথে সাথে সনদপত্র গ্রহণ ও
                                আরও অনেক কিছু!
                            </p>
                        </div>
                        <div className="border border-gray-200 bg-white rounded-base p-5 duration-300 hover:scale-[1.02] hover:shadow-lg">
                            <div className="ri-shield-user-fill w-12 h-12 rounded-base flex items-center justify-center text-2xl bg-gray-100 text-primary mb-4">
                                <GraduationCap size={20} />
                            </div>
                            <h1 className="text-base font-bold text-dark">
                                শিক্ষক হোন
                            </h1>
                            <p className="text-gray-600 text-sm mt-1">
                                আপনার জ্ঞান দিয়ে নতুন প্রজন্মকে গড়ে তুলুন —
                                সহজ পদ্ধতিতে শিক্ষক হিসেবে যোগদান করে শুরু করুন।
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* dmeo */}
            <section className="container flex items-center justify-center pt-10 pb-20">
                <div className="flex flex-col justify-center w-full lg:w-[85%] mx-auto">
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-3xl font-bold text-neutral text-center">
                            ১ ক্লিকে প্রশ্ন তৈরী!
                        </h1>
                        <p className="text-base text-center font-medium text-neutral w-full md:w-[500px] mt-2">
                            শুধু প্রশ্ন সিলেক্ট করুন, প্রশ্নপত্র তৈরী হবে
                            অটোমেটিক !
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 w-full">
                        <div className="border w-ful border-gray-200 p-8">
                            <div>
                                <h1 className="text-dark font-bold">
                                    প্রশ্ন সিলেক্ট করুন
                                </h1>
                                <p className="text-sm text-gray-600">
                                    প্রশ্নগুলো সিলেক্ট করে সাবমিট করলেই প্রশ্ন
                                    তৈরী হয়ে যাবে !
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 mt-5">
                                <div
                                    wire:click="addquestion(0)"
                                    className="border border-gray-200 p-4 rounded-base duration-300
    border-l-5 border-r-5 border-l-secondary border-r-secondary
    hover:scale-[1.02] hover:shadow-lg hover:border-l-3 hover:border-r-3 hover:border-l-secondary hover:border-r-secondary"
                                >
                                    <p className="text-base text-dark">
                                        <span>১ .</span>
                                        <span>বাংলাদেশের রাজধানী কোনটি?</span>
                                    </p>
                                    <div className="grid grid-cols-2 gap-2 mt-2 pl-4">
                                        <p className="text-base text-dark">
                                            ক. চট্টগ্রাম
                                        </p>
                                        <p className="text-base text-dark">
                                            খ. ঢাকা
                                        </p>
                                        <p className="text-base text-dark">
                                            গ. খুলনা
                                        </p>
                                        <p className="text-base text-dark">
                                            ঘ. রাজশাহী
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="border border-gray-200 p-4 rounded-base duration-300
    border-l-5 border-r-5 border-l-secondary border-r-secondary
    hover:scale-[1.02] hover:shadow-lg hover:border-l-3 hover:border-r-3 hover:border-l-secondary hover:border-r-secondary"
                                >
                                    <p className="text-base text-dark">
                                        <span>২ .</span>
                                        <span>পদ্মা নদীর উৎপত্তি কোথায়?</span>
                                    </p>
                                    <div className="grid grid-cols-2 gap-2 mt-2 pl-4">
                                        <p className="text-base text-dark">
                                            ক. ভারত
                                        </p>
                                        <p className="text-base text-dark">
                                            খ. নেপাল
                                        </p>
                                        <p className="text-base text-dark">
                                            গ. মিয়ানমার
                                        </p>
                                        <p className="text-base text-dark">
                                            ঘ. ভুটান
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="border border-gray-200 p-4 rounded-base duration-300
    border-l-5 border-r-5 border-l-secondary border-r-secondary
    hover:scale-[1.02] hover:shadow-lg hover:border-l-3 hover:border-r-3 hover:border-l-secondary hover:border-r-secondary"
                                >
                                    <p className="text-base text-dark">
                                        <span>৩ .</span>
                                        <span>বাংলাদেশের জাতীয় ফুল কোনটি?</span>
                                    </p>
                                    <div className="grid grid-cols-2 gap-2 mt-2 pl-4">
                                        <p className="text-base text-dark">
                                            ক. রজনীগন্ধা
                                        </p>
                                        <p className="text-base text-dark">
                                            খ. শাপলা
                                        </p>
                                        <p className="text-base text-dark">
                                            গ. গোলাপ
                                        </p>
                                        <p className="text-base text-dark">
                                            ঘ. টিউলিপ
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="border border-gray-200 p-4 rounded-base duration-300
    border-l-5 border-r-5 border-l-secondary border-r-secondary
    hover:scale-[1.02] hover:shadow-lg hover:border-l-3 hover:border-r-3 hover:border-l-secondary hover:border-r-secondary"
                                >
                                    <p className="text-base text-dark">
                                        <span>৪ .</span>
                                        <span>
                                            বাংলাদেশের জাতীয় সংগীত কে রচনা
                                            করেছেন?
                                        </span>
                                    </p>
                                    <div className="grid grid-cols-2 gap-2 mt-2 pl-4">
                                        <p className="text-base text-dark">
                                            ক. কাজী নজরুল ইসলাম
                                        </p>
                                        <p className="text-base text-dark">
                                            খ. রবীন্দ্রনাথ ঠাকুর
                                        </p>
                                        <p className="text-base text-dark">
                                            গ. জসীমউদ্দীন
                                        </p>
                                        <p className="text-base text-dark">
                                            ঘ. আল মাহমুদ
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="border border-gray-200 p-4 rounded-box duration-300
    border-l-5 border-r-5
    hover:scale-[1.02] hover:shadow-lg hover:border-l-3 hover:border-r-3 hover:border-l-secondary hover:border-r-secondary"
                                >
                                    <p className="text-base text-dark">
                                        <span>৫ .</span>
                                        <span>
                                            বাংলাদেশের স্বাধীনতা দিবস কবে পালিত
                                            হয়?
                                        </span>
                                    </p>
                                    <div className="grid grid-cols-2 gap-2 mt-2 pl-4">
                                        <p className="text-base text-dark">
                                            ক. ১৬ ডিসেম্বর
                                        </p>
                                        <p className="text-base text-dark">
                                            খ. ২৬ মার্চ
                                        </p>
                                        <p className="text-base text-dark">
                                            গ. ২১ ফেব্রুয়ারি
                                        </p>
                                        <p className="text-base text-dark">
                                            ঘ. ১৫ আগস্ট
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-100 p-3 rounded-box">
                            <div className="bg-white rounded-box p-8 h-full">
                                <div className="flex flex-col items-center justify-center py-5 px-3">
                                    <h1 className="text-center text-xl font-bold text-neutral">
                                        স্বাধীন বাংলা একাডেমি
                                    </h1>
                                    <h2 className="text-center text-base font-normal text-neutral">
                                        শ্রেনীঃ ৭ম
                                    </h2>
                                    <h1 className="text-center text-base font-normal text-neutral">
                                        বিষয়ঃ সাধারন জ্ঞান
                                    </h1>
                                </div>
                                <div className="flex items-center justify-between text-sm border-b border-gray-200 pb-2 mt-3">
                                    <p>সময়ঃ ১ মিনিট</p>
                                    <p>পূর্ণমানঃ ১ </p>
                                </div>
                                <div className="group mt-4">
                                    <p className="text-base text-dark">
                                        <span>১ .</span>
                                        <span>বাংলাদেশের রাজধানী কোনটি?</span>
                                    </p>
                                    <div className="grid grid-cols-2 gap-2 mt-2 pl-4">
                                        <p className="text-base text-dark">
                                            ক. চট্টগ্রাম
                                        </p>
                                        <p className="text-base text-dark">
                                            খ. ঢাকা
                                        </p>
                                        <p className="text-base text-dark">
                                            গ. খুলনা
                                        </p>
                                        <p className="text-base text-dark">
                                            ঘ. রাজশাহী
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* statics */}
            <section className="py-15 border-t border-b border-gray-100 bg-gray-50/80">
                <div className="safearea">
                    <div className="w-full mx-auto md:w-[70%] lg:w-[800px]">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mg:gap-10">
                            <div className="flex items-center gap-x-4 bg-white p-4 rounded-base duration-300 hover:scale-[1.02] hover:shadow-lg border border-gray-100">
                                <div className="ri-question-fill min-w-10 min-h-10 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                                    <School size={16} />
                                </div>
                                <p className="text-sm text-gray-500 font-semibold">
                                    ১০,০০০+ টিরও বেশি শিক্ষা প্রতিষ্ঠান যুক্ত
                                </p>
                            </div>
                            <div className="flex items-center gap-x-4 bg-white p-4 rounded-base duration-300 hover:scale-[1.02] hover:shadow-lg border border-gray-100">
                                <div className="ri-user-smile-fill min-w-10 min-h-10 bg-secondary/10 rounded-full flex items-center justify-center text-primary">
                                    <FileQuestion size={16} />
                                </div>
                                <p className="text-sm text-gray-500 font-semibold">
                                    ১০,০০০+ এরও প্রশ্ন তৈরী করছে প্রতিদিন
                                </p>
                            </div>
                            <div className="flex items-center gap-x-4 bg-white p-4 rounded-base duration-300 hover:scale-[1.02] hover:shadow-lg border border-gray-100">
                                <div className="ri-chat-smile-2-fill min-w-10 min-h-10 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                                    <FileQuestionMark size={16} />
                                </div>
                                <p className="text-sm text-gray-500 font-semibold">
                                    ১,০০০,০০০ + মোট প্রশ্ন তৈরী করা হয়েছে
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* seed */}
            {seed.data.length > 0 && (
                <section className="bg-white">
                    <div className="container flex items-center justify-center py-20">
                        <div className="flex flex-col justify-center">
                            <div className="flex flex-col justify-center items-center">
                                <h1 className="text-3xl font-bold text-neutral text-center">
                                    রেডি প্রশ্ন ও সুপার সাজেশন!
                                </h1>
                                <p className="text-base text-center font-medium text-neutral w-full md:w-[500px] mt-2">
                                    এক্সাম-রেডি প্রশ্ন ও সুপার সাজেশনে, পরীক্ষা
                                    হবে নিশ্চিন্তে!
                                </p>
                            </div>

                            {/* seed */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
                                {seed.data.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-white shadow-[0_0_100px_rgba(0,0,0,0.05)] border border-gray-200"
                                    >
                                        <div className="bg-white flex items-center justify-center h-[220px] overflow-hidden p-4">
                                            <img
                                                src={
                                                    item.thumbnail
                                                        ? "/uploads/" +
                                                          item.thumbnail
                                                        : "/static/pdf.png"
                                                }
                                                className="w-auto object-cover h-full"
                                            />
                                        </div>
                                        <div className="p-4 flex flex-col items-center justify-center border-t border-dashed border-gray-200 text-center">
                                            <div>
                                                <Link
                                                    href={route(
                                                        "ui.seet.view",
                                                        {
                                                            slug: item?.slug,
                                                        }
                                                    )}
                                                >
                                                    <h1 className="text-base font-bold duration-300 hover:underline hover:text-primary text-center max-w-[80%] mx-auto">
                                                        {item?.title}
                                                    </h1>
                                                </Link>
                                                <h1 className="flex items-end gap-1 text-2xl font-black text-neutral justify-center my-2">
                                                    <p>
                                                        ৳
                                                        {ENGLISH_TO_BANGLA(
                                                            item?.selling_price
                                                        )}
                                                    </p>
                                                    {item?.price && (
                                                        <p className="text-sm font-bold text-gray-700">
                                                            ৳
                                                            {ENGLISH_TO_BANGLA(
                                                                item?.price
                                                            )}
                                                        </p>
                                                    )}
                                                </h1>
                                            </div>
                                            <Link
                                                href={route("ui.seet.view", {
                                                    slug: item?.slug,
                                                })}
                                                className="btn btn-primary btn-sm w-full"
                                            >
                                                <ShoppingBag size={14} /> ক্রয়
                                                করুন
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
Home.layout = (page) => <GuestLayout children={page} title="হোম পেজ" />;

export default Home;
