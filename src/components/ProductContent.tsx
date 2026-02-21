"use client";

import { useState, useEffect, useCallback } from "react";
import { Product, RegionPrice } from "@/lib/products-data";
import { formatDuration } from "@/lib/format-duration";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { CheckoutModal } from "@/components/CheckoutModal";
import { isVideoUrl } from "@/lib/video-utils";
import { Play, Search } from "lucide-react";
import { createPortal } from "react-dom";

interface ProductContentProps {
    product: Product;
}

export function ProductContent({ product }: ProductContentProps) {
    const { t, formatPrice, region } = useI18n();
    const [selectedTier, setSelectedTier] = useState(product.priceTiers[0]);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [isDescOpen, setIsDescOpen] = useState(true);

    const [selectedRegionPrice, setSelectedRegionPrice] = useState<RegionPrice | undefined>(
        region === 'world' && product.regionPricing && product.regionPricing.length > 0
            ? product.regionPricing[0]
            : undefined
    );

    const getMultiplier = () => {
        if (region === 'world' && selectedRegionPrice) {
            return selectedRegionPrice.priceMultiplier;
        }
        return 1;
    };

    const getPrice = (tier: typeof selectedTier) => tier.price * getMultiplier();
    const getPriceUsd = (tier: typeof selectedTier) => tier.priceUsd ? tier.priceUsd * getMultiplier() : undefined;

    const actualTier = {
        ...selectedTier,
        price: getPrice(selectedTier),
        priceUsd: getPriceUsd(selectedTier)
    };

    const closeLightbox = useCallback(() => setLightboxIndex(null), []);
    const prevImage = useCallback(() => {
        if (lightboxIndex !== null && product.galleryImages) {
            setLightboxIndex((lightboxIndex - 1 + product.galleryImages.length) % product.galleryImages.length);
        }
    }, [lightboxIndex, product.galleryImages]);
    const nextImage = useCallback(() => {
        if (lightboxIndex !== null && product.galleryImages) {
            setLightboxIndex((lightboxIndex + 1) % product.galleryImages.length);
        }
    }, [lightboxIndex, product.galleryImages]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [lightboxIndex, closeLightbox, prevImage, nextImage]);

    return (
        <div className="min-h-screen pt-24 pb-12 bg-[var(--color-background)]">
            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                product={product}
                selectedTier={actualTier}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                    <Link href={`/${region}`} className="hover:text-white transition-colors">{t("nav.home")}</Link>
                    <span>/</span>
                    <Link href={`/${region}/#games`} className="hover:text-white transition-colors">{t("nav.catalog")}</Link>
                    <span>/</span>
                    <span className="text-[var(--color-primary)]">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column: Image & Status */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* Quick Specs */}
                        <div className="glass-panel p-6 space-y-4">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t("prod.sys_req")}</h3>
                            <div className="space-y-3">
                                {product.specs.map((spec, i) => (
                                    <div key={i} className="flex justify-between text-sm py-2 border-b border-white/5 last:border-0">
                                        <span className="text-gray-500">{spec.label}</span>
                                        <span className="text-white font-medium text-right">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Info & Purchase */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                                <motion.h1
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-4xl sm:text-5xl font-black text-white"
                                >
                                    {product.name}
                                </motion.h1>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`px-4 py-1.5 rounded-full border backdrop-blur-md flex items-center gap-2 w-fit ${product.status === 'undetected'
                                        ? 'bg-[var(--color-primary)]/10 border-[var(--color-primary)]/30 text-[var(--color-primary)]'
                                        : 'bg-[var(--color-error)]/10 border-[var(--color-error)]/30 text-[var(--color-error)]'
                                        }`}
                                >
                                    <span className={`w-2 h-2 rounded-full ${product.status === 'undetected' ? 'bg-[var(--color-primary)] animate-pulse' : 'bg-[var(--color-error)]'}`} />
                                    <span className="text-sm font-bold uppercase tracking-wider">
                                        {product.status === 'undetected' ? 'Undetected' : product.status === 'updating' ? 'Updating' : 'Detected'}
                                    </span>
                                </motion.div>
                            </div>

                            {/* Gallery */}
                            {product.galleryImages && product.galleryImages.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6"
                                >
                                    {product.galleryImages.map((img, idx) => {
                                        const isVideo = isVideoUrl(img);
                                        const isYoutube = img.includes('youtube.com') || img.includes('youtu.be');
                                        return (
                                            <div
                                                key={idx}
                                                className="aspect-video rounded-lg overflow-hidden border border-white/10 relative group cursor-pointer hover:border-[var(--color-primary)]/50 transition-colors bg-[#0a0a0a]"
                                                onClick={() => setLightboxIndex(idx)}
                                            >
                                                <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                                                {isVideo && !isYoutube ? (
                                                    <video src={img} className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none" muted autoPlay loop playsInline />
                                                ) : isYoutube ? (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black">
                                                        <Play className="w-12 h-12 text-red-600 fill-current" />
                                                    </div>
                                                ) : (
                                                    <img src={img} alt={`Gallery ${idx}`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                                                )}
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                    {isVideo || isYoutube ? (
                                                        <Play className="w-10 h-10 text-white/80 fill-current" />
                                                    ) : (
                                                        <Search className="w-8 h-8 text-white/0 group-hover:text-white/80 transition-colors" />
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </motion.div>
                            )}

                            {/* Lightbox Modal */}
                            <AnimatePresence>
                                {lightboxIndex !== null && product.galleryImages && (() => {
                                    const currentMedia = product.galleryImages[lightboxIndex];
                                    const isVideo = isVideoUrl(currentMedia);
                                    const isYoutube = currentMedia.includes('youtube.com') || currentMedia.includes('youtu.be');
                                    let youtubeId = '';
                                    if (isYoutube) {
                                        const match = currentMedia.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
                                        if (match) youtubeId = match[1];
                                    }

                                    return (
                                        <>
                                            {/* Background and Clicks */}
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="fixed inset-0 z-[9900] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
                                                onClick={closeLightbox}
                                            >
                                                {/* Prev arrow */}
                                                {product.galleryImages.length > 1 && (
                                                    <button
                                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); prevImage(); }}
                                                        className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 flex items-center justify-center text-white text-2xl transition-all hover:scale-110 border border-white/10 backdrop-blur-sm z-[9999]"
                                                    >
                                                        ←
                                                    </button>
                                                )}

                                                {/* Media Container */}
                                                <motion.div
                                                    key={lightboxIndex}
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="relative w-full max-w-5xl max-h-full flex items-center justify-center z-[9950]"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    {isYoutube && youtubeId ? (
                                                        <iframe
                                                            className="w-full aspect-video rounded-xl shadow-2xl"
                                                            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                        />
                                                    ) : isVideo ? (
                                                        <video
                                                            src={currentMedia}
                                                            className="max-h-[85vh] max-w-full rounded-xl shadow-2xl outline-none bg-black"
                                                            controls
                                                            autoPlay
                                                            playsInline
                                                        />
                                                    ) : (
                                                        <img
                                                            src={currentMedia}
                                                            alt={`Gallery ${lightboxIndex}`}
                                                            className="max-h-[85vh] max-w-full object-contain rounded-xl shadow-2xl"
                                                        />
                                                    )}
                                                </motion.div>

                                                {/* Next arrow */}
                                                {product.galleryImages.length > 1 && (
                                                    <button
                                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); nextImage(); }}
                                                        className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 flex items-center justify-center text-white text-2xl transition-all hover:scale-110 border border-white/10 backdrop-blur-sm z-[9999]"
                                                    >
                                                        →
                                                    </button>
                                                )}

                                                {/* Counter */}
                                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 z-[9999]">
                                                    <span className="text-white/80 text-sm font-bold tracking-wider">
                                                        {lightboxIndex + 1} / {product.galleryImages.length}
                                                    </span>
                                                </div>
                                            </motion.div>

                                            {/* Close button (Fully independent, rendered in portal to bypass all stacking contexts) */}
                                            {typeof document !== 'undefined' && createPortal(
                                                <button
                                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); closeLightbox(); }}
                                                    className="fixed top-4 right-4 md:top-6 md:right-6 w-12 h-12 rounded-full bg-black/80 hover:bg-red-500 flex items-center justify-center text-white text-xl transition-all border border-white/10 backdrop-blur-md z-[999999] shadow-2xl cursor-pointer pointer-events-auto"
                                                >
                                                    ✕
                                                </button>,
                                                document.body
                                            )}
                                        </>
                                    );
                                })()}
                            </AnimatePresence>

                            {/* Features List */}
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="text-[var(--color-primary)]">#</span> {t("prod.func")}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {product.features.map((feature, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-[var(--color-primary)]/30 transition-colors"
                                        >
                                            <span className="text-[var(--color-primary)] text-lg">✓</span>
                                            <span className="text-gray-300 font-medium">{feature}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="glass-panel p-8 border-[var(--color-primary)]/20 shadow-[0_0_50px_-20px_rgba(59,130,246,0.2)]">
                            <h3 className="text-xl font-bold text-white mb-6">{t("prod.choose_tier")}</h3>

                            {/* REGION SELECTOR FOR WORLD */}
                            {region === 'world' && product.regionPricing && product.regionPricing.length > 0 && (
                                <div className="mb-6">
                                    <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-widest">
                                        Select Region
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {product.regionPricing.map((rp, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedRegionPrice(rp)}
                                                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${selectedRegionPrice?.region === rp.region
                                                        ? 'bg-[var(--color-primary)]/20 border-[var(--color-primary)] text-white shadow-[0_0_15px_rgba(198,168,124,0.3)]'
                                                        : 'bg-white/5 border-white/10 text-gray-400 hover:border-[var(--color-primary)]/50'
                                                    }`}
                                            >
                                                {rp.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                {product.priceTiers.map((tier, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedTier(tier)}
                                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${selectedTier === tier
                                            ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                                            : 'border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10'
                                            }`}
                                    >
                                        <span className={`text-sm font-bold uppercase tracking-widest ${selectedTier === tier ? 'text-white' : 'text-gray-400'
                                            }`}>
                                            {formatDuration(tier.duration, t)}
                                        </span>
                                        <span className={`text-2xl font-[family-name:var(--font-playfair)] ${selectedTier === tier ? 'text-[var(--color-primary)] text-glow' : 'text-white'
                                            }`}>
                                            {formatPrice(getPrice(tier), getPriceUsd(tier))}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center justify-between gap-6 p-4 bg-black/20 rounded-xl mb-6">
                                <div className="text-sm text-gray-400">
                                    {t("prod.selected_tier")} <span className="text-white font-bold">{formatDuration(selectedTier.duration, t)}</span>
                                </div>
                                <div className="text-3xl font-black text-white">
                                    {formatPrice(getPrice(selectedTier), getPriceUsd(selectedTier))}
                                </div>
                            </div>

                            <button
                                onClick={() => setIsCheckoutOpen(true)}
                                className="block w-full py-4 rounded-xl bg-[var(--color-primary)] hover:bg-[#e0c296] text-black text-lg font-black uppercase tracking-widest shadow-xl shadow-[var(--color-primary)]/20 hover:shadow-[var(--color-primary)]/40 transition-all transform hover:-translate-y-1 text-center"
                            >
                                {t("prod.buy")}
                            </button>
                            <div className="text-center mt-3 text-[10px] text-gray-500 uppercase tracking-widest opacity-60">
                                {t("prod.secure")}
                            </div>
                        </div>

                        {/* Collapsible Description */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="border border-white/10 rounded-xl overflow-hidden bg-white/5"
                        >
                            <div className="group">
                                <div
                                    onClick={() => setIsDescOpen(!isDescOpen)}
                                    className="flex items-center justify-between p-4 cursor-pointer select-none hover:bg-white/5 transition-colors"
                                >
                                    <span className="font-bold text-lg text-white">{t("prod.desc")}</span>
                                    <motion.span
                                        animate={{ rotate: isDescOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-[var(--color-primary)]"
                                    >
                                        ▼
                                    </motion.span>
                                </div>
                                <AnimatePresence initial={false}>
                                    {isDescOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-4 pt-0 text-gray-400 leading-relaxed whitespace-pre-wrap border-t border-white/5">
                                                {product.description}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </div>
    );
}
