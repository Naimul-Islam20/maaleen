import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

/**
 * Reusable Embla autoplay hook with proper cleanup.
 * @param {object} params
 * @param {number} params.slideCount - number of slides (used to guard autoplay)
 * @param {number} [params.delay=3000] - autoplay delay in ms
 * @param {object} [params.emblaOptions={}] - options passed to Embla
 * @param {boolean} [params.autoplay=true] - set false to disable timed advance (e.g. product rows)
 */
export default function useEmblaAutoplay({
  slideCount,
  delay = 3000,
  emblaOptions = {},
  autoplay = true,
} = {}) {
  const timerRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const scheduleNext = useCallback(() => {
    clearTimer();
    if (!autoplay || !emblaApi || (slideCount ?? 0) < 2) return;
    timerRef.current = setTimeout(() => {
      emblaApi.scrollNext();
    }, delay);
  }, [autoplay, clearTimer, emblaApi, slideCount, delay]);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    clearTimer();
    emblaApi.scrollPrev();
    scheduleNext();
  }, [emblaApi, clearTimer, scheduleNext]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    clearTimer();
    emblaApi.scrollNext();
    scheduleNext();
  }, [emblaApi, clearTimer, scheduleNext]);

  const scrollTo = useCallback(
    (index) => {
      if (!emblaApi) return;
      clearTimer();
      emblaApi.scrollTo(index);
      scheduleNext();
    },
    [emblaApi, clearTimer, scheduleNext],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      scheduleNext();
    };
    emblaApi.on("select", onSelect);
    emblaApi.on("pointerDown", clearTimer);
    emblaApi.on("pointerUp", scheduleNext);
    scheduleNext();
    return () => {
      clearTimer();
      emblaApi.off("select", onSelect);
      emblaApi.off("pointerDown", clearTimer);
      emblaApi.off("pointerUp", scheduleNext);
    };
  }, [emblaApi, scheduleNext, clearTimer]);

  useEffect(() => {
    scheduleNext();
    return () => {
      clearTimer();
    };
  }, [scheduleNext, clearTimer]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        scheduleNext();
      } else {
        clearTimer();
      }
    };
    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      clearTimer();
    };
  }, [scheduleNext, clearTimer]);

  return {
    emblaRef,
    emblaApi,
    selectedIndex,
    scrollPrev,
    scrollNext,
    scrollTo,
    clearTimer,
    scheduleNext,
  };
}
