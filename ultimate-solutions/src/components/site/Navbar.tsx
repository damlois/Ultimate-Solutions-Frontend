"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BRAND, NAV } from "@/lib/site";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-border shadow-[0_8px_30px_-20px_rgba(2,6,23,0.25)]"
          : "bg-background/60 backdrop-blur-xl border-border/60",
      ].join(" ")}
    >
      <div className="container-page flex h-20 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 transition-transform duration-300 hover:scale-[1.03]"
        >
          <Image
            src="/purple-logo.png"
            alt={`${BRAND.name} logo`}
            width={80}
            height={80}
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm text-muted">
          {NAV.map((item) => {
            const isActive = !item.href.startsWith("#") && pathname === item.href;
            const linkClass = [
              "relative py-1 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:rounded-full after:bg-ultimate-purple after:transition-all",
              isActive
                ? "text-foreground after:w-full"
                : "hover:text-foreground after:w-0 hover:after:w-full",
            ].join(" ");
            return item.href.startsWith("#") ? (
              <a
                key={item.href}
                href={pathname === "/" ? item.href : `/${item.href}`}
                className={linkClass}
              >
                {item.label}
              </a>
            ) : (
              <Link key={item.href} href={item.href} className={linkClass}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={pathname === "/" ? "#contact" : "/#contact"}
            className="hidden sm:inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold bg-ultimate-purple text-white shadow-sm shadow-ultimate-purple/30 hover:bg-ultimate-purple-2 hover:shadow-md hover:shadow-ultimate-purple/40 hover:-translate-y-0.5 transition-all"
          >
            Book A Free Consultation
          </a>

          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-ultimate-purple/5 text-ultimate-purple hover:bg-ultimate-purple/10 transition"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={[
          "md:hidden grid overflow-hidden border-t bg-background/95 backdrop-blur-xl transition-all duration-300 ease-out",
          mobileOpen
            ? "grid-rows-[1fr] opacity-100 border-border/70"
            : "grid-rows-[0fr] opacity-0 border-transparent",
        ].join(" ")}
      >
        <div className="min-h-0">
          <div className="container-page py-4 flex flex-col gap-2">
            {NAV.map((item) =>
              item.href.startsWith("#") ? (
                <a
                  key={item.href}
                  href={pathname === "/" ? item.href : `/${item.href}`}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-foreground hover:bg-black/[0.03] transition"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-foreground hover:bg-black/[0.03] transition"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}

            <div className="pt-2">
              <a
                href={pathname === "/" ? "#contact" : "/#contact"}
                className="inline-flex w-full h-11 items-center justify-center rounded-full bg-ultimate-purple px-5 text-sm font-semibold text-white hover:bg-ultimate-purple-2 transition"
                onClick={() => setMobileOpen(false)}
              >
                Book A Free Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

