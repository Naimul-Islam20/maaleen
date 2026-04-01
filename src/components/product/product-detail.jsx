"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/contexts/toast-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { formatPrice } from "@/lib/format";
import { ProductsSliderSection } from "@/components/home/products-slider-section";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

export function ProductDetail({ product, related, breadcrumbs = null }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageModalZoomed, setImageModalZoomed] = useState(false);
  const [imageModalZoomScale, setImageModalZoomScale] = useState(2.5);
  const [imageModalPan, setImageModalPan] = useState({ x: 0, y: 0 });
  const [imageModalDragging, setImageModalDragging] = useState(false);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const modalViewportRef = useRef(null);
  const dragOriginRef = useRef(null);
  const movedWhileDragRef = useRef(false);
  const { addItem } = useCart();
  const { showToast } = useToast();
  const { toggleItem, isWishlisted, ready: wishReady } = useWishlist();

  const images = product.images ?? [];
  const main = images[imageIndex] ?? images[0];
  const onSale =
    product.compareAtPrice != null && product.compareAtPrice > product.price;
  const canAdd = Boolean(size && color && main);
  const imageSlides = images.length > 0 ? images : main ? [main] : [];

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
    if (!modalViewportRef.current) return { x, y };
    const scale = imageModalZoomScale;
    const vw = modalViewportRef.current.clientWidth;
    const vh = modalViewportRef.current.clientHeight;
    const maxX = ((scale - 1) * vw) / 2;
    const maxY = ((scale - 1) * vh) / 2;
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

  function handleAdd() {
    if (!canAdd) return;
    const colorObj = product.colors?.find((c) => c.name === color);
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      currency: product.currency,
      image: main,
      size,
      color,
      quantity: 1,
    });
    showToast(`${product.name} added to your bag`);
  }

  return (
    <div>
      {breadcrumbs ? (
        <div className="mb-8 hidden lg:block">{breadcrumbs}</div>
      ) : null}

      <div className="grid gap-3 sm:gap-6 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-1 max-lg:-mx-3 max-lg:w-[calc(100%+1.5rem)] sm:max-lg:-mx-6 sm:max-lg:w-[calc(100%+3rem)] lg:mx-0 lg:w-full">
          <div className="relative aspect-[4/4] w-full overflow-hidden rounded-none bg-stone-200 sm:aspect-[3/2] lg:aspect-[6/5] lg:rounded-xl">
            <ImageWithFallback
              src={main}
              alt={`${product.name} — view ${imageIndex + 1}`}
              imageClassName="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              fallbackLabelClassName="font-[family-name:var(--font-display)] text-xl tracking-[0.18em] sm:text-2xl lg:text-4xl"
              fallbackSubLabel="image coming soon"
              fallbackSubLabelClassName="text-[10px] font-medium uppercase tracking-[0.22em] text-stone-400 sm:text-xs"
            />
            {main ? (
              <button
                type="button"
                onClick={openImageModal}
                className="absolute inset-0 z-10 cursor-zoom-in"
                aria-label="Open product image"
              />
            ) : null}
          </div>
          {images.length > 1 ? (
            <ul className="flex gap-2 overflow-x-auto px-3 pb-1 pt-3 sm:px-0 lg:px-0 lg:pt-0">
              {images.map((src, i) => (
                <li key={src}>
                  <button
                    type="button"
                    onClick={() => setImageIndex(i)}
                    className={`relative block h-20 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
                      i === imageIndex
                        ? "border-[var(--accent)]"
                        : "border-transparent ring-1 ring-stone-200"
                    }`}
                  >
                    <ImageWithFallback
                      src={src}
                      alt=""
                      imageClassName="object-cover"
                      sizes="112px"
                      fallbackClassName="flex h-full w-full items-center justify-center bg-stone-200 text-stone-500"
                      fallbackLabelClassName="text-[8px] font-semibold uppercase tracking-[0.14em]"
                    />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="pt-0">
          {breadcrumbs ? (
            <div className="mb-2 lg:hidden sm:mb-3">{breadcrumbs}</div>
          ) : null}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-stone-900 sm:text-4xl">
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
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-[var(--surface-elevated)] text-stone-700 transition-colors hover:border-stone-300 hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={
                  wishReady && isWishlisted(product.id)
                    ? "currentColor"
                    : "none"
                }
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={
                  wishReady && isWishlisted(product.id)
                    ? "h-5 w-5 text-[var(--accent)]"
                    : "h-5 w-5"
                }
                aria-hidden
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
          <div className="mt-3 flex flex-wrap items-baseline gap-2">
            <span className="text-xl text-stone-900">
              {formatPrice(product.price, product.currency)}
            </span>
            {onSale ? (
              <span className="text-lg text-stone-400 line-through">
                {formatPrice(product.compareAtPrice, product.currency)}
              </span>
            ) : null}
          </div>
          <p className="mt-6 text-sm leading-relaxed text-stone-600">
            {product.description}
          </p>

          <div className="mt-8 space-y-6">
            <fieldset>
              <legend className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Size
              </legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {(product.sizes ?? []).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`min-h-10 min-w-10 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                      size === s
                        ? "border-stone-900 bg-stone-900 text-white"
                        : "border-stone-200 bg-[var(--surface-elevated)] text-stone-800 hover:border-stone-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Color
              </legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {(product.colors ?? []).map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColor(c.name)}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                      color === c.name
                        ? "border-stone-900 ring-2 ring-stone-900/20"
                        : "border-stone-200 bg-[var(--surface-elevated)] hover:border-stone-400"
                    }`}
                  >
                    <span
                      className="h-4 w-4 rounded-full border border-stone-300"
                      style={{ backgroundColor: c.hex }}
                      aria-hidden
                    />
                    {c.name}
                  </button>
                ))}
              </div>
            </fieldset>

            <button
              type="button"
              disabled={!canAdd}
              onClick={handleAdd}
              className="w-full rounded-full bg-stone-900 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:w-auto sm:min-w-[200px] sm:px-10"
            >
              Add to bag
            </button>
          </div>
        </div>
      </div>
      {related.length > 0 ? (
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
      {imageModalOpen ? (
        <div
          className="fixed inset-0 z-[80] bg-black/90"
          onClick={closeImageModal}
        >
          <div className="relative flex h-full w-full items-center justify-center p-4 sm:p-8">
            <div
              ref={modalViewportRef}
              className="relative h-[72vh] w-full max-w-6xl overflow-hidden sm:h-full"
              onClick={(event) => event.stopPropagation()}
            >
              <div
                className={`relative flex h-full w-full items-center justify-center ${
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
                  transform: imageModalZoomed
                    ? `translate(${imageModalPan.x}px, ${imageModalPan.y}px) scale(${imageModalZoomScale})`
                    : "translate(0px, 0px) scale(1)",
                  transformOrigin: "center center",
                  transition: imageModalDragging
                    ? "none"
                    : "transform 180ms ease-out",
                  touchAction: imageModalZoomed ? "none" : "auto",
                }}
              >
                <ImageWithFallback
                  src={main}
                  alt={`${product.name} — full view ${imageIndex + 1}`}
                  useNative
                  imageClassName="object-contain"
                  fallbackClassName="flex h-full w-full flex-col items-center justify-center gap-2 bg-black/40 text-stone-300"
                  fallbackLabelClassName="font-[family-name:var(--font-display)] text-2xl tracking-[0.18em] sm:text-4xl"
                  fallbackSubLabel="image coming soon"
                  fallbackSubLabelClassName="text-xs font-medium uppercase tracking-[0.2em] text-stone-400"
                />
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
