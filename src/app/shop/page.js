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
    <div className="animate-pulse">
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <li key={i}>
            <div className="relative">
              <div className="aspect-[4/5] rounded-lg bg-stone-200" />
              <div className="absolute right-2 top-2 h-9 w-9 rounded-full bg-stone-100" />
            </div>
            <div className="mt-3 space-y-2">
              <div className="h-4 w-3/4 rounded bg-stone-200" />
              <div className="h-4 w-1/2 rounded bg-stone-200" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function IntroFallback() {
  return (
    <div className="animate-pulse text-center" aria-hidden>
      <div className="mx-auto h-3 w-28 rounded bg-stone-200" />
      <div className="mx-auto mt-3 h-9 w-40 rounded bg-stone-200 sm:h-10" />
      <div className="mt-5 flex justify-center">
        <div className="h-4 w-48 rounded bg-stone-200" />
      </div>
    </div>
  );
}

function DividerFallback() {
  return (
    <div
      aria-hidden
      className="mt-8 w-screen max-w-none border-b border-stone-200 sm:mt-10 ml-[calc(50%-50vw)]"
    />
  );
}

function ShopPageSkeleton() {
  return (
    <>
      <IntroFallback />
      <DividerFallback />
      <div className="mt-10">
        <CatalogFallback />
      </div>
    </>
  );
}

function ShopContent({ products }) {
  return (
    <>
      <Suspense fallback={<IntroFallback />}>
        <ProductShopIntro />
      </Suspense>
      <DividerFallback />
      <div className="mt-10">
        <Suspense fallback={<CatalogFallback />}>
          <ProductsCatalog products={products} />
        </Suspense>
      </div>
    </>
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
      <Suspense fallback={<ShopPageSkeleton />}>
        <ShopContent products={products} />
      </Suspense>
    </Container>
  );
}
