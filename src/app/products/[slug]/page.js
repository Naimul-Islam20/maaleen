import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ProductDetail } from "@/components/product/product-detail";
import {
  getCategoryLabel,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: "Product not found" };
  }
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug, 4);
  const categoryLabel = getCategoryLabel(product.category);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/products", label: "Shop" },
          {
            href: `/products?category=${product.category}`,
            label: categoryLabel,
          },
          { href: `/products/${product.slug}`, label: product.name, current: true },
        ]}
      />
      <div className="mt-8">
        <ProductDetail product={product} related={related} />
      </div>
    </div>
  );
}
