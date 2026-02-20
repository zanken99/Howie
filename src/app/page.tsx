import { getGames, getFeaturedGames, getProducts, getReviews } from "@/lib/products-data";
import { HomeContent } from "@/components/HomeContent";

export default function HomePage() {
    const games = getGames();
    const products = getProducts();
    const featuredGames = getFeaturedGames();
    const reviews = getReviews();

    // Create count summary
    const gameCounts = games.map(g => ({
        name: g.name,
        count: products.filter(p => p.gameId === g.id).length
    }));

    // Logic for recommended:
    // Prefer 'undetected' status, and shuffle or pick first few
    const recommended = products
        .filter(p => p.status === 'undetected')
        .slice(0, 10); // Take up to 10 products for the carousel

    return (
        <HomeContent
            games={gameCounts}
            recommended={recommended}
            featuredGames={featuredGames}
            reviews={reviews}
        />
    );
}
