"use client";

import { Game, Product } from "@/lib/products-data";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";

interface GameContentProps {
    game: Game;
    products: Product[];
}

export function GameContent({ game, products }: GameContentProps) {
    const { t } = useI18n();

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

    return (
        <div className="relative min-h-screen text-[#e5e5e5] pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* Header */}
                <div className="mb-12 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black font-[family-name:var(--font-display)] text-white mb-4 uppercase tracking-tight"
                    >
                        {game.name} <span className="text-[#c6a87c]">CHEATS</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 max-w-2xl mx-auto"
                    >
                        {game.description && game.description !== `Premium cheats for ${game.name}`
                            ? game.description
                            : t("game.desc") || `Premium cheats for ${game.name}`}
                    </motion.p>
                </div>

                {/* Products Grid */}
                {products.length > 0 ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {products.map(product => (
                            <motion.div key={product.id} variants={itemVariants}>
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                        <span className="text-4xl block mb-4">😕</span>
                        <h3 className="text-xl font-bold text-white mb-2">No cheats found</h3>
                        <p className="text-gray-500">We don't have any products for {game.name} yet.</p>
                        <Link href="/" className="inline-block mt-6 px-6 py-2 bg-[#c6a87c] text-black font-bold rounded hover:bg-[#b5966a] transition-colors">
                            Back to Home
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
