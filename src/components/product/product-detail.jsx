"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/contexts/toast-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { formatPrice } from "@/lib/format";
import { getProductInfo } from "@/lib/product-info";
import { SIZE_MEASUREMENTS } from "@/lib/size-chart";
import { ProductsSliderSection } from "@/components/home/products-slider-section";
import { QuickAddModal } from "@/components/product/quick-add-modal";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

function chartColumns(category) {
  if (category === "bottoms") {
    return [
      { key: "waist", label: "Waist" },
      { key: "hip", label: "Hip" },
      { key: "length", label: "Length" },
    ];
  }
  return [
    { key: "bust", label: "Bust" },
    { key: "waist", label: "Waist" },
    { key: "length", label: "Length" },
  ];
}

function BoughtTogether({ paired, onAdd, className = "" }) {
  if (!paired) return null;

  return (
    <div className={className}>
      <h2 className="text-lg font-semibold text-stone-900">
        Frequently Bought Together
      </h2>
      <div className="mt-4 flex gap-4 border-t border-stone-200 pt-4">
        <Link
          href={`/shop/${paired.slug}`}
          className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md bg-stone-100"
        >
          <ImageWithFallback
            src={paired.images?.[0]}
            alt=""
            imageClassName="object-cover"
            sizes="80px"
            fallbackClassName="flex h-full w-full items-center justify-center bg-stone-200"
            fallbackLabelClassName="text-[8px] font-semibold uppercase tracking-[0.12em]"
          />
        </Link>
        <div className="min-w-0">
          <Link
            href={`/shop/${paired.slug}`}
            className="text-sm font-medium text-stone-900 hover:underline"
          >
            {paired.name}
          </Link>
          <p className="mt-1 flex flex-wrap items-baseline gap-2 text-sm">
            <span className="font-semibold text-stone-900">
              {formatPrice(paired.price, paired.currency)}
            </span>
            {paired.compareAtPrice > paired.price ? (
              <span className="text-stone-400 line-through">
                {formatPrice(paired.compareAtPrice, paired.currency)}
              </span>
            ) : null}
          </p>
          <button
            type="button"
            onClick={onAdd}
            className="mt-2 inline-flex items-center gap-1 bg-[var(--primary)] px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90"
          >
            + Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

function formatMeasure(value, unit) {
  if (unit === "in") return value;
  return value
    .split("–")
    .map((part) => (Number.parseFloat(part) * 2.54).toFixed(1))
    .join("–");
}

export function ProductDetail({ product, related, breadcrumbs = null }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageModalZoomed, setImageModalZoomed] = useState(false);
  const [imageModalZoomScale, setImageModalZoomScale] = useState(2.5);
  const [imageModalPan, setImageModalPan] = useState({ x: 0, y: 0 });
  const [imageModalDragging, setImageModalDragging] = useState(false);
  const [imageModalFailed, setImageModalFailed] = useState(false);
  const [size, setSize] = useState("");
  const [color, setColor] = useState(product.colors?.[0]?.name ?? "");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("in");
  const [returnsOpen, setReturnsOpen] = useState(false);
  const [pairedAddOpen, setPairedAddOpen] = useState(false);
  const modalViewportRef = useRef(null);
  const modalImageRef = useRef(null);
  const dragOriginRef = useRef(null);
  const movedWhileDragRef = useRef(false);
  const { addItem } = useCart();
  const { showToast } = useToast();
  const { toggleItem, isWishlisted, ready: wishReady } = useWishlist();

  const images = product.images ?? [];
  const main = images[imageIndex] ?? images[0];
  const onSale =
    product.compareAtPrice != null && product.compareAtPrice > product.price;
  const discount = onSale
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) *
          100,
      )
    : 0;
  const canAdd = Boolean(size && color && main);
  const imageSlides = images.length > 0 ? images : main ? [main] : [];
  const info = getProductInfo(product);
  const paired = related?.[0] ?? null;
  const columns = chartColumns(product.category);

  useEffect(() => {
    setImageIndex(0);
    setSize("");
    setColor(product.colors?.[0]?.name ?? "");
    setQuantity(1);
    setUnit("in");
  }, [product.id]);

  const openImageModal = () => {
    if (!main) return;
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
    setImageModalZoomed(false);
    setImageModalPan({ x: 0, y: 0 });
    setImageModalDragging(false);
    dragOriginRef.current = null;
    movedWhileDragRef.current = false;
  };

  const showPrevImage = () => {
    if (imageSlides.length <= 1) return;
    setImageModalZoomed(false);
    setImageModalPan({ x: 0, y: 0 });
    setImageIndex(
      (current) => (current - 1 + imageSlides.length) % imageSlides.length,
    );
  };

  const showNextImage = () => {
    if (imageSlides.length <= 1) return;
    setImageModalZoomed(false);
    setImageModalPan({ x: 0, y: 0 });
    setImageIndex((current) => (current + 1) % imageSlides.length);
  };

  const onModalImageClick = () => {
    if (movedWhileDragRef.current) {
      movedWhileDragRef.current = false;
      return;
    }
    setImageModalZoomed((zoomed) => {
      if (zoomed) setImageModalPan({ x: 0, y: 0 });
      return !zoomed;
    });
  };

  const clampPan = (x, y) => {
    if (!modalImageRef.current) return { x, y };
    const scale = imageModalZoomScale;
    const iw = modalImageRef.current.clientWidth;
    const ih = modalImageRef.current.clientHeight;
    const maxX = ((scale - 1) * iw) / 2;
    const maxY = ((scale - 1) * ih) / 2;
    return {
      x: Math.min(maxX, Math.max(-maxX, x)),
      y: Math.min(maxY, Math.max(-maxY, y)),
    };
  };

  const onModalImagePointerDown = (event) => {
    if (!imageModalZoomed) return;
    setImageModalDragging(true);
    dragOriginRef.current = {
      startX: event.clientX - imageModalPan.x,
      startY: event.clientY - imageModalPan.y,
    };
    movedWhileDragRef.current = false;
    if (event.currentTarget.setPointerCapture) {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    event.preventDefault();
  };

  const onModalImagePointerMove = (event) => {
    if (!imageModalZoomed || !imageModalDragging || !dragOriginRef.current)
      return;
    const x = event.clientX - dragOriginRef.current.startX;
    const y = event.clientY - dragOriginRef.current.startY;
    if (
      Math.abs(x - imageModalPan.x) > 1 ||
      Math.abs(y - imageModalPan.y) > 1
    ) {
      movedWhileDragRef.current = true;
    }
    setImageModalPan(clampPan(x, y));
    event.preventDefault();
  };

  const onModalImagePointerUp = () => {
    setImageModalDragging(false);
    dragOriginRef.current = null;
  };

  useEffect(() => {
    if (!imageModalOpen) return;
    function onKey(event) {
      if (event.key === "Escape") closeImageModal();
      if (event.key === "ArrowLeft") showPrevImage();
      if (event.key === "ArrowRight") showNextImage();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [imageModalOpen, imageSlides.length]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setImageModalZoomScale(mq.matches ? 2.2 : 2.8);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    setImageModalFailed(false);
  }, [main, imageModalOpen]);

  function handleAdd() {
    if (!canAdd) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      currency: product.currency,
      image: main,
      size,
      color,
      quantity,
    });
    showToast(`${product.name} added to your bag`);
  }

  function addPairedItem() {
    if (!paired) return;
    setPairedAddOpen(true);
  }

  return (
    <div>
      {breadcrumbs ? (
        <div className="mb-10 hidden lg:block">{breadcrumbs}</div>
      ) : null}

      <div className="grid items-start gap-4 lg:grid-cols-2 lg:gap-2">
        <div>
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md bg-stone-100 lg:aspect-[4/5]">
            <div
              className="flex h-full w-full transition-transform duration-500 ease-out motion-reduce:transition-none"
              style={{ transform: `translateX(-${imageIndex * 100}%)` }}
            >
              {(images.length ? images : [main]).filter(Boolean).map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  onClick={openImageModal}
                  className="relative h-full min-w-full shrink-0 cursor-zoom-in"
                  aria-label={
                    i === imageIndex ? "Open product image" : `Product image ${i + 1}`
                  }
                >
                  <ImageWithFallback
                    src={src}
                    alt={product.name}
                    imageClassName="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority={i === 0}
                    fallbackLabelClassName="font-[family-name:var(--font-display)] text-xl tracking-[0.18em] sm:text-2xl lg:text-4xl"
                    fallbackSubLabel="image coming soon"
                    fallbackSubLabelClassName="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-400 sm:text-xs"
                  />
                </button>
              ))}
            </div>
            {onSale || product.tags?.includes("sale") ? (
              <span className="pointer-events-none absolute left-3 top-3 bg-[#c0392b] px-2 py-0.5 text-[10px] font-bold tracking-wide text-white">
                SALE
              </span>
            ) : null}
          </div>
          {images.length > 1 ? (
            <ul className="mt-3 flex gap-2 overflow-x-auto p-1">
              {images.map((src, i) => (
                <li key={`${src}-thumb-${i}`}>
                  <button
                    type="button"
                    onClick={() => setImageIndex(i)}
                    aria-label={`Show image ${i + 1}`}
                    aria-pressed={i === imageIndex}
                    className={`relative block h-20 w-16 shrink-0 overflow-hidden rounded-md border-2 bg-stone-100 ${
                      i === imageIndex
                        ? "border-[var(--primary)]"
                        : "border-stone-200"
                    }`}
                  >
                    <ImageWithFallback
                      src={src}
                      alt=""
                      imageClassName="object-cover"
                      sizes="64px"
                      fallbackClassName="flex h-full w-full items-center justify-center bg-stone-200 text-stone-500"
                      fallbackLabelClassName="text-[8px] font-semibold uppercase tracking-[0.14em]"
                    />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          <BoughtTogether
            paired={paired}
            onAdd={addPairedItem}
            className="mt-8 hidden lg:block"
          />
        </div>

        <div>
          <div className="rounded-lg border border-stone-200 bg-white p-5 sm:p-6">
          {breadcrumbs ? (
            <div className="mb-3 lg:hidden">{breadcrumbs}</div>
          ) : null}
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-[1.65rem]">
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
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-stone-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={
                  wishReady && isWishlisted(product.id) ? "currentColor" : "none"
                }
                stroke="currentColor"
                strokeWidth="1.75"
                className="h-6 w-6"
                aria-hidden
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-2xl font-semibold text-stone-900">
              {formatPrice(product.price, product.currency)}
            </span>
            {onSale ? (
              <span className="text-base text-stone-400 line-through">
                {formatPrice(product.compareAtPrice, product.currency)}
              </span>
            ) : null}
            {discount > 0 ? (
              <span className="text-sm font-semibold text-[#e07a3d]">
                {discount}% Off
              </span>
            ) : null}
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold text-stone-900">Select Size:</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(product.sizes ?? []).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSize(option)}
                  className={`min-w-12 border px-3 py-2 text-sm ${
                    size === option
                      ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                      : "border-stone-300 bg-white text-stone-800 hover:border-stone-500"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {(product.colors ?? []).length > 0 ? (
            <div className="mt-5">
              <p className="text-sm font-semibold text-stone-900">Color:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColor(c.name)}
                    className={`flex items-center gap-2 border px-3 py-2 text-sm ${
                      color === c.name
                        ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                        : "border-stone-300 bg-white text-stone-800 hover:border-stone-500"
                    }`}
                  >
                    <span
                      className="h-3.5 w-3.5 rounded-full border border-stone-300"
                      style={{ backgroundColor: c.hex }}
                      aria-hidden
                    />
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center overflow-hidden rounded-md border border-stone-300">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="flex h-11 w-11 items-center justify-center rounded-none text-lg text-stone-700"
              >
                −
              </button>
              <span className="flex h-11 w-10 items-center justify-center text-sm font-medium">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((value) => Math.min(10, value + 1))}
                className="flex h-11 w-11 items-center justify-center rounded-none text-lg text-stone-700"
              >
                +
              </button>
            </div>
            <button
              type="button"
              disabled={!canAdd}
              onClick={handleAdd}
              className="inline-flex h-11 items-center gap-2 bg-[var(--primary)] px-5 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              + Add to Cart
            </button>
          </div>

          <div className="mt-6 rounded-md border border-stone-200">
            <button
              type="button"
              onClick={() => setReturnsOpen((open) => !open)}
              aria-expanded={returnsOpen}
              className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left"
            >
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold text-stone-900">
                  <span className="text-emerald-600" aria-hidden>
                    ✓
                  </span>
                  Easy Returns & Exchange
                </p>
                <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-600">
                  <span className="inline-flex items-center gap-1">
                    <span className="text-emerald-600" aria-hidden>
                      ✓
                    </span>
                    Tell us within 7 days
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="text-emerald-600" aria-hidden>
                      ✓
                    </span>
                    Exchange within 7 days
                  </span>
                </p>
              </div>
              <span
                className={`mt-1 text-stone-400 transition-transform ${returnsOpen ? "rotate-180" : ""}`}
                aria-hidden
              >
                ⌄
              </span>
            </button>
            {returnsOpen ? (
              <div className="space-y-4 border-t border-stone-200 px-4 py-4 text-sm leading-relaxed text-stone-700">
                <p>
                  Your satisfaction is our priority. If something is not right
                  with your order, an exchange is simple.
                </p>
                <div>
                  <p className="font-semibold text-stone-900">Exchange window</p>
                  <p className="mt-1">
                    Ready-to-wear items can be exchanged within 7 days of
                    delivery, for manufacturing defects only. We do not accept
                    returns for a refund.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-stone-900">How to exchange</p>
                  <ul className="mt-1 list-disc space-y-1 pl-5">
                    <li>
                      Call{" "}
                      <a href="tel:+8801786493740" className="underline">
                        +88017 86 493 740
                      </a>
                      , or email{" "}
                      <a
                        href="mailto:support@maaleen.store"
                        className="underline"
                      >
                        support@maaleen.store
                      </a>
                    </li>
                    <li>Items must be unworn, with original tags and packaging</li>
                    <li>Custom-made pieces are non-exchangeable</li>
                  </ul>
                </div>
                <Link
                  href="/return-policy"
                  className="inline-block text-sm font-medium text-[var(--primary)] underline underline-offset-2"
                >
                  View full Exchange & Return Policy
                </Link>
              </div>
            ) : null}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-stone-600">
            {product.description}
          </p>

          <h2 className="mt-6 text-sm font-bold text-stone-900">
            Detailed Description
          </h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-stone-700">
            {info.details.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          {(product.sizes ?? []).length > 0 ? (
            <div className="mt-8">
              <h2 className="text-sm font-bold text-stone-900">
                Size chart{" "}
                <span className="font-normal text-stone-500">
                  (Expected deviation ± 3%)
                </span>
              </h2>
              <div className="mt-3 inline-flex gap-2">
                {[
                  { id: "in", label: "INCH" },
                  { id: "cm", label: "CM" },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setUnit(option.id)}
                    className={`rounded-md border px-4 py-1.5 text-xs font-semibold ${
                      unit === option.id
                        ? "border-[var(--primary)] bg-white text-[var(--primary)]"
                        : "border-stone-300 bg-stone-50 text-stone-500"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <div className="mt-3 overflow-hidden rounded-md border border-stone-200">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[20rem] border-separate border-spacing-0 text-left text-sm">
                    <thead>
                      <tr className="bg-stone-100 text-stone-700">
                        <th className="border-b border-r border-stone-200 px-3 py-2 font-semibold">
                          Size
                        </th>
                        {columns.map((column, index) => (
                          <th
                            key={column.key}
                            className={`border-b border-stone-200 px-3 py-2 font-semibold ${
                              index < columns.length - 1 ? "border-r" : ""
                            }`}
                          >
                            {column.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {product.sizes.map((option, rowIndex) => {
                        const row = SIZE_MEASUREMENTS[option];
                        if (!row) return null;
                        const lastRow = rowIndex === product.sizes.length - 1;
                        return (
                          <tr key={option}>
                            <td
                              className={`border-r border-stone-200 px-3 py-2 ${
                                lastRow ? "" : "border-b"
                              }`}
                            >
                              {option}
                            </td>
                            {columns.map((column, index) => (
                              <td
                                key={column.key}
                                className={`px-3 py-2 ${
                                  lastRow ? "" : "border-b border-stone-200"
                                } ${index < columns.length - 1 ? "border-r border-stone-200" : ""}`}
                              >
                                {formatMeasure(row[column.key], unit)}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : null}
        </div>
          <BoughtTogether
            paired={paired}
            onAdd={addPairedItem}
            className="mt-8 lg:hidden"
          />
        </div>
      </div>
      {(related ?? []).length > 0 ? (
        <div className="mt-6">
          <ProductsSliderSection
            products={related}
            title="You may also like"
            sectionClassName="border-t border-stone-200 bg-transparent"
            useDesktopCarouselOnMobile
            mobileTwoUpNoLoop
            showCta={false}
            centerTitleOnMobile
            compactMobileSpacing
            useParentContainer
          />
        </div>
      ) : null}
      {paired && pairedAddOpen ? (
        <QuickAddModal
          product={paired}
          onClose={() => setPairedAddOpen(false)}
        />
      ) : null}
      {imageModalOpen ? (
        <div
          className="fixed inset-0 z-[80] bg-black/90"
          onClick={closeImageModal}
        >
          <div className="relative flex h-full w-full items-center justify-center p-4 sm:p-8">
            <div
              ref={modalViewportRef}
              className="relative w-full overflow-hidden sm:h-[82vh] sm:w-auto sm:max-w-[92vw]"
              onClick={(event) => event.stopPropagation()}
            >
              <div
                className={`relative flex w-full items-center justify-center sm:h-full sm:w-auto ${
                  imageModalZoomed
                    ? imageModalDragging
                      ? "cursor-grabbing"
                      : "cursor-grab"
                    : "cursor-zoom-in"
                }`}
                onClick={onModalImageClick}
                onPointerDown={onModalImagePointerDown}
                onPointerMove={onModalImagePointerMove}
                onPointerUp={onModalImagePointerUp}
                onPointerCancel={onModalImagePointerUp}
                style={{
                  touchAction: imageModalZoomed ? "none" : "auto",
                }}
              >
                {main && !imageModalFailed ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    ref={modalImageRef}
                    src={main}
                    alt={`${product.name} — full view ${imageIndex + 1}`}
                    onError={() => setImageModalFailed(true)}
                    className="block h-auto w-full select-none rounded-md object-contain sm:h-full sm:w-auto sm:max-w-full"
                    style={{
                      transform: imageModalZoomed
                        ? `translate(${imageModalPan.x}px, ${imageModalPan.y}px) scale(${imageModalZoomScale})`
                        : "translate(0px, 0px) scale(1)",
                      transformOrigin: "center center",
                      transition: imageModalDragging
                        ? "none"
                        : "transform 180ms ease-out",
                    }}
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-black/40 text-stone-300">
                    <span className="font-[family-name:var(--font-display)] text-2xl tracking-[0.18em] sm:text-4xl">
                      MAALEEN
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
                      image coming soon
                    </span>
                  </div>
                )}
              </div>
            </div>

            {imageSlides.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    showPrevImage();
                  }}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/35 text-2xl text-white transition-colors hover:bg-black/55 sm:left-6"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    showNextImage();
                  }}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/35 text-2xl text-white transition-colors hover:bg-black/55 sm:right-6"
                >
                  ›
                </button>
              </>
            ) : null}

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                closeImageModal();
              }}
              aria-label="Close image modal"
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-black/35 text-lg text-white transition-colors hover:bg-black/55 sm:right-6 sm:top-6"
            >
              ×
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
