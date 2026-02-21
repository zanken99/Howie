const fs = require('fs');

function patchFile(filePath, replacements) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    for (const { searchValue, replaceValue } of replacements) {
        // try replacing exact strings first
        if (content.includes(searchValue)) {
            content = content.replace(searchValue, replaceValue);
        } else {
            // try regex if string not found
            const regex = new RegExp(searchValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+'), 'g');
            content = content.replace(regex, replaceValue);
        }
    }
    fs.writeFileSync(filePath, content, 'utf8');
}

// Fix products-data.ts
patchFile('src/lib/products-data.ts', [
    {
        searchValue: 'export interface PriceTier {\n  label: string;\n  duration: string;\n  price: number;\n}',
        replaceValue: 'export interface PriceTier {\n  label: string;\n  duration: string;\n  price: number;\n  priceUsd?: number;\n}'
    },
    {
        searchValue: '  createdAt: string;\n}',
        replaceValue: '  createdAt: string;\n  partner?: string;\n}'
    }
]);

// Fix admin page
patchFile('src/app/admin/page.tsx', [
    {
        searchValue: '  createdAt: string\n}',
        replaceValue: '  createdAt: string\n  partner?: string\n}'
    },
    {
        searchValue: 'export interface PriceTier {\n  label: string\n  duration: string\n  price: number\n}',
        replaceValue: 'export interface PriceTier {\n  label: string\n  duration: string\n  price: number\n  priceUsd?: number\n}'
    }
]);

console.log('Patched interfaces');
