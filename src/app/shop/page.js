import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ProductShopIntro } from "@/components/product/product-shop-intro";
import { ProductsCatalog } from "@/components/product/products-catalog";
import { Container } from "@/components/layout/container";
import { getShopEdit } from "@/data/shop-edits";
import { getProducts } from "@/lib/products";

export const metadata = {
  title: "Shop",
  description: "Browse every Maaleen piece in one place.",
};

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

export default async function ShopPage({ searchParams }) {
  const sp = await searchParams;
  const raw = sp?.edit;
  const editParam =
    typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : "";
  const trimmed = editParam?.trim() ?? "";
  if (trimmed && getShopEdit(trimmed)) {
    redirect(`/collections/${encodeURIComponent(trimmed)}`);
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
