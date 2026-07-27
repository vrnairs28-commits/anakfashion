import * as xlsx from 'xlsx';
import path from 'path';
import fs from 'fs';
import { Product } from '@/types';

// Cache the products in memory during dynamic requests or dev rebuilds
let cachedProducts: Product[] | null = null;

export function getProducts(): Product[] {
    if (cachedProducts) {
        return cachedProducts;
    }

    try {
        // In Next.js, process.cwd() refers to the project root directory
        const filePath = path.join(process.cwd(), 'src/data/products-data.xlsx');

        if (!fs.existsSync(filePath)) {
            console.warn(`Excel file not found at ${filePath}. Attempting fallback path.`);
            // Try fallback to public/data if necessary
            const fallbackPath = path.join(process.cwd(), 'public/products-data.xlsx');
            if (!fs.existsSync(fallbackPath)) {
                throw new Error(`Data spreadsheet file not found at: ${filePath}`);
            }
        }

        const fileBuffer = fs.readFileSync(filePath);
        const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const rawData = xlsx.utils.sheet_to_json(worksheet) as any[];

        cachedProducts = rawData.map((item) => ({
            id: String(item.id),
            name: String(item.name),
            category: String(item.category),
            price: Number(item.price),
            description: String(item.description),
            fabric: String(item.fabric),
            sizes: item.sizes ? String(item.sizes).split(',').map((s: string) => s.trim()) : [],
            colors: item.colors ? String(item.colors).split(',').map((c: string) => c.trim()) : [],
            image: String(item.image),
            images: item.images
                ? String(item.images).split(',').map((img: string) => img.trim())
                : [String(item.image)],
            availability: (item.availability || 'In Stock') as 'In Stock' | 'Low Stock' | 'Out of Stock',
        }));

        return cachedProducts || [];
    } catch (error) {
        console.error('Error reading or parsing Excel database:', error);
        return [];
    }
}

export function getProductById(id: string): Product | undefined {
    return getProducts().find(p => p.id === id);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
    return getProducts()
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, limit);
}
