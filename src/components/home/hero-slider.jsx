"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/layout/container";
import { buildShopEditHref } from "@/data/shop-edits";

const AUTO_MS = 6000;

const SLIDES = [
  {
    id: "1",
    eyebrow: "New season",
    title: "Quiet luxury for every day",
    description:
      "Thoughtfully cut dresses and layers — designed to move with you from morning light to evening plans.",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1920&q=85",
    imageAlt: "",
    primaryHref: "/shop",
    primaryLabel: "Shop collection",
    secondaryHref: buildShopEditHref("evening-silhouettes"),
    secondaryLabel: "View dresses",
  },
  {
    id: "2",
    eyebrow: "Outer layers",
    title: "Trans-seasonal trenches & coats",
    description:
      "Lightweight shells and wool blends that polish any outfit without weighing you down.",
    image:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=1920&q=85",
    imageAlt: "",
    primaryHref: buildShopEditHref("outer-layers"),
    primaryLabel: "Shop outerwear",
    secondaryHref: buildShopEditHref("full-edit"),
    secondaryLabel: "Full collection",
  },
  {
    id: "3",
    eyebrow: "Just in",
    title: "Fresh silhouettes for the city",
    description:
      "New arrivals in refined fabrics — limited runs, curated for the Maaleen wardrobe.",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1920&q=85",
    imageAlt: "",
    primaryHref: buildShopEditHref("new-arrivals"),
    primaryLabel: "New arrivals",
    secondaryHref: "/cart",
    secondaryLabel: "Your bag",
  },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((dir) => {
    setIndex((i) => {
      const n = SLIDES.length;
      if (dir === "next") return (i + 1) % n;
      return (i - 1 + n) % n;
    });
  }, []);

  const goTo = useCallback((i) => {
    setIndex(i);
  }, []);

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [paused]);

  const slide = SLIDES[index];

  return (
    <div
      className="relative h-[28rem] w-full overflow-hidden sm:h-[34rem] lg:h-[40rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >{`Slide ${index + 1} of ${SLIDES.length}: ${slide.title}`}</div>

      {/* Full-bleed background images */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:duration-0 ${
            i === index ? "z-0 opacity-100" : "z-0 opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={s.image}
            alt={s.imageAlt}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority={i === 0}
            fetchPriority={i === 0 ? "high" : "low"}
          />
          {/* Readability scrim */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-stone-950/88 via-stone-950/55 to-stone-900/25 sm:via-stone-950/45 sm:to-stone-900/15"
            aria-hidden
          />
        </div>
      ))}

      {/* Content inside site container */}
      <Container className="relative z-10 flex h-full flex-col justify-center py-10 sm:py-14 lg:py-16">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
            {slide.eyebrow}
          </p>
          <h1 className="mt-3 overflow-hidden text-ellipsis whitespace-nowrap font-[family-name:var(--font-display)] text-4xl leading-tight tracking-tight text-white sm:mt-4 sm:text-5xl lg:text-6xl">
            {slide.title}
          </h1>
          <p className="mt-3 min-h-[3rem] overflow-hidden text-ellipsis text-sm leading-relaxed text-stone-200 [-webkit-box-orient:vertical] [display:-webkit-box] [-webkit-line-clamp:2] sm:mt-6 sm:min-h-[3.5rem] sm:text-base">
            {slide.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
            <Link
              href={slide.primaryHref}
              className="inline-flex rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {slide.primaryLabel}
            </Link>
            <Link
              href={slide.secondaryHref}
              className="inline-flex rounded-full border border-white/45 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {slide.secondaryLabel}
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 sm:mt-20">
          <div
            className="flex gap-2"
            role="tablist"
            aria-label="Hero slides"
          >
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to slide ${i + 1}: ${s.title}`}
                onClick={() => goTo(i)}
                className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  i === index
                    ? "w-8 bg-white"
                    : "w-2.5 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => go("prev")}
              className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-white/40 bg-[var(--icon-button-bg)] text-white backdrop-blur-sm transition-colors hover:bg-[var(--icon-button-bg)]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span aria-hidden className="text-lg leading-none">
                ‹
              </span>
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => go("next")}
              className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-white/40 bg-[var(--icon-button-bg)] text-white backdrop-blur-sm transition-colors hover:bg-[var(--icon-button-bg)]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span aria-hidden className="text-lg leading-none">
                ›
              </span>
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
