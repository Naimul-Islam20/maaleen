"use client";

import { useMemo, useRef, useState } from "react";
import { CollectionColumn } from "@/components/collections/collection-column";

/**
 * One landscape card in the center, with a shorter peek on each side.
 * Each card keeps a stable key so the same element animates one slot
 * per swipe, matching the products section.
 */
const SLOT_STYLE = {
  "-2": {
    transform: "translate(calc(-50% - 200%), -50%) scale(0.9)",
    opacity: 0.72,
    filter: "blur(2px)",
    zIndex: 5,
    interactive: false,
  },
  "-1": {
    transform: "translate(calc(-50% - 100%), -50%) scale(0.9)",
    opacity: 0.72,
    filter: "blur(2px)",
    zIndex: 10,
    interactive: false,
  },
  0: {
    transform: "translate(-50%, -50%) scale(1)",
    opacity: 1,
    filter: "blur(0px)",
    zIndex: 20,
    interactive: true,
  },
  1: {
    transform: "translate(calc(-50% + 100%), -50%) scale(0.9)",
    opacity: 0.72,
    filter: "blur(2px)",
    zIndex: 10,
    interactive: false,
  },
  2: {
    transform: "translate(calc(-50% + 200%), -50%) scale(0.9)",
    opacity: 0.72,
    filter: "blur(2px)",
    zIndex: 5,
    interactive: false,
  },
};

export function CollectionsMobileSlider({ items }) {
  const total = items.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStartXRef = useRef(null);
  const dragDeltaXRef = useRef(0);
  const isMouseDraggingRef = useRef(false);
  const gestureHandledRef = useRef(false);

  const hasLoop = total > 1;
  const SWIPE_THRESHOLD = 20;

  const slots = useMemo(() => {
    if (!total) return [];
    const at = (offset) => (activeIndex + offset + total * 8) % total;
    if (!hasLoop) return [{ index: 0, offset: 0 }];
    return [-2, -1, 0, 1, 2].map((offset) => ({
      index: at(offset),
      offset,
    }));
  }, [activeIndex, hasLoop, total]);

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
        <div className={`${hasLoop ? "w-[82%]" : "w-full"} mx-auto opacity-0`}>
          <CollectionColumn
            item={items[activeIndex]}
            variant="tile"
            compact
            className="aspect-video min-h-0"
            sizes="80vw"
          />
        </div>

        {slots.map((slot) => {
          const item = items[slot.index];
          const style = SLOT_STYLE[slot.offset] ?? SLOT_STYLE[0];
          return (
            <div
              key={`collection-slide-${slot.index}`}
              className="absolute left-1/2 top-1/2 w-[82%] transition-[transform,opacity,filter] duration-300 ease-out"
              onDragStartCapture={(event) => event.preventDefault()}
              style={{
                transform: hasLoop
                  ? style.transform
                  : "translate(-50%, -50%) scale(1)",
                opacity: style.opacity,
                filter: style.filter,
                zIndex: style.zIndex,
                pointerEvents: style.interactive ? "auto" : "none",
              }}
            >
              <CollectionColumn
                item={item}
                variant="tile"
                compact
                priority={slot.offset === 0}
                className="aspect-video min-h-0"
                sizes="80vw"
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
