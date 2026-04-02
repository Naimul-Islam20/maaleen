"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { Container } from "@/components/layout/container";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { getShopEdit } from "@/data/shop-edits";
import { formatPrice } from "@/lib/format";

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

function UserIcon({ className }) {
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
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19.5C5.8 16.5 8.6 15 12 15s6.2 1.5 7 4.5" />
    </svg>
  );
}
function SearchIcon({ className }) {
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
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function CloseIcon({ className }) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function ChevronDownIcon({ className }) {
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
      <path d="m6 9 6 6 6-6" />
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
  `text-sm font-medium transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
    active ? "text-white" : "text-white/85"
  }`;

function MainNavLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <>
      <Link
        href="/collections"
        className={navLinkClass(
          navHrefIsActive("/collections", pathname, searchParams),
        )}
      >
        Collections
      </Link>
      <Link
        href="/shop"
        className={navLinkClass(
          navHrefIsActive("/shop", pathname, searchParams),
        )}
      >
        Shop
      </Link>
    </>
  );
}

function MainNavFallback() {
  return (
    <>
      <Link href="/shop" className="text-sm font-medium text-white/85">
        Shop
      </Link>
      <Link href="/collections" className="text-sm font-medium text-white/85">
        Collections
      </Link>
      <Link href="/cart" className="text-sm font-medium text-white/85">
        Cart
      </Link>
    </>
  );
}

export function SiteHeader() {
  const {
    totalItems,
    ready,
    items: cartItems,
    subtotal,
    updateQuantity,
    removeItem: removeCartItem,
  } = useCart();
  const {
    totalItems: wishCount,
    ready: wishReady,
    items: wishItems,
    removeItem: removeWishlistItem,
  } = useWishlist();
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [wishlistFromBottom, setWishlistFromBottom] = useState(true);
  const [cartMounted, setCartMounted] = useState(false);
  const [cartFromBottom, setCartFromBottom] = useState(true);
  const [logoError, setLogoError] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("BD");
  const [countryOpen, setCountryOpen] = useState(false);
  const wishlistPopoverRef = useRef(null);
  const searchAreaRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const countryPopoverRef = useRef(null);

  useEffect(() => {
    if (!wishlistOpen) return;
    function onClick(event) {
      if (!wishlistPopoverRef.current) return;
      if (wishlistPopoverRef.current.contains(event.target)) return;
      setWishlistOpen(false);
    }
    function onKey(event) {
      if (event.key === "Escape") setWishlistOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [wishlistOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    function onClick(event) {
      if (searchAreaRef.current?.contains(event.target)) return;
      if (mobileSearchRef.current?.contains(event.target)) return;
      setSearchOpen(false);
    }
    function onKey(event) {
      if (event.key === "Escape") setSearchOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [searchOpen]);

  useEffect(() => {
    if (!countryOpen) return;
    function onClick(event) {
      if (countryPopoverRef.current?.contains(event.target)) return;
      setCountryOpen(false);
    }
    function onKey(event) {
      if (event.key === "Escape") setCountryOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [countryOpen]);

  const wishlistPreview = wishItems ?? [];

  const openWishlist = () => {
    if (typeof window !== "undefined") {
      setWishlistFromBottom(window.matchMedia("(max-width: 639px)").matches);
    }
    setWishlistOpen(true);
  };

  const closeWishlist = () => {
    setWishlistOpen(false);
  };

  const openCart = () => {
    if (typeof window !== "undefined") {
      setCartFromBottom(window.matchMedia("(max-width: 639px)").matches);
    }
    setCartMounted(true);
  };

  const closeCart = () => {
    setCartMounted(false);
  };

  useEffect(() => {
    if (!wishlistOpen) return;
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setWishlistFromBottom(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [wishlistOpen]);

  useEffect(() => {
    if (!cartMounted) return;
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setCartFromBottom(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [cartMounted]);
  const noticeItems = [
    "New arrivals every Friday",
    "Free shipping over BDT 3000",
    "Cash on Delivery available nationwide",
    "Flat 10% off on first order with code WELCOME10",
    "Exchange within 7 days (T&C apply)",
    "International shipping now open for Australia",
  ];
  const noticeText = `Notice: ${noticeItems.join("  |  ")}`;

  const toggleSearch = () => {
    setSearchOpen((open) => {
      const nextOpen = !open;
      if (nextOpen) {
        setCountryOpen(false);
      }
      return nextOpen;
    });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[var(--accent)] backdrop-blur-md">
        <Container>
          <div className="relative flex min-h-20 items-center justify-end sm:min-h-24">
            <div
              className="absolute left-0 top-1/2 z-40 -translate-y-1/2"
              ref={searchAreaRef}
            >
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleSearch}
                  className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  aria-label={searchOpen ? "Close search" : "Search"}
                  aria-expanded={searchOpen}
                >
                  {searchOpen ? (
                    <CloseIcon className="h-5 w-5" />
                  ) : (
                    <SearchIcon className="h-5 w-5" />
                  )}
                </button>
                <div
                  className={searchOpen ? "relative hidden" : "relative"}
                  ref={countryPopoverRef}
                >
                  <button
                    type="button"
                    onClick={() => setCountryOpen((open) => !open)}
                    aria-label="Select country"
                    aria-expanded={countryOpen}
                    className="inline-flex h-10 items-center gap-1.5 rounded-full border border-[#E2C7AE] bg-[#FFE6CF] px-2.5 text-xs font-semibold text-stone-900 transition-colors hover:bg-[#F9DABF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span>{selectedCountry === "BD" ? "🇧🇩 BD" : "🇦🇺 AU"}</span>
                    <ChevronDownIcon className="h-3.5 w-3.5" />
                  </button>
                  {countryOpen ? (
                    <div className="absolute left-0 top-full z-40 mt-2 w-44 rounded-xl border border-[#E2C7AE] bg-[#FFE6CF] p-1.5 shadow-lg ring-1 ring-black/10">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCountry("BD");
                          setCountryOpen(false);
                        }}
                        className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-stone-900 transition-colors hover:bg-[#F3D3B8] ${
                          selectedCountry === "BD" ? "bg-[#F3D3B8]" : ""
                        }`}
                      >
                        🇧🇩 Bangladesh
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCountry("AU");
                          setCountryOpen(false);
                        }}
                        className={`mt-1 flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-stone-900 transition-colors hover:bg-[#F3D3B8] ${
                          selectedCountry === "AU" ? "bg-[#F3D3B8]" : ""
                        }`}
                      >
                        🇦🇺 Australia
                      </button>
                    </div>
                  ) : null}
                </div>
                {searchOpen ? (
                  <motion.form
                    action="/shop"
                    method="get"
                    role="search"
                    aria-label="Search products"
                    className="absolute left-12 top-1/2 z-50 hidden -translate-y-1/2 sm:block"
                    initial={{
                      opacity: 0,
                      x: -18,
                      clipPath: "inset(0 100% 0 0 round 9999px)",
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      clipPath: "inset(0 0% 0 0 round 9999px)",
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="relative">
                      <input
                        type="search"
                        name="q"
                        placeholder="Search products"
                        className="h-10 w-[300px] rounded-full border border-white/35 bg-white/10 px-4 pr-20 text-sm text-white placeholder:text-white/70 backdrop-blur-sm outline-none transition-colors focus:border-white lg:w-[420px]"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        Search
                      </button>
                    </div>
                  </motion.form>
                ) : null}
              </div>
            </div>
            <Link
              href="/"
              className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
            >
              {logoError ? (
                <span className="font-[family-name:var(--font-display)] text-xl tracking-tight text-white sm:text-2xl">
                  Maaleen
                </span>
              ) : (
                <Image
                  src="/Maaleen-Logo-1.png"
                  alt="Maaleen"
                  width={340}
                  height={100}
                  priority
                  className="h-20 w-auto object-contain sm:h-24"
                  onError={() => setLogoError(true)}
                />
              )}
            </Link>
            <div className="relative z-20 flex items-center gap-1 sm:gap-2">
              <div className="relative" ref={wishlistPopoverRef}>
                <button
                  type="button"
                  onClick={() => {
                    if (wishlistOpen) {
                      closeWishlist();
                      return;
                    }
                    openWishlist();
                  }}
                  className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-transparent text-white transition-colors hover:border-white/30 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  aria-label={`Wishlist, ${wishReady ? wishCount : 0} saved`}
                  aria-expanded={wishlistOpen}
                >
                  <HeartIcon className="h-5 w-5" />
                  {wishReady && wishCount > 0 ? (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[9px] font-semibold text-white">
                      {wishCount > 99 ? "99+" : wishCount}
                    </span>
                  ) : null}
                </button>
                {wishlistOpen && !wishlistFromBottom ? (
                  <div className="absolute right-0 top-full z-50 mt-2 w-72 max-w-none rounded-xl border border-stone-200 bg-[var(--surface-elevated)] p-4 text-sm shadow-lg ring-1 ring-black/5">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                        Wishlist
                      </p>
                      <p className="text-xs text-stone-600">
                        <span className="font-semibold text-stone-900">
                          Total products
                        </span>{" "}
                        {wishCount}
                      </p>
                    </div>
                    {wishCount === 0 ? (
                      <p className="mt-3 text-xs text-stone-500">
                        No products in your wishlist yet.
                      </p>
                    ) : (
                      <div className="mt-3 min-h-0 flex-1 pr-1">
                        <ul
                          className={`space-y-3 ${
                            wishCount > 4 ? "h-[260px] overflow-y-auto" : ""
                          }`}
                        >
                          {wishlistPreview.map((item) => (
                            <li
                              key={item.productId}
                              className="flex items-center gap-3"
                            >
                              <Link
                                href={`/shop/${item.slug}`}
                                className="flex min-w-0 flex-1 items-center gap-3"
                                onClick={closeWishlist}
                              >
                                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-stone-200">
                                  <ImageWithFallback
                                    src={item.image}
                                    alt=""
                                    useNative
                                    imageClassName="object-cover"
                                    fallbackClassName="flex h-full w-full items-center justify-center bg-stone-200 text-stone-500"
                                    fallbackLabelClassName="text-[9px] font-semibold uppercase tracking-[0.14em]"
                                  />
                                </div>
                                <div className="min-w-0">
                                  <div className="flex h-12 flex-col justify-between">
                                    <div className="truncate text-sm font-medium text-stone-900">
                                      {item.name}
                                    </div>
                                    <div className="text-sm text-stone-700">
                                      {formatPrice(item.price, item.currency)}
                                    </div>
                                  </div>
                                </div>
                              </Link>
                              <button
                                type="button"
                                aria-label="Remove from wishlist"
                                onClick={() =>
                                  removeWishlistItem(item.productId)
                                }
                                className="ml-1 inline-flex h-7 w-7 items-center justify-center text-stone-400 hover:text-stone-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                              >
                                <span
                                  aria-hidden
                                  className="text-base leading-none"
                                >
                                  ×
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <Link
                      href="/wishlist"
                      className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                      onClick={closeWishlist}
                    >
                      View my wishlist
                    </Link>
                  </div>
                ) : null}
              </div>
              <button
                type="button"
                onClick={openCart}
                className="relative inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-transparent text-white transition-colors hover:border-white/30 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label={`Shopping bag, ${ready ? totalItems : 0} items`}
              >
                <BagIcon className="h-5 w-5" />
                {ready && totalItems > 0 ? (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[9px] font-semibold text-white">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                ) : null}
              </button>
              <Link
                href="/login"
                className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full border border-white/35 bg-white/10 px-3 text-xs font-semibold text-white transition-colors hover:border-white/55 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:gap-2 sm:px-4 sm:text-sm"
              >
                <UserIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            </div>
            <AnimatePresence>
              {searchOpen ? (
                <motion.form
                  ref={mobileSearchRef}
                  action="/shop"
                  method="get"
                  role="search"
                  aria-label="Search products"
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute inset-x-0 top-0 bottom-0 z-30 flex items-center bg-[var(--accent)] pl-12 pr-0 sm:hidden"
                >
                  <div className="relative w-full">
                    <input
                      type="search"
                      name="q"
                      placeholder="Search products"
                      autoFocus
                      className="h-11 w-full rounded-full border border-white/35 bg-white/10 px-4 pr-24 text-sm text-white placeholder:text-white/70 backdrop-blur-sm outline-none transition-colors focus:border-white"
                    />
                    <button
                      type="submit"
                      className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Search
                    </button>
                  </div>
                </motion.form>
              ) : null}
            </AnimatePresence>
          </div>

          <nav
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 border-t border-white/20 py-3 sm:gap-x-12"
            aria-label="Main"
          >
            <Suspense fallback={<MainNavFallback />}>
              <MainNavLinks />
            </Suspense>
          </nav>
        </Container>
        <div className="relative w-full border-t border-stone-200 bg-white py-2">
          <div className="maaleen-header-ticker overflow-hidden">
            <div className="maaleen-header-ticker-track flex min-w-max items-center">
              <p className="shrink-0 whitespace-nowrap pr-10 text-[11px] font-medium tracking-wide text-stone-700 sm:text-xs">
                {noticeText}
              </p>
              <p
                aria-hidden
                className="shrink-0 whitespace-nowrap pr-10 text-[11px] font-medium tracking-wide text-stone-700 sm:text-xs"
              >
                {noticeText}
              </p>
            </div>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {wishlistOpen && wishlistFromBottom && (
          <div className="fixed inset-0 z-50">
            <motion.button
              type="button"
              aria-label="Close wishlist"
              onClick={closeWishlist}
              className="absolute inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            />
            <motion.aside
              initial={{ y: "100%", x: 0 }}
              animate={{ x: 0, y: 0 }}
              exit={{ y: "100%", x: 0 }}
              transition={{ duration: 0.26, ease: "easeInOut" }}
              className="fixed bottom-0 left-0 right-0 z-50 flex h-[58vh] max-h-[calc(100dvh-9rem)] min-h-[24rem] flex-col rounded-t-2xl bg-[var(--surface-elevated)] shadow-[0_-12px_40px_rgba(0,0,0,0.15)] ring-1 ring-black/10"
            >
              <div className="flex shrink-0 items-baseline justify-between gap-2 border-b border-stone-200 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                  Wishlist
                </p>
                <p className="text-xs text-stone-600">
                  <span className="font-semibold text-stone-900">
                    Total products
                  </span>{" "}
                  {wishCount}
                </p>
              </div>
              {wishCount === 0 ? (
                <div className="flex min-h-0 flex-1 flex-col px-5 py-4">
                  <p className="mt-2 text-xs text-stone-500">
                    No products in your wishlist yet.
                  </p>
                </div>
              ) : (
                <div className="min-h-0 flex-1 px-5 py-3">
                  <ul
                    className={`space-y-3 ${
                      wishCount > 4
                        ? "maaleen-wishlist-scroll max-h-[17.75rem] overflow-y-scroll pr-1"
                        : ""
                    }`}
                  >
                    {wishlistPreview.map((item) => (
                      <li key={item.productId} className="flex items-center gap-3">
                        <Link
                          href={`/shop/${item.slug}`}
                          className="flex min-w-0 flex-1 items-center gap-3"
                          onClick={closeWishlist}
                        >
                          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-stone-200">
                            <ImageWithFallback
                              src={item.image}
                              alt=""
                              useNative
                              imageClassName="object-cover"
                              fallbackClassName="flex h-full w-full items-center justify-center bg-stone-200 text-stone-500"
                              fallbackLabelClassName="text-[9px] font-semibold uppercase tracking-[0.14em]"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="flex h-12 flex-col justify-between">
                              <div className="truncate text-sm font-medium text-stone-900">
                                {item.name}
                              </div>
                              <div className="text-sm text-stone-700">
                                {formatPrice(item.price, item.currency)}
                              </div>
                            </div>
                          </div>
                        </Link>
                        <button
                          type="button"
                          aria-label="Remove from wishlist"
                          onClick={() => removeWishlistItem(item.productId)}
                          className="ml-1 inline-flex h-7 w-7 items-center justify-center text-stone-400 hover:text-stone-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                        >
                          <span aria-hidden className="text-base leading-none">
                            ×
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <Link
                href="/wishlist"
                className="mx-5 mb-3 mt-0.5 inline-flex w-auto shrink-0 items-center justify-center rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                onClick={closeWishlist}
              >
                View my wishlist
              </Link>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {cartMounted && (
          <div className="fixed inset-0 z-50">
            <motion.button
              type="button"
              aria-label="Close cart"
              onClick={closeCart}
              className="absolute inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            />
            <motion.aside
              initial={
                cartFromBottom ? { y: "100%", x: 0 } : { x: "100%", y: 0 }
              }
              animate={{ x: 0, y: 0 }}
              exit={cartFromBottom ? { y: "100%", x: 0 } : { x: "100%", y: 0 }}
              transition={{ duration: 0.26, ease: "easeInOut" }}
              className={
                cartFromBottom
                  ? "fixed bottom-0 left-0 right-0 z-50 flex h-[84vh] max-h-[calc(100dvh-2.5rem)] flex-col rounded-t-2xl bg-[var(--surface-elevated)] shadow-[0_-12px_40px_rgba(0,0,0,0.15)] ring-1 ring-black/10"
                  : "absolute right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-[var(--surface-elevated)] shadow-xl ring-1 ring-black/10"
              }
            >
              <div className="flex shrink-0 items-center justify-between border-b border-stone-200 px-5 py-4">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-700">
                  Your bag
                </h2>
                <button
                  type="button"
                  onClick={closeCart}
                  className="inline-flex h-7 w-7 items-center justify-center text-stone-400 hover:text-stone-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                >
                  <span aria-hidden className="text-base leading-none">
                    ×
                  </span>
                </button>
              </div>
              <div className="flex min-h-0 flex-1 flex-col">
                <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
                  {!ready ? (
                    <p className="text-sm text-stone-500">Loading…</p>
                  ) : cartItems.length === 0 ? (
                    <div className="mt-6 text-sm text-stone-600">
                      Your bag is empty.
                    </div>
                  ) : (
                    <ul className="space-y-4">
                      {cartItems.map((line) => (
                        <li
                          key={line.lineId}
                          className="flex gap-3 rounded-lg border border-stone-200 bg-[var(--surface)] p-3"
                        >
                          <Link
                            href={`/shop/${line.slug}`}
                            className="relative h-20 w-16 shrink-0 overflow-hidden rounded-md bg-stone-200"
                            onClick={closeCart}
                          >
                            <ImageWithFallback
                              src={line.image}
                              alt=""
                              useNative
                              imageClassName="object-cover"
                              fallbackClassName="flex h-full w-full items-center justify-center bg-stone-200 text-stone-500"
                              fallbackLabelClassName="text-[9px] font-semibold uppercase tracking-[0.14em]"
                            />
                          </Link>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0 flex-1">
                                <Link
                                  href={`/shop/${line.slug}`}
                                  className="truncate text-sm font-medium text-stone-900 hover:text-[var(--accent)]"
                                  onClick={closeCart}
                                >
                                  {line.name}
                                </Link>
                                <p className="mt-1 text-xs text-stone-500">
                                  {line.color}-{line.size}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeCartItem(line.lineId)}
                                className="ml-2 inline-flex h-9 w-9 items-center justify-center text-stone-400 hover:text-stone-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                                aria-label="Remove from bag"
                              >
                                <span
                                  aria-hidden
                                  className="text-xl leading-none font-semibold"
                                >
                                  ×
                                </span>
                              </button>
                            </div>
                            <div className="mt-2 flex items-center justify-between gap-3">
                              <p className="text-sm font-medium text-stone-900">
                                {formatPrice(
                                  line.price * line.quantity,
                                  line.currency,
                                )}
                              </p>
                              <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-[var(--surface)] px-2 py-1 text-xs text-stone-800">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      line.lineId,
                                      line.quantity - 1,
                                    )
                                  }
                                  className="px-1 text-sm leading-none disabled:text-stone-300"
                                  disabled={line.quantity <= 1}
                                  aria-label="Decrease quantity"
                                >
                                  -
                                </button>
                                <span className="min-w-[1.25rem] text-center">
                                  {line.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      line.lineId,
                                      line.quantity + 1,
                                    )
                                  }
                                  className="px-1 text-sm leading-none"
                                  aria-label="Increase quantity"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="shrink-0 border-t border-stone-200 px-5 py-4">
                  {ready && cartItems.length > 0 ? (
                    <>
                      <div className="flex items-center justify-between text-sm text-stone-700">
                        <span>Subtotal</span>
                        <span className="font-semibold text-stone-900">
                          {formatPrice(subtotal, cartItems[0].currency)}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-stone-500">
                        Shipping and tax calculated at checkout.
                      </p>
                      <Link
                        href="/checkout"
                        className="mt-4 flex w-full items-center justify-center rounded-full bg-stone-900 py-3 text-sm font-semibold text-white hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                        onClick={closeCart}
                      >
                        Checkout
                      </Link>
                      <Link
                        href="/cart"
                        className="mt-2 block text-center text-xs font-medium text-[var(--accent)] hover:underline"
                        onClick={closeCart}
                      >
                        View full bag
                      </Link>
                    </>
                  ) : null}
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
