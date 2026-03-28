"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useCart } from "@/contexts/cart-context";
import { Container } from "@/components/layout/container";
import { buildShopEditHref, getShopEdit } from "@/data/shop-edits";

function HeartIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function BagIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

/** Active state for main nav links. */
function navHrefIsActive(href, pathname, searchParams) {
  if (href === "/cart") return pathname === "/cart";

  const onCollectionEdit =
    pathname.startsWith("/collections/") && pathname !== "/collections";

  if (href === "/collections") {
    return pathname === "/collections" || onCollectionEdit;
  }

  if (href === "/shop") {
    if (pathname.startsWith("/shop/")) return true;
    if (onCollectionEdit) return false;
    if (pathname !== "/shop") return false;
    const edit = searchParams.get("edit");
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    return !edit && !category && !tag;
  }

  if (href.startsWith("/collections/") && !href.includes("?")) {
    const wantSlug = href.slice("/collections/".length).replace(/\/$/, "");
    if (pathname === `/collections/${wantSlug}`) return true;
    if (
      wantSlug === "evening-silhouettes" &&
      (pathname === "/shop" || pathname === "/products") &&
      searchParams.get("category") === "dress"
    ) {
      return true;
    }
    return false;
  }

  const [path, queryString = ""] = href.split("?");
  if (path !== "/products" && path !== "/shop") return false;

  const q = new URLSearchParams(queryString);
  const wantEdit = q.get("edit");
  const wantCat = q.get("category");

  if (wantEdit && getShopEdit(wantEdit)) {
    return pathname === `/collections/${wantEdit}`;
  }
  if (wantCat != null) {
    return (
      (pathname === "/shop" || pathname === "/products") &&
      searchParams.get("category") === wantCat
    );
  }

  if (pathname.startsWith("/shop/")) return true;
  if (pathname === "/shop" || pathname === "/products") {
    const hasListFilter = Boolean(
      searchParams.get("edit") ||
        searchParams.get("category") ||
        searchParams.get("tag"),
    );
    return !hasListFilter;
  }
  return false;
}

const navLinkClass = (active) =>
  `text-sm font-medium transition-colors hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
    active ? "text-[var(--accent)]" : "text-stone-600"
  }`;

function MainNavLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <>
      <Link
        href="/shop"
        className={navLinkClass(
          navHrefIsActive("/shop", pathname, searchParams),
        )}
      >
        Shop
      </Link>
      <Link
        href="/collections"
        className={navLinkClass(
          navHrefIsActive("/collections", pathname, searchParams),
        )}
      >
        Collections
      </Link>
      <Link
        href={buildShopEditHref("evening-silhouettes")}
        className={navLinkClass(
          navHrefIsActive(
            buildShopEditHref("evening-silhouettes"),
            pathname,
            searchParams,
          ),
        )}
      >
        Dresses
      </Link>
      <Link
        href="/cart"
        className={navLinkClass(
          navHrefIsActive("/cart", pathname, searchParams),
        )}
      >
        Cart
      </Link>
    </>
  );
}

function MainNavFallback() {
  return (
    <>
      <Link href="/shop" className="text-sm font-medium text-stone-600">
        Shop
      </Link>
      <Link href="/collections" className="text-sm font-medium text-stone-600">
        Collections
      </Link>
      <Link
        href={buildShopEditHref("evening-silhouettes")}
        className="text-sm font-medium text-stone-600"
      >
        Dresses
      </Link>
      <Link href="/cart" className="text-sm font-medium text-stone-600">
        Cart
      </Link>
    </>
  );
}

export function SiteHeader() {
  const { totalItems, ready } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-[var(--surface)]/90 backdrop-blur-md">
      <Container>
        <div className="relative flex min-h-14 items-center justify-end sm:min-h-16">
          <Link
            href="/"
            className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 font-[family-name:var(--font-display)] text-xl tracking-tight text-stone-900 sm:text-2xl"
          >
            Maaleen
          </Link>
          <div className="relative z-20 flex items-center gap-1 sm:gap-2">
            <Link
              href="/wishlist"
              className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-transparent text-stone-700 transition-colors hover:border-stone-200 hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              aria-label="Wishlist"
            >
              <HeartIcon className="h-5 w-5" />
            </Link>
            <Link
              href="/cart"
              className="relative inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-transparent text-stone-700 transition-colors hover:border-stone-200 hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              aria-label={`Shopping bag, ${ready ? totalItems : 0} items`}
            >
              <BagIcon className="h-5 w-5" />
              {ready && totalItems > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[9px] font-semibold text-white">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              ) : null}
            </Link>
          </div>
        </div>

        <nav
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 border-t border-stone-200 py-3 sm:gap-x-12"
          aria-label="Main"
        >
          <Suspense fallback={<MainNavFallback />}>
            <MainNavLinks />
          </Suspense>
        </nav>
      </Container>
    </header>
  );
}
