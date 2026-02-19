"use client";

import { useI18n } from "@/lib/i18n";
import { ProductCard } from "@/components/ProductCard";
import { useProducts } from "@/lib/products-provider";
import { slugify } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

interface GamePageContentProps {
    slug: string;
}

export function GamePageContent({ slug }: GamePageContentProps) {
    const { t } = useI18n();
    const { products, loaded } = useProducts();

    const gameProducts = products.filter((p) => slugify(p.game) === slug);
    const gameName = gameProducts.length > 0 ? gameProducts[0].game : slug;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
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

    if (!loaded) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
                <span className="text-white text-xl">Загрузка...</span>
            </div>
        );
    }

    if (gameProducts.length === 0) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
                <span className="text-white text-xl">Игра не найдена</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-[-1]">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--color-primary)]/5 blur-[120px] rounded-full animate-pulse-slow" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--color-secondary)]/5 blur-[120px] rounded-full animate-float" />
                <div className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Breadcrumb / Back Link */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <Link href="/#games" className="inline-flex items-center gap-2 text-gray-400 hover:text-[var(--color-primary)] transition-colors text-sm font-bold uppercase tracking-wider group">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span>
                        {t("game.back")}
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl sm:text-6xl font-black text-white mb-4 text-glow">
                        {gameName} <span className="text-[var(--color-primary)]">{t("game.cheats")}</span>
                    </h1>
                    <p className="text-xl text-gray-400">
                        {t("game.desc")} {gameName}
                    </p>
                </motion.div>

                {/* Products Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {gameProducts.map((p, i) => (
                        <motion.div key={p.id} variants={itemVariants}>
                            <ProductCard product={p} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
