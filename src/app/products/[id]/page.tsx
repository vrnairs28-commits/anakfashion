import { notFound } from 'next/navigation';
import { getProductById, getRelatedProducts, getProducts } from '@/utils/excelParser';
import ProductDetailsClient from './product-details-client';

export const revalidate = 3600; // Hourly revalidate

interface PageProps {
    params: Promise<{ id: string }>;
}

// Generate static parameters for statically generated dynamic routes (SEO & speed!)
export async function generateStaticParams() {
    const products = getProducts();
    return products.map((product) => ({
        id: product.id,
    }));
}

// Custom metadata generation (SEO-friendly!)
export async function generateMetadata({ params }: PageProps) {
    const resolvedParams = await params;
    const product = getProductById(resolvedParams.id);

    if (!product) {
        return {
            title: 'Anakh Fashions | Product Not Found',
            description: 'The requested luxury ensemble could not be found in our catalog.',
        };
    }

    return {
        title: `${product.name} - ${product.category} | Anakh Fashions`,
        description: `${product.description} Fabric: ${product.fabric}. Sizing: ${product.sizes.join(', ')}.`,
    };
}

export default async function ProductPage({ params }: PageProps) {
    const resolvedParams = await params;
    const product = getProductById(resolvedParams.id);

    if (!product) {
        notFound();
    }

    const related = getRelatedProducts(product, 4);

    return (
        <main className="bg-white">
            <ProductDetailsClient product={product} relatedProducts={related} />
        </main>
    );
}
