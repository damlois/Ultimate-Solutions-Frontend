import { BRAND } from "@/lib/site";
import { BrandIcon } from "@/components/ui/BrandIcon";
import Image from "next/image";
import Link from "next/link";

const SOCIALS = [
  { href: BRAND.instagram, label: "Instagram", icon: "instagram" as const },
  { href: BRAND.linkedin, label: "LinkedIn", icon: "linkedin" as const },
  { href: BRAND.facebook, label: "Facebook", icon: "facebook" as const },
  { href: BRAND.x, label: "X", icon: "x" as const },
  { href: BRAND.tiktok, label: "TikTok", icon: "tiktok" as const },
];

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: (typeof SOCIALS)[number]["icon"];
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-white transition-all hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-black/20"
    >
      <BrandIcon name={icon} size={18} />
    </a>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-[#0f0616] text-white">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(90% 140% at 100% 0%, rgba(122,26,136,0.55) 0%, transparent 55%), radial-gradient(70% 100% at 0% 100%, rgba(37,99,235,0.25) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="container-page py-14">
        <div className="flex flex-col gap-6 rounded-3xl bg-white/5 border border-white/10 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="space-y-2">
            <div className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
              Have a project in mind?
            </div>
            <p className="text-white/70 max-w-md">
              Let&apos;s talk about design, development, video editing, or event management.
            </p>
          </div>
          <a
            href={BRAND.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-gradient-brand px-7 text-sm font-semibold text-white shadow-lg shadow-ultimate-purple/30 hover:-translate-y-0.5 hover:shadow-xl transition-all"
          >
            Start a conversation
          </a>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center">
              <Image
                src="/white-logo.png"
                alt={`${BRAND.name} logo`}
                width={80}
                height={80}
                className="h-16 w-16 sm:h-20 sm:w-20 object-contain"
              />
            </div>
            <p className="text-sm text-white/60 max-w-sm">
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
              className="block text-sm text-white/60 hover:text-white hover:underline transition"
            >
              {BRAND.email}
            </a>
          </div>

          <div className="space-y-3">
            <div className="font-display font-semibold">Social</div>
            <div className="flex flex-wrap gap-2">
              {SOCIALS.map((s) => (
                <SocialLink key={s.label} href={s.href} label={s.label} icon={s.icon} />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="font-display font-semibold">Quick links</div>
            <div className="grid gap-2 text-sm text-white/60">
              <Link href="/#services" className="w-fit hover:text-white hover:translate-x-1 transition-all">
                Services
              </Link>
              <Link href="/work" className="w-fit hover:text-white hover:translate-x-1 transition-all">
                Portfolio
              </Link>
              <Link
                href="/#testimonials"
                className="w-fit hover:text-white hover:translate-x-1 transition-all"
              >
                Testimonials
              </Link>
              <Link href="/#contact" className="w-fit hover:text-white hover:translate-x-1 transition-all">
                Contact
              </Link>
              <Link href="/about" className="w-fit hover:text-white hover:translate-x-1 transition-all">
                About
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <div>© {year} {BRAND.name}. All rights reserved.</div>
          <div className="text-white/40">Design. Build. Deliver.</div>
        </div>
      </div>
    </footer>
  );
}
