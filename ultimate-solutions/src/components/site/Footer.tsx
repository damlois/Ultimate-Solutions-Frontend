import { BRAND } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";

function SocialLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-sm text-muted hover:text-foreground transition-colors"
    >
      {label}
    </a>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-black/20">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center">
              <Image
                src="/purple-logo.png"
                alt={`${BRAND.name} logo`}
                width={80}
                height={80}
                className="h-16 w-16 sm:h-20 sm:w-20 object-contain"
              />
            </div>
            <p className="text-sm text-muted max-w-sm">
              Cutting-edge digital solutions, design, development, storytelling,
              and delivery.
            </p>
            <a
              href={BRAND.phoneHref}
              className="inline-flex text-sm font-medium hover:underline"
            >
              {BRAND.phoneDisplay}
            </a>
            <a
              href={BRAND.emailHref}
              className="block text-sm text-muted hover:text-foreground hover:underline transition"
            >
              {BRAND.email}
            </a>
          </div>

          <div className="space-y-3">
            <div className="font-display font-semibold">Social</div>
            <div className="grid gap-2">
              <SocialLink href={BRAND.instagram} label="Instagram" />
              <SocialLink href={BRAND.linkedin} label="LinkedIn" />
              <SocialLink href={BRAND.facebook} label="Facebook" />
              <SocialLink href={BRAND.x} label="X" />
              <SocialLink href={BRAND.tiktok} label="TikTok" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="font-display font-semibold">Quick links</div>
            <div className="grid gap-2 text-sm text-muted">
              <Link href="/#services" className="hover:text-foreground transition">
                Services
              </Link>
              <Link href="/work" className="hover:text-foreground transition">
                Portfolio
              </Link>
              <Link
                href="/#testimonials"
                className="hover:text-foreground transition"
              >
                Testimonials
              </Link>
              <Link href="/#contact" className="hover:text-foreground transition">
                Contact
              </Link>
              <Link href="/about" className="hover:text-foreground transition">
                About
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <div>© {year} {BRAND.name}. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

