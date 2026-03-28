import { Suspense } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ProductsCatalog } from "@/components/product/products-catalog";
import { getCategories, getProducts } from "@/lib/products";

export const metadata = {
  title: "Shop",
  description: "Browse dresses, tops, bottoms, and outerwear from Maaleen.",
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

export default function ProductsPage() {
  const products = getProducts();
  const categories = getCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/products", label: "Shop", current: true },
        ]}
      />
      <h1 className="mt-6 font-[family-name:var(--font-display)] text-3xl tracking-tight text-stone-900 sm:text-4xl">
        Collection
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-600">
        Filter by category, size, or color — or search by name. Every piece is
        stocked in limited runs.
      </p>
      <div className="mt-10">
        <Suspense fallback={<CatalogFallback />}>
          <ProductsCatalog products={products} categories={categories} />
        </Suspense>
      </div>
    </div>
  );
}
