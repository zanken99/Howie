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
    loaded: true,
});

export function ProductsProvider({ children }: { children: ReactNode }) {
    const products = defaultProducts;
    const games = defaultGames;
    const reviews = defaultReviews;
    const featuredGames = games.filter((g) => g.featured);

    return (
        <ProductsContext.Provider value={{ products, games, reviews, featuredGames, loaded: true }}>
            {children}
        </ProductsContext.Provider>
    );
}

export function useProducts() {
    return useContext(ProductsContext);
}
