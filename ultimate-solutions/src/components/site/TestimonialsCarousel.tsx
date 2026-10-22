"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site";

function authorInitials(author: string) {
  return author
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function TestimonialsCarousel() {
  const total = TESTIMONIALS.length;
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % total) + total) % total);
    },
    [total]
  );

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, 9000);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [total]);

  const pauseAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const t = TESTIMONIALS[index];
  const role = "role" in t ? t.role : undefined;

  return (
    <div
      className="relative mt-10"
      onMouseEnter={pauseAutoplay}
      onFocusCapture={pauseAutoplay}
      onTouchStart={(e) => {
        touchStartX.current = e.changedTouches[0]?.clientX ?? null;
        pauseAutoplay();
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current == null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(delta) < 48) return;
        if (delta > 0) prev();
        else next();
      }}
    >
      <div className="noise-overlay relative card-dark rounded-3xl p-6 sm:p-8 lg:p-10 overflow-hidden">
        <span
          className="font-display absolute -top-6 left-4 sm:left-6 text-8xl text-white/10 select-none"
          aria-hidden="true"
        >
          “
        </span>

        <div
          key={index}
          className="relative animate-testimonial-in"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="font-display text-lg sm:text-xl lg:text-2xl font-medium leading-snug">
            “{t.headline}”
          </div>
          <div className="mt-5 sm:mt-6 max-h-[18rem] sm:max-h-[22rem] overflow-y-auto whitespace-pre-line leading-relaxed text-sm sm:text-[15px] text-white/75 pr-1">
            {t.body}
          </div>
          <div className="mt-7 sm:mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6">
            <div className="flex items-center gap-3 min-w-0">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white font-display text-sm font-semibold text-ultimate-purple">
                {authorInitials(t.author)}
              </div>
              <div className="min-w-0">
                <div className="font-display font-semibold truncate">
                  {t.author}
                </div>
                <div className="text-xs text-white/60 truncate">
                  {role ?? "Verified client feedback"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/15 hover:border-white/35 transition"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/15 hover:border-white/35 transition"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="mt-5 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Testimonials"
      >
        {TESTIMONIALS.map((item, i) => (
          <button
            key={`${item.author}-${i}`}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show testimonial from ${item.author}`}
            onClick={() => {
              pauseAutoplay();
              goTo(i);
            }}
            className={[
              "h-2 rounded-full transition-all duration-300",
              i === index
                ? "w-8 bg-ultimate-purple"
                : "w-2 bg-ultimate-purple/25 hover:bg-ultimate-purple/45",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}
