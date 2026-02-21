const fs = require('fs');

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Fix PriceTier
    content = content.replace(
        /export interface PriceTier \{[\s\S]*?\}/g,
        (match) => {
            if (!match.includes('priceUsd')) {
                return match.replace(/}$/, '  priceUsd?: number;\n}');
            }
            return match;
        }
    );

    // Fix Product
    content = content.replace(
        /export interface Product \{[\s\S]*?\}/g,
        (match) => {
            if (!match.includes('partner')) {
                return match.replace(/}$/, '  partner?: string;\n}');
            }
            return match;
        }
    );

    // Fix PriceTier (Admin Page specific without semicolons)
    content = content.replace(
        /export interface PriceTier \{[\s\S]*?\}/g,
        (match) => {
            if (!match.includes('priceUsd')) {
                return match.replace(/}$/, '  priceUsd?: number\n}');
            }
            return match;
        }
    );

    // Fix Product (Admin Page EditProduct)
    content = content.replace(
        /export interface EditProduct \{[\s\S]*?\}/g,
        (match) => {
            if (!match.includes('partner')) {
                return match.replace(/}$/, '  partner?: string\n}');
            }
            return match;
        }
    );

    fs.writeFileSync(filePath, content, 'utf8');
}

fixFile('src/lib/products-data.ts');
fixFile('src/app/admin/page.tsx');
console.log('Fixed interfaces in both files');
