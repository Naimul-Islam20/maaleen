import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/layout/container";
import { ProductDetail } from "@/components/product/product-detail";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";

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

  const breadcrumbItems = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    {
      href: `/shop/${product.slug}`,
      label: product.name,
      current: true,
    },
  ];

  return (
    <Container className="pb-10 pt-0 sm:py-14">
      <ProductDetail
        product={product}
        related={related}
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
      />
    </Container>
  );
}
