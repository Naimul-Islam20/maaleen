"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/contexts/cart-context";
import { Container } from "@/components/layout/container";

const nav = [
  { href: "/products", label: "Shop" },
  { href: "/products?category=dress", label: "Dresses" },
  { href: "/cart", label: "Cart" },
];

export function SiteHeader() {
  const { totalItems, ready } = useCart();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-[var(--surface)]/90 backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between gap-4 sm:h-16">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-xl tracking-tight text-stone-900 sm:text-2xl"
        >
          Maaleen
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {nav.map(({ href, label }) => {
            const active =
              href === "/"
                ? pathname === "/"
                : pathname.startsWith(href.split("?")[0]);
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm transition-colors hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                  active ? "text-[var(--accent)]" : "text-stone-600"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/products"
            className="md:hidden text-sm text-stone-600 hover:text-[var(--accent)]"
          >
            Shop
          </Link>
          <Link
            href="/cart"
            className="relative inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-stone-200 bg-[var(--surface-elevated)] text-sm font-medium text-stone-800 transition-colors hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            aria-label={`Shopping cart, ${ready ? totalItems : 0} items`}
          >
            <span aria-hidden>Bag</span>
            {ready && totalItems > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-semibold text-white">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            ) : null}
          </Link>
        </div>
      </Container>
    </header>
  );
}
