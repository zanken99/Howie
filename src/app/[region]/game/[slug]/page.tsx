import { getGames, getProductsByGame } from "@/lib/products-data";
import { GameContent } from "@/components/GameContent";
import { notFound } from "next/navigation";
import { slugify } from "@/lib/utils";

export async function generateStaticParams() {
    const games = getGames();
    return games.map((game) => ({
        slug: slugify(game.name),
    }));
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
    const games = getGames();
    const { slug } = await params;
    const game = games.find(g => slugify(g.name) === slug);

    if (!game) {
        notFound();
    }

    // getProductsByGame expects name, not ID, based on its signature in products-data.ts
    // export function getProductsByGame(game: string): Product[]
    const products = getProductsByGame(game.name);

    return <GameContent game={game} products={products} />;
}
