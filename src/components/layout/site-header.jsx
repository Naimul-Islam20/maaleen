"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { useCountry } from "@/contexts/country-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { ChromeContainer } from "@/components/layout/container";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { getShopEdit } from "@/data/shop-edits";
import { formatPrice } from "@/lib/format";
import { getProductBySlug } from "@/lib/products";
import { sizeOptionLabel } from "@/lib/size-chart";
import { QuickAddModal } from "@/components/product/quick-add-modal";

function HeartIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
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
      strokeWidth="2.25"
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

function TruckIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
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
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function HomeIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function CollectionsIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
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
      strokeWidth="2.25"
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

function MenuIcon({ className = "h-6 w-6" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function TrashIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
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
      strokeWidth="2.25"
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

const BOTTOM_CHIP = 48; // h-12
const BOTTOM_GAP = 8;
const BOTTOM_GAP_RING = BOTTOM_CHIP + BOTTOM_GAP * 2; // 64
const BOTTOM_NOTCH_R = 36; // soft rounded bowl (same look as before)
const BOTTOM_DOCK_H = 60;
const BOTTOM_DOCK_SPRING = { stiffness: 340, damping: 30 };

const bottomBarIdleBtn =
  "mx-auto flex h-11 w-11 items-center justify-center rounded-full text-[var(--primary)]/80 transition-opacity duration-200";
const bottomBarActiveChip =
  "flex h-12 w-12 items-center justify-center rounded-full bg-[var(--secondary)] text-[var(--primary)] shadow-[0_10px_28px_rgba(0,0,0,0.38),0_2px_6px_rgba(0,0,0,0.2)]";

function getBottomBarActiveIndex({
  pathname,
  bottomBarPanelOpen,
  wishlistOpen,
  cartMounted,
  searchOpen,
}) {
  if (searchOpen) return 4;
  if (cartMounted) return 2;
  if (wishlistOpen) return 1;
  if (
    (pathname === "/account" || pathname === "/login") &&
    !bottomBarPanelOpen
  ) {
    return 3;
  }
  if (pathname === "/" && !bottomBarPanelOpen) return 0;
  return -1;
}

/** Soft rounded notch — circular bowl + mirrored shoulders (no cubic wobble). */
function buildNotchedDockPath(width, height, notchX, notchR) {
  const corner = Math.min(22, height / 2);
  const fmt = (n) => Number(n.toFixed(2));

  if (notchX == null || notchR <= 0) {
    return `M ${corner},0 H ${width - corner} A ${corner} ${corner} 0 0 1 ${width},${corner} V ${height - corner} A ${corner} ${corner} 0 0 1 ${width - corner},${height} H ${corner} A ${corner} ${corner} 0 0 1 0,${height - corner} V ${corner} A ${corner} ${corner} 0 0 1 ${corner},0 Z`;
  }

  const r = notchR;
  const shoulder = 16;
  // Center on the chip. Edge tabs get enough inset via bar padding so this fits.
  const cx = notchX;

  const alpha = (58 * Math.PI) / 180;
  const sinA = Math.sin(alpha);
  const cosA = Math.cos(alpha);
  const lx = cx - r * sinA;
  const ly = r * cosA;
  const rx = cx + r * sinA;
  const leftFlat = cx - r - shoulder;
  const rightFlat = cx + r + shoulder;

  const joinHandle = r * 0.42;
  const flatHandle = shoulder * 0.55;

  return [
    `M ${fmt(corner)},0`,
    `H ${fmt(leftFlat)}`,
    `C ${fmt(leftFlat + flatHandle)},0 ${fmt(lx - cosA * joinHandle)},${fmt(ly - sinA * joinHandle)} ${fmt(lx)},${fmt(ly)}`,
    `A ${fmt(r)} ${fmt(r)} 0 0 0 ${fmt(rx)},${fmt(ly)}`,
    `C ${fmt(rx + cosA * joinHandle)},${fmt(ly - sinA * joinHandle)} ${fmt(rightFlat - flatHandle)},0 ${fmt(rightFlat)},0`,
    `H ${fmt(width - corner)}`,
    `A ${corner} ${corner} 0 0 1 ${width} ${corner}`,
    `V ${height - corner}`,
    `A ${corner} ${corner} 0 0 1 ${width - corner} ${height}`,
    `H ${corner}`,
    `A ${corner} ${corner} 0 0 1 0 ${height - corner}`,
    `V ${corner}`,
    `A ${corner} ${corner} 0 0 1 ${corner} 0`,
    "Z",
  ].join(" ");
}

function ChevronDownIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
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
  const pathname = usePathname();
  const {
    totalItems,
    ready,
    items: cartItems,
    subtotal,
    updateQuantity,
    changeSize,
    removeItem: removeCartItem,
    cartOpen,
    openCart,
    closeCart,
  } = useCart();
  const {
    totalItems: wishCount,
    ready: wishReady,
    items: wishItems,
    removeItem: removeWishlistItem,
  } = useWishlist();
  const { user, isAuthenticated, ready: authReady } = useAuth();
  const accountHref = isAuthenticated ? "/account" : "/login";
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [wishlistFromBottom, setWishlistFromBottom] = useState(true);
  const cartMounted = cartOpen;
  const [anotherSizeProduct, setAnotherSizeProduct] = useState(null);
  const [logoError, setLogoError] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerCompact, setHeaderCompact] = useState(false);
  const bottomBarPanelOpen =
    wishlistOpen || cartMounted || searchOpen || menuOpen;
  const { countryCode, setCountryCode } = useCountry();
  const [countryOpen, setCountryOpen] = useState(false);
  const wishlistPopoverRef = useRef(null);
  const searchAreaRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const mobileSearchTriggerRef = useRef(null);
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
      if (mobileSearchTriggerRef.current?.contains(event.target)) return;
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

  const closeBottomBarPanels = () => {
    if (searchOpen) setSearchOpen(false);
    if (wishlistOpen) closeWishlist();
    if (cartMounted) closeCart();
    if (menuOpen) setMenuOpen(false);
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
    const onScroll = () => {
      setHeaderCompact(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        if (wishlistOpen) closeWishlist();
        if (cartMounted) closeCart();
        if (menuOpen) setMenuOpen(false);
      }
      return nextOpen;
    });
  };

  const bottomBarRef = useRef(null);
  const [bottomDockSize, setBottomDockSize] = useState({ width: 0, notchX: null });

  const bottomActiveIndex = getBottomBarActiveIndex({
    pathname,
    bottomBarPanelOpen,
    wishlistOpen,
    cartMounted,
    searchOpen,
  });

  useLayoutEffect(() => {
    const syncDock = () => {
      const root = bottomBarRef.current;
      if (!root) return;
      const width = root.getBoundingClientRect().width;
      if (bottomActiveIndex < 0) {
        setBottomDockSize({ width, notchX: null });
        return;
      }
      const item = root.querySelector(`[data-bottom-idx="${bottomActiveIndex}"]`);
      if (!item) {
        setBottomDockSize({ width, notchX: null });
        return;
      }
      const rootRect = root.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      setBottomDockSize({
        width,
        notchX: itemRect.left + itemRect.width / 2 - rootRect.left,
      });
    };

    syncDock();
    window.addEventListener("resize", syncDock);
    return () => window.removeEventListener("resize", syncDock);
  }, [bottomActiveIndex]);

  const notchX = bottomDockSize.notchX;
  const dockWidth = bottomDockSize.width || 360;
  const dockPath = buildNotchedDockPath(
    dockWidth,
    BOTTOM_DOCK_H,
    notchX,
    notchX == null ? 0 : BOTTOM_NOTCH_R,
  );
  const iconLayerMask =
    notchX == null
      ? undefined
      : {
          WebkitMaskImage: `radial-gradient(circle ${BOTTOM_GAP_RING / 2 + 6}px at ${notchX}px 0px, transparent ${BOTTOM_GAP_RING / 2 + 4}px, #000 ${BOTTOM_GAP_RING / 2 + 5}px)`,
          maskImage: `radial-gradient(circle ${BOTTOM_GAP_RING / 2 + 6}px at ${notchX}px 0px, transparent ${BOTTOM_GAP_RING / 2 + 4}px, #000 ${BOTTOM_GAP_RING / 2 + 5}px)`,
        };
  const dockSpring = {
    type: "spring",
    ...BOTTOM_DOCK_SPRING,
  };

  const openWishlistFromBar = () => {
    if (wishlistOpen) {
      closeWishlist();
    } else {
      if (cartMounted) closeCart();
      if (menuOpen) setMenuOpen(false);
      if (searchOpen) setSearchOpen(false);
      openWishlist();
    }
  };

  const openCartFromBar = () => {
    if (cartMounted) {
      closeCart();
    } else {
      if (wishlistOpen) closeWishlist();
      if (menuOpen) setMenuOpen(false);
      if (searchOpen) setSearchOpen(false);
      openCart();
    }
  };

  if (pathname === "/account") return null;

  return (
    <>
      <header className="sticky top-0 z-40 bg-[var(--primary)]">
        <ChromeContainer>
          <div
            className={`relative flex items-center justify-end transition-[min-height] duration-300 ease-out ${
              headerCompact
                ? "min-h-16 sm:min-h-[4.5rem]"
                : "min-h-[5.5rem] sm:min-h-[6.5rem]"
            }`}
          >
            <div
              className="absolute left-0 top-1/2 z-40 -translate-y-1/2"
              ref={searchAreaRef}
            >
              <div className="flex items-center gap-2">
                <Link
                  href="/track-order"
                  className="hidden sm:inline-flex items-center gap-2 rounded-md border border-[var(--secondary)]/70 px-3 py-1.5 text-xs font-semibold text-[var(--secondary)] transition-colors hover:border-[var(--secondary)] hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:px-3.5 lg:text-sm"
                >
                  <TruckIcon className="h-4 w-4" />
                  Track Order
                </Link>
                <button
                  type="button"
                  onClick={toggleSearch}
                  className="hidden sm:inline-flex min-h-10 min-w-10 items-center justify-center text-[var(--secondary)] transition-colors hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  aria-label={searchOpen ? "Close search" : "Search"}
                  aria-expanded={searchOpen}
                >
                  {searchOpen ? (
                    <CloseIcon className="h-6 w-6" />
                  ) : (
                    <SearchIcon className="h-6 w-6" />
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
                    className="inline-flex h-7 items-center gap-1 rounded-full border border-[var(--background)] bg-[var(--background)] px-2 py-0.5 text-xs font-bold text-[var(--primary)] transition-colors hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-8 sm:px-2.5 sm:text-sm"
                  >
                    <span>{countryCode === "BD" ? "🇧🇩 BD" : "🇦🇺 AU"}</span>
                    <ChevronDownIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                  {countryOpen ? (
                    <div className="absolute left-0 top-full z-40 mt-2 w-44 rounded-xl border border-[var(--background)] bg-[var(--background)] p-1.5 shadow-xl ring-1 ring-black/10">
                      <button
                        type="button"
                        onClick={() => {
                          setCountryCode("BD");
                          setCountryOpen(false);
                        }}
                        className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm font-bold text-[var(--primary)] transition-colors hover:bg-stone-900/5 ${
                          countryCode === "BD" ? "bg-stone-900/10" : ""
                        }`}
                      >
                        🇧🇩 Bangladesh
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCountryCode("AU");
                          setCountryOpen(false);
                        }}
                        className={`mt-1 flex w-full items-center rounded-lg px-3 py-2 text-left text-sm font-bold text-[var(--primary)] transition-colors hover:bg-stone-900/5 ${
                          countryCode === "AU" ? "bg-stone-900/10" : ""
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
                        className="h-11 w-[300px] rounded-full border border-white/35 bg-white/10 px-4 pr-24 text-base text-white placeholder:text-white/70 backdrop-blur-sm outline-none transition-colors focus:border-white lg:w-[420px]"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
              <Image
                src={
                  headerCompact
                    ? "/Maaleen_New_Logo-2.png"
                    : "/Maaleen_New_Logo-1.png"
                }
                alt="Maaleen"
                width={headerCompact ? 160 : 340}
                height={headerCompact ? 120 : 180}
                priority
                className={`w-auto object-contain transition-[height] duration-300 ease-out ${
                  headerCompact
                    ? "h-14 sm:h-16"
                    : "h-[4.5rem] sm:h-[5.5rem]"
                }`}
                onError={() => setLogoError(true)}
              />
            </Link>
            <div className="relative z-20 flex items-center gap-1 sm:gap-2">
              <div
                className="relative hidden sm:block"
                ref={wishlistPopoverRef}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (wishlistOpen) {
                      closeWishlist();
                      return;
                    }
                    openWishlist();
                  }}
                  className="inline-flex min-h-10 min-w-10 items-center justify-center text-[var(--secondary)] transition-colors hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  aria-label={`Wishlist, ${wishReady ? wishCount : 0} saved`}
                  aria-expanded={wishlistOpen}
                >
                  <HeartIcon className="h-6 w-6" />
                  {wishReady && wishCount > 0 ? (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[9px] font-semibold text-[var(--primary)]">
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
                      className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
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
                className="relative hidden sm:inline-flex min-h-10 min-w-10 items-center justify-center text-[var(--secondary)] transition-colors hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label={`Shopping bag, ${ready ? totalItems : 0} items`}
              >
                <BagIcon className="h-6 w-6" />
                {ready && totalItems > 0 ? (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[9px] font-semibold text-[var(--primary)]">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                ) : null}
              </button>
              <Link
                href={accountHref}
                className="hidden sm:inline-flex min-h-10 min-w-10 items-center justify-center text-[var(--secondary)] transition-colors hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label={isAuthenticated ? "My account" : "Login / Account"}
              >
                <UserIcon className="h-6 w-6" />
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex sm:hidden min-h-10 min-w-10 items-center justify-center text-[var(--secondary)] transition-colors hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                {menuOpen ? (
                  <CloseIcon className="h-5 w-5" />
                ) : (
                  <MenuIcon className="h-5 w-5" />
                )}
              </button>
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
                  className="absolute inset-x-0 top-0 bottom-0 z-30 flex items-center gap-2 bg-[var(--primary)] px-4 sm:hidden"
                >
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="inline-flex shrink-0 min-h-10 min-w-10 items-center justify-center text-[var(--secondary)] transition-colors hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    aria-label="Close search"
                  >
                    <CloseIcon className="h-5 w-5" />
                  </button>
                  <div className="relative min-w-0 flex-1">
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
            className="hidden sm:flex flex-wrap items-center justify-center gap-x-8 gap-y-2 border-t border-white/20 py-3 sm:gap-x-12"
            aria-label="Main"
          >
            <Suspense fallback={<MainNavFallback />}>
              <MainNavLinks />
            </Suspense>
          </nav>
        </ChromeContainer>
        <div className="relative w-full border-t border-stone-200 bg-white py-2">
          <div className="maaleen-header-ticker overflow-hidden">
            <div className="maaleen-header-ticker-track flex min-w-max items-center">
              <p className="shrink-0 whitespace-nowrap pr-10 text-xs font-normal tracking-wide text-[var(--primary)] sm:text-sm">
                {noticeText}
              </p>
              <p
                aria-hidden
                className="shrink-0 whitespace-nowrap pr-10 text-xs font-normal tracking-wide text-[var(--primary)] sm:text-sm"
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
              className="fixed bottom-[calc(4rem+env(safe-area-inset-bottom))] left-0 right-0 z-50 flex h-[58vh] max-h-[calc(100dvh-9rem)] min-h-[24rem] flex-col rounded-t-2xl bg-[var(--surface-elevated)] shadow-[0_-12px_40px_rgba(0,0,0,0.15)] ring-1 ring-black/10"
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
          <div className="fixed inset-0 z-[80]">
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
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.26, ease: "easeInOut" }}
              className="absolute top-0 right-0 z-[80] flex h-full w-full max-w-[22rem] flex-col bg-white shadow-xl"
            >
              <div className="relative flex h-11 shrink-0 items-center bg-[#2a2a2a] text-white">
                <button
                  type="button"
                  onClick={closeCart}
                  aria-label="Close cart"
                  className="relative z-10 ml-2 inline-flex h-8 w-8 items-center justify-center rounded-none text-xl leading-none text-red-500"
                >
                  ×
                </button>
                <h2 className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-semibold tracking-[0.18em]">
                  CART
                </h2>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto">
                {!ready ? (
                  <p className="px-3 py-6 text-sm text-stone-500">Loading…</p>
                ) : cartItems.length === 0 ? (
                  <p className="px-3 py-6 text-sm text-stone-600">
                    Your cart is empty.
                  </p>
                ) : (
                  <ul>
                    {cartItems.map((line) => {
                      const product = getProductBySlug(line.slug);
                      const sizes = product?.sizes?.length
                        ? product.sizes
                        : [line.size];
                      const qtyOptions = Array.from(
                        { length: Math.max(10, line.quantity) },
                        (_, index) => index + 1,
                      );
                      const onSale =
                        line.compareAtPrice != null &&
                        line.compareAtPrice > line.price;
                      return (
                        <li
                          key={line.lineId}
                          className="border-b border-stone-200 px-3 py-3"
                        >
                          <div className="flex items-start gap-3">
                            <p className="min-w-0 flex-1 text-sm leading-snug font-medium text-stone-900">
                              {line.name}
                            </p>
                            <Link
                              href={`/shop/${line.slug}`}
                              onClick={closeCart}
                              className="relative h-16 w-14 shrink-0 overflow-hidden bg-stone-100"
                            >
                              <ImageWithFallback
                                src={line.image}
                                alt=""
                                useNative
                                imageClassName="object-cover"
                                fallbackClassName="flex h-full w-full items-center justify-center bg-stone-200 text-stone-500"
                                fallbackLabelClassName="text-[8px] font-semibold uppercase tracking-[0.12em]"
                              />
                            </Link>
                          </div>
                          <div className="mt-2 grid grid-cols-[5.5rem_1fr] items-center gap-y-2 text-xs text-stone-700">
                            <span>Price</span>
                            <span className="text-right font-medium text-stone-900">
                              {onSale ? (
                                <span className="mr-1.5 font-normal text-stone-400 line-through">
                                  {formatPrice(line.compareAtPrice, line.currency)}
                                </span>
                              ) : null}
                              {formatPrice(line.price, line.currency)}
                            </span>
                            <span>Size</span>
                            <select
                              aria-label={`Size for ${line.name}`}
                              value={line.size}
                              onChange={(event) =>
                                changeSize(line.lineId, event.target.value)
                              }
                              className="w-full rounded border border-stone-300 bg-white px-2 py-1 text-xs text-stone-800"
                            >
                              {sizes.map((size) => (
                                <option key={size} value={size}>
                                  {sizeOptionLabel(size, product?.category)}
                                </option>
                              ))}
                            </select>
                            <span>Quantity</span>
                            <select
                              aria-label={`Quantity for ${line.name}`}
                              value={line.quantity}
                              onChange={(event) =>
                                updateQuantity(
                                  line.lineId,
                                  Number(event.target.value),
                                )
                              }
                              className="w-full rounded border border-stone-300 bg-white px-2 py-1 text-xs text-stone-800"
                            >
                              {qtyOptions.map((qty) => (
                                <option key={qty} value={qty}>
                                  {qty}
                                </option>
                              ))}
                            </select>
                            <span>Subtotal</span>
                            <span className="text-right font-medium text-stone-900">
                              {formatPrice(
                                line.price * line.quantity,
                                line.currency,
                              )}
                            </span>
                          </div>
                          <div className="mt-3 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                if (product) setAnotherSizeProduct(product);
                              }}
                              disabled={!product}
                              className="flex-1 rounded-sm bg-[var(--primary)] py-2 text-sm font-medium text-white disabled:opacity-40"
                            >
                              + Add another Size
                            </button>
                            <button
                              type="button"
                              onClick={() => removeCartItem(line.lineId)}
                              aria-label={`Remove ${line.name}`}
                              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-red-600 text-white"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
              {ready && cartItems.length > 0 ? (
                <div className="flex shrink-0 items-stretch border-t border-stone-200">
                  <div className="flex w-[7.5rem] flex-col justify-center px-3 py-2">
                    <span className="text-[11px] text-stone-500">Cart Total</span>
                    <span className="text-sm font-semibold text-stone-900">
                      {formatPrice(subtotal, cartItems[0].currency)}
                    </span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="flex flex-1 items-center justify-center bg-[var(--primary)] text-sm font-semibold text-white"
                  >
                    Checkout &gt;
                  </Link>
                </div>
              ) : null}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
      {anotherSizeProduct ? (
        <QuickAddModal
          product={anotherSizeProduct}
          onClose={() => setAnotherSizeProduct(null)}
        />
      ) : null}

      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-[100] sm:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 bottom-0 w-[80%] max-w-sm bg-[var(--background)] shadow-2xl"
            >
              <div className="flex flex-col h-full bg-[var(--background)]">
                <div className="maaleen-brand-bg relative flex items-center justify-center border-b border-stone-100 px-4 py-3">
                  <Link
                    href="/"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex h-12 w-44 max-w-[70%] items-center justify-center"
                    aria-label="Maaleen"
                  >
                    <Image
                      src="/Maaleen_New_Logo-1.png"
                      alt=""
                      width={176}
                      height={48}
                      className="h-12 w-auto object-contain"
                    />
                  </Link>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="absolute right-3.5 p-1.5 text-white/70 hover:text-white"
                  >
                    <CloseIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="flex gap-3 border-b border-stone-100 px-6 py-5">
                  {authReady && isAuthenticated && user ? (
                    <Link
                      href="/account"
                      onClick={() => setMenuOpen(false)}
                      className="flex w-full items-center gap-3 rounded-xl transition-colors hover:bg-stone-100/70"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-white">
                        <UserIcon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 text-left">
                        <span className="block truncate text-[15px] font-semibold leading-tight text-stone-900">
                          {user.name}
                        </span>
                        <span className="mt-0.5 block text-xs text-stone-500">
                          View Profile
                        </span>
                      </span>
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setMenuOpen(false)}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[var(--primary)] bg-transparent px-4 py-2.5 text-xs font-semibold text-[var(--primary)] transition-colors hover:bg-[var(--primary)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                      >
                        <UserIcon className="h-4 w-4" />
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setMenuOpen(false)}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
                <nav className="flex-1 overflow-y-auto px-6 py-8">
                  <ul className="space-y-6">
                    <li>
                      <Link
                        href="/"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 text-[17px] font-medium text-stone-900 transition-colors hover:text-[var(--accent)]"
                      >
                        <HomeIcon className="h-[22px] w-[22px] shrink-0 text-[var(--primary)]" />
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/collections"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 text-[17px] font-medium text-stone-900 transition-colors hover:text-[var(--accent)]"
                      >
                        <CollectionsIcon className="h-[22px] w-[22px] shrink-0 text-[var(--primary)]" />
                        Collections
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/shop"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 text-[17px] font-medium text-stone-900 transition-colors hover:text-[var(--accent)]"
                      >
                        <BagIcon className="h-[22px] w-[22px] shrink-0 text-[var(--primary)]" />
                        Shop
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/track-order"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 text-[17px] font-medium text-stone-900 transition-colors hover:text-[var(--accent)]"
                      >
                        <TruckIcon className="h-[22px] w-[22px] shrink-0 text-[var(--primary)]" />
                        Track Order
                      </Link>
                    </li>
                  </ul>

                  <div className="my-6 border-b border-stone-200" />

                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">
                    My Account
                  </p>
                  <ul className="space-y-6">
                    <li>
                      <Link
                        href="/wishlist"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 text-[17px] font-medium text-stone-900 transition-colors hover:text-[var(--accent)]"
                      >
                        <HeartIcon className="h-[22px] w-[22px] shrink-0 text-[var(--primary)]" />
                        My Wishlist
                      </Link>
                    </li>
                  </ul>
                </nav>
                <div className="border-t border-stone-100 bg-[var(--background)] p-6">
                  <p className="text-xs text-stone-400 font-medium tracking-wide">
                    © {new Date().getFullYear()} Maaleen.
                  </p>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Bar — soft rounded dock + floating active chip */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] px-3 pb-[max(0.85rem,env(safe-area-inset-bottom))] pt-10 sm:hidden">
        <div ref={bottomBarRef} className="relative h-[3.75rem]">
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0"
            width={dockWidth}
            height={BOTTOM_DOCK_H}
          >
            <defs>
              <mask
                id="maaleen-dock-mask"
                maskUnits="userSpaceOnUse"
                maskContentUnits="userSpaceOnUse"
              >
                <motion.path
                  d={dockPath}
                  fill="white"
                  initial={false}
                  animate={{ d: dockPath }}
                  transition={dockSpring}
                />
              </mask>
            </defs>
          </svg>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0"
            style={{
              height: BOTTOM_DOCK_H,
              width: dockWidth,
              backdropFilter: "blur(28px) saturate(1.45)",
              WebkitBackdropFilter: "blur(28px) saturate(1.45)",
              backgroundColor: "rgba(255, 246, 238, 0.84)",
              backgroundImage:
                "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,240,225,0.16) 52%, rgba(197,158,117,0.24) 100%)",
              WebkitMaskImage: "url(#maaleen-dock-mask)",
              maskImage: "url(#maaleen-dock-mask)",
            }}
          />

          <div
            className="relative z-10 grid h-full grid-cols-5 items-center px-2"
            style={iconLayerMask}
          >
            <div
              data-bottom-idx="0"
              className="relative flex h-full items-center justify-center"
            >
              {bottomActiveIndex !== 0 ? (
                <Link
                  href="/"
                  onClick={closeBottomBarPanels}
                  className={bottomBarIdleBtn}
                  aria-label="Home"
                  aria-current={pathname === "/" ? "page" : undefined}
                >
                  <HomeIcon className="h-6 w-6" />
                </Link>
              ) : null}
            </div>

            <div
              data-bottom-idx="1"
              className="relative flex h-full items-center justify-center"
            >
              {bottomActiveIndex !== 1 ? (
                <button
                  type="button"
                  onClick={openWishlistFromBar}
                  className={bottomBarIdleBtn}
                  aria-label="Wishlist"
                  aria-pressed={wishlistOpen}
                >
                  <div className="relative">
                    <HeartIcon className="h-6 w-6" />
                    {wishReady && wishCount > 0 && (
                      <span className="absolute -right-1.5 -top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-[var(--primary)] px-0.5 text-[8px] font-bold leading-none text-[var(--secondary)]">
                        {wishCount > 99 ? "99+" : wishCount}
                      </span>
                    )}
                  </div>
                </button>
              ) : null}
            </div>

            <div
              data-bottom-idx="2"
              className="relative flex h-full items-center justify-center"
            >
              {bottomActiveIndex !== 2 ? (
                <button
                  type="button"
                  onClick={openCartFromBar}
                  className={bottomBarIdleBtn}
                  aria-label="Cart"
                  aria-pressed={cartMounted}
                >
                  <div className="relative">
                    <BagIcon className="h-6 w-6" />
                    {ready && totalItems > 0 && (
                      <span className="absolute -right-1.5 -top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-[var(--primary)] px-0.5 text-[8px] font-bold leading-none text-[var(--secondary)]">
                        {totalItems > 99 ? "99+" : totalItems}
                      </span>
                    )}
                  </div>
                </button>
              ) : null}
            </div>

            <div
              data-bottom-idx="3"
              className="relative flex h-full items-center justify-center"
            >
              {bottomActiveIndex !== 3 ? (
                <Link
                  href={accountHref}
                  onClick={closeBottomBarPanels}
                  className={bottomBarIdleBtn}
                  aria-label={isAuthenticated ? "My account" : "Login"}
                >
                  <UserIcon className="h-6 w-6" />
                </Link>
              ) : null}
            </div>

            <div
              data-bottom-idx="4"
              className="relative flex h-full items-center justify-center"
            >
              {bottomActiveIndex !== 4 ? (
                <button
                  type="button"
                  ref={mobileSearchTriggerRef}
                  onClick={toggleSearch}
                  className={bottomBarIdleBtn}
                  aria-label={searchOpen ? "Close search" : "Search"}
                  aria-expanded={searchOpen}
                >
                  <SearchIcon className="h-6 w-6" />
                </button>
              ) : null}
            </div>
          </div>

          {notchX != null && bottomActiveIndex >= 0 ? (
            <motion.div
              className="absolute top-0 z-30"
              initial={false}
              animate={{ left: notchX }}
              transition={dockSpring}
            >
              <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
                {bottomActiveIndex === 0 ? (
                  <Link
                    href="/"
                    onClick={closeBottomBarPanels}
                    className={bottomBarActiveChip}
                    aria-label="Home"
                    aria-current="page"
                  >
                    <HomeIcon className="h-6 w-6" />
                  </Link>
                ) : null}
                {bottomActiveIndex === 1 ? (
                  <button
                    type="button"
                    onClick={openWishlistFromBar}
                    className={bottomBarActiveChip}
                    aria-label="Wishlist"
                    aria-pressed={wishlistOpen}
                  >
                    <div className="relative">
                      <HeartIcon className="h-6 w-6" />
                      {wishReady && wishCount > 0 && (
                        <span className="absolute -right-1.5 -top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-[var(--primary)] px-0.5 text-[8px] font-bold leading-none text-[var(--secondary)]">
                          {wishCount > 99 ? "99+" : wishCount}
                        </span>
                      )}
                    </div>
                  </button>
                ) : null}
                {bottomActiveIndex === 2 ? (
                  <button
                    type="button"
                    onClick={openCartFromBar}
                    className={bottomBarActiveChip}
                    aria-label="Cart"
                    aria-pressed={cartMounted}
                  >
                    <div className="relative">
                      <BagIcon className="h-6 w-6" />
                      {ready && totalItems > 0 && (
                        <span className="absolute -right-1.5 -top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-[var(--primary)] px-0.5 text-[8px] font-bold leading-none text-[var(--secondary)]">
                          {totalItems > 99 ? "99+" : totalItems}
                        </span>
                      )}
                    </div>
                  </button>
                ) : null}
                {bottomActiveIndex === 3 ? (
                  <Link
                    href={accountHref}
                    onClick={closeBottomBarPanels}
                    className={bottomBarActiveChip}
                    aria-label={isAuthenticated ? "My account" : "Login"}
                  >
                    <UserIcon className="h-6 w-6" />
                  </Link>
                ) : null}
                {bottomActiveIndex === 4 ? (
                  <button
                    type="button"
                    ref={mobileSearchTriggerRef}
                    onClick={toggleSearch}
                    className={bottomBarActiveChip}
                    aria-label={searchOpen ? "Close search" : "Search"}
                    aria-expanded={searchOpen}
                  >
                    <SearchIcon className="h-6 w-6" />
                  </button>
                ) : null}
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </>
  );
}
