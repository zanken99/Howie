/**
 * Converts games.js from friend's site into products-data.ts format
 * Run: node convert-games.cjs
 */
const fs = require('fs');
const path = require('path');

// Read and eval the games.js file
let gamesContent = fs.readFileSync(path.join(__dirname, 'games.js'), 'utf-8');
// Replace const with var so eval can define it in our scope
gamesContent = gamesContent.replace('const GAMES_CATALOG', 'var GAMES_CATALOG');
eval(gamesContent); // defines GAMES_CATALOG

const now = new Date().toLocaleString('ru');

// Parse duration string from friend's format to our format
function parseDuration(dur) {
    if (!dur) return '1d';
    const d = dur.toLowerCase().trim();
    if (d.includes('lifetime') || d.includes('forever')) return 'lifetime';
    const match = d.match(/(\d+)\s*(day|week|month|hour)/i);
    if (match) {
        const num = parseInt(match[1]);
        const unit = match[2].toLowerCase();
        if (unit.startsWith('day')) return `${num}d`;
        if (unit.startsWith('week')) return `${num * 7}d`;
        if (unit.startsWith('month')) return `${num * 30}d`;
        if (unit.startsWith('hour')) return `${num}h`;
    }
    return dur;
}

// Parse system requirements into specs array
function parseSpecs(sysReq) {
    if (!sysReq || sysReq.trim() === '') return [
        { label: 'ОС', value: 'Windows 10 / 11' },
        { label: 'CPU', value: 'Intel / AMD' },
    ];
    const specs = [];
    const lines = sysReq.split('\n').map(l => l.trim()).filter(Boolean);
    for (const line of lines) {
        // Skip header lines
        if (line.toUpperCase() === 'SYSTEM REQUIREMENTS' || line.toUpperCase() === 'ADDITIONAL INFORMATION') continue;
        if (line.includes(':')) {
            const idx = line.indexOf(':');
            const label = line.substring(0, idx).trim();
            const value = line.substring(idx + 1).trim();
            if (label && value) {
                specs.push({ label, value });
            }
        }
    }
    if (specs.length === 0) {
        specs.push({ label: 'ОС', value: 'Windows 10 / 11' });
        specs.push({ label: 'CPU', value: 'Intel / AMD' });
    }
    return specs.slice(0, 6); // limit to 6 specs for clean UI
}

// Build games array
const games = GAMES_CATALOG.map(g => ({
    id: g.id,
    name: g.name,
    image: '', // no local images
    icon: '',
    featured: g.isPopular || false,
    status: (g.status || 'ONLINE').toLowerCase() === 'online' ? 'online' :
        (g.status || '').toLowerCase() === 'updating' ? 'updating' : 'offline',
    description: g.description || `Premium cheats for ${g.name}`,
}));

// Build products array
const products = [];
for (const game of GAMES_CATALOG) {
    if (!game.programs) continue;
    for (const prog of game.programs) {
        // Build price tiers from plans
        const priceTiers = (prog.plans || []).map(plan => {
            const priceRu = parseInt(plan.priceRu || plan.price || '0');
            const priceUsd = parseInt(plan.price || '0');
            // Use RU price if available, otherwise convert USD to approx RUB
            const finalPrice = priceRu > 0 ? priceRu : priceUsd * 77;
            return {
                label: '',
                duration: parseDuration(plan.duration),
                price: finalPrice,
            };
        });

        // Check if product has region-specific pricing
        // Friend's site has priceRu vs price (USD) on each plan
        // We use RU price as base and compute multiplier for other regions
        let regionPricing = undefined;

        // Check for explicit regions in plans
        const hasExplicitRegions = prog.plans && prog.plans.some(p => p.regions);

        if (hasExplicitRegions) {
            // Products with explicit region data (like DayZ Medusa)
            // Base price is RU, compute multipliers per region
            const firstPlan = prog.plans[0];
            if (firstPlan.regions) {
                const regionKeys = Object.keys(firstPlan.regions).filter(k => k !== 'RU');
                if (regionKeys.length > 0) {
                    regionPricing = [];
                    // Add RU region
                    regionPricing.push({
                        region: 'RU',
                        label: 'Россия',
                        priceMultiplier: 1.0,
                    });
                    for (const rk of regionKeys) {
                        const globalPrice = parseFloat(firstPlan.regions[rk]?.price || '0');
                        const ruPrice = parseFloat(firstPlan.regions['RU']?.price || firstPlan.price || '1');
                        const multiplier = ruPrice > 0 ? Math.round((globalPrice / ruPrice) * 10) / 10 : 1.0;
                        regionPricing.push({
                            region: rk === 'GLOBAL' ? 'EU' : rk,
                            label: rk === 'GLOBAL' ? 'Global' : rk,
                            priceMultiplier: multiplier,
                        });
                    }
                }
            }
        } else {
            // Check if there's a meaningful difference between price and priceRu
            const hasRuPricing = prog.plans && prog.plans.some(p => {
                const pRu = parseInt(p.priceRu || '0');
                const pUsd = parseInt(p.price || '0');
                return pRu > 0 && pUsd > 0;
            });

            if (hasRuPricing) {
                // Compute average multiplier USD vs RU
                let totalRatio = 0;
                let count = 0;
                for (const plan of prog.plans) {
                    const pRu = parseInt(plan.priceRu || '0');
                    const pUsd = parseInt(plan.price || '0');
                    if (pRu > 0 && pUsd > 0) {
                        totalRatio += (pUsd * 77) / pRu; // approximate USD to RUB conversion
                        count++;
                    }
                }
                const avgRatio = count > 0 ? totalRatio / count : 1;
                // Only add regions if there's a meaningful price difference
                if (avgRatio > 0 && Math.abs(avgRatio - 1) > 0.1) {
                    regionPricing = [
                        { region: 'RU', label: 'Россия', priceMultiplier: 1.0 },
                        { region: 'EU', label: 'Global', priceMultiplier: Math.round(avgRatio * 10) / 10 },
                    ];
                }
            }
        }

        // Build features
        const features = (prog.features || []).filter(f => f && f.trim() !== '');

        // Build specs
        const specs = parseSpecs(prog.systemRequirements);

        // Screenshots as gallery images
        const galleryImages = (prog.screenshots || []).filter(s => s && s.trim() !== '');

        const product = {
            id: prog.id,
            name: prog.name,
            gameId: game.id,
            game: game.name,
            categoryId: '',
            description: prog.description || '',
            features: features.length > 0 ? features : ['AIM', 'ESP', 'MISC'],
            specs,
            images: [],
            coverImage: prog.image || undefined,
            galleryImages: galleryImages.length > 0 ? galleryImages : undefined,
            priceTiers: priceTiers.length > 0 ? priceTiers : [
                { label: '', duration: '1d', price: 500 },
                { label: '', duration: '7d', price: 1500 },
                { label: '', duration: '30d', price: 2500 },
            ],
            regionPricing,
            status: (prog.status || 'UNDETECTED').toLowerCase() === 'undetected' ? 'undetected' :
                (prog.status || '').toLowerCase() === 'updating' ? 'updating' : 'detected',
            lastUpdate: now,
            createdAt: new Date().toISOString(),
        };
        products.push(product);
    }
}

// Generate TS file
const output = `// Client-safe product data — no server dependencies
// Auto-generated from friend's games.js: ${now}

export interface PriceTier {
  label: string;
  duration: string;
  price: number;
}

export interface RegionPrice {
  region: string;
  label: string;
  priceMultiplier: number;
}

export interface Game {
  id: string;
  name: string;
  image: string;
  icon: string;
  featured: boolean;
  status: "online" | "offline" | "updating";
  description: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  gameId: string;
  game: string;
  categoryId: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  images: string[];
  coverImage?: string;
  galleryImages?: string[];
  priceTiers: PriceTier[];
  regionPricing?: RegionPrice[];
  status: "undetected" | "detected" | "updating";
  lastUpdate: string;
  createdAt: string;
}

export const games: Game[] = ${JSON.stringify(games, null, 2)};

export const products: Product[] = ${JSON.stringify(products, null, 2)};

export const reviews: Review[] = [
  {
    "id": "rev-1",
    "author": "Alex",
    "rating": 5,
    "text": "Best cheats provider, fast delivery and undetected!",
    "createdAt": "${new Date().toISOString()}"
  },
  {
    "id": "rev-2",
    "author": "Dmitry",
    "rating": 5,
    "text": "Отличный сервис, быстрая доставка ключей!",
    "createdAt": "${new Date().toISOString()}"
  },
  {
    "id": "rev-3",
    "author": "Mark",
    "rating": 4,
    "text": "Good selection of products, support is responsive.",
    "createdAt": "${new Date().toISOString()}"
  }
];

// Helper functions
export function getGames(): Game[] {
  return games;
}

export function getGameById(id: string): Game | undefined {
  return games.find(g => g.id === id);
}

export function getFeaturedGames(): Game[] {
  return games.filter(g => g.featured);
}

export function getProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByGame(game: string): Product[] {
  return products.filter(p => p.game === game);
}

export function getProductsByGameId(gameId: string): Product[] {
  return products.filter(p => p.gameId === gameId);
}

export function getReviews(): Review[] {
  return reviews;
}
`;

fs.writeFileSync(path.join(__dirname, 'src', 'lib', 'products-data.ts'), output, 'utf-8');

console.log(`✅ Done!`);
console.log(`   Games: ${games.length}`);
console.log(`   Products: ${products.length}`);
console.log(`   Products with region pricing: ${products.filter(p => p.regionPricing).length}`);
console.log(`   Written to: src/lib/products-data.ts`);
