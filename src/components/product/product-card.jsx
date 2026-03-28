import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product }) {
  const image = product.images?.[0];
  const onSale =
    product.compareAtPrice != null && product.compareAtPrice > product.price;
  const isNew = product.tags?.includes("new");

  return (
    <article className="group">
      <Link
        href={`/shop/${product.slug}`}
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-stone-200">
          {image ? (
            <Image
              src={image}
              alt={`${product.name}${product.colors?.[0] ? ` — ${product.colors[0].name}` : ""}`}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : null}
          <div className="pointer-events-none absolute left-2 top-2 flex flex-wrap gap-1">
            {onSale ? (
              <span className="rounded bg-[var(--accent)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                Sale
              </span>
            ) : null}
            {isNew && !onSale ? (
              <span className="rounded bg-stone-900/85 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                New
              </span>
            ) : null}
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <h2 className="font-medium text-stone-900 group-hover:text-[var(--accent)] transition-colors">
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
    </article>
  );
}
