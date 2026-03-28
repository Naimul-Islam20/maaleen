"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/layout/container";

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
    primaryHref: "/products",
    primaryLabel: "Shop collection",
    secondaryHref: "/products?category=dress",
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
    primaryHref: "/products?category=outerwear",
    primaryLabel: "Shop outerwear",
    secondaryHref: "/products",
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
    primaryHref: "/products",
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
      className="relative min-h-[min(88vh,52rem)] w-full overflow-hidden"
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
      <Container className="relative z-10 flex min-h-[min(88vh,52rem)] flex-col justify-center py-16 sm:py-24 lg:py-28">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8c4c4]">
            {slide.eyebrow}
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {slide.title}
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-stone-200 sm:text-base">
            {slide.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={slide.primaryHref}
              className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-stone-900 transition-colors hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
              className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span aria-hidden className="text-lg leading-none">
                ‹
              </span>
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => go("next")}
              className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
