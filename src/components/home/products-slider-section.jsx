"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  useDesktopCarouselOnMobile = false,
  mobileTwoUpNoLoop = false,
  showCta = true,
  centerTitleOnMobile = false,
  compactMobileSpacing = false,
  useParentContainer = false,
}) {
  const MOBILE_SIDE_OFFSET = "100%";
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStartXRef = useRef(null);
  const dragDeltaXRef = useRef(0);
  const isMouseDraggingRef = useRef(false);
  const gestureHandledRef = useRef(false);

  const total = products.length;
  const hasProducts = total > 0;
  
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Only allow sliding/dragging if products don't fit on screen (more than 4 on desktop, more than 1 on mobile)
  const shouldSlide = isDesktop ? total > 5 : total > 1;

  const hasLoop = mobileTwoUpNoLoop ? false : shouldSlide;
  const hasNav = mobileTwoUpNoLoop ? total > 2 : shouldSlide;
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const { emblaRef, emblaApi, scrollPrev, scrollNext } = useEmblaAutoplay({
    slideCount: products.length,
    autoplay: false,
    emblaOptions: {
      align: "start",
      dragFree: false,
      containScroll: "trimSnaps",
      loop: hasLoop,
      watchDrag: shouldSlide
    },
  });

  useEffect(() => {
    if (!emblaApi) return;
    const sync = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    sync();
    emblaApi.on("select", sync);
    emblaApi.on("reInit", sync);
    return () => {
      emblaApi.off("select", sync);
      emblaApi.off("reInit", sync);
    };
  }, [emblaApi]);

  const desktopPrevDisabled = useDesktopCarouselOnMobile
    ? !canScrollPrev
    : !hasNav;
  const desktopNextDisabled = useDesktopCarouselOnMobile
    ? !canScrollNext
    : !hasNav;

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
    if (!shouldSlide) return;
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
    if (dragStartXRef.current == null || !shouldSlide) return;
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
    if (dragStartXRef.current == null) return;
    const delta = x - dragStartXRef.current;
    const moved = maybeSlideByDelta(delta);
    if (moved) {
      dragStartXRef.current = x ?? null;
      dragDeltaXRef.current = 0;
      return;
    }
    trackDrag(x);
  };

  const onTouchCancel = () => {
    dragStartXRef.current = null;
    dragDeltaXRef.current = 0;
    gestureHandledRef.current = false;
  };

  const preventNativeDrag = (event) => {
    event.preventDefault();
  };

  if (!hasProducts) return null;

  const contentClass = compactMobileSpacing
    ? "py-6 sm:py-10"
    : "py-10 sm:py-14";
  const Wrapper = useParentContainer ? "div" : Container;

  return (
    <section className={sectionClassName}>
      <Wrapper className={contentClass}>
        <div
          className={`flex items-end gap-4 ${
            showCta ? "justify-between" : "justify-center sm:justify-start"
          }`}
        >
          <h2
            className={`font-[family-name:var(--font-display)] text-2xl text-stone-900 sm:text-3xl ${
              centerTitleOnMobile ? "text-center sm:text-left" : ""
            }`}
          >
            {title}
          </h2>
          {showCta ? (
            <Link
              href={ctaHref}
              className="text-sm font-medium text-[var(--accent)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              {ctaLabel}
            </Link>
          ) : null}
        </div>

        <div
          className={`${
            compactMobileSpacing ? "mt-5" : "mt-10"
          } min-w-0 ${useDesktopCarouselOnMobile ? "hidden" : "sm:hidden"}`}
        >
          <div
            className="relative overflow-hidden py-1"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchCancel}
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

          <div
            className={`${
              compactMobileSpacing ? "mt-5" : "mt-8"
            } flex flex-wrap items-center justify-center gap-3 sm:mt-10`}
          >
            <button
              type="button"
              aria-label="Previous products"
              onClick={goPrev}
              className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full border-2 border-[var(--primary)] bg-transparent text-[var(--primary)] transition-all hover:bg-[var(--primary)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-30"
              disabled={!hasNav}
            >
              <span aria-hidden className="text-2xl leading-none">
                ‹
              </span>
            </button>
            <button
              type="button"
              aria-label="Next products"
              onClick={goNext}
              className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full border-2 border-[var(--primary)] bg-transparent text-[var(--primary)] transition-all hover:bg-[var(--primary)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-30"
              disabled={!hasNav}
            >
              <span aria-hidden className="text-2xl leading-none">
                ›
              </span>
            </button>
          </div>
        </div>

        <div
          className={`${
            compactMobileSpacing ? "mt-5" : "mt-10"
          } min-w-0 ${
            useDesktopCarouselOnMobile ? "block" : "hidden sm:block"
          }`}
        >
          <div
            ref={emblaRef}
            className={`maaleen-products-embla overflow-hidden py-1 ${
              mobileTwoUpNoLoop ? "maaleen-products-embla-two-up-mobile" : ""
            }`}
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

          <div
            className={`${
              compactMobileSpacing ? "mt-5" : "mt-8"
            } flex flex-wrap items-center justify-center gap-3 sm:mt-10`}
          >
            <button
              type="button"
              aria-label="Previous products"
              onClick={scrollPrev}
              className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full border-2 border-[var(--primary)] bg-transparent text-[var(--primary)] transition-all hover:bg-[var(--primary)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-30"
              disabled={desktopPrevDisabled}
            >
              <span aria-hidden className="text-2xl leading-none">
                ‹
              </span>
            </button>
            <button
              type="button"
              aria-label="Next products"
              onClick={scrollNext}
              className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full border-2 border-[var(--primary)] bg-transparent text-[var(--primary)] transition-all hover:bg-[var(--primary)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-30"
              disabled={desktopNextDisabled}
            >
              <span aria-hidden className="text-2xl leading-none">
                ›
              </span>
            </button>
          </div>
        </div>
      </Wrapper>
    </section>
  );
}
