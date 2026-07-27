import { getProducts } from '@/utils/excelParser';
import ProductsClient from './products-client';

export const revalidate = 3600; // Hourly revalidate

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
    const resolvedParams = await searchParams;

    // Await search params according to Next.js v15/v16 standards
    const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : '';
    const search = typeof resolvedParams.search === 'string' ? resolvedParams.search : '';

    const products = getProducts();

    return (
        <main className="bg-white">
            <ProductsClient
                initialProducts={products}
                selectedCategoryFromParams={category}
                searchFromParams={search}
            />
        </main>
    );
}
