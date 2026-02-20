"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export function PageLoader() {
    const [loading, setLoading] = useState(true);
    const [rendered, setRendered] = useState(true);

    useEffect(() => {
        // Ensure the loader shows for at least 1.5 seconds so it doesn't flicker
        const minTime = new Promise((resolve) => setTimeout(resolve, 1500));

        const handleLoad = async () => {
            await minTime;
            setLoading(false);
            // Wait for the opacity transition to finish, then unmount
            setTimeout(() => setRendered(false), 500);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
            return () => window.removeEventListener("load", handleLoad);
        }
    }, []);

    if (!rendered) return null;

    return (
        <div
            className={`fixed inset-0 z-[10000] bg-[#0A0A0A] flex flex-col items-center justify-center transition-opacity duration-500 ease-out ${loading ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
        >
            <div className="relative flex flex-col items-center justify-center w-full h-full">
                {/* Decorative Abstract Rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[400px] md:h-[400px] border border-[#C6A87C]/10 rounded-full animate-[spin_8s_linear_infinite]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[600px] md:h-[600px] border border-white/5 rounded-full animate-[spin_12s_linear_infinite_reverse]" />

                {/* Main Content */}
                <div className="z-10 flex flex-col items-center gap-8">
                    {/* Glowing Logo Text */}
                    <div className="relative">
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-[0.2em] uppercase font-serif drop-shadow-[0_0_15px_rgba(198,168,124,0.4)] relative z-10 transition-transform hover:scale-105 duration-300">
                            HOWIE
                        </h1>
                        <h1 className="text-4xl md:text-6xl font-black text-[#C6A87C] tracking-[0.2em] uppercase font-serif blur-xl opacity-60 absolute inset-0 animate-pulse">
                            HOWIE
                        </h1>
                    </div>

                    {/* Loader Icon and Text */}
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-10 h-10 text-[#C6A87C] animate-spin drop-shadow-[0_0_10px_rgba(198,168,124,0.3)]" />
                        <div className="text-[#C6A87C]/80 text-xs md:text-sm tracking-[0.3em] font-medium uppercase animate-pulse">
                            Loading Assets
                        </div>
                    </div>
                </div>

                {/* Ambient Gradient Background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#C6A87C]/5 blur-[120px] rounded-full pointer-events-none" />
            </div>
        </div>
    );
}
