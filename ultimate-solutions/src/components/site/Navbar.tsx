"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BRAND, NAV } from "@/lib/site";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

function navHref(href: string, pathname: string) {
  if (href.startsWith("#")) {
    return pathname === "/" ? href : `/${href}`;
  }
  return href;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled || menuOpen
          ? "bg-background/85 backdrop-blur-xl border-border shadow-[0_8px_30px_-20px_rgba(2,6,23,0.25)]"
          : "bg-background/60 backdrop-blur-xl border-border/60",
      ].join(" ")}
    >
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 transition-transform duration-300 hover:scale-[1.03]"
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
            const href = navHref(item.href, pathname);
            const isActive =
              !item.href.startsWith("#") && pathname === item.href;
            const linkClass = [
              "relative py-1 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:rounded-full after:bg-ultimate-purple after:transition-all",
              isActive
                ? "text-foreground after:w-full"
                : "hover:text-foreground after:w-0 hover:after:w-full",
            ].join(" ");

            return item.href.startsWith("#") ? (
              <a key={item.href} href={href} className={linkClass}>
                {item.label}
              </a>
            ) : (
              <Link key={item.href} href={href} className={linkClass}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={BRAND.calendlyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex h-11 items-center rounded-full px-5 text-sm font-semibold bg-ultimate-purple text-white shadow-sm shadow-ultimate-purple/30 hover:bg-ultimate-purple-2 hover:shadow-md hover:shadow-ultimate-purple/40 hover:-translate-y-0.5 transition-all"
          >
            Book A Free Consultation
          </a>

          <button
            type="button"
            className={[
              "md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full transition-all",
              menuOpen
                ? "bg-ultimate-purple text-white rotate-90"
                : "bg-ultimate-purple/5 text-ultimate-purple hover:bg-ultimate-purple/10",
            ].join(" ")}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={[
          "md:hidden grid overflow-hidden border-t bg-background/95 backdrop-blur-xl transition-all duration-300 ease-out",
          menuOpen
            ? "grid-rows-[1fr] opacity-100 border-border/70"
            : "grid-rows-[0fr] opacity-0 border-transparent",
        ].join(" ")}
      >
        <div className="min-h-0">
          <div className="container-page py-6 flex flex-col gap-1">
            <nav className="flex flex-col gap-1">
              {NAV.map((item) => {
                const href = navHref(item.href, pathname);
                const content = (
                  <span className="font-display text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-ultimate-purple">
                    {item.label}
                  </span>
                );
                return item.href.startsWith("#") ? (
                  <a
                    key={item.href}
                    href={href}
                    className="group inline-flex items-center gap-3 py-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    {content}
                    <span className="text-ultimate-purple/40 transition-transform group-hover:translate-x-1 group-hover:text-ultimate-purple">
                      →
                    </span>
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={href}
                    className="group inline-flex items-center gap-3 py-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    {content}
                    <span className="text-ultimate-purple/40 transition-transform group-hover:translate-x-1 group-hover:text-ultimate-purple">
                      →
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 space-y-3 border-t border-border/60 pt-6 sm:hidden">
              <a
                href={BRAND.calendlyHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-full items-center justify-center rounded-full bg-ultimate-purple px-6 text-sm font-semibold text-white hover:bg-ultimate-purple-2 transition"
                onClick={() => setMenuOpen(false)}
              >
                Book A Free Consultation
              </a>
              <a
                href={BRAND.emailHref}
                className="block text-sm text-muted hover:text-foreground transition"
              >
                {BRAND.email}
              </a>
              <a
                href={BRAND.phoneHref}
                className="block text-sm text-muted hover:text-foreground transition"
              >
                {BRAND.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
