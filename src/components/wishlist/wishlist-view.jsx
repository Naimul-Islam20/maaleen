"use client";

import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { useWishlist } from "@/contexts/wishlist-context";
import { formatPrice } from "@/lib/format";

export function WishlistView() {
  const { items, ready, removeItem } = useWishlist();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/wishlist", label: "Wishlist", current: true },
        ]}
      />
      <h1 className="mt-6 font-[family-name:var(--font-display)] text-3xl text-stone-900">
        Wishlist
      </h1>
      <p className="mt-2 text-sm text-stone-600">
        Saved on this device — sign-in sync can be added later.
      </p>

      {!ready ? (
        <p className="mt-10 text-sm text-stone-500">Loading…</p>
      ) : items.length === 0 ? (
        <p className="mt-10 text-center text-sm text-stone-600">
          Nothing saved yet. Tap the heart on a product to add it here.
        </p>
      ) : (
        <ul className="mt-10 divide-y divide-stone-200 rounded-xl border border-stone-200 px-4 sm:px-5">
          {items.map((item) => (
            <li
              key={item.productId}
              className="flex gap-4 py-5 sm:gap-5"
            >
              <Link
                href={`/shop/${item.slug}`}
                className="relative h-28 w-20 shrink-0 overflow-hidden rounded-lg bg-stone-200 sm:h-32 sm:w-24"
              >
                <ImageWithFallback
                    src={item.image}
                    alt=""
                    imageClassName="object-cover"
                    sizes="96px"
                    fallbackClassName="flex h-full w-full flex-col items-center justify-center gap-1 bg-stone-200 text-stone-500"
                    fallbackLabelClassName="font-[family-name:var(--font-display)] text-[11px] tracking-[0.16em] sm:text-xs"
                    fallbackSubLabel="no image"
                    fallbackSubLabelClassName="text-[8px] font-medium uppercase tracking-[0.18em] text-stone-400"
                  />
              </Link>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/shop/${item.slug}`}
                  className="font-medium text-stone-900 hover:text-[var(--accent)]"
                >
                  {item.name}
                </Link>
                <p className="mt-1 text-sm text-stone-700">
                  {formatPrice(item.price, item.currency)}
                </p>
                <button
                  type="button"
                  onClick={() => removeItem(item.productId)}
                  className="mt-3 text-sm font-medium text-stone-500 underline-offset-2 hover:text-[var(--accent)] hover:underline"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/shop"
        className="mt-10 inline-flex rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white hover:bg-stone-800"
      >
        Browse shop
      </Link>
    </div>
  );
}
