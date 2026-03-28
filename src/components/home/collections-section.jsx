"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CollectionColumn } from "@/components/collections/collection-column";
import { Container } from "@/components/layout/container";
import { HOME_COLLECTION_SLIDES } from "@/data/home-collection-slides";

const SLIDES = HOME_COLLECTION_SLIDES;

function realIndexFromTrack(trackIndex, n) {
  if (trackIndex === 0) return n - 1;
  if (trackIndex === n + 1) return 0;
  return trackIndex - 1;
}

export function CollectionsSection() {
  const n = SLIDES.length;
  const extendedSlides = useMemo(
    () => [
      { ...SLIDES[n - 1], id: `clone-end-${SLIDES[n - 1].id}` },
      ...SLIDES,
      { ...SLIDES[0], id: `clone-start-${SLIDES[0].id}` },
    ],
    [n],
  );
  const panelCount = extendedSlides.length;
  const slideWidthPct = 100 / panelCount;

  const [trackIndex, setTrackIndex] = useState(1);
  const [noTransition, setNoTransition] = useState(false);
  const trackIndexRef = useRef(trackIndex);
  const rafIdsRef = useRef({ a: null, b: null });

  useEffect(() => {
    trackIndexRef.current = trackIndex;
  }, [trackIndex]);

  useEffect(() => {
    const ids = rafIdsRef;
    return () => {
      const { a, b } = ids.current;
      if (a != null) cancelAnimationFrame(a);
      if (b != null) cancelAnimationFrame(b);
    };
  }, []);

  const scheduleReenableTransition = useCallback(() => {
    const { a, b } = rafIdsRef.current;
    if (a != null) cancelAnimationFrame(a);
    if (b != null) cancelAnimationFrame(b);
    rafIdsRef.current.a = requestAnimationFrame(() => {
      rafIdsRef.current.a = null;
      rafIdsRef.current.b = requestAnimationFrame(() => {
        rafIdsRef.current.b = null;
        setNoTransition(false);
      });
    });
  }, []);

  const handleTrackTransitionEnd = useCallback(
    (e) => {
      /* Image hover uses transform too — those events bubble; only handle the track row. */
      if (e.target !== e.currentTarget) return;
      if (e.propertyName !== "transform") return;

      const ti = trackIndexRef.current;
      if (ti === n + 1) {
        setNoTransition(true);
        setTrackIndex(1);
        scheduleReenableTransition();
      } else if (ti === 0) {
        setNoTransition(true);
        setTrackIndex(n);
        scheduleReenableTransition();
      }
    },
    [n, scheduleReenableTransition],
  );

  const prev = useCallback(() => {
    setTrackIndex((i) => Math.max(i - 1, 0));
  }, []);

  const next = useCallback(() => {
    setTrackIndex((i) => Math.min(i + 1, n + 1));
  }, [n]);

  const goToReal = useCallback(
    (i) => {
      if (i < 0 || i >= n) return;
      setTrackIndex(i + 1);
    },
    [n],
  );

  const realIndex = realIndexFromTrack(trackIndex, n);

  return (
    <section
      id="collections"
      className="border-b border-stone-200 bg-[var(--surface)] py-12 sm:py-16 lg:py-20"
    >
      <Container>
        <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-stone-900 sm:text-3xl">
          Collections
        </h2>
        <p className="mt-2 max-w-xl text-sm text-stone-600 sm:text-base">
          Two edits at a time — swipe the carousel to explore more pairings.
        </p>

        <div className="mt-10 w-full overflow-hidden">
          <div
            role="presentation"
            className={`flex motion-reduce:duration-0 ${
              noTransition
                ? "transition-none"
                : "transition-transform duration-500 ease-out motion-reduce:transition-none"
            }`}
            style={{
              width: `${panelCount * 100}%`,
              transform: `translateX(-${trackIndex * slideWidthPct}%)`,
            }}
            onTransitionEnd={handleTrackTransitionEnd}
          >
            {extendedSlides.map((s, slideIndex) => (
              <div
                key={s.id}
                className="grid shrink-0 grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
                style={{ width: `${slideWidthPct}%` }}
              >
                <CollectionColumn
                  item={s.left}
                  priority={slideIndex === 1}
                />
                <CollectionColumn item={s.right} priority={false} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10">
          <button
            type="button"
            aria-label="Previous collections"
            onClick={prev}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-stone-300 bg-[var(--surface-elevated)] text-stone-800 shadow-sm transition-colors hover:border-stone-400 hover:bg-stone-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            <span aria-hidden className="text-xl leading-none">
              ‹
            </span>
          </button>
          <div
            className="flex items-center gap-2 px-2"
            role="tablist"
            aria-label="Collection slides"
          >
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={realIndex === i}
                aria-label={`Collection slide ${i + 1}`}
                onClick={() => goToReal(i)}
                className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                  realIndex === i
                    ? "w-8 bg-[var(--accent)]"
                    : "w-2.5 bg-stone-300 hover:bg-stone-400"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next collections"
            onClick={next}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-stone-300 bg-[var(--surface-elevated)] text-stone-800 shadow-sm transition-colors hover:border-stone-400 hover:bg-stone-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            <span aria-hidden className="text-xl leading-none">
              ›
            </span>
          </button>
        </div>
      </Container>
    </section>
  );
}
