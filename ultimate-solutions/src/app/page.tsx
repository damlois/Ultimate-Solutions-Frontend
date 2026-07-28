import Image from "next/image";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { IconBadge, type IconBadgeColor } from "@/components/ui/IconBadge";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Reveal } from "@/components/ui/Reveal";
import { ICONS, type IconKey } from "@/lib/icons";
import {
  OTHER_SERVICES,
  PORTFOLIO_LOGOS,
  SERVICES,
  STATS,
  TESTIMONIAL,
  BRAND,
} from "@/lib/site";

const ACCENT_COLORS: IconBadgeColor[] = ["purple", "fuchsia", "blue", "amber", "emerald"];

export function Eyebrow({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div
      className={[
        "inline-flex items-center gap-2 rounded-full border border-ultimate-purple/20 bg-ultimate-purple/5 px-3 py-1 text-xs font-semibold text-ultimate-purple",
        center ? "mx-auto" : "",
      ].join(" ")}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-ultimate-purple" />
      {children}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={["space-y-3", center ? "text-center mx-auto" : ""].join(" ")}>
      {eyebrow ? <Eyebrow center={center}>{eyebrow}</Eyebrow> : null}
      <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
        {title}
      </h2>
      {subtitle ? (
        <p className={["text-muted max-w-2xl", center ? "mx-auto" : ""].join(" ")}>
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
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-ultimate-purple/20 blur-3xl animate-float-slow" />
            <div className="absolute bottom-[-200px] right-[-120px] h-[520px] w-[520px] rounded-full bg-fuchsia-500/10 blur-3xl animate-float-slower" />
            <div className="absolute top-[180px] left-[-160px] h-[420px] w-[420px] rounded-full bg-sky-500/10 blur-3xl animate-float-slow" />
            <div
              className="absolute inset-0 opacity-[0.4] [background-image:radial-gradient(circle,rgba(2,6,23,0.08)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
              aria-hidden="true"
            />
          </div>

          <div className="container-page pt-16 sm:pt-24 pb-14">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-ultimate-purple/25 bg-gradient-to-r from-ultimate-purple/10 to-fuchsia-500/10 px-3 py-1.5 text-xs font-semibold text-ultimate-purple shadow-sm">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ultimate-purple opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ultimate-purple" />
                  </span>
                  Now booking new projects
                </div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-balance">
                  A <span className="text-gradient">digital tech ecosystem</span>{" "}
                  for brands that want to grow.
                </h1>
                <p className="text-muted max-w-xl leading-relaxed">
                  We help businesses stand out with graphics design, brand identity,
                  web development, UI/UX design, video editing, and project or event
                  management.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="#contact"
                    className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ultimate-purple px-6 text-sm font-semibold text-white shadow-lg shadow-ultimate-purple/25 hover:bg-ultimate-purple-2 hover:shadow-xl hover:shadow-ultimate-purple/35 hover:-translate-y-0.5 transition-all"
                  >
                    Contact Us
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-ultimate-purple/5 px-6 text-sm font-semibold text-ultimate-purple hover:bg-ultimate-purple/10 hover:-translate-y-0.5 transition-all"
                  >
                    Free Consultation
                  </a>
                </div>

                {/* Desktop stats (keep in left column) */}
                <div className="hidden lg:grid grid-cols-2 gap-3 max-w-md pt-2 mt-[40px] mx-auto md:mx-0 md:mt-[100px]">
                  {STATS.map((s, i) => (
                    <div
                      key={s.label}
                      className={[
                        "card-soft-hover rounded-2xl p-4",
                        i === 0 ? "bg-gradient-brand text-white" : "",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "font-display text-2xl font-semibold",
                          i === 0 ? "text-white" : "text-gradient",
                        ].join(" ")}
                      >
                        {s.value}
                      </div>
                      <div className={["text-xs", i === 0 ? "text-white/80" : "text-muted"].join(" ")}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-3 rounded-[2rem] bg-gradient-brand opacity-30 blur-2xl -z-10" />
                <div className="rounded-3xl overflow-hidden bg-card shadow-2xl shadow-ultimate-purple/15">
                  <div className="relative aspect-[16/11] w-full bg-card">
                    <Image
                      src="/hero.jpg"
                      alt="Ultimate Solutions creative workspace"
                      fill
                      sizes="(max-width: 1024px) 100vw, 560px"
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/80 backdrop-blur px-4 py-2 text-xs text-zinc-700">
                      <span className="font-semibold text-foreground">Digital Agency</span>
                      <span className="text-zinc-500">•</span>
                      <span>Design. Build. Deliver.</span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <div className="grid grid-cols-2 gap-4">
                      {PORTFOLIO_LOGOS.slice(0, 4).map((logo) => (
                        <div
                          key={logo.src}
                          className="rounded-2xl bg-card-2 p-4 flex items-center justify-center shadow-sm transition-transform hover:scale-[1.04] hover:shadow-md"
                        >
                          <Image
                            src={logo.src}
                            alt={logo.alt}
                            width={420}
                            height={240}
                            className="h-16 w-auto object-contain opacity-95"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="mt-6 text-sm text-muted">
                      A glimpse of our work: logos, brand marks, and design samples.
                    </p>
                    <div className="mt-6 flex justify-end">
                      <a
                        href="/work"
                        className="inline-flex h-11 items-center justify-center rounded-full bg-ultimate-purple px-5 text-sm font-semibold text-white hover:bg-ultimate-purple-2 transition"
                      >
                        See more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile stats (render below the right column) */}
            <div className="lg:hidden">
              <div className="grid grid-cols-2 gap-3 max-w-md pt-10 md:pt-6 mx-auto">
                {STATS.map((s, i) => (
                  <div
                    key={s.label}
                    className={[
                      "card-soft rounded-2xl p-4",
                      i === 0 ? "bg-gradient-brand text-white" : "",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "font-display text-2xl font-semibold",
                        i === 0 ? "text-white" : "text-gradient",
                      ].join(" ")}
                    >
                      {s.value}
                    </div>
                    <div className={["text-xs", i === 0 ? "text-white/80" : "text-muted"].join(" ")}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trust marquee */}
          <div className="border-y border-border/70 bg-gradient-to-r from-ultimate-purple/5 via-transparent to-blue-500/5 py-6 overflow-hidden">
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
        </section>

        {/* Services */}
        <section id="services" className="container-page py-8 md:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="What we do"
              title="Services built for modern brands"
              subtitle="From strategy to execution, we combine creativity and technical excellence to deliver work that looks great and performs even better."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => {
              const color = ACCENT_COLORS[i % ACCENT_COLORS.length];
              return (
                <Reveal key={s.title} delay={i * 80}>
                  <div className="group card-soft-hover h-full rounded-3xl p-6">
                    <div className="flex items-center justify-between">
                      <IconBadge
                        icon={ICONS[s.icon as IconKey]}
                        color={color}
                        className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                      />
                      <span className="font-display text-xs font-semibold text-black/10 group-hover:text-ultimate-purple/40 transition-colors">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Other Services */}
        <section className="container-page pb-16 -mt-6">
          <Reveal>
            <SectionHeading
              eyebrow="Other services"
              title="Zoom and Google Meet rentals"
              subtitle="Level up your virtual experience with our account rental options."
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
        <section className="container-page pb-16 -mt-2">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
            <Reveal className="h-full">
              <div className="card-dark h-full rounded-3xl p-8 overflow-hidden">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
                  <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-300" />
                  How we work
                </div>
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
                <div className="group rounded-3xl bg-card p-6 flex items-center justify-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-ultimate-purple/20">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={700}
                    height={420}
                    className="h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
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
            <div className="noise-overlay relative mt-10 card-dark rounded-3xl p-8 sm:p-10 overflow-hidden">
              <span className="font-display absolute -top-6 left-6 text-8xl text-white/10 select-none" aria-hidden="true">
                “
              </span>
              <div className="relative font-display text-lg sm:text-xl font-medium leading-snug">
                “{TESTIMONIAL.headline}”
              </div>
              <div className="relative mt-6 whitespace-pre-line leading-relaxed text-sm text-white/75">
                {TESTIMONIAL.body}
              </div>
              <div className="relative mt-8 flex items-center justify-between gap-4 border-t border-white/15 pt-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-white font-display text-sm font-semibold text-ultimate-purple">
                    {TESTIMONIAL.author
                      .split(" ")
                      .map((p) => p[0])
                      .join("")}
                  </div>
                  <div className="font-display font-semibold">
                    {TESTIMONIAL.author}
                  </div>
                </div>
                <div className="text-xs text-white/60">
                  Verified client feedback
                </div>
              </div>
            </div>
          </Reveal>
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
                    href={BRAND.phoneHref}
                    className="inline-flex h-12 w-full flex-col items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 hover:bg-white/20 hover:-translate-y-0.5 transition-all"
                  >
                    <span className="text-xs font-semibold leading-4">Call</span>
                    <span className="text-xs font-medium text-white/90 leading-4">
                      {BRAND.phoneDisplay}
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
      </main>

      <Footer />
    </div>
  );
}
