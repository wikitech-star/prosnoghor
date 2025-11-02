import "./bootstrap";
import "../css/app.css";
import "react-quill-new/dist/quill.bubble.css";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import AuthLayout from "./Components/Layouts/AuthLayout";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        let page = pages[`./Pages/${name}.jsx`];
        page.default.layout =
            page.default.layout || ((page) => <AuthLayout children={page} />);
        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    progress: {
        color: "#E5AD41",
    },
});
