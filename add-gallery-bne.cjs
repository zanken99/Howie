// Script to add gallery images for Byster, Eclipse, Next products
const fs = require('fs');
const path = require('path');

const imgSrc = 'C:\\Users\\Admin\\Desktop\\image';
const imgDest = path.join(__dirname, 'public', 'img');
const dataFile = path.join(__dirname, 'src', 'lib', 'products-data.ts');

// Ensure dest exists
if (!fs.existsSync(imgDest)) fs.mkdirSync(imgDest, { recursive: true });

// Copy file with safe name, return new filename
function copyImage(srcPath, prefix, index) {
    const ext = path.extname(srcPath).toLowerCase();
    const safeName = `${prefix}-${index}${ext}`;
    const dest = path.join(imgDest, safeName);
    fs.copyFileSync(srcPath, dest);
    console.log(`  Copied: ${safeName}`);
    return `/img/${safeName}`;
}

// Get all files in a folder
function getFiles(folder) {
    if (!fs.existsSync(folder)) return [];
    return fs.readdirSync(folder)
        .filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f))
        .map(f => path.join(folder, f));
}

// Mapping: { productNameSubstring: { game?: string, imagePaths: string[] } }
// For products with same name in different games, we use the same images (user's request)
const mappings = [];

// --- BYSTER ---
// "Byster" (generic, line 1435) — use ALL byster images combined or just Albion
// "Byster Albion" — byster/Albion
// "Byster MegaLadder" — byster/MegaLadder  
// "Byster Path Of Exile 1" — byster/Path of Exile
// "Byster Path Of Exile 2" — byster/Path of Exile 2

const bysterAlbion = getFiles(path.join(imgSrc, 'byster', 'Albion'));
const bysterMega = getFiles(path.join(imgSrc, 'byster', 'MegaLadder'));
const bysterPoe1 = getFiles(path.join(imgSrc, 'byster', 'Path of Exile'));
const bysterPoe2 = getFiles(path.join(imgSrc, 'byster', 'Path of Exile 2'));
const bysterLastEpoch = getFiles(path.join(imgSrc, 'byster', 'Last Epoch'));

// Copy and build paths
function copySet(files, prefix) {
    return files.map((f, i) => copyImage(f, prefix, i + 1));
}

console.log('=== BYSTER ===');
const bysterAlbionPaths = copySet(bysterAlbion, 'byster-albion');
const bysterMegaPaths = copySet(bysterMega, 'byster-megaladder');
const bysterPoe1Paths = copySet(bysterPoe1, 'byster-poe1');
const bysterPoe2Paths = copySet(bysterPoe2, 'byster-poe2');
const bysterLastEpochPaths = copySet(bysterLastEpoch, 'byster-lastepoch');

// "Byster" generic (line 1435) — not specific to a game subfolder; use Albion images as default
mappings.push({ name: 'Byster', exact: true, gameId: null, images: bysterAlbionPaths });
mappings.push({ name: 'Byster Albion', exact: true, gameId: null, images: bysterAlbionPaths });
mappings.push({ name: 'Byster MegaLadder', exact: true, gameId: null, images: bysterMegaPaths });
mappings.push({ name: 'Byster Path Of Exile 1', exact: true, gameId: null, images: bysterPoe1Paths });
mappings.push({ name: 'Byster Path Of Exile 2', exact: true, gameId: null, images: bysterPoe2Paths });

// --- ECLIPSE ---
console.log('\n=== ECLIPSE ===');
const eclipseFull = getFiles(path.join(imgSrc, 'ECLIPSE', 'Rust Full'));
const eclipseLite = getFiles(path.join(imgSrc, 'ECLIPSE', 'Rust Lite'));

const eclipseFullPaths = copySet(eclipseFull, 'eclipse-rust-full');
const eclipseLitePaths = copySet(eclipseLite, 'eclipse-rust-lite');

mappings.push({ name: 'Eclipse Rust Full', exact: true, gameId: null, images: eclipseFullPaths });
mappings.push({ name: 'Eclipse Rust Lite', exact: true, gameId: null, images: eclipseLitePaths });

// --- NEXT ---
// "Pro Next" in DayZ → next/DayZ Pro (same images for Pro Next everywhere)
// "Pro Next" in EFT → next/Pro Escape From Tarkov
// "Lite Next" in EFT → next/Lite Escape From Tarkov
// SCUM PRO has no product match, skip

console.log('\n=== NEXT ===');
const nextDayz = getFiles(path.join(imgSrc, 'next', 'DayZ Pro'));
const nextProEft = getFiles(path.join(imgSrc, 'next', 'Pro Escape From Tarkov'));
const nextLiteEft = getFiles(path.join(imgSrc, 'next', 'Lite Escape From Tarkov'));
const nextScum = getFiles(path.join(imgSrc, 'next', 'SCUM PRO'));

const nextDayzPaths = copySet(nextDayz, 'next-dayz-pro');
const nextProEftPaths = copySet(nextProEft, 'next-pro-eft');
const nextLiteEftPaths = copySet(nextLiteEft, 'next-lite-eft');
const nextScumPaths = copySet(nextScum, 'next-scum-pro');

// Pro Next in DayZ: use DayZ Pro + Pro EFT images (same cheat)
// Pro Next in EFT: use Pro EFT images
// Lite Next in EFT: use Lite EFT images
// User says: same cheat in different games = same images
// Pro Next appears in DayZ and EFT - use combined images
const proNextImages = [...nextDayzPaths, ...nextProEftPaths];
const liteNextImages = [...nextLiteEftPaths];

mappings.push({ name: 'Pro Next', exact: true, gameId: null, images: proNextImages }); // matches ALL "Pro Next" in all games
mappings.push({ name: 'Lite Next', exact: true, gameId: null, images: liteNextImages });

// --- UPDATE products-data.ts ---
console.log('\n=== UPDATING products-data.ts ===');
let content = fs.readFileSync(dataFile, 'utf8');

let updated = 0;
for (const m of mappings) {
    if (m.images.length === 0) {
        console.log(`  SKIP ${m.name}: no images`);
        continue;
    }

    // Find all products with this name
    const nameStr = `"name": "${m.name}"`;
    let startIdx = 0;
    while (true) {
        const nameIdx = content.indexOf(nameStr, startIdx);
        if (nameIdx === -1) break;

        // Find galleryImages for this product (search forward from the name)
        const galleryIdx = content.indexOf('"galleryImages":', nameIdx);
        if (galleryIdx === -1 || galleryIdx > nameIdx + 5000) {
            startIdx = nameIdx + 1;
            continue;
        }

        // Make sure we haven't gone past the next product
        const nextProdIdx = content.indexOf('"name":', nameIdx + 1);
        if (nextProdIdx !== -1 && galleryIdx > nextProdIdx) {
            startIdx = nameIdx + 1;
            continue;
        }

        // Find the array brackets
        const openBracket = content.indexOf('[', galleryIdx);
        const closeBracket = content.indexOf(']', openBracket);

        if (openBracket === -1 || closeBracket === -1) {
            startIdx = nameIdx + 1;
            continue;
        }

        // Build replacement
        const imgEntries = m.images.map(p => `\n      "${p}"`).join(',');
        const replacement = `"galleryImages": [${imgEntries}\n    ]`;

        content = content.substring(0, galleryIdx) + replacement + content.substring(closeBracket + 1);
        console.log(`  ✅ Updated "${m.name}" gallery with ${m.images.length} images`);
        updated++;

        startIdx = galleryIdx + replacement.length;
    }
}

fs.writeFileSync(dataFile, content, 'utf8');
console.log(`\n✅ Done! Updated ${updated} products.`);
