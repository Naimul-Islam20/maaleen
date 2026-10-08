"use client";

import { useEffect, useRef } from "react";
import { LuBanknote, LuGlobe, LuPackageSearch, LuRefreshCcw, LuSmile } from "react-icons/lu";
import { Container } from "@/components/layout/container";

const iconClass = "h-8 w-8 text-[#b5b5b5]";

const ITEMS = [
  { label: "Returns & Exchange", icon: LuRefreshCcw },
  { label: "Cash on Delivery", icon: LuBanknote },
  { label: "1,000+ Happy Customers", icon: LuSmile },
  { label: "Worldwide Shipping", icon: LuGlobe },
  { label: "Order Tracking System", icon: LuPackageSearch },
];

function PromiseCard({ item }) {
  const Icon = item.icon;
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 border border-[#e4e4e4] bg-white px-3 py-6 text-center sm:py-8">
      <Icon className={iconClass} strokeWidth={1.5} aria-hidden />
      <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#b0b0b0] sm:text-[11px]">
        {item.label}
      </p>
    </div>
  );
}

export function ServiceStrip() {
  const scrollerRef = useRef(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let paused = false;
    let timer;

    const advance = () => {
      if (!paused && !reduceMotion.matches && el.clientWidth > 0) {
        const step = el.clientWidth / 2;
        const max = el.scrollWidth - el.clientWidth;
        const next = el.scrollLeft + step;
        el.scrollTo({
          left: next >= max - 4 ? 0 : next,
          behavior: "smooth",
        });
      }
      timer = window.setTimeout(advance, 2800);
    };

    const pause = () => {
      paused = true;
      window.clearTimeout(timer);
    };
    const resume = () => {
      if (!paused) return;
      paused = false;
      window.clearTimeout(timer);
      timer = window.setTimeout(advance, 2800);
    };

    timer = window.setTimeout(advance, 2800);
    el.addEventListener("pointerdown", pause);
    window.addEventListener("pointerup", resume);
    window.addEventListener("pointercancel", resume);

    return () => {
      window.clearTimeout(timer);
      el.removeEventListener("pointerdown", pause);
      window.removeEventListener("pointerup", resume);
      window.removeEventListener("pointercancel", resume);
    };
  }, []);

  return (
    <section aria-label="Store promises" className="bg-[var(--surface)]">
      <Container className="py-6 sm:py-8">
        <div
          ref={scrollerRef}
          className="snap-x snap-mandatory overflow-x-auto overscroll-x-contain scrollbar-none sm:hidden"
        >
          <ul className="flex" style={{ width: `${(ITEMS.length / 2) * 100}%` }}>
            {ITEMS.map((item) => (
              <li
                key={item.label}
                className="shrink-0 snap-start pr-3"
                style={{ width: `${100 / ITEMS.length}%` }}
              >
                <PromiseCard item={item} />
              </li>
            ))}
          </ul>
        </div>

        <ul className="hidden grid-cols-2 gap-3 sm:grid sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {ITEMS.map((item) => (
            <li key={item.label}>
              <PromiseCard item={item} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
