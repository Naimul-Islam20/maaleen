"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/contexts/toast-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { formatPrice } from "@/lib/format";
import { getProductInfo } from "@/lib/product-info";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

const SIZE_MEASUREMENTS = {
  XS: { bust: "31–32", waist: "24–25", hip: "34–35", length: "38" },
  S: { bust: "33–34", waist: "26–27", hip: "36–37", length: "39" },
  M: { bust: "35–36", waist: "28–29", hip: "38–39", length: "40" },
  L: { bust: "37–39", waist: "30–32", hip: "40–42", length: "41" },
  XL: { bust: "40–42", waist: "33–35", hip: "43–45", length: "42" },
};

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
    const pairedSize = paired.sizes?.[0];
    const pairedColor = paired.colors?.[0]?.name;
    if (!pairedSize || !pairedColor || !paired.images?.[0]) return;
    addItem({
      productId: paired.id,
      slug: paired.slug,
      name: paired.name,
      price: paired.price,
      currency: paired.currency,
      image: paired.images[0],
      size: pairedSize,
      color: pairedColor,
      quantity: 1,
    });
    showToast(`${paired.name} added to your bag`);
  }

  return (
    <div>
      {breadcrumbs ? (
        <div className="mb-8 hidden lg:block">{breadcrumbs}</div>
      ) : null}

      <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
        <div>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.05fr)] lg:items-stretch">
            {images.length > 0 ? (
              <div className="order-2 flex gap-2 overflow-x-auto lg:order-1 lg:flex lg:h-full lg:flex-col lg:gap-3 lg:overflow-visible">
                {images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setImageIndex(i)}
                    aria-label={`Show image ${i + 1}`}
                    aria-pressed={i === imageIndex}
                    className={`relative aspect-[4/5] w-24 shrink-0 overflow-hidden bg-stone-100 lg:aspect-auto lg:h-auto lg:min-h-0 lg:w-full lg:flex-1 ${
                      i === imageIndex ? "ring-2 ring-stone-900" : ""
                    }`}
                  >
                    <ImageWithFallback
                      src={src}
                      alt=""
                      imageClassName="object-cover"
                      sizes="240px"
                      fallbackClassName="flex h-full w-full items-center justify-center bg-stone-200 text-stone-500"
                      fallbackLabelClassName="text-[10px] font-semibold uppercase tracking-[0.14em]"
                    />
                    {i === 0 && (onSale || product.tags?.includes("sale")) ? (
                      <span className="absolute left-2 top-2 bg-[#c0392b] px-2 py-0.5 text-[10px] font-bold tracking-wide text-white">
                        SALE
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            ) : null}

            <button
              type="button"
              onClick={openImageModal}
              className="relative order-1 aspect-[3/4] w-full cursor-zoom-in overflow-hidden bg-stone-100 lg:order-2 lg:aspect-auto lg:min-h-[34rem]"
              aria-label="Open product image"
            >
              <ImageWithFallback
                src={main}
                alt={`${product.name} — view ${imageIndex + 1}`}
                imageClassName="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
                fallbackLabelClassName="font-[family-name:var(--font-display)] text-xl tracking-[0.18em] sm:text-2xl lg:text-4xl"
                fallbackSubLabel="image coming soon"
                fallbackSubLabelClassName="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-400 sm:text-xs"
              />
            </button>
          </div>

          {paired ? (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-stone-900">
                Frequently Bought Together
              </h2>
              <div className="mt-4 flex gap-4 border-t border-stone-200 pt-4">
                <Link
                  href={`/shop/${paired.slug}`}
                  className="relative h-24 w-20 shrink-0 overflow-hidden bg-stone-100"
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
                    onClick={addPairedItem}
                    className="mt-2 inline-flex items-center gap-1 bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>

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
                      ? "border-stone-900 bg-stone-900 text-white"
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
                        ? "border-stone-900 bg-stone-900 text-white"
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
            <div className="inline-flex items-center border border-stone-300">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="flex h-11 w-11 items-center justify-center text-lg text-stone-700"
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
                className="flex h-11 w-11 items-center justify-center text-lg text-stone-700"
              >
                +
              </button>
            </div>
            <button
              type="button"
              disabled={!canAdd}
              onClick={handleAdd}
              className="inline-flex h-11 items-center gap-2 bg-stone-900 px-5 text-sm font-semibold text-white hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              + Add to Cart
            </button>
          </div>

          <Link
            href="/exchange-refund"
            className="mt-6 flex items-start justify-between gap-3 rounded-md border border-stone-200 px-4 py-3"
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
            <span className="text-stone-400" aria-hidden>
              ›
            </span>
          </Link>

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
              <div className="mt-3 inline-flex border border-stone-200">
                {[
                  { id: "in", label: "INCH" },
                  { id: "cm", label: "CM" },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setUnit(option.id)}
                    className={`px-4 py-1.5 text-xs font-semibold ${
                      unit === option.id
                        ? "bg-white text-stone-900 ring-1 ring-inset ring-stone-400"
                        : "bg-stone-50 text-stone-500"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[20rem] border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-stone-100 text-stone-700">
                      <th className="border border-stone-200 px-3 py-2 font-semibold">
                        Size
                      </th>
                      {columns.map((column) => (
                        <th
                          key={column.key}
                          className="border border-stone-200 px-3 py-2 font-semibold"
                        >
                          {column.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {product.sizes.map((option) => {
                      const row = SIZE_MEASUREMENTS[option];
                      if (!row) return null;
                      return (
                        <tr key={option}>
                          <td className="border border-stone-200 px-3 py-2">
                            {option}
                          </td>
                          {columns.map((column) => (
                            <td
                              key={column.key}
                              className="border border-stone-200 px-3 py-2"
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
          ) : null}
        </div>
      </div>
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
                    className="block w-full h-auto object-contain select-none sm:h-full sm:w-auto sm:max-w-full"
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
