// Utility function to convert English digits to Bangla digits
function ENGLISH_TO_BANGLA(number) {
    if (number === null || number === undefined) return number;
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return number
        .toString()
        .split("")
        .map((digit) =>
            /\d/.test(digit) ? banglaDigits[parseInt(digit, 10)] : digit
        )
        .join("");
}

// english date to bangla date
function ENGLISH_DATE_TO_BANGLA(dateString, fulldate = false) {
    if (!dateString) return "";

    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    const banglaMonthsFull = [
        "জানুয়ারি",
        "ফেব্রুয়ারি",
        "মার্চ",
        "এপ্রিল",
        "মে",
        "জুন",
        "জুলাই",
        "আগস্ট",
        "সেপ্টেম্বর",
        "অক্টোবর",
        "নভেম্বর",
        "ডিসেম্বর",
    ];

    try {
        // Laravel timestamp format handle করা
        const date = new Date(dateString);
        if (isNaN(date)) return "";

        const day = date.getDate();
        const month = banglaMonthsFull[date.getMonth()];
        const year = date.getFullYear();

        // Time চাইলে (fulldate = true)
        let formatted = `${day} ${month} ${year}`;
        if (fulldate) {
            const hours = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");
            formatted += `, ${hours}:${minutes}`;
        }

        // সংখ্যাগুলো বাংলায় রূপান্তর করা
        return formatted
            .split("")
            .map((char) =>
                /\d/.test(char) ? banglaDigits[parseInt(char, 10)] : char
            )
            .join("");
    } catch (e) {
        return "";
    }
}

// make index
function BANGLA_INDEX(index) {
    const banglaLetters = [
        "ক",
        "খ",
        "গ",
        "ঘ",
        "ঙ",
        "চ",
        "ছ",
        "জ",
        "ঝ",
        "ঞ",
        "ট",
        "ঠ",
        "ড",
        "ঢ",
        "ণ",
        "ত",
        "থ",
        "দ",
        "ধ",
        "ন",
        "প",
        "ফ",
        "ব",
        "ভ",
        "ম",
        "য",
        "র",
        "ল",
        "শ",
        "ষ",
        "স",
        "হ",
    ];

    const totalLetters = banglaLetters.length;

    if (index < totalLetters) {
        return banglaLetters[index];
    } else {
        const quotient = Math.floor(index / totalLetters); // 1,2,3...
        const remainder = index % totalLetters;
        return `${quotient}${banglaLetters[remainder]}`;
    }
}

// number to days
const DAYS_TO_BANGLA_DURATION = (days) => {
    if (!days || days < 0) return "অবৈধ দিন সংখ্যা";

    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const remainingDays = days % 30;

    let parts = [];
    if (years > 0) parts.push(`${ENGLISH_TO_BANGLA(years)} বছর`);
    if (months > 0) parts.push(`${ENGLISH_TO_BANGLA(months)} মাস`);
    if (remainingDays > 0)
        parts.push(`${ENGLISH_TO_BANGLA(remainingDays)} দিন`);

    return parts.length > 0 ? parts.join(" ") : "০ দিন";
};

// ago
function BANGLA_TIME_AGO(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // difference in seconds

    const units = [
        { name: "বছর", seconds: 31536000 },
        { name: "মাস", seconds: 2592000 },
        { name: "দিন", seconds: 86400 },
        { name: "ঘন্টা", seconds: 3600 },
        { name: "মিনিট", seconds: 60 },
        { name: "সেকেন্ড", seconds: 1 },
    ];

    for (let unit of units) {
        const interval = Math.floor(diff / unit.seconds);
        if (interval >= 1) {
            return `${toBanglaNumber(interval)} ${unit.name} আগে`;
        }
    }

    return "এইমাত্র";
}

// days lest
function BANGLA_DAY_LEFT(createdAt, totalDays) {
    const createdDate = new Date(createdAt);
    const now = new Date();

    // কত দিন পেরিয়েছে
    const diffTime = now - createdDate;
    const passedDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // কত দিন বাকি আছে
    const remaining = totalDays - passedDays;

    if (remaining > 0) {
        return `${toBanglaNumber(remaining)} দিন বাকি আছে`;
    } else if (remaining === 0) {
        return "আজ শেষ দিন";
    } else {
        return false;
    }
}

// English → Bangla number convert helper
function toBanglaNumber(num) {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num.toString().replace(/\d/g, (d) => banglaDigits[d]);
}

export {
    ENGLISH_TO_BANGLA,
    ENGLISH_DATE_TO_BANGLA,
    BANGLA_INDEX,
    DAYS_TO_BANGLA_DURATION,
    BANGLA_TIME_AGO,
    BANGLA_DAY_LEFT,
};
