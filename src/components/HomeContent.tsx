"use client";

import { GameCard } from "@/components/GameCard";
import { slugify } from "@/lib/utils";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Product, Game, Review } from "@/lib/products-data";
import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";

interface HomeContentProps {
    games: { name: string; count: number }[];
    recommended: Product[];
    featuredGames: Game[];
    reviews: Review[];
}

export function HomeContent({ games, recommended, featuredGames, reviews }: HomeContentProps) {
    const { t, formatPrice, region } = useI18n();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [reviewIndex, setReviewIndex] = useState(0);
    const [featuredPage, setFeaturedPage] = useState(0);
    const [displayRecommended, setDisplayRecommended] = useState<Product[]>(recommended.slice(0, 10));

    // Shuffle products on client-side to prevent Next.js hydration mismatch
    useEffect(() => {
        if (recommended.length > 0) {
            const shuffled = [...recommended].sort(() => 0.5 - Math.random());
            setDisplayRecommended(shuffled.slice(0, 10));
        }
    }, [recommended]);

    // Auto-scroll carousel
    useEffect(() => {
        if (displayRecommended.length > 0) {
            const timer = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % displayRecommended.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [displayRecommended.length]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    // Featured games pagination (4 per page)
    const featuredPerPage = 4;
    const featuredTotalPages = Math.ceil(featuredGames.length / featuredPerPage);
    const visibleFeatured = featuredGames.slice(
        featuredPage * featuredPerPage,
        (featuredPage + 1) * featuredPerPage
    );

    // Reviews pagination
    const reviewsPerPage = 3;
    const maxReviewIndex = Math.max(0, reviews.length - reviewsPerPage);
    const prevReview = () => setReviewIndex((prev) => Math.max(0, prev - 1));
    const nextReview = () => setReviewIndex((prev) => Math.min(maxReviewIndex, prev + 1));

    return (
        <div className="relative min-h-screen overflow-hidden text-[#e5e5e5]">
            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-[85vh] flex items-center pt-24 pb-8 overflow-hidden z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-[1fr_340px_220px] gap-8 items-start">

                    {/* === LEFT COLUMN: Title + Buttons === */}
                    <div className="text-left space-y-6 pt-4">
                        {/* EST badge */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 border-l-2 border-[#c6a87c] bg-black/40 backdrop-blur-sm"
                        >
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c6a87c] font-[family-name:var(--font-display)]">
                                Est. 2026 • Premium Services
                            </span>
                        </motion.div>

                        {/* HOWIE CHEATS title */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h1 className="font-[family-name:var(--font-display)] font-black leading-[0.85] tracking-tight">
                                <span className="block text-7xl sm:text-8xl lg:text-[110px] text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">HOWIE</span>
                                <span className="block text-5xl sm:text-6xl lg:text-7xl text-[#c6a87c] mt-1 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">CHEATS</span>
                            </h1>
                            {/* Decorative line with flourish */}
                            <div className="flex items-center gap-0 mt-3">
                                <div className="h-[2px] w-48 bg-gradient-to-r from-[#c6a87c] to-[#8c7042]" />
                                <svg width="60" height="20" viewBox="0 0 60 20" className="text-[#c6a87c] -ml-1">
                                    <path d="M0 10 Q 15 0 30 10 Q 45 20 60 10" stroke="#c6a87c" strokeWidth="1.5" fill="none" />
                                    <circle cx="30" cy="10" r="2" fill="#c6a87c" />
                                </svg>
                            </div>
                        </motion.div>

                        {/* Quote */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-sm sm:text-base text-[#b0b0b0] max-w-md leading-relaxed font-light italic font-[family-name:var(--font-display)]"
                        >
                            &quot;{t("hero.desc") || "We offer only reliable and tested software. Minimal ban chance, regular updates, and 24/7 support."}&quot;
                        </motion.p>

                        {/* Buttons row */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-3 pt-2"
                        >
                            <Link href={`/${region}/#games`}>
                                <button className="shelby-button text-[11px] tracking-[0.2em]">
                                    {t("hero.cta")}
                                </button>
                            </Link>
                            <a href="https://discord.gg/JeyM4MHNNm" target="_blank" rel="noopener noreferrer">
                                <button className="shelby-button text-[11px] tracking-[0.15em] flex items-center gap-2">
                                    <img src="/media/discord.png" alt="Discord" className="w-4 h-4 object-contain" />
                                    Discord
                                </button>
                            </a>
                            <a href="https://t.me/HowieCheat" target="_blank" rel="noopener noreferrer">
                                <button className="shelby-button text-[11px] tracking-[0.15em] flex items-center gap-2">
                                    <img src="/media/telegram.png" alt="Telegram" className="w-4 h-4 object-contain" />
                                    Telegram
                                </button>
                            </a>
                        </motion.div>
                    </div>


                    {/* === CENTER COLUMN: Recommended Card === */}
                    <div className="relative w-full flex flex-col items-center justify-start">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="relative w-full max-w-[340px]"
                        >
                            {/* Glow effect behind card */}
                            <div className="absolute -inset-3 bg-gradient-to-br from-[#c6a87c]/20 via-transparent to-[#c6a87c]/10 rounded-2xl blur-xl animate-pulse opacity-60" />

                            <div className="relative rounded-xl overflow-hidden border border-[#c6a87c]/30 bg-[#0c0c0c]/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(198,168,124,0.08)] min-h-[440px] flex flex-col">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        className="h-full flex flex-col"
                                    >
                                        {/* Cover Image */}
                                        <div className="relative w-full h-44 overflow-hidden">
                                            {displayRecommended[currentIndex]?.coverImage ? (
                                                <img
                                                    src={displayRecommended[currentIndex].coverImage}
                                                    alt={displayRecommended[currentIndex]?.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-[#1a1508] via-[#0f0f0f] to-[#0a0805] flex items-center justify-center">
                                                    <span className="text-5xl opacity-20">🎮</span>
                                                </div>
                                            )}
                                            {/* Gradient overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/40 to-transparent" />

                                            {/* Status badge on image */}
                                            <div className="absolute top-3 right-3">
                                                <div className="px-2.5 py-1 bg-black/60 backdrop-blur-md border border-[#c6a87c]/40 rounded-full flex items-center gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#c6a87c] animate-pulse" />
                                                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#c6a87c]">
                                                        {displayRecommended[currentIndex]?.status === "undetected" ? "UD" : "DET"}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Recommended badge on image */}
                                            <div className="absolute top-3 left-3">
                                                <span className="px-2.5 py-1 bg-[#c6a87c] text-[#0a0a0a] text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
                                                    {t("rec.badge")}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="px-5 pt-4 pb-5 flex flex-col flex-grow">
                                            {/* Game tag */}
                                            <div className="text-[10px] text-[#c6a87c]/60 uppercase tracking-[0.25em] font-bold mb-1.5">
                                                {displayRecommended[currentIndex]?.game}
                                            </div>

                                            {/* Product name */}
                                            <h3 className="text-xl font-[family-name:var(--font-display)] text-white font-black uppercase tracking-tight leading-tight mb-3">
                                                {displayRecommended[currentIndex]?.name}
                                            </h3>

                                            {/* Feature pills */}
                                            <div className="flex flex-wrap gap-1.5 mb-5">
                                                {displayRecommended[currentIndex]?.features.slice(0, 4).map((feat, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#c6a87c]/10 border border-[#c6a87c]/20 text-[#c6a87c]/80 rounded"
                                                    >
                                                        {feat}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Divider */}
                                            <div className="h-px bg-gradient-to-r from-transparent via-[#c6a87c]/30 to-transparent mb-4 mt-auto" />

                                            {/* Bottom bar */}
                                            <div className="flex items-center justify-between gap-3">
                                                <Link href={`/${region}/product/${displayRecommended[currentIndex]?.id}`} className="flex-grow">
                                                    <button className="w-full bg-gradient-to-r from-[#c6a87c] to-[#a8895c] hover:from-[#d4b88a] hover:to-[#b89a6a] text-[#0a0a0a] py-2.5 px-4 rounded-lg font-[family-name:var(--font-display)] font-black uppercase tracking-[0.15em] text-[11px] transition-all shadow-lg shadow-[#c6a87c]/20 hover:shadow-[#c6a87c]/30 hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden group">
                                                        <span className="relative z-10">{t("rec.inspect")}</span>
                                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                                    </button>
                                                </Link>
                                                <div className="text-right shrink-0">
                                                    <div className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">{t("prod.from")}</div>
                                                    <div className="text-lg font-[family-name:var(--font-display)] text-[#c6a87c] font-black leading-none">
                                                        {formatPrice(displayRecommended[currentIndex]?.priceTiers[0].price)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Carousel dots */}
                                <div className="flex gap-2 justify-center pb-4">
                                    {displayRecommended.slice(0, 5).map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentIndex(i)}
                                            className={`transition-all duration-300 rounded-full ${i === currentIndex % 5
                                                ? "w-5 h-1.5 bg-[#c6a87c]"
                                                : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* === RIGHT COLUMN: Featured Games === */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="w-full pt-2"
                    >
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#c6a87c] mb-4 font-[family-name:var(--font-display)]">
                            {t("home.featured_games")}
                        </h3>

                        <div className="space-y-2">
                            {visibleFeatured.map((game) => (
                                <Link
                                    key={game.id}
                                    href={`/${region}/game/${slugify(game.name)}`}
                                    className="gold-bar w-full flex items-center gap-4 px-4 py-3 group"
                                >
                                    <div className="w-7 h-7 rounded bg-[#1a1008] flex items-center justify-center text-[#c6a87c] text-xs font-black border border-[#c6a87c]/20 shadow-inner flex-shrink-0">
                                        {game.icon ? (
                                            <img src={game.icon} alt={game.name} className="w-full h-full object-cover rounded" />
                                        ) : (
                                            game.name.charAt(0)
                                        )}
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-[#1a1008]">
                                        {game.name}
                                    </span>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        {featuredTotalPages > 1 && (
                            <div className="flex items-center justify-center gap-3 mt-3">
                                <button
                                    onClick={() => setFeaturedPage((p) => Math.max(0, p - 1))}
                                    disabled={featuredPage === 0}
                                    className="w-7 h-7 rounded bg-white/5 border border-white/10 hover:border-[#c6a87c] flex items-center justify-center text-gray-400 hover:text-[#c6a87c] transition-all disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                                >
                                    ←
                                </button>
                                <span className="text-[10px] text-gray-500">{featuredPage + 1}/{featuredTotalPages}</span>
                                <button
                                    onClick={() => setFeaturedPage((p) => Math.min(featuredTotalPages - 1, p + 1))}
                                    disabled={featuredPage >= featuredTotalPages - 1}
                                    className="w-7 h-7 rounded bg-white/5 border border-white/10 hover:border-[#c6a87c] flex items-center justify-center text-gray-400 hover:text-[#c6a87c] transition-all disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                                >
                                    →
                                </button>
                            </div>
                        )}

                        {/* Bottom Links */}
                        <div className="mt-6 space-y-1.5">
                            <Link href="https://t.me/HowieCheat" className="block text-xs text-gray-500 hover:text-[#c6a87c] transition-colors">
                                {t("home.contacts")}
                            </Link>
                            <Link href={`/${region}/legal/privacy`} className="block text-xs text-gray-500 hover:text-[#c6a87c] transition-colors">
                                {t("home.privacy")}
                            </Link>
                            <Link href={`/${region}/legal/terms`} className="block text-xs text-gray-500 hover:text-[#c6a87c] transition-colors">
                                {t("home.terms")}
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ===== REVIEWS SECTION ===== */}
            {reviews.length > 0 && (
                <section className="py-10 relative z-10 bg-[#050505]/70 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg md:text-xl font-[family-name:var(--font-display)] text-[#c6a87c] uppercase tracking-[0.15em]">
                                {t("home.reviews")}
                            </h2>
                            {reviews.length > reviewsPerPage && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={prevReview}
                                        disabled={reviewIndex === 0}
                                        className="w-8 h-8 rounded bg-white/5 border border-white/10 hover:border-[#c6a87c] flex items-center justify-center text-gray-400 hover:text-[#c6a87c] transition-all disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                                    >
                                        ←
                                    </button>
                                    <button
                                        onClick={nextReview}
                                        disabled={reviewIndex >= maxReviewIndex}
                                        className="w-8 h-8 rounded bg-white/5 border border-white/10 hover:border-[#c6a87c] flex items-center justify-center text-gray-400 hover:text-[#c6a87c] transition-all disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                                    >
                                        →
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {reviews.slice(reviewIndex, reviewIndex + reviewsPerPage).map((review) => (
                                <motion.div
                                    key={review.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="review-card"
                                >
                                    {/* Top gold strip */}
                                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#c6a87c] to-transparent opacity-60" />

                                    <div className="flex items-center gap-1 mb-3">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <span key={i} className={`text-xs ${i < review.rating ? "text-[#c6a87c]" : "text-[#333]"}`}>★</span>
                                        ))}
                                    </div>
                                    <p className="text-sm text-[#a0a0a0] leading-relaxed mb-4 italic">
                                        {review.text}
                                    </p>
                                    <div className="text-[10px] text-[#8c7042] font-bold uppercase tracking-[0.2em] border-t border-[#2a2a2a] pt-3">
                                        {review.author}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ===== GAMES GRID ===== */}
            <section id="games" className="py-24 relative z-10 bg-[#050505]/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-display)] text-[#c6a87c] mb-4">
                            {t("cat.title")}
                        </h2>
                        <div className="h-[2px] w-24 bg-[#c6a87c] mx-auto mb-6" />
                        <p className="text-gray-500 max-w-2xl mx-auto font-light tracking-wide uppercase text-xs">
                            {t("cat.title") === "GAME CATALOG" ? "Select your game" : "Выберите свою игру"}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        {games.map((game) => (
                            <div key={game.name}>
                                <GameCard name={game.name} count={game.count} />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ===== STATS ===== */}
            <section className="py-24 border-t border-[#c6a87c]/20 bg-[#080808]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-[#c6a87c]/20 pb-12">
                        {[
                            { value: "5000+", label: "Clients Served" },
                            { value: "1%", label: "Detection Rate" },
                            { value: "24/7", label: "Support" },
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-[family-name:var(--font-display)] text-[#c6a87c] mb-2">
                                    {s.value}
                                </div>
                                <div className="text-xs text-gray-600 uppercase tracking-[0.2em] font-bold">
                                    {s.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-12">
                        <img
                            src="/media/imagebanner.jpg"
                            alt="Howie Banner"
                            className="max-w-full md:max-w-2xl rounded-xl border border-[#c6a87c]/20 shadow-[0_0_30px_rgba(198,168,124,0.1)] transition-transform hover:scale-102 duration-700"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
