"use client";

import { useMemo, useRef, useState } from "react";
import { CollectionColumn } from "@/components/collections/collection-column";

/**
 * Mobile/tablet collections carousel — same peek + center card pattern as
 * home "New arrivals".
 */
export function CollectionsMobileSlider({ items }) {
  const total = items.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStartXRef = useRef(null);
  const dragDeltaXRef = useRef(0);
  const isMouseDraggingRef = useRef(false);
  const gestureHandledRef = useRef(false);

  const hasLoop = total > 1;
  const MOBILE_SIDE_OFFSET = "100%";
  const SWIPE_THRESHOLD = 20;

  const prevIndex = useMemo(() => {
    if (!hasLoop) return 0;
    return (activeIndex - 1 + total) % total;
  }, [activeIndex, hasLoop, total]);

  const nextIndex = useMemo(() => {
    if (!hasLoop) return 0;
    return (activeIndex + 1) % total;
  }, [activeIndex, hasLoop, total]);

  const mobileIndices = useMemo(() => {
    if (!total) return [];
    if (!hasLoop) return [activeIndex];
    return [prevIndex, activeIndex, nextIndex];
  }, [total, hasLoop, activeIndex, prevIndex, nextIndex]);

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

  const maybeSlideByDelta = (delta) => {
    if (!hasLoop || gestureHandledRef.current) return false;
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

  if (!total) return null;

  return (
    <div className="mt-8 sm:mt-12 lg:hidden">
      <div
        className="relative overflow-hidden py-1"
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse") return;
          isMouseDraggingRef.current = true;
          startDrag(event.clientX);
        }}
        onPointerMove={(event) => {
          if (event.pointerType !== "mouse" || !isMouseDraggingRef.current)
            return;
          if (dragStartXRef.current == null) return;
          const delta = event.clientX - dragStartXRef.current;
          if (maybeSlideByDelta(delta)) {
            dragDeltaXRef.current = 0;
          } else {
            trackDrag(event.clientX);
          }
        }}
        onPointerUp={(event) => {
          if (event.pointerType !== "mouse") return;
          finishDrag(event.clientX);
        }}
        onPointerCancel={() => {
          dragStartXRef.current = null;
          dragDeltaXRef.current = 0;
          isMouseDraggingRef.current = false;
          gestureHandledRef.current = false;
        }}
        onTouchStart={(event) => startDrag(event.touches[0]?.clientX)}
        onTouchMove={(event) => {
          const x = event.touches[0]?.clientX;
          if (dragStartXRef.current == null) return;
          const delta = x - dragStartXRef.current;
          if (maybeSlideByDelta(delta)) {
            dragStartXRef.current = x ?? null;
            dragDeltaXRef.current = 0;
            return;
          }
          trackDrag(x);
        }}
        onTouchEnd={(event) => finishDrag(event.changedTouches[0]?.clientX)}
        onTouchCancel={() => {
          dragStartXRef.current = null;
          dragDeltaXRef.current = 0;
          gestureHandledRef.current = false;
        }}
        onDragStartCapture={(event) => event.preventDefault()}
        style={{ touchAction: "pan-y" }}
      >
        <div className={`${hasLoop ? "w-[72%]" : "w-full"} mx-auto opacity-0`}>
          <CollectionColumn
            item={items[activeIndex]}
            variant="tile"
            className="aspect-[4/5] min-h-0"
            sizes="72vw"
          />
        </div>

        {mobileIndices.map((index) => {
          const item = items[index];
          const isCenter = index === activeIndex;
          const isLeft = index === prevIndex && hasLoop;
          const transform = isCenter
            ? "translate(-50%, -50%) scale(1)"
            : isLeft
              ? `translate(calc(-50% - ${MOBILE_SIDE_OFFSET}), -50%) scale(0.9)`
              : `translate(calc(-50% + ${MOBILE_SIDE_OFFSET}), -50%) scale(0.9)`;

          return (
            <div
              key={`${item.href}-${index}`}
              className="absolute left-1/2 top-1/2 w-[72%] transition-[transform,opacity] duration-300 ease-out"
              onDragStartCapture={(event) => event.preventDefault()}
              style={{
                transform,
                opacity: isCenter ? 1 : 0.9,
                zIndex: isCenter ? 20 : 10,
                pointerEvents: isCenter ? "auto" : "none",
              }}
            >
              <CollectionColumn
                item={item}
                variant="tile"
                priority={index === 0 && isCenter}
                className="aspect-[4/5] min-h-0"
                sizes="72vw"
              />
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10">
        <button
          type="button"
          aria-label="Previous collections"
          onClick={goPrev}
          disabled={!hasLoop}
          className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full border border-[var(--primary)] bg-transparent text-[var(--primary)] transition-all hover:bg-[var(--primary)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <span aria-hidden className="text-2xl leading-none">
            ‹
          </span>
        </button>
        <button
          type="button"
          aria-label="Next collections"
          onClick={goNext}
          disabled={!hasLoop}
          className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full border border-[var(--primary)] bg-transparent text-[var(--primary)] transition-all hover:bg-[var(--primary)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <span aria-hidden className="text-2xl leading-none">
            ›
          </span>
        </button>
      </div>
    </div>
  );
}
