"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { Reveal } from "@/components/ui/Reveal";
import { PORTFOLIO_GRAPHICS, PORTFOLIO_LOGOS } from "@/lib/site";
import { useEffect, useMemo, useState } from "react";

type WorkCategory = "all" | "logos" | "graphics";

type WorkItem = {
  src: string;
  alt: string;
  category: Exclude<WorkCategory, "all">;
};

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex h-9 items-center rounded-full px-4 text-sm font-semibold transition-all",
        active
          ? "bg-gradient-brand text-white shadow-md shadow-ultimate-purple/30"
          : "bg-ultimate-purple/5 text-foreground hover:bg-ultimate-purple/10 hover:-translate-y-0.5",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div className="space-y-1">
        <div className="font-display text-2xl font-semibold tracking-tight">
          {title}
        </div>
        {subtitle ? <div className="text-sm text-muted">{subtitle}</div> : null}
      </div>
    </div>
  );
}

function WorkCard({
  item,
  onOpen,
}: {
  item: WorkItem;
  onOpen: (item: WorkItem) => void;
}) {
  const isLogo = item.category === "logos";
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className={[
        "group relative block w-full h-full overflow-hidden rounded-3xl bg-card text-left shadow-md",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-ultimate-purple/20",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ultimate-purple/40",
      ].join(" ")}
      aria-label={`Open ${item.alt}`}
    >
      <div className={["relative w-full", isLogo ? "aspect-[4/3]" : "aspect-[4/5]"].join(" ")}>
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={[
            "clickable-image transition-transform duration-300",
            isLogo ? "bg-white object-contain p-6" : "object-cover",
            "group-hover:scale-[1.04]",
          ].join(" ")}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="rounded-2xl bg-black/70 backdrop-blur px-4 py-3 text-white opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{item.alt}</div>
              <div className="text-xs text-white/60 capitalize">{item.category}</div>
            </div>
            <div className="h-9 w-9 rounded-2xl bg-white/15 grid place-items-center">
              <span className="text-sm font-bold text-white">↗</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function WorkPage() {
  const [category, setCategory] = useState<WorkCategory>("all");
  const [active, setActive] = useState<WorkItem | null>(null);

  const graphics = useMemo<WorkItem[]>(
    () =>
      PORTFOLIO_GRAPHICS.map((x) => ({
        ...x,
        category: "graphics",
      })),
    []
  );
  const logos = useMemo<WorkItem[]>(
    () =>
      PORTFOLIO_LOGOS.map((x) => ({
        ...x,
        category: "logos",
      })),
    []
  );

  const graphicsFiltered = useMemo(() => {
    if (category === "logos") return [];
    return graphics;
  }, [category, graphics]);

  const logosFiltered = useMemo(() => {
    if (category === "graphics") return [];
    return logos;
  }, [category, logos]);

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-32 right-[-140px] h-[420px] w-[420px] rounded-full bg-ultimate-purple/15 blur-3xl animate-float-slow" />
          <div className="absolute top-[420px] left-[-160px] h-[380px] w-[380px] rounded-full bg-sky-500/10 blur-3xl animate-float-slower" />
        </div>

        <div className="container-page py-14 sm:py-18 flex flex-col gap-10">
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground hover:-translate-x-0.5 transition-all"
            >
              <span className="text-lg leading-none">←</span> Back to home
            </Link>

            <div className="inline-flex items-center gap-2 rounded-full border border-ultimate-purple/20 bg-ultimate-purple/5 px-3 py-1 text-xs font-semibold text-ultimate-purple">
              <span className="h-1.5 w-1.5 rounded-full bg-ultimate-purple" />
              Our work
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
              Portfolio
            </h1>
            <p className="text-muted max-w-2xl">
              A curated view of our logos and graphic design work, arranged as a
              modern gallery.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <Chip active={category === "all"} onClick={() => setCategory("all")}>
                All
              </Chip>
              <Chip
                active={category === "graphics"}
                onClick={() => setCategory("graphics")}
              >
                <span className="inline-flex items-center gap-2">
                  Graphics
                </span>
              </Chip>
              <Chip active={category === "logos"} onClick={() => setCategory("logos")}>
                <span className="inline-flex items-center gap-2">
                  Logos
                </span>
              </Chip>
            </div>
          </div>

          <section aria-label="Work gallery">
            <div className="space-y-12">
              {graphicsFiltered.length ? (
                <div className="space-y-6">
                  <Reveal>
                    <SectionTitle
                      title="Graphics design"
                      subtitle="Social posts, brand visuals, and creative designs."
                    />
                  </Reveal>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {graphicsFiltered.map((item, i) => (
                      <Reveal key={item.src} delay={(i % 6) * 60} className="h-full">
                        <WorkCard item={item} onOpen={(x) => setActive(x)} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              ) : null}

              {logosFiltered.length ? (
                <div className="space-y-6">
                  <Reveal>
                    <SectionTitle
                      title="Logo design"
                      subtitle="Clean marks designed for clarity, balance, and memorability."
                    />
                  </Reveal>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {logosFiltered.map((item, i) => (
                      <Reveal key={item.src} delay={(i % 8) * 50} className="h-full">
                        <WorkCard item={item} onOpen={(x) => setActive(x)} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </main>

      {/* Modal */}
      {active ? (
        <div
          className="animate-modal-backdrop fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Preview: ${active.alt}`}
          onMouseDown={(e) => {
            if (e.currentTarget === e.target) setActive(null);
          }}
        >
          <div className="container-page h-full py-10 flex items-center justify-center">
            <div className="animate-modal-panel relative w-full max-w-5xl overflow-hidden rounded-3xl bg-card shadow-2xl">
              <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
                <div className="min-w-0">
                  <div className="truncate font-display text-lg font-semibold">
                    {active.alt}
                  </div>
                  <div className="text-xs text-muted capitalize">
                    {active.category}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-ultimate-purple/5 hover:bg-ultimate-purple/10 hover:rotate-90 transition-all"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="relative w-full bg-white">
                <div className="relative w-full h-[70vh]">
                  <Image
                    src={active.src}
                    alt={active.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <Footer />
    </div>
  );
}

