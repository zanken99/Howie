"use client";

import Link from "next/link";
import { Product } from "@/lib/products-data";
import { useState } from "react";
import { motion } from "framer-motion";

import { useI18n } from "@/lib/i18n";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t, formatPrice, region } = useI18n();
  const isUndetected = product.status === "undetected";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative rounded-sm glass-panel overflow-hidden border border-[#333] hover:border-[#C6A87C] transition-all duration-500 flex flex-col h-full bg-[#0a0a0a]/80"
    >
      {/* Top Banner / Image Placeholder */}
      <div className="h-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />

        {product.coverImage ? (
          <img
            src={product.coverImage}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#111]">
            <span className="text-4xl opacity-20 grayscale group-hover:grayscale-0 transition-all duration-300">
              🎮
            </span>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-20">
          <div className={`px-3 py-1 border backdrop-blur-md flex items-center gap-2 ${isUndetected
            ? 'bg-[#0a0a0a]/60 border-[#C6A87C]/50 text-[#C6A87C]'
            : 'bg-[#2a0000]/60 border-[#ff0000]/30 text-[#ff0000]'
            }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isUndetected ? 'bg-[#C6A87C] animate-pulse' : 'bg-[#ff0000]'}`} />
            <span className="text-[10px] font-bold uppercase tracking-widest font-[family-name:var(--font-inter)]">
              {isUndetected ? 'Undetected' : 'Detected'}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col relative z-20">
        <div className="mb-6">
          <div className="text-[10px] text-[#888] uppercase tracking-[0.2em] font-bold mb-2 font-[family-name:var(--font-inter)]">
            {product.game}
          </div>
          <h3 className="text-2xl text-[#f5f5f5] group-hover:text-[#C6A87C] transition-colors font-[family-name:var(--font-playfair)] tracking-wide">
            {product.name}
          </h3>
          <div className="w-12 h-[1px] bg-[#C6A87C]/50 mt-4 group-hover:w-full transition-all duration-500" />
        </div>

        {/* Features */}
        <div className="space-y-3 mb-8">
          {product.features.slice(0, 3).map((feature, i) => (
            <div key={i} className="flex items-center gap-3 text-xs text-[#aaa] font-[family-name:var(--font-inter)] tracking-wider">
              <span className="w-1 h-1 bg-[#C6A87C] rotate-45 transform" />
              <span className="line-clamp-1">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#666] uppercase tracking-widest font-bold mb-1">{t("prod.from")}</span>
            <span className="text-xl font-[family-name:var(--font-playfair)] text-[#C6A87C]">
              {formatPrice(product.priceTiers[0].price, product.priceTiers[0].priceUsd)}
            </span>
          </div>
          <Link href={`/${region}/product/${product.id}`}>
            <button className="shelby-button text-xs">
              {t("prod.details")}
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
