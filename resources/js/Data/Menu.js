const SITE_MENU = [
    {
        name: "হোম পেজ",
        url: route("home"),
        active: ["home"],
    },
    {
        name: "মুল্য তালিকা",
        url: route("price.list"),
        active: ["price.list"],
    },
    {
        name: "লেকচার শিট",
        url: route("ui.seet.index"),
        active: ["ui.seet.index"],
    },
    {
        name: "যোগাযোগ",
        url: route("ui.contact.index"),
        active: ["ui.contact.index"],
    },
];
export { SITE_MENU };
