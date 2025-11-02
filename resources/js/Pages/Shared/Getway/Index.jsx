import React from "react";
import BlankLayout from "../../../Components/Layouts/BlankLayout";

function Index() {
    return <div>Index</div>;
}

Index.layout = (page) => <BlankLayout children={page} title="পেমেন্ট পেজ" />;
export default Index;
