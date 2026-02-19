"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { ShieldCheck, MessageSquare, Wrench, CreditCard } from "lucide-react";

export default function GuaranteesPage() {
    const { t } = useI18n();

    const guarantees = [
        {
            title: t("guarantee.reliability.title"),
            desc: t("guarantee.reliability.desc"),
            icon: <ShieldCheck className="w-8 h-8 text-[var(--color-primary)]" />,
        },
        {
            title: t("guarantee.reviews.title"),
            desc: t("guarantee.reviews.desc"),
            icon: <MessageSquare className="w-8 h-8 text-[var(--color-primary)]" />,
            community: true
        },
        {
            title: t("guarantee.support.title"),
            desc: t("guarantee.support.desc"),
            icon: <Wrench className="w-8 h-8 text-[var(--color-primary)]" />,
        },
        {
            title: t("guarantee.oplata.title"),
            desc: t("guarantee.oplata.desc"),
            icon: <CreditCard className="w-8 h-8 text-[var(--color-primary)]" />,
        },
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[var(--color-primary)]/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-black mb-6 font-[family-name:var(--font-display)] tracking-tight">
                            {t("guarantee.title").split(' ').map((word, i) => (
                                <span key={i} className={i === 1 ? "text-[var(--color-primary)]" : ""}>
                                    {word}{' '}
                                </span>
                            ))}
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
                            {t("guarantee.subtitle")}
                        </p>
                        <p className="text-gray-500 max-w-xl mx-auto text-sm">
                            {t("guarantee.contact_us")}
                        </p>

                        {/* Support Links */}
                        <div className="flex flex-wrap justify-center gap-4 mt-8">
                            <a
                                href="https://t.me/HowieCheat"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-[#24A1DE]/10 border border-[#24A1DE]/20 hover:bg-[#24A1DE]/20 rounded-xl transition-all group"
                            >
                                <img src="/media/telegram.png" alt="Telegram" className="w-5 h-5 object-contain" />
                                <span className="font-bold">Telegram Channel</span>
                            </a>
                            <a
                                href="https://discord.gg/howiecheat"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-[#5865F2]/10 border border-[#5865F2]/20 hover:bg-[#5865F2]/20 rounded-xl transition-all group"
                            >
                                <img src="/media/discord.png" alt="Discord" className="w-5 h-5 object-contain" />
                                <span className="font-bold">Discord Server</span>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Guarantees Grid */}
            <section className="pb-32 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {guarantees.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="glass-panel p-8 group hover:border-[var(--color-primary)]/30 transition-all border-white/5 bg-white/[0.02]"
                            >
                                <div className="mb-6 inline-block p-4 bg-[var(--color-primary)]/10 rounded-2xl group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 font-[family-name:var(--font-display)] tracking-tight text-white">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed text-lg">
                                    {item.desc}
                                </p>

                                {item.community && (
                                    <div className="mt-6 flex gap-3">
                                        <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-500 border border-white/5">
                                            Discord
                                        </div>
                                        <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-500 border border-white/5">
                                            Telegram
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
