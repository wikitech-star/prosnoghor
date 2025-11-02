import { Link } from "@inertiajs/react";
import BlankLayout from "../../Components/Layouts/BlankLayout";

function Maintenance() {
    return (
        <div className="w-full h-screen flex items-center justify-center overflow-hidden">
            <div className="flex flex-col justify-center items-center">
                <img src="/static/maintenance.svg" className="w-[150px] h-auto mb-5" />
                <h1 className="text-2xl font-semibold text-dark w-full md:w-[430px] text-center text-white">
                    দুঃখিত! আমরা বর্তমানে ওয়েবসাইটের রক্ষণাবেক্ষণ এবং আপডেটের
                    কাজ চলতেছে।
                </h1>
                <p className="text-sm text-neutral mb-4 mt-1 w-full md:w-[380px] text-center">
                    আমাদের ওয়েবসাইটটি আপডেট ও উন্নয়ন কাজের জন্য কিছু সময়ের জন্য
                    বন্ধ রাখা হয়েছে। আমরা খুব শিগগিরই আবার সচল হবো।
                </p>
                <Link href="/" className="btn btn-sm btn-primary">হোম এ ফিরে যান</Link>
            </div>
        </div>
    );
}
Maintenance.layout = (page) => (
    <BlankLayout children={page} title="একাউন্ট ধরন" />
);
export default Maintenance;
