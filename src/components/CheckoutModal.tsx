"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Product, PriceTier } from "@/lib/products-data";
import { useI18n } from "@/lib/i18n";
import { formatDuration } from "@/lib/format-duration";

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product;
    selectedTier: PriceTier;
    regionMultiplier?: number;
    regionLabel?: string;
}

export function CheckoutModal({ isOpen, onClose, product, selectedTier, regionMultiplier = 1, regionLabel }: CheckoutModalProps) {
    const { t, formatPrice } = useI18n();
    const [quantity, setQuantity] = useState(1);

    // Lock scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const basePrice = Math.round(selectedTier.price * regionMultiplier);
    const total = basePrice * quantity;

    const orderText = `${product.name} — ${formatDuration(selectedTier.duration, t)} x${quantity}${regionLabel ? ` (${regionLabel})` : ''}`;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-[420px] max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-[var(--color-primary)]/30 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] custom-scrollbar"
                    >
                        {/* Header */}
                        <div className="p-8 pb-0 text-center">
                            <h2 className="text-3xl font-[family-name:var(--font-display)] text-[var(--color-primary)] tracking-widest text-glow uppercase">
                                {t("checkout.title")}
                            </h2>
                        </div>

                        <div className="p-8 space-y-6">
                            {/* Product Info Table */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                                    <span className="text-gray-500 uppercase tracking-wider">{t("checkout.product")}</span>
                                    <span className="text-[var(--color-primary)] font-bold uppercase">{product.name}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                                    <span className="text-gray-500 uppercase tracking-wider">{t("checkout.sub")}</span>
                                    <span className="text-white font-medium">{formatDuration(selectedTier.duration, t)}</span>
                                </div>
                                {regionLabel && (
                                    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                                        <span className="text-gray-500 uppercase tracking-wider">🌍 {t("checkout.region") || "Регион"}</span>
                                        <span className="text-[var(--color-primary)] font-bold">{regionLabel}</span>
                                    </div>
                                )}
                            </div>

                            {/* Quantity */}
                            <div className="flex items-center justify-between py-2 border-y border-white/5">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    {t("checkout.quantity")}
                                </label>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-8 h-8 flex items-center justify-center rounded border border-white/10 text-white hover:border-[var(--color-primary)] transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-8 h-8 flex items-center justify-center rounded border border-white/10 text-white hover:border-[var(--color-primary)] transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Totals */}
                            <div className="space-y-2 pt-2">
                                <div className="flex justify-between items-center text-[10px] text-gray-500 uppercase tracking-widest">
                                    <span>{t("checkout.price")}</span>
                                    <span className="font-bold text-[var(--color-primary)]">{formatPrice(basePrice * quantity)}</span>
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-lg font-black text-white uppercase tracking-wider">{t("checkout.total")}</span>
                                    <span className="text-2xl font-black text-[var(--color-primary)] text-glow">{formatPrice(total)}</span>
                                </div>
                            </div>

                            {/* Contact Buttons */}
                            <div className="space-y-3 pt-4">
                                <p className="text-center text-xs text-gray-500 uppercase tracking-wider">
                                    {t("checkout.contact_to_buy") || "Для покупки свяжитесь с нами"}
                                </p>
                                <a
                                    href={`https://t.me/howiecheats?text=${encodeURIComponent(orderText + ' — ' + formatPrice(total))}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-4 rounded bg-[#2AABEE] text-white font-black uppercase tracking-widest text-sm hover:bg-[#229ED9] transition-all shadow-[0_0_20px_rgba(42,171,238,0.2)] flex items-center justify-center gap-3"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
                                    Telegram
                                </a>
                                <a
                                    href="https://discord.gg/howiecheats"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-4 rounded bg-[#5865F2] text-white font-black uppercase tracking-widest text-sm hover:bg-[#4752C4] transition-all shadow-[0_0_20px_rgba(88,101,242,0.2)] flex items-center justify-center gap-3"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" /></svg>
                                    Discord
                                </a>
                            </div>

                            {/* Close */}
                            <div className="pt-2">
                                <button
                                    onClick={onClose}
                                    className="w-full text-center text-gray-600 text-[10px] uppercase font-bold tracking-widest hover:text-white transition-colors"
                                >
                                    {t("checkout.cancel")}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
