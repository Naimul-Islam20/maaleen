"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import useEmblaAutoplay from "@/hooks/useEmblaAutoplay";
import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/product/product-card";

export function ProductsSliderSection({
  products,
  title = "Products",
  ctaLabel = "See all",
  ctaHref = "/shop",
  sectionClassName = "border-t border-stone-200 bg-[var(--surface)]",
}) {
  const MOBILE_SIDE_OFFSET = "100%";
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStartXRef = useRef(null);
  const dragDeltaXRef = useRef(0);
  const isMouseDraggingRef = useRef(false);
  const gestureHandledRef = useRef(false);

  const total = products.length;
  const hasProducts = total > 0;
  const hasLoop = total > 1;
  const { emblaRef, scrollPrev, scrollNext } = useEmblaAutoplay({
    slideCount: products.length,
    autoplay: false,
    emblaOptions: {
      align: "start",
      dragFree: true,
      loop: hasLoop,
    },
  });

  const prevIndex = useMemo(() => {
    if (!hasLoop) return 0;
    return (activeIndex - 1 + total) % total;
  }, [activeIndex, hasLoop, total]);

  const nextIndex = useMemo(() => {
    if (!hasLoop) return 0;
    return (activeIndex + 1) % total;
  }, [activeIndex, hasLoop, total]);

  const mobileIndices = useMemo(() => {
    if (!hasProducts) return [];
    if (!hasLoop) return [activeIndex];
    return [prevIndex, activeIndex, nextIndex];
  }, [hasProducts, hasLoop, activeIndex, prevIndex, nextIndex]);

  const goPrev = () => {
    if (!hasLoop) return;
    setActiveIndex((current) => (current - 1 + total) % total);
  };

  const goNext = () => {
    if (!hasLoop) return;
    setActiveIndex((current) => (current + 1) % total);
  };

  const startDrag = (pointX) => {
    dragStartXRef.current = pointX ?? null;
    dragDeltaXRef.current = 0;
    gestureHandledRef.current = false;
  };

  const SWIPE_THRESHOLD = 20;

  const maybeSlideByDelta = (delta) => {
    if (!hasLoop) return;
    if (gestureHandledRef.current) return false;
    if (delta <= -SWIPE_THRESHOLD) {
      goNext();
      gestureHandledRef.current = true;
      return true;
    }
    if (delta >= SWIPE_THRESHOLD) {
      goPrev();
      gestureHandledRef.current = true;
      return true;
    }
    return false;
  };

  const trackDrag = (pointX) => {
    if (dragStartXRef.current == null) return;
    const currentX = pointX ?? dragStartXRef.current;
    dragDeltaXRef.current = currentX - dragStartXRef.current;
  };

  const finishDrag = (pointX) => {
    if (dragStartXRef.current == null || !hasLoop) return;
    const endX = pointX ?? dragStartXRef.current;
    const delta = dragDeltaXRef.current || endX - dragStartXRef.current;
    maybeSlideByDelta(delta);
    dragStartXRef.current = null;
    dragDeltaXRef.current = 0;
    isMouseDraggingRef.current = false;
    gestureHandledRef.current = false;
  };

  const onPointerDown = (event) => {
    if (event.pointerType !== "mouse") return;
    isMouseDraggingRef.current = true;
    startDrag(event.clientX);
  };

  const onPointerMove = (event) => {
    if (event.pointerType !== "mouse" || !isMouseDraggingRef.current) return;
    if (dragStartXRef.current == null) return;
    const delta = event.clientX - dragStartXRef.current;
    const moved = maybeSlideByDelta(delta);
    if (moved) {
      // One drag gesture should move only one slide
      dragDeltaXRef.current = 0;
    } else {
      trackDrag(event.clientX);
    }
  };

  const onPointerUp = (event) => {
    if (event.pointerType !== "mouse") return;
    finishDrag(event.clientX);
  };

  const onPointerCancel = () => {
    dragStartXRef.current = null;
    dragDeltaXRef.current = 0;
    isMouseDraggingRef.current = false;
    gestureHandledRef.current = false;
  };

  const onTouchStart = (event) => {
    const x = event.touches[0]?.clientX;
    startDrag(x);
  };

  const onTouchEnd = (event) => {
    const x = event.changedTouches[0]?.clientX;
    finishDrag(x);
  };

  const onTouchMove = (event) => {
    const x = event.touches[0]?.clientX;
    trackDrag(x);
  };

  const preventNativeDrag = (event) => {
    event.preventDefault();
  };

  if (!hasProducts) return null;

  return (
    <section className={sectionClassName}>
      <Container className="py-14 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-stone-900 sm:text-3xl">
            {title}
          </h2>
          <Link
            href={ctaHref}
            className="text-sm font-medium text-[var(--accent)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            {ctaLabel}
          </Link>
        </div>

        <div className="mt-10 min-w-0 sm:hidden">
          <div
            className="relative overflow-hidden py-1"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onDragStartCapture={preventNativeDrag}
            style={{ touchAction: "pan-y" }}
          >
            {/* Height anchor so absolute cards can animate without layout jump */}
            <div
              className={`${hasLoop ? "w-[72%]" : "w-full"} mx-auto opacity-0`}
            >
              <ProductCard product={products[activeIndex]} />
            </div>

            {mobileIndices.map((index) => {
              const product = products[index];
              const isCenter = index === activeIndex;
              const isLeft = index === prevIndex && hasLoop;
              const transform = isCenter
                ? "translate(-50%, -50%) scale(1)"
                : isLeft
                  ? `translate(calc(-50% - ${MOBILE_SIDE_OFFSET}), -50%) scale(0.9)`
                  : `translate(calc(-50% + ${MOBILE_SIDE_OFFSET}), -50%) scale(0.9)`;

              return (
                <div
                  key={`${product.id}-${index}`}
                  className="absolute left-1/2 top-1/2 w-[72%] transition-[transform,opacity] duration-300 ease-out"
                  onDragStartCapture={preventNativeDrag}
                  style={{
                    transform,
                    opacity: isCenter ? 1 : 0.9,
                    zIndex: isCenter ? 20 : 10,
                    pointerEvents: isCenter ? "auto" : "none",
                  }}
                >
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10">
            <button
              type="button"
              aria-label="Previous products"
              onClick={goPrev}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-stone-300 bg-[var(--surface-elevated)] text-stone-800 shadow-sm transition-colors hover:border-stone-400 hover:bg-stone-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              disabled={!hasLoop}
            >
              <span aria-hidden className="text-xl leading-none">
                ‹
              </span>
            </button>
            <button
              type="button"
              aria-label="Next products"
              onClick={goNext}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-stone-300 bg-[var(--surface-elevated)] text-stone-800 shadow-sm transition-colors hover:border-stone-400 hover:bg-stone-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              disabled={!hasLoop}
            >
              <span aria-hidden className="text-xl leading-none">
                ›
              </span>
            </button>
          </div>
        </div>

        <div className="mt-10 hidden min-w-0 sm:block">
          <div
            ref={emblaRef}
            className="maaleen-products-embla overflow-hidden py-1"
          >
            <div className="flex">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="maaleen-products-embla-slide shrink-0"
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10">
            <button
              type="button"
              aria-label="Previous products"
              onClick={scrollPrev}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-stone-300 bg-[var(--surface-elevated)] text-stone-800 shadow-sm transition-colors hover:border-stone-400 hover:bg-stone-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              disabled={!hasLoop}
            >
              <span aria-hidden className="text-xl leading-none">
                ‹
              </span>
            </button>
            <button
              type="button"
              aria-label="Next products"
              onClick={scrollNext}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-stone-300 bg-[var(--surface-elevated)] text-stone-800 shadow-sm transition-colors hover:border-stone-400 hover:bg-stone-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              disabled={!hasLoop}
            >
              <span aria-hidden className="text-xl leading-none">
                ›
              </span>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
