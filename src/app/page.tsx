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

    // Pass all undetected products to the client to shuffle
    const recommended = products.filter(p => p.status === 'undetected');

    return (
        <HomeContent
            games={gameCounts}
            recommended={recommended}
            featuredGames={featuredGames}
            reviews={reviews}
        />
    );
}
