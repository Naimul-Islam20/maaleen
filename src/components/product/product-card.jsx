"use client";

import Link from "next/link";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { formatPrice } from "@/lib/format";
import { useWishlist } from "@/contexts/wishlist-context";

function HeartIcon({ filled, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-[1.65rem] w-[1.65rem] ${className}`}
      aria-hidden
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export function ProductCard({ product }) {
  const image = product.images?.[0];
  const onSale =
    product.compareAtPrice != null && product.compareAtPrice > product.price;
  const isNew = product.tags?.includes("new");
  const { toggleItem, isWishlisted, ready } = useWishlist();
  const wishlisted = ready && isWishlisted(product.id);

  return (
    <article className="group relative">
      <Link
        href={`/shop/${product.slug}`}
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-stone-200">
          <ImageWithFallback
              src={image}
              alt={`${product.name}${product.colors?.[0] ? ` — ${product.colors[0].name}` : ""}`}
              imageClassName="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              fallbackClassName="flex h-full w-full flex-col items-center justify-center gap-1 bg-stone-200 text-stone-500"
              fallbackLabelClassName="font-[family-name:var(--font-display)] text-xl tracking-[0.18em] sm:text-2xl lg:text-4xl"
              fallbackSubLabel="image coming soon"
              fallbackSubLabelClassName="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-400 sm:text-xs"
            />
          <div className="pointer-events-none absolute left-2 top-2 flex flex-wrap gap-1">
            {onSale ? (
              <span className="rounded bg-[var(--accent)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                Sale
              </span>
            ) : null}
            {isNew && !onSale ? (
                <span className="rounded bg-[var(--accent)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                  New
                </span>
            ) : null}
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <h2 className="font-medium text-stone-900 transition-colors group-hover:text-[var(--accent)]">
            {product.name}
          </h2>
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-sm text-stone-800">
              {formatPrice(product.price, product.currency)}
            </span>
            {onSale ? (
              <span className="text-sm text-stone-400 line-through">
                {formatPrice(product.compareAtPrice, product.currency)}
              </span>
            ) : null}
          </div>
        </div>
      </Link>
      <button
        type="button"
        aria-label={
          wishlisted ? "Remove from wishlist" : "Add to wishlist"
        }
        aria-pressed={wishlisted}
        onClick={() =>
          toggleItem({
            productId: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            currency: product.currency,
            image,
          })
        }
        className="absolute right-2 top-2 z-10 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      >
        <HeartIcon
          filled={wishlisted}
          className={
            wishlisted
              ? "h-[1.4rem] w-[1.4rem] fill-[var(--icon-button-bg)] text-[var(--icon-button-bg)]"
              : "h-[1.4rem] w-[1.4rem] text-[var(--icon-button-bg)]"
          }
        />
      </button>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="relative aspect-[4/5] rounded-lg bg-stone-200">
        <div className="absolute right-2 top-2 h-11 w-11 rounded-full bg-stone-100/80" />
      </div>
      <div className="mt-3 space-y-1">
        <div className="h-4 w-3/4 rounded bg-stone-200" />
        <div className="h-3.5 w-1/4 rounded bg-stone-200" />
      </div>
    </div>
  );
}
