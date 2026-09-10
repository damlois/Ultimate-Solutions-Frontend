import Image from "next/image";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Faq } from "@/components/site/Faq";
import { IconBadge, type IconBadgeColor } from "@/components/ui/IconBadge";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { ICONS, type IconKey } from "@/lib/icons";
import { Sparkles } from "lucide-react";
import {
  OTHER_SERVICES,
  PORTFOLIO_LOGOS,
  SERVICES,
  STATS,
  BRAND,
} from "@/lib/site";
import { TestimonialsCarousel } from "@/components/site/TestimonialsCarousel";

const SERVICE_CARD_BG = [
  "bg-violet-100",
  "bg-fuchsia-100",
  "bg-sky-100",
  "bg-amber-100",
  "bg-emerald-100",
  "bg-rose-100",
];

const ACCENT_COLORS: IconBadgeColor[] = ["purple", "fuchsia", "blue", "amber", "emerald"];

const PORTFOLIO_TINTS = [
  "bg-violet-50",
  "bg-sky-50",
  "bg-amber-50",
  "bg-emerald-50",
  "bg-fuchsia-50",
];

export function Eyebrow({
  children,
  center = false,
  dark = false,
}: {
  children: React.ReactNode;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold",
        dark
          ? "border-white/20 bg-white/10 text-white/90"
          : "border-ultimate-purple/20 bg-ultimate-purple/5 text-ultimate-purple",
        center ? "mx-auto" : "",
      ].join(" ")}
    >
      <span className={["h-1.5 w-1.5 rounded-full", dark ? "bg-fuchsia-300" : "bg-ultimate-purple"].join(" ")} />
      {children}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={["space-y-3", center ? "text-center mx-auto" : ""].join(" ")}>
      {eyebrow ? (
        <Eyebrow center={center} dark={dark}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2
        className={[
          "font-display text-3xl sm:text-4xl font-semibold tracking-tight",
          dark ? "text-white" : "",
        ].join(" ")}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={[
            "max-w-2xl",
            dark ? "text-white/70" : "text-muted",
            center ? "mx-auto" : "",
          ].join(" ")}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="relative">
        {/* Hero — full-bleed photo */}
        <section className="relative isolate flex min-h-[88vh] items-end overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/hero.jpg"
              alt="Ultimate Solutions creative workspace"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#150419] via-[#2a0a30]/80 to-ultimate-purple/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/20" />
          </div>

          <Sparkles
            className="absolute right-10 top-24 hidden h-8 w-8 animate-spin text-fuchsia-300/80 sm:block [animation-duration:9s]"
            aria-hidden="true"
          />

          <div className="container-page relative w-full py-16 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-end">
              <div className="space-y-6 text-white">
                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-balance">
                  Your <span className="text-gradient-on-dark">one-stop tech ecosystem</span>{" "}
                  for brands that want to grow.
                </h1>
                <p className="max-w-xl leading-relaxed text-white/75">
                  We help businesses stand out with graphics design, brand identity,
                  web development, UI/UX design, video editing, and project or event
                  management.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href="/work"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-ultimate-purple shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all"
                  >
                    View our work ↗
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 text-sm font-semibold text-white hover:bg-white/20 hover:-translate-y-0.5 transition-all"
                  >
                    Contact us
                  </a>
                </div>
              </div>

              {/* Floating "what we do" panel */}
              <div className="rounded-3xl border border-white/15 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between font-display text-sm font-semibold uppercase tracking-wide text-white/70">
                  What we do
                  <span aria-hidden="true">↓</span>
                </div>
                <ul className="mt-4 divide-y divide-white/10">
                  {SERVICES.map((s) => (
                    <li key={s.title}>
                      <a
                        href="#services"
                        className="group flex items-center justify-between gap-4 py-3 text-sm font-medium"
                      >
                        {s.title}
                        <span className="text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-white">
                          →
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Stats band */}
        <section className="border-b border-border/70 bg-card-2/60 py-10">
          <div className="container-page flex items-center justify-center">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <CountUp
                  value={s.value}
                  className="block font-display text-4xl sm:text-5xl font-semibold text-gradient"
                />
                <div className="mt-1 text-xs sm:text-sm text-muted uppercase tracking-wide">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trust marquee */}
        <div className="overflow-hidden border-b border-border/70 bg-gradient-to-r from-ultimate-purple/5 via-transparent to-blue-500/5 py-6">
          <div className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-ultimate-purple/70">
            Trusted by growing brands
          </div>
          <div className="[mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
            <div className="marquee-track gap-16 px-8">
              {[...PORTFOLIO_LOGOS, ...PORTFOLIO_LOGOS].map((logo, i) => (
                <div
                  key={`${logo.src}-${i}`}
                  className="flex h-12 w-32 shrink-0 items-center justify-center opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={200}
                    height={120}
                    className="h-full w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kinetic statement */}
        <section className="container-page py-16 sm:py-24">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start">
              <div className="hidden h-16 w-16 shrink-0 items-center justify-center lg:flex">
                <div className="h-14 w-14 animate-spin rounded-full border-2 border-dashed border-ultimate-purple/30 [animation-duration:14s]" />
              </div>
              <div>
                <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight">
                  <span className="text-foreground">Design solutions</span>{" "}
                  <span className="text-muted">for startups and growing brands.</span>{" "}
                  <span className="text-foreground">Turning ideas</span>{" "}
                  <span className="text-muted">into clean, smart, and useful work</span>{" "}
                  <span className="text-foreground">that helps you grow.</span>
                </p>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ultimate-purple underline underline-offset-4 hover:text-ultimate-purple-2 transition-colors"
                >
                  Let&apos;s chat
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Services — full-bleed dark */}
        <section id="services" className="bg-[#0f0616] py-16 sm:py-24 text-white">
          <div className="container-page">
            <Reveal>
              <SectionHeading
                eyebrow="What we do"
                title="Solutions that drive results"
                subtitle="From strategy to execution, we combine creativity and technical excellence to deliver work that looks great and performs even better."
                dark
              />
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s, i) => {
                const color = ACCENT_COLORS[i % ACCENT_COLORS.length];
                const bg = SERVICE_CARD_BG[i % SERVICE_CARD_BG.length];
                return (
                  <Reveal key={s.title} delay={i * 80}>
                    <div
                      className={[
                        "group h-full rounded-3xl p-6 text-[#150419] shadow-xl transition-all duration-300",
                        "hover:-translate-y-1.5 hover:rotate-1 hover:shadow-2xl",
                        bg,
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between">
                        <IconBadge
                          icon={ICONS[s.icon as IconKey]}
                          color={color}
                          className="bg-white shadow-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                        />
                        <span className="font-display text-xs font-semibold text-black/15 group-hover:text-black/30 transition-colors">
                          0{i + 1}
                        </span>
                      </div>
                      <h3 className="mt-5 font-display text-lg font-semibold">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#150419]/70">
                        {s.description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Other Services */}
        <section className="container-page py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Other services"
              title="Zoom and Google Meet rentals"
              subtitle="Level up your virtual experience with our premium account options."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {OTHER_SERVICES.map((os, i) => {
              const isZoom = os.title === "Zoom";
              return (
                <Reveal key={os.title} delay={i * 100}>
                  <div
                    className={[
                      "h-full rounded-3xl p-8 shadow-lg",
                      isZoom
                        ? "bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-blue-900/20"
                        : "bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-emerald-900/20",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between gap-6">
                      <div>
                        <div className="font-display text-xl font-semibold">
                          {os.title}
                        </div>
                        <div className="mt-1 text-sm text-white/75">{os.tagline}</div>
                      </div>
                      <div className="h-11 w-11 rounded-2xl bg-white grid place-items-center shadow-md">
                        {isZoom ? <BrandIcon name="zoom" /> : <BrandIcon name="googlemeet" />}
                      </div>
                    </div>
                    <ul className="mt-6 space-y-3 text-sm text-white/85">
                      {os.features.map((f) => (
                        <li key={f} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/70" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Collaboration */}
        <section className="container-page pb-16">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
            <Reveal className="h-full">
              <div className="card-dark h-full rounded-3xl p-8 overflow-hidden">
                <Eyebrow dark>How we work</Eyebrow>
                <h3 className="mt-4 font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                  Clear planning, fast execution, strong delivery
                </h3>
                <p className="mt-3 text-sm text-white/75 leading-relaxed max-w-xl">
                  We collaborate closely with you, align on scope and timelines,
                  and deliver designs and builds that are modern, reliable, and on time.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-white/85">
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-fuchsia-300" />
                    Discovery and project roadmap
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-fuchsia-300" />
                    Design drafts, feedback, and iteration
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-fuchsia-300" />
                    Build, QA, and launch support
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={120} className="h-full">
              <div className="h-full rounded-3xl overflow-hidden shadow-xl shadow-ultimate-purple/10">
                <div className="relative h-full min-h-[320px] bg-card">
                  <Image
                    src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1400"
                    alt="Team in an office discussing a project"
                    fill
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Work */}
        <section id="work" className="container-page py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Portfolio"
              title="A snapshot of our portfolio"
              subtitle="A mix of brand identity, graphics, and digital work. Explore the full collection for more."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PORTFOLIO_LOGOS.map((logo, i) => (
              <Reveal key={logo.src} delay={i * 60}>
                <div
                  className={[
                    "group rounded-3xl p-6 flex items-center justify-center shadow-md transition-all duration-300",
                    "hover:-translate-y-1 hover:rotate-1 hover:shadow-2xl hover:shadow-ultimate-purple/20",
                    PORTFOLIO_TINTS[i % PORTFOLIO_TINTS.length],
                  ].join(" ")}
                >
                  <div className="flex h-24 w-full items-center justify-center rounded-2xl bg-white shadow-sm">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={700}
                      height={420}
                      className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <a
              href="/work"
              className="inline-flex h-11 items-center justify-center rounded-full bg-ultimate-purple/5 px-5 text-sm font-semibold text-ultimate-purple hover:bg-ultimate-purple/10 hover:-translate-y-0.5 transition-all"
            >
              See more portfolio
            </a>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="container-page py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Testimonials"
              title="Clients notice the difference"
              subtitle="Quality, speed, and a strong eye for modern aesthetics."
            />
          </Reveal>

          <Reveal delay={100}>
            <TestimonialsCarousel />
          </Reveal>
        </section>

        {/* FAQ */}
        <section className="container-page py-16">
          <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
            <Reveal>
              <div className="space-y-4 lg:sticky lg:top-28">
                <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
                <div className="card-dark rounded-3xl p-6">
                  <p className="text-sm text-white/80 leading-relaxed">
                    Can&apos;t find what you&apos;re looking for? Reach out and we&apos;ll get back to you quickly.
                  </p>
                  <a
                    href="#contact"
                    className="mt-4 inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-ultimate-purple hover:bg-white/90 hover:-translate-y-0.5 transition-all"
                  >
                    Ask us a question
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <Faq />
            </Reveal>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="container-page py-16">
          <Reveal>
            <div className="noise-overlay relative overflow-hidden rounded-3xl bg-gradient-brand p-7 sm:p-10 text-white shadow-2xl shadow-ultimate-purple/30">
              <div className="absolute -top-24 -right-24 h-[260px] w-[260px] rounded-full bg-white/15 blur-3xl animate-float-slow" />
              <div className="absolute -bottom-24 -left-24 h-[220px] w-[220px] rounded-full bg-sky-400/20 blur-3xl animate-float-slower" />
              <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
                <div className="space-y-3">
                  <div className="font-display text-3xl font-semibold tracking-tight">
                    Let’s build something great.
                  </div>
                  <p className="text-white/80">
                    Reach out for design, development, video editing, or
                    project/event management. We’ll respond quickly.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:justify-items-end">
                  <a
                    href={BRAND.calendlyHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 w-full flex-col items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 hover:bg-white/20 hover:-translate-y-0.5 transition-all"
                  >
                    <span className="text-xs font-semibold leading-4">Call</span>
                    <span className="text-xs font-medium text-white/90 leading-4">
                      Book discovery call
                    </span>
                  </a>
                  <a
                    href={BRAND.emailHref}
                    className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 text-sm font-semibold hover:bg-white/20 hover:-translate-y-0.5 transition-all"
                  >
                    Email us
                  </a>
                  <a
                    href={BRAND.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-ultimate-purple hover:bg-white/90 hover:-translate-y-0.5 transition-all sm:col-span-2 lg:col-span-1"
                  >
                    Message on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Ticker */}
        <div className="relative overflow-hidden border-y border-white/10 bg-[#0f0616] py-8">
          <div className="marquee-track gap-10">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex shrink-0 items-center gap-10">
                <span className="font-display text-3xl sm:text-4xl font-semibold text-white/20 whitespace-nowrap">
                  Let&apos;s build something great
                </span>
                <Sparkles className="h-6 w-6 shrink-0 text-fuchsia-400/40" aria-hidden="true" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-[#0f0616] via-[#0f0616]/40 to-[#0f0616]">
            <a
              href={BRAND.calendlyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-brand px-7 text-sm font-semibold text-white shadow-lg shadow-ultimate-purple/30 hover:-translate-y-0.5 hover:shadow-xl transition-all"
            >
              Book a call now ↗
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
