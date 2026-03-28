"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "./product-card";

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "name", label: "Name A–Z" },
];

export function ProductsCatalog({ products, categories }) {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category") ?? "";

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(categoryFromUrl);
  const [sizeFilter, setSizeFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    setCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const allSizes = useMemo(() => {
    const s = new Set();
    products.forEach((p) => p.sizes?.forEach((x) => s.add(x)));
    return [...s].sort();
  }, [products]);

  const allColors = useMemo(() => {
    const s = new Set();
    products.forEach((p) => p.colors?.forEach((c) => s.add(c.name)));
    return [...s].sort();
  }, [products]);

  const filtered = useMemo(() => {
    let list = [...products];

    if (category) {
      list = list.filter((p) => p.category === category);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q)),
      );
    }
    if (sizeFilter) {
      list = list.filter((p) => p.sizes?.includes(sizeFilter));
    }
    if (colorFilter) {
      list = list.filter((p) =>
        p.colors?.some((c) => c.name === colorFilter),
      );
    }

    if (sort === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list.sort((a, b) => {
        const af = a.tags?.includes("featured") ? 1 : 0;
        const bf = b.tags?.includes("featured") ? 1 : 0;
        if (bf !== af) return bf - af;
        const an = a.tags?.includes("new") ? 1 : 0;
        const bn = b.tags?.includes("new") ? 1 : 0;
        return bn - an;
      });
    }

    return list;
  }, [products, category, query, sizeFilter, colorFilter, sort]);

  return (
    <div>
      <div className="mb-8 space-y-4 rounded-xl border border-stone-200 bg-[var(--surface-elevated)] p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex-1 space-y-3">
            <label className="block">
              <span className="sr-only">Search products</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or description…"
                className="w-full rounded-lg border border-stone-200 bg-[var(--surface)] px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/25"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCategory("")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  !category
                    ? "bg-stone-900 text-white"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    category === c.id
                      ? "bg-stone-900 text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <label className="flex flex-col gap-1 text-xs font-medium text-stone-500">
              Size
              <select
                value={sizeFilter}
                onChange={(e) => setSizeFilter(e.target.value)}
                className="rounded-lg border border-stone-200 bg-[var(--surface)] px-2 py-2 text-sm text-stone-900 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/25"
              >
                <option value="">Any</option>
                {allSizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-xs font-medium text-stone-500">
              Color
              <select
                value={colorFilter}
                onChange={(e) => setColorFilter(e.target.value)}
                className="rounded-lg border border-stone-200 bg-[var(--surface)] px-2 py-2 text-sm text-stone-900 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/25"
              >
                <option value="">Any</option>
                {allColors.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-xs font-medium text-stone-500">
              Sort
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-lg border border-stone-200 bg-[var(--surface)] px-2 py-2 text-sm text-stone-900 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/25"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50 px-6 py-16 text-center">
          <p className="font-[family-name:var(--font-display)] text-xl text-stone-800">
            No pieces match
          </p>
          <p className="mt-2 text-sm text-stone-600">
            Try clearing filters or search — or browse the full collection.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("");
              setSizeFilter("");
              setColorFilter("");
              setSort("featured");
            }}
            className="mt-6 inline-flex rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
