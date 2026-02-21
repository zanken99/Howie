"use client";

import { useEffect } from "react";

export default function RootRedirect() {
    useEffect(() => {
        const detectRegion = async () => {
            try {
                const res = await fetch("https://ipapi.co/json/");
                const data = await res.json();
                const cisCountries = ["RU", "BY", "KZ", "UA", "UZ", "AM", "AZ", "GE", "MD", "TJ", "KG", "TM"];
                if (data.country_code && cisCountries.includes(data.country_code)) {
                    window.location.replace("/ru");
                } else {
                    window.location.replace("/world");
                }
            } catch (e) {
                const browserLang = (navigator.language || "").toLowerCase();
                if (browserLang.includes("ru") || browserLang.includes("uk") || browserLang.includes("be")) {
                    window.location.replace("/ru");
                } else {
                    window.location.replace("/world");
                }
            }
        };
        detectRegion();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-8 h-8 rounded-full border-2 border-[#c6a87c] border-t-transparent animate-spin" />
        </div>
    );
}
