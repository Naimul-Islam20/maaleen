"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";
import { formatPrice } from "@/lib/format";

export function CartView() {
  const { items, ready, updateQuantity, removeItem, subtotal } = useCart();

  if (!ready) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-24 rounded-lg bg-stone-200" />
        <div className="h-24 rounded-lg bg-stone-200" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50 px-6 py-16 text-center">
        <p className="font-[family-name:var(--font-display)] text-2xl text-stone-900">
          Your bag is empty
        </p>
        <p className="mt-2 text-sm text-stone-600">
          Discover dresses and layers curated for the season.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-flex rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-3">
      <ul className="space-y-6 lg:col-span-2">
        {items.map((line) => (
          <li
            key={line.lineId}
            className="flex gap-4 rounded-xl border border-stone-200 bg-[var(--surface-elevated)] p-4 shadow-sm"
          >
            <Link
              href={`/shop/${line.slug}`}
              className="relative h-28 w-24 shrink-0 overflow-hidden rounded-lg bg-stone-200 sm:h-32 sm:w-28"
            >
              {line.image ? (
                <Image
                  src={line.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              ) : null}
            </Link>
            <div className="min-w-0 flex-1">
              <Link
                href={`/shop/${line.slug}`}
                className="font-medium text-stone-900 hover:text-[var(--accent)]"
              >
                {line.name}
              </Link>
              <p className="mt-1 text-xs text-stone-500">
                {line.size} · {line.color}
              </p>
              <p className="mt-2 text-sm text-stone-800">
                {formatPrice(line.price, line.currency)} each
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-xs text-stone-500">
                  Qty
                  <select
                    value={line.quantity}
                    onChange={(e) =>
                      updateQuantity(line.lineId, Number(e.target.value))
                    }
                    className="rounded border border-stone-200 bg-[var(--surface)] px-2 py-1 text-sm text-stone-900"
                  >
                    {Array.from(
                      { length: Math.max(12, line.quantity) },
                      (_, i) => i + 1,
                    ).map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  onClick={() => removeItem(line.lineId)}
                  className="text-xs font-medium text-[var(--accent)] underline-offset-2 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
            <p className="shrink-0 text-sm font-semibold text-stone-900">
              {formatPrice(line.price * line.quantity, line.currency)}
            </p>
          </li>
        ))}
      </ul>
      <aside className="h-fit rounded-xl border border-stone-200 bg-[var(--surface-elevated)] p-6 shadow-sm lg:sticky lg:top-24">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
          Order summary
        </h2>
        <p className="mt-4 flex justify-between text-sm text-stone-600">
          <span>Subtotal</span>
          <span className="font-medium text-stone-900">
            {items[0] ? formatPrice(subtotal, items[0].currency) : ""}
          </span>
        </p>
        <p className="mt-2 text-xs text-stone-500">
          Shipping and tax calculated at checkout (coming soon).
        </p>
        <Link
          href="/checkout"
          className="mt-6 flex w-full items-center justify-center rounded-full bg-stone-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          Checkout
        </Link>
        <Link
          href="/shop"
          className="mt-3 block text-center text-sm text-[var(--accent)] hover:underline"
        >
          Continue shopping
        </Link>
      </aside>
    </div>
  );
}
