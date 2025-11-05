import React from "react";
import Header from "../../Components/Parts/Header";
import { ENGLISH_TO_BANGLA } from "../../Utils/Helper";
import { DollarSign, FileQuestion, Layers2, Package, Plus, Sheet } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function Dashboard({
    ad,
    totalPaper,
    totalPackage,
    totaSeed,
    totaTrasnactions,
}) {
    return (
        <div className="w-full flex-col flex items-center justify-center">
            {/* slide */}
            {ad.length > 0 && (
                <div className="carousel w-full">
                    {ad.map((val, i) => {
                        const prevIndex = i === 0 ? ad.length - 1 : i - 1; // আগের স্লাইড
                        const nextIndex = i === ad.length - 1 ? 0 : i + 1; // পরের স্লাইড

                        return (
                            <a
                                key={val.id}
                                id={`slide${val.id}`}
                                target="_blank"
                                href={val?.url}
                                className="carousel-item relative w-full bg-white"
                            >
                                <img
                                    src={`/uploads/${val.image}`}
                                    className="w-full object-contain h-[350px]"
                                />

                                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                    <a
                                        href={`#slide${ad[prevIndex].id}`}
                                        className="btn btn-circle btn-primary"
                                    >
                                        ❮
                                    </a>
                                    <a
                                        href={`#slide${ad[nextIndex].id}`}
                                        className="btn btn-circle btn-primary"
                                    >
                                        ❯
                                    </a>
                                </div>
                            </a>
                        );
                    })}
                </div>
            )}

            {/* statics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 mt-10 w-full">
                <div className="bg-indigo-500 w-full p-4 rounded-box flex items-center gap-5">
                    <div className="bg-white/20 rounded-full flex items-center justify-center text-white h-14 w-14">
                        <FileQuestion />
                    </div>
                    <div className="text-white">
                        <p className="text-sm font-bold">মোট প্রশ্ন তৈরী</p>
                        <p className="text-lg font-bold">
                            {ENGLISH_TO_BANGLA(totalPaper)}
                        </p>
                    </div>
                </div>
                <div className="bg-orange-500 w-full p-4 rounded-box flex items-center gap-5">
                    <div className="bg-white/20 rounded-full flex items-center justify-center text-white h-14 w-14">
                        <Package />
                    </div>
                    <div className="text-white">
                        <p className="text-sm font-bold">মোট প্যাকেজ</p>
                        <p className="text-lg font-bold">
                            {ENGLISH_TO_BANGLA(totalPackage)}
                        </p>
                    </div>
                </div>
                <div className="bg-green-500 w-full p-4 rounded-box flex items-center gap-5">
                    <div className="bg-white/20 rounded-full flex items-center justify-center text-white h-14 w-14">
                        <Sheet />
                    </div>
                    <div className="text-white">
                        <p className="text-sm font-bold">ক্রয়কৃত সিট</p>
                        <p className="text-lg font-bold">
                            {ENGLISH_TO_BANGLA(totaSeed)}
                        </p>
                    </div>
                </div>
                <div className="bg-blue-500 w-full p-4 rounded-box flex items-center gap-5">
                    <div className="bg-white/20 rounded-full flex items-center justify-center text-white h-14 w-14">
                        <DollarSign />
                    </div>
                    <div className="text-white">
                        <p className="text-sm font-bold">মোট লেনদেন</p>
                        <p className="text-lg font-bold">
                            {ENGLISH_TO_BANGLA(totaTrasnactions)}
                        </p>
                    </div>
                </div>
            </div>

            {/*  */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="card w-full">
                    <div className="grid grid-cols-2 gap-1">
                        <Link
                            href={route("g.create.new.questions")}
                            className="min-h-[200px] flex flex-col items-center justify-center bg-base-100"
                        >
                            <Plus size={20}/>
                            <span className="text-base font-bold mt-1">১ ক্লিকে প্রশ্ন তৈরী</span>
                        </Link>
                        <Link
                            href={route("ui.seet.index")}
                            className="min-h-[200px] flex flex-col items-center justify-center bg-base-100"
                        >
                            <Layers2 size={20}/>
                            <span className="text-base font-bold mt-1">সকল সিট</span>
                        </Link>
                        <Link
                            href={route("price.list")}
                            className="min-h-[200px] flex flex-col items-center justify-center bg-base-100"
                        >
                            <DollarSign size={20}/>
                            <span className="text-base font-bold mt-1">মূল্য তালিকা</span>
                        </Link>
                        <Link
                            href={route("g.all.questions.papper")}
                            className="min-h-[200px] flex flex-col items-center justify-center bg-base-100"
                        >
                            <FileQuestion size={20}/>
                            <span className="text-base font-bold mt-1">সকল প্রশ্ন পত্র</span>
                        </Link>
                    </div>
                </div>

                <div className="card bg-base-100 w-full border border-dotted border-neutral/80">
                    {/* heade */}
                    <div className="bg-primary/10 px-5 py-8 text-center border-b border-primary">
                        <h1 className="text-neutral text-2xl font-bold mx-auto max-w-xs">
                            সাহায্য প্রয়োজন? আমরা শুধু একটি ক্লিক দূরে!
                        </h1>
                        <p className="text-neutral text-base">
                            যে কোনো প্রশ্ন বা সমস্যার জন্য আমাদের সাথে যোগাযোগ
                            করুন
                        </p>
                    </div>

                    <div className="p-8 text-center space-y-3">
                        <button className="btn bg-gray-100 text-black border-[#e5e5e5] w-sm">
                            <svg
                                width="16px"
                                height="16px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    {" "}
                                    <path
                                        d="M16.5562 12.9062L16.1007 13.359C16.1007 13.359 15.0181 14.4355 12.0631 11.4972C9.10812 8.55901 10.1907 7.48257 10.1907 7.48257L10.4775 7.19738C11.1841 6.49484 11.2507 5.36691 10.6342 4.54348L9.37326 2.85908C8.61028 1.83992 7.13596 1.70529 6.26145 2.57483L4.69185 4.13552C4.25823 4.56668 3.96765 5.12559 4.00289 5.74561C4.09304 7.33182 4.81071 10.7447 8.81536 14.7266C13.0621 18.9492 17.0468 19.117 18.6763 18.9651C19.1917 18.9171 19.6399 18.6546 20.0011 18.2954L21.4217 16.883C22.3806 15.9295 22.1102 14.2949 20.8833 13.628L18.9728 12.5894C18.1672 12.1515 17.1858 12.2801 16.5562 12.9062Z"
                                        fill="#1C274C"
                                    ></path>{" "}
                                </g>
                            </svg>
                            +880187109834
                        </button>

                        <button className="btn bg-[#1A77F2] text-white border-[#005fd8] w-sm">
                            <svg
                                width="16px"
                                height="16px"
                                viewBox="0 0 48 48"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                fill="#000000"
                            >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    {" "}
                                    <title>Messenger-color</title>{" "}
                                    <desc>Created with Sketch.</desc>{" "}
                                    <defs> </defs>{" "}
                                    <g
                                        id="Icons"
                                        stroke="none"
                                        stroke-width="1"
                                        fill="none"
                                        fill-rule="evenodd"
                                    >
                                        {" "}
                                        <g
                                            id="Color-"
                                            transform="translate(-301.000000, -860.000000)"
                                            fill="#ffffff"
                                        >
                                            {" "}
                                            <path
                                                d="M325,860 C311.745143,860 301,869.949185 301,882.222222 C301,889.215556 304.489988,895.453481 309.944099,899.526963 L309.944099,908 L318.115876,903.515111 C320.296745,904.118667 322.607155,904.444444 325,904.444444 C338.254857,904.444444 349,894.495259 349,882.222222 C349,869.949185 338.254857,860 325,860 L325,860 Z M327.385093,889.925926 L321.273292,883.407407 L309.347826,889.925926 L322.465839,876 L328.726708,882.518519 L340.503106,876 L327.385093,889.925926 L327.385093,889.925926 Z"
                                                id="Messenger"
                                            >
                                                {" "}
                                            </path>{" "}
                                        </g>{" "}
                                    </g>{" "}
                                </g>
                            </svg>
                            Open Messenger
                        </button>

                        <button className="btn bg-[#03C755] text-white border-[#00b544] w-sm">
                            <svg
                                width="16px"
                                height="16px"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    {" "}
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M16 31C23.732 31 30 24.732 30 17C30 9.26801 23.732 3 16 3C8.26801 3 2 9.26801 2 17C2 19.5109 2.661 21.8674 3.81847 23.905L2 31L9.31486 29.3038C11.3014 30.3854 13.5789 31 16 31ZM16 28.8462C22.5425 28.8462 27.8462 23.5425 27.8462 17C27.8462 10.4576 22.5425 5.15385 16 5.15385C9.45755 5.15385 4.15385 10.4576 4.15385 17C4.15385 19.5261 4.9445 21.8675 6.29184 23.7902L5.23077 27.7692L9.27993 26.7569C11.1894 28.0746 13.5046 28.8462 16 28.8462Z"
                                        fill="#BFC8D0"
                                    ></path>{" "}
                                    <path
                                        d="M28 16C28 22.6274 22.6274 28 16 28C13.4722 28 11.1269 27.2184 9.19266 25.8837L5.09091 26.9091L6.16576 22.8784C4.80092 20.9307 4 18.5589 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z"
                                        fill="url(#paint0_linear_87_7264)"
                                    ></path>{" "}
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 18.5109 2.661 20.8674 3.81847 22.905L2 30L9.31486 28.3038C11.3014 29.3854 13.5789 30 16 30ZM16 27.8462C22.5425 27.8462 27.8462 22.5425 27.8462 16C27.8462 9.45755 22.5425 4.15385 16 4.15385C9.45755 4.15385 4.15385 9.45755 4.15385 16C4.15385 18.5261 4.9445 20.8675 6.29184 22.7902L5.23077 26.7692L9.27993 25.7569C11.1894 27.0746 13.5046 27.8462 16 27.8462Z"
                                        fill="white"
                                    ></path>{" "}
                                    <path
                                        d="M12.5 9.49989C12.1672 8.83131 11.6565 8.8905 11.1407 8.8905C10.2188 8.8905 8.78125 9.99478 8.78125 12.05C8.78125 13.7343 9.52345 15.578 12.0244 18.3361C14.438 20.9979 17.6094 22.3748 20.2422 22.3279C22.875 22.2811 23.4167 20.0154 23.4167 19.2503C23.4167 18.9112 23.2062 18.742 23.0613 18.696C22.1641 18.2654 20.5093 17.4631 20.1328 17.3124C19.7563 17.1617 19.5597 17.3656 19.4375 17.4765C19.0961 17.8018 18.4193 18.7608 18.1875 18.9765C17.9558 19.1922 17.6103 19.083 17.4665 19.0015C16.9374 18.7892 15.5029 18.1511 14.3595 17.0426C12.9453 15.6718 12.8623 15.2001 12.5959 14.7803C12.3828 14.4444 12.5392 14.2384 12.6172 14.1483C12.9219 13.7968 13.3426 13.254 13.5313 12.9843C13.7199 12.7145 13.5702 12.305 13.4803 12.05C13.0938 10.953 12.7663 10.0347 12.5 9.49989Z"
                                        fill="white"
                                    ></path>{" "}
                                    <defs>
                                        {" "}
                                        <linearGradient
                                            id="paint0_linear_87_7264"
                                            x1="26.5"
                                            y1="7"
                                            x2="4"
                                            y2="28"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            {" "}
                                            <stop stop-color="#5BD066"></stop>{" "}
                                            <stop
                                                offset="1"
                                                stop-color="#27B43E"
                                            ></stop>{" "}
                                        </linearGradient>{" "}
                                    </defs>{" "}
                                </g>
                            </svg>
                            Open WhatsApp
                        </button>

                        <div className="divider">অথবা</div>

                        <button className="btn bg-gray-50 text-neutral border-[#e5e5e5] w-sm">
                            <svg
                                aria-label="Email icon"
                                width="16"
                                height="16"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                    fill="none"
                                    stroke="black"
                                >
                                    <rect
                                        width="20"
                                        height="16"
                                        x="2"
                                        y="4"
                                        rx="2"
                                    ></rect>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                </g>
                            </svg>
                            info@gmail.com
                        </button>
                    </div>
                </div>

                <div className="card bg-base-100 w-full border border-dotted border-neutral/80">
                    {/* heade */}
                    <div className="bg-primary/10 px-5 py-8 text-center border-b border-primary">
                        <h1 className="text-neutral text-2xl font-bold mx-auto max-w-xs">
                            মতামত জানান !
                        </h1>
                        <p className="text-neutral text-base">
                            আপনার চাওয়া, আমাদের দায়িত্ব!
                        </p>
                    </div>

                    <div className="p-8 flex flex-col items-center justify-center h-full">
                        <p className="text-base text-center text-neutral">
                            প্রশ্ন তৈরি, ইভালুয়েটরসহ যেকোনো উন্নতিতে আপনার
                            মতামতই আমাদের সবচেয়ে গুরুত্বপূর্ণ!
                        </p>
                        <Link
                            href={route("ui.contact.index")}
                            className="btn btn-primary btn-sm mt-3"
                        >
                            যোগাযোগ করুন
                        </Link>
                    </div>
                </div>
            </div>

            <Header title="ড্যাসবোর্ড" />
        </div>
    );
}
