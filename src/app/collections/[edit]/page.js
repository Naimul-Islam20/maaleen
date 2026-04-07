import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductShopIntro } from "@/components/product/product-shop-intro";
import { ProductsCatalog } from "@/components/product/products-catalog";
import { ProductCardSkeleton } from "@/components/product/product-card";
import { Container } from "@/components/layout/container";
import { getShopEdit } from "@/data/shop-edits";
import { getProducts } from "@/lib/products";

function CatalogFallback() {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <li key={i}>
          <ProductCardSkeleton />
        </li>
      ))}
    </ul>
  );
}

export async function generateMetadata({ params }) {
  const { edit } = await params;
  const config = getShopEdit(edit);
  if (!config) {
    return { title: "Collection" };
  }
  return {
    title: config.label,
    description: `Shop ${config.label} — Maaleen.`,
  };
}

export default async function CollectionEditPage({ params }) {
  const { edit } = await params;
  if (!getShopEdit(edit)) {
    notFound();
  }

  const products = getProducts();

  return (
    <Container className="py-10 sm:py-14">
      <ProductShopIntro />
      <div
        aria-hidden
        className="mt-10 w-screen max-w-none border-b border-stone-200 sm:mt-12 ml-[calc(50%-50vw)]"
      />
      <div className="mt-12">
        <ProductsCatalog products={products} />
      </div>
    </Container>
  );
}
