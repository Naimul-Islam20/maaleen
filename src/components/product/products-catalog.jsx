"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  getShopEdit,
  parseCollectionEditSlugFromPathname,
} from "@/data/shop-edits";
import { ProductCard } from "./product-card";

export function ProductsCatalog({ products }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathSlug = parseCollectionEditSlugFromPathname(pathname);
  const querySlug = searchParams.get("edit")?.trim() ?? "";
  const editSlug = pathSlug || querySlug;
  const edit = editSlug ? getShopEdit(editSlug) : null;
  const categoryFromUrl = searchParams.get("category") ?? "";
  const tagFromUrl = searchParams.get("tag") ?? "";

  const filtered = useMemo(() => {
    let list = [...products];

    if (edit) {
      if (edit.tag === "new") {
        list = list.filter((p) => p.tags?.includes("new"));
      } else if (edit.category) {
        list = list.filter((p) => p.category === edit.category);
      }
      return list;
    }

    if (tagFromUrl === "new") {
      list = list.filter((p) => p.tags?.includes("new"));
    } else if (categoryFromUrl) {
      list = list.filter((p) => p.category === categoryFromUrl);
    }
    return list;
  }, [products, edit, categoryFromUrl, tagFromUrl]);

  const resetToAll = () => {
    if (pathSlug) {
      router.push("/shop", { scroll: false });
      return;
    }
    router.push(pathname, { scroll: false });
  };

  return (
    <div>
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50 px-6 py-16 text-center">
          <p className="font-[family-name:var(--font-display)] text-xl text-stone-800">
            No pieces in this edit
          </p>
          <p className="mt-2 text-sm text-stone-600">
            Try another link or see everything in the shop.
          </p>
          <button
            type="button"
            onClick={resetToAll}
            className="mt-6 inline-flex rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            All pieces
          </button>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
