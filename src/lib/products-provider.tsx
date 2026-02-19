"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
    Product,
    Game,
    Review,
    products as defaultProducts,
    games as defaultGames,
    reviews as defaultReviews,
} from "@/lib/products-data";

// Same keys as admin panel
const STORAGE_KEY_GAMES = "howie_admin_games";
const STORAGE_KEY_PRODUCTS = "howie_admin_products";
const STORAGE_KEY_REVIEWS = "howie_admin_reviews";

interface ProductsContextValue {
    products: Product[];
    games: Game[];
    reviews: Review[];
    featuredGames: Game[];
    loaded: boolean;
}

const ProductsContext = createContext<ProductsContextValue>({
    products: defaultProducts,
    games: defaultGames,
    reviews: defaultReviews,
    featuredGames: defaultGames.filter((g) => g.featured),
    loaded: false,
});

function loadFromStorage<T>(key: string, fallback: T[]): T[] {
    if (typeof window === "undefined") return fallback;
    try {
        const data = localStorage.getItem(key);
        if (data) return JSON.parse(data);
    } catch { }
    return fallback;
}

export function ProductsProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>(defaultProducts);
    const [games, setGames] = useState<Game[]>(defaultGames);
    const [reviews, setReviews] = useState<Review[]>(defaultReviews);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setGames(loadFromStorage<Game>(STORAGE_KEY_GAMES, [...defaultGames]));
        setProducts(loadFromStorage<Product>(STORAGE_KEY_PRODUCTS, [...defaultProducts]));
        setReviews(loadFromStorage<Review>(STORAGE_KEY_REVIEWS, [...defaultReviews]));
        setLoaded(true);
    }, []);

    // Listen for storage changes (e.g. admin panel in another tab)
    useEffect(() => {
        const handleStorage = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY_GAMES) {
                setGames(loadFromStorage<Game>(STORAGE_KEY_GAMES, [...defaultGames]));
            }
            if (e.key === STORAGE_KEY_PRODUCTS) {
                setProducts(loadFromStorage<Product>(STORAGE_KEY_PRODUCTS, [...defaultProducts]));
            }
            if (e.key === STORAGE_KEY_REVIEWS) {
                setReviews(loadFromStorage<Review>(STORAGE_KEY_REVIEWS, [...defaultReviews]));
            }
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    const featuredGames = games.filter((g) => g.featured);

    return (
        <ProductsContext.Provider value={{ products, games, reviews, featuredGames, loaded }}>
            {children}
        </ProductsContext.Provider>
    );
}

export function useProducts() {
    return useContext(ProductsContext);
}
