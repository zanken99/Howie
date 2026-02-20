import { getProductById, getProducts } from "@/lib/products-data";
import { ProductContent } from "@/components/ProductContent";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const products = getProducts();
    return products.map((product) => ({
        id: product.id,
    }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = getProductById(id);

    if (!product) {
        notFound();
    }

    return <ProductContent product={product} />;
}
