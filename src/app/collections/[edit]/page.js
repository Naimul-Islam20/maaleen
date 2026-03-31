import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductShopIntro } from "@/components/product/product-shop-intro";
import { ProductsCatalog } from "@/components/product/products-catalog";
import { Container } from "@/components/layout/container";
import { getShopEdit } from "@/data/shop-edits";
import { getProducts } from "@/lib/products";

function CatalogFallback() {
  return (
    <div className="animate-pulse space-y-4 rounded-xl border border-stone-200 bg-stone-100/60 p-6">
      <div className="h-10 rounded-lg bg-stone-200" />
      <div className="h-8 max-w-md rounded bg-stone-200" />
      <div className="grid grid-cols-2 gap-4 pt-6 sm:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-[4/5] rounded-lg bg-stone-200" />
        ))}
      </div>
    </div>
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
      <Suspense
        fallback={
          <div className="space-y-4" aria-hidden>
            <div className="h-5 max-w-xs animate-pulse rounded bg-stone-200" />
            <div className="h-9 max-w-sm animate-pulse rounded bg-stone-200 sm:h-10" />
            <div className="h-4 max-w-md animate-pulse rounded bg-stone-200" />
          </div>
        }
      >
        <ProductShopIntro />
      </Suspense>
      <div
        aria-hidden
        className="mt-8 w-screen max-w-none border-b border-stone-200 sm:mt-10 ml-[calc(50%-50vw)]"
      />
      <div className="mt-10">
        <Suspense fallback={<CatalogFallback />}>
          <ProductsCatalog products={products} />
        </Suspense>
      </div>
    </Container>
  );
}
