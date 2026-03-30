"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/contexts/toast-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { formatPrice } from "@/lib/format";
import { ProductCard } from "./product-card";

export function ProductDetail({ product, related }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const { addItem } = useCart();
  const { showToast } = useToast();
  const { toggleItem, isWishlisted, ready: wishReady } = useWishlist();

  const images = product.images ?? [];
  const main = images[imageIndex] ?? images[0];
  const onSale =
    product.compareAtPrice != null && product.compareAtPrice > product.price;
  const canAdd = Boolean(size && color && main);

  function handleAdd() {
    if (!canAdd) return;
    const colorObj = product.colors?.find((c) => c.name === color);
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      currency: product.currency,
      image: main,
      size,
      color,
      quantity: 1,
    });
    showToast(`${product.name} added to your bag`);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
      <div className="space-y-3">
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl bg-stone-200 sm:aspect-[4/4]">
          {main ? (
            <Image
              src={main}
              alt={`${product.name} — view ${imageIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : null}
        </div>
        {images.length > 1 ? (
          <ul className="flex gap-2 overflow-x-auto pb-1">
            {images.map((src, i) => (
              <li key={src}>
                <button
                  type="button"
                  onClick={() => setImageIndex(i)}
                  className={`relative block h-20 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
                    i === imageIndex
                      ? "border-[var(--accent)]"
                      : "border-transparent ring-1 ring-stone-200"
                  }`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-stone-900 sm:text-4xl">
            {product.name}
          </h1>
          <button
            type="button"
            aria-label={
              wishReady && isWishlisted(product.id)
                ? "Remove from wishlist"
                : "Add to wishlist"
            }
            aria-pressed={wishReady && isWishlisted(product.id)}
            onClick={() =>
              toggleItem({
                productId: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                currency: product.currency,
                image: main,
              })
            }
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-[var(--surface-elevated)] text-stone-700 transition-colors hover:border-stone-300 hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={
                wishReady && isWishlisted(product.id)
                  ? "currentColor"
                  : "none"
              }
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={
                wishReady && isWishlisted(product.id)
                  ? "h-5 w-5 text-[var(--accent)]"
                  : "h-5 w-5"
              }
              aria-hidden
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
        <div className="mt-3 flex flex-wrap items-baseline gap-2">
          <span className="text-xl text-stone-900">
            {formatPrice(product.price, product.currency)}
          </span>
          {onSale ? (
            <span className="text-lg text-stone-400 line-through">
              {formatPrice(product.compareAtPrice, product.currency)}
            </span>
          ) : null}
        </div>
        <p className="mt-6 text-sm leading-relaxed text-stone-600">
          {product.description}
        </p>

        <div className="mt-8 space-y-6">
          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Size
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {(product.sizes ?? []).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`min-h-10 min-w-10 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    size === s
                      ? "border-stone-900 bg-stone-900 text-white"
                      : "border-stone-200 bg-[var(--surface-elevated)] text-stone-800 hover:border-stone-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Color
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {(product.colors ?? []).map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColor(c.name)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                    color === c.name
                      ? "border-stone-900 ring-2 ring-stone-900/20"
                      : "border-stone-200 bg-[var(--surface-elevated)] hover:border-stone-400"
                  }`}
                >
                  <span
                    className="h-4 w-4 rounded-full border border-stone-300"
                    style={{ backgroundColor: c.hex }}
                    aria-hidden
                  />
                  {c.name}
                </button>
              ))}
            </div>
          </fieldset>

          {!canAdd ? (
            <p className="text-sm text-stone-500">
              Select a size and color to add this piece to your bag.
            </p>
          ) : null}

          <button
            type="button"
            disabled={!canAdd}
            onClick={handleAdd}
            className="w-full rounded-full bg-stone-900 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:w-auto sm:min-w-[200px] sm:px-10"
          >
            Add to bag
          </button>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="border-t border-stone-200 pt-12 lg:col-span-2">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-stone-900">
            You may also like
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            {related.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
