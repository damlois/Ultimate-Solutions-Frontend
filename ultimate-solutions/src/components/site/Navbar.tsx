"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BRAND, NAV } from "@/lib/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full border-b transition-colors",
        scrolled ? "bg-background/70 backdrop-blur-xl border-border" : "bg-transparent border-transparent",
      ].join(" ")}
    >
      <div className="container-page flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <picture className="block h-14 w-14 sm:h-16 sm:w-16">
            <source
              srcSet="/white-logo.png"
              media="(prefers-color-scheme: dark)"
            />
            <Image
              src="/purple-logo.png"
              alt={`${BRAND.name} logo`}
              width={64}
              height={64}
              className="h-14 w-14 sm:h-16 sm:w-16 object-contain"
              priority
            />
          </picture>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm text-muted">
          {NAV.map((item) =>
            item.href.startsWith("#") ? (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden sm:inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold bg-ultimate-purple text-white hover:bg-ultimate-purple-2 transition"
          >
            Book A Free Consultation
          </a>
        </div>
      </div>
    </header>
  );
}

