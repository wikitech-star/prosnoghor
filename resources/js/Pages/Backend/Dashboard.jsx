import React from "react";
import Header from "../../Components/Parts/Header";
import { ENGLISH_TO_BANGLA } from '../../Utils/Helper'
import { Book, School } from "lucide-react";

export default function Dashboard() {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 w-full">
                <div className="bg-indigo-500 w-full p-4 rounded-box flex items-center gap-5">
                    <div className="bg-white/20 rounded-full flex items-center justify-center text-white h-14 w-14">
                        <School />
                    </div>
                    <div className="text-white">
                        <p className="text-sm font-bold">মোট শ্রেনি</p>
                        <p className="text-lg font-bold">
                            {ENGLISH_TO_BANGLA(100)}
                        </p>
                    </div>
                </div>
                <div className="bg-orange-500 w-full p-4 rounded-box flex items-center gap-5">
                    <div className="bg-white/20 rounded-full flex items-center justify-center text-white h-14 w-14">
                        <Book />
                    </div>
                    <div className="text-white">
                        <p className="text-sm font-bold">মোট বিষয়</p>
                        <p className="text-lg font-bold">
                            {ENGLISH_TO_BANGLA(100)}
                        </p>
                    </div>
                </div>
                <div className="bg-blue-500 w-full p-4 rounded-box flex items-center gap-5">
                    <div className="bg-white/20 rounded-full flex items-center justify-center text-white h-14 w-14">
                        <Book />
                    </div>
                    <div className="text-white">
                        <p className="text-sm font-bold">মোট অধ্যায়</p>
                        <p className="text-lg font-bold">
                            {ENGLISH_TO_BANGLA(100)}
                        </p>
                    </div>
                </div>
                <div className="bg-green-500 w-full p-4 rounded-box flex items-center gap-5">
                    <div className="bg-white/20 rounded-full flex items-center justify-center text-white h-14 w-14">
                        <Book />
                    </div>
                    <div className="text-white">
                        <p className="text-sm font-bold">মোট প্রশ্ন</p>
                        <p className="text-lg font-bold">
                            {ENGLISH_TO_BANGLA(100)}
                        </p>
                    </div>
                </div>
                <div className="bg-indigo-500 w-full p-4 rounded-box flex items-center gap-5">
                    <div className="bg-white/20 rounded-full flex items-center justify-center text-white h-14 w-14">
                        <Book />
                    </div>
                    <div className="text-white">
                        <p className="text-sm font-bold">মোট সিট</p>
                        <p className="text-lg font-bold">
                            {ENGLISH_TO_BANGLA(100)}
                        </p>
                    </div>
                </div>
            </div>

            <Header title="ড্যাসবোর্ড" />
        </div>
    );
}
