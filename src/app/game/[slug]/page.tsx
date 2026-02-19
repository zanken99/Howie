import { getProducts } from "@/lib/products-data";
import { slugify } from "@/lib/utils";
import { GamePageClient } from "./client";

interface GamePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export function generateStaticParams() {
    const products = getProducts();
    const slugs = new Set(products.map(p => slugify(p.game)));
    return Array.from(slugs).map(slug => ({ slug }));
}

export default async function GamePage({ params }: GamePageProps) {
    const { slug } = await params;
    return <GamePageClient slug={slug} />;
}
