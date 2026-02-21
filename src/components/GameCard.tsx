"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { slugify } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

interface GameCardProps {
    name: string;
    count: number;
}

export function GameCard({ name, count }: GameCardProps) {
    const { t, region } = useI18n();
    const slug = slugify(name);

    return (
        <Link href={`/${region}/game/${slug}`}>
            <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative h-48 overflow-hidden bg-[#0a0a0a] border border-[var(--color-primary)]/30 hover:border-[var(--color-primary)] transition-all duration-500 cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(198,168,124,0.15)]"
            >
                {/* Background Texture/Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#121212] via-[#080808] to-black opacity-90" />

                {/* Vintage vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

                {/* Decorative Elements */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[var(--color-primary)]" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[var(--color-primary)]" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[var(--color-primary)]" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[var(--color-primary)]" />

                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 text-center">
                    <h3 className="text-2xl font-black text-[#e5e5e5] group-hover:text-[var(--color-primary)] transition-colors duration-500 font-[family-name:var(--font-display)] uppercase tracking-[0.15em] relative z-20">
                        {name}
                    </h3>
                    <div className="mt-4 px-4 py-1 border-t border-b border-[var(--color-primary)]/20 group-hover:border-[var(--color-primary)] transition-all duration-500">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#888] group-hover:text-[#d4af37]">
                            {count} {count === 1 ? t("cat.product") : t("cat.products")}
                        </span>
                    </div>
                </div>

                {/* Hover Effect - Gold glow from bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-[var(--color-primary)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
            </motion.div>
        </Link>
    );
}
