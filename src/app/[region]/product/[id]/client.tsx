"use client";

import { ProductContent } from "@/components/ProductContent";
import { useProducts } from "@/lib/products-provider";

export function ProductPageClient({ id }: { id: string }) {
    const { products, loaded } = useProducts();

    if (!loaded) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
                <span className="text-white text-xl">Загрузка...</span>
            </div>
        );
    }

    const product = products.find((p) => p.id === id);

    if (!product) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
                <span className="text-white text-xl">Товар не найден</span>
            </div>
        );
    }

    return <ProductContent product={product} />;
}
