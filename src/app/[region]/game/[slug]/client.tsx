"use client";

import { GamePageContent } from "@/components/GamePageContent";

export function GamePageClient({ slug }: { slug: string }) {
    return <GamePageContent slug={slug} />;
}
