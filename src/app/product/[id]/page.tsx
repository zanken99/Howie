import { getProducts, getProductById } from "@/lib/products-data";
import { ProductPageClient } from "./client";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  const products = getProducts();
  return products.map(p => ({ id: p.id }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  return <ProductPageClient id={id} />;
}
