"use client";

import { useState, useEffect, useCallback } from "react";
import { Product } from "@/lib/products-data";
import { formatDuration } from "@/lib/format-duration";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { CheckoutModal } from "@/components/CheckoutModal";

interface ProductContentProps {
    product: Product;
}

export function ProductContent({ product }: ProductContentProps) {
    const { t, formatPrice } = useI18n();
    const [selectedTier, setSelectedTier] = useState(product.priceTiers[0]);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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

    // Region pricing
    const hasRegions = (product.regionPricing?.length ?? 0) > 0;
    const [selectedRegionIdx, setSelectedRegionIdx] = useState(0);
    const regionMultiplier = hasRegions
        ? (product.regionPricing![selectedRegionIdx]?.priceMultiplier ?? 1)
        : 1;

    const getRegionalPrice = (basePrice: number) => Math.round(basePrice * regionMultiplier);

    return (
        <div className="min-h-screen pt-24 pb-12 bg-[var(--color-background)]">
            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                product={product}
                selectedTier={selectedTier}
                regionMultiplier={regionMultiplier}
                regionLabel={hasRegions ? product.regionPricing![selectedRegionIdx]?.label : undefined}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                    <Link href="/" className="hover:text-white transition-colors">{t("nav.home")}</Link>
                    <span>/</span>
                    <Link href="/#games" className="hover:text-white transition-colors">{t("nav.catalog")}</Link>
                    <span>/</span>
                    <span className="text-[var(--color-primary)]">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column: Image & Status */}
                    <div className="lg:col-span-1 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-2xl overflow-hidden bg-[var(--color-surface)] border border-white/5 aspect-square flex items-center justify-center relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <span className="text-8xl select-none group-hover:scale-110 transition-transform duration-500">🎮</span>

                            {/* Status Badge */}
                            <div className="absolute top-4 left-4">
                                <div className={`px-3 py-1 rounded-full border backdrop-blur-md flex items-center gap-2 ${product.status === 'undetected'
                                    ? 'bg-[var(--color-primary)]/10 border-[var(--color-primary)]/30 text-[var(--color-primary)]'
                                    : 'bg-[var(--color-error)]/10 border-[var(--color-error)]/30 text-[var(--color-error)]'
                                    }`}>
                                    <span className={`w-2 h-2 rounded-full ${product.status === 'undetected' ? 'bg-[var(--color-primary)] animate-pulse' : 'bg-[var(--color-error)]'}`} />
                                    <span className="text-xs font-bold uppercase tracking-wider">
                                        {product.status === 'undetected' ? 'Undetected' : product.status === 'updating' ? 'Updating' : 'Detected'}
                                    </span>
                                </div>
                            </div>
                        </motion.div>

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
                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-4xl sm:text-5xl font-black text-white mb-4"
                            >
                                {product.name}
                            </motion.h1>

                            {/* Gallery */}
                            {product.galleryImages && product.galleryImages.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6"
                                >
                                    {product.galleryImages.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className="aspect-video rounded-lg overflow-hidden border border-white/10 relative group cursor-pointer hover:border-[var(--color-primary)]/50 transition-colors"
                                            onClick={() => setLightboxIndex(idx)}
                                        >
                                            <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                                            <img src={img} alt={`Gallery ${idx}`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                                <span className="text-white/0 group-hover:text-white/80 transition-colors text-2xl">🔍</span>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}

                            {/* Lightbox Modal */}
                            <AnimatePresence>
                                {lightboxIndex !== null && product.galleryImages && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md"
                                        onClick={closeLightbox}
                                    >
                                        {/* Close button */}
                                        <button
                                            onClick={closeLightbox}
                                            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xl transition-colors z-10"
                                        >
                                            ✕
                                        </button>

                                        {/* Prev arrow */}
                                        {product.galleryImages.length > 1 && (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                                className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-2xl transition-all hover:scale-110 z-10"
                                            >
                                                ←
                                            </button>
                                        )}

                                        {/* Image */}
                                        <motion.img
                                            key={lightboxIndex}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                            src={product.galleryImages[lightboxIndex]}
                                            alt={`Gallery ${lightboxIndex}`}
                                            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
                                            onClick={(e) => e.stopPropagation()}
                                        />

                                        {/* Next arrow */}
                                        {product.galleryImages.length > 1 && (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                                className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-2xl transition-all hover:scale-110 z-10"
                                            >
                                                →
                                            </button>
                                        )}

                                        {/* Counter */}
                                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium tracking-wider">
                                            {lightboxIndex + 1} / {product.galleryImages.length}
                                        </div>
                                    </motion.div>
                                )}
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

                        {/* Purchase Section */}
                        <div className="glass-panel p-8 border-[var(--color-primary)]/20 shadow-[0_0_50px_-20px_rgba(59,130,246,0.2)]">
                            <h3 className="text-xl font-bold text-white mb-6">{t("prod.choose_tier")}</h3>

                            {/* Region Selector */}
                            {hasRegions && (
                                <div className="mb-6">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3">
                                        🌍 {t("prod.region") || "Выберите регион"}
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                        {product.regionPricing!.map((rp, idx) => (
                                            <button
                                                key={rp.region}
                                                onClick={() => setSelectedRegionIdx(idx)}
                                                className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${selectedRegionIdx === idx
                                                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-white shadow-lg'
                                                    : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/30 hover:bg-white/10'
                                                    }`}
                                            >
                                                <span className="text-sm font-bold uppercase tracking-wider">{rp.region}</span>
                                                <span className="text-[10px] text-gray-500">{rp.label}</span>
                                                {rp.priceMultiplier !== 1 && (
                                                    <span className="text-[9px] text-[var(--color-primary)]">×{rp.priceMultiplier}</span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-3 gap-4 mb-8">
                                {product.priceTiers.map((tier) => (
                                    <button
                                        key={tier.label}
                                        onClick={() => setSelectedTier(tier)}
                                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 relative overflow-hidden ${selectedTier.duration === tier.duration
                                            ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-white shadow-lg'
                                            : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/30 hover:bg-white/10'
                                            }`}
                                    >
                                        {selectedTier.duration === tier.duration && (
                                            <div className="absolute top-0 right-0 p-1">
                                                <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                                            </div>
                                        )}
                                        <span className="text-sm font-bold uppercase tracking-wider">{formatDuration(tier.duration, t)}</span>
                                        <span className={`text-xl font-black ${selectedTier.duration === tier.duration ? 'text-[var(--color-primary)]' : ''}`}>
                                            {formatPrice(getRegionalPrice(tier.price))}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center justify-between gap-6 p-4 bg-black/20 rounded-xl mb-6">
                                <div className="text-sm text-gray-400">
                                    {t("prod.selected_tier")} <span className="text-white font-bold">{formatDuration(selectedTier.duration, t)}</span>
                                    {hasRegions && (
                                        <span className="text-gray-500 ml-2">
                                            ({product.regionPricing![selectedRegionIdx]?.label})
                                        </span>
                                    )}
                                </div>
                                <div className="text-3xl font-black text-white">
                                    {formatPrice(getRegionalPrice(selectedTier.price))}
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
                            <details className="group" open>
                                <summary className="flex items-center justify-between p-4 cursor-pointer select-none hover:bg-white/5 transition-colors">
                                    <span className="font-bold text-lg text-white">{t("prod.desc")}</span>
                                    <span className="text-[var(--color-primary)] transform group-open:rotate-180 transition-transform duration-300">
                                        ▼
                                    </span>
                                </summary>
                                <div className="p-4 pt-0 text-gray-400 leading-relaxed whitespace-pre-wrap border-t border-white/5">
                                    {product.description}
                                </div>
                            </details>
                        </motion.div>

                    </div>
                </div>
            </div>
        </div>
    );
}
