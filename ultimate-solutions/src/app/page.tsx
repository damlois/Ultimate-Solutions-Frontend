import Image from "next/image";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { IconBadge } from "@/components/ui/IconBadge";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { ICONS, type IconKey } from "@/lib/icons";
import {
  OTHER_SERVICES,
  PORTFOLIO_LOGOS,
  SERVICES,
  STATS,
  TESTIMONIAL,
  BRAND,
} from "@/lib/site";

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="space-y-3">
      {eyebrow ? (
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-ultimate-purple" />
          {eyebrow}
        </div>
      ) : null}
      <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
        {title}
      </h2>
      {subtitle ? <p className="text-muted max-w-2xl">{subtitle}</p> : null}
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
            <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-ultimate-purple/20 blur-3xl" />
            <div className="absolute bottom-[-200px] right-[-120px] h-[520px] w-[520px] rounded-full bg-fuchsia-500/10 blur-3xl" />
            <div className="absolute top-[180px] left-[-160px] h-[420px] w-[420px] rounded-full bg-sky-500/10 blur-3xl" />
          </div>

          <div className="container-page pt-16 sm:pt-24 pb-14">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">


                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
                  A <span className="text-gradient">digital tech ecosystem</span>{" "}
                  for brands that want to grow.
                </h1>
                <p className="text-muted max-w-xl leading-relaxed">
                  We help businesses stand out with graphics design, brand identity,
                  web development, UI/UX design, video editing, and project or event
                  management.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  <a
                    href="#contact"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-ultimate-purple px-6 text-sm font-semibold text-white hover:bg-ultimate-purple-2 transition"
                  >
                    Contact Us
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-card px-6 text-sm font-semibold hover:bg-black/[0.03] transition"
                  >
                    Free Consultation
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-3 max-w-md pt-2 mt-[100px]">
                  {STATS.map((s) => (
                    <div key={s.label} className="glass rounded-2xl p-4">
                      <div className="font-display text-2xl font-semibold">
                        {s.value}
                      </div>
                      <div className="text-xs text-muted">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="glass rounded-3xl overflow-hidden">
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
                    <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/80 backdrop-blur px-4 py-2 text-xs text-zinc-700">
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
                          className="rounded-2xl border border-border bg-card p-4 flex items-center justify-center shadow-sm"
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
          </div>
        </section>

        {/* Services */}
        <section id="services" className="container-page py-16">
          <SectionHeading
            eyebrow="What we do"
            title="Services built for modern brands"
            subtitle="From strategy to execution, we combine creativity and technical excellence to deliver work that looks great and performs even better."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.title} className="glass rounded-3xl p-6">
                <IconBadge icon={ICONS[s.icon as IconKey]} />
                <h3 className="mt-5 font-display text-lg font-semibold">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Other Services */}
        <section className="container-page pb-16 -mt-6">
          <SectionHeading
            eyebrow="Other services"
            title="Zoom and Google Meet rentals"
            subtitle="Level up your virtual experience with our account rental options."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {OTHER_SERVICES.map((os) => (
              <div key={os.title} className="glass rounded-3xl p-8">
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <div className="font-display text-xl font-semibold">
                      {os.title}
                    </div>
                    <div className="mt-1 text-sm text-muted">{os.tagline}</div>
                  </div>
                  <div className="h-10 w-10 rounded-2xl bg-card border border-border grid place-items-center">
                    {os.title === "Zoom" ? (
                      <BrandIcon name="zoom" />
                    ) : (
                      <BrandIcon name="googlemeet" />
                    )}
                  </div>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-muted">
                  {os.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-ultimate-purple" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Collaboration */}
        <section className="container-page pb-16 -mt-2">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
            <div className="glass rounded-3xl p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-ultimate-purple" />
                How we work
              </div>
              <h3 className="mt-4 font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                Clear planning, fast execution, strong delivery
              </h3>
              <p className="mt-3 text-sm text-muted leading-relaxed max-w-xl">
                We collaborate closely with your team, align on scope and timelines,
                and deliver designs and builds that are modern, reliable, and on time.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-muted">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-ultimate-purple" />
                  Discovery and project roadmap
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-ultimate-purple" />
                  Design drafts, feedback, and iteration
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-ultimate-purple" />
                  Build, QA, and launch support
                </li>
              </ul>
            </div>

            <div className="glass rounded-3xl overflow-hidden">
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
          </div>
        </section>

        {/* Work */}
        <section id="work" className="container-page py-16">
          <SectionHeading
            eyebrow="Portfolio"
            title="A snapshot of our portfolio"
            subtitle="A mix of brand identity, graphics, and digital work. Explore the full collection for more."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PORTFOLIO_LOGOS.map((logo) => (
              <div
                key={logo.src}
                className="rounded-3xl border border-border bg-card p-6 flex items-center justify-center shadow-sm"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={700}
                  height={420}
                  className="h-24 w-auto object-contain"
                />
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <a
              href="/work"
              className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-card px-5 text-sm font-semibold hover:bg-black/[0.03] transition"
            >
              See more portfolio
            </a>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="container-page py-16">
          <SectionHeading
            eyebrow="Testimonials"
            title="Clients notice the difference"
            subtitle="Quality, speed, and a strong eye for modern aesthetics."
          />

          <div className="mt-10 glass rounded-3xl p-8">
            <div className="text-sm text-muted">“{TESTIMONIAL.headline}”</div>
            <div className="mt-6 whitespace-pre-line leading-relaxed">
              {TESTIMONIAL.body}
            </div>
            <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
              <div className="font-display font-semibold">
                {TESTIMONIAL.author}
              </div>
              <div className="text-xs text-muted">
                Verified client feedback
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="container-page py-16">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-ultimate-purple/35 to-fuchsia-500/15 p-10">
            <div className="absolute -top-24 -right-24 h-[260px] w-[260px] rounded-full bg-white/10 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="space-y-3">
                <div className="font-display text-3xl font-semibold tracking-tight">
                  Let’s build something great.
                </div>
                <p className="text-muted">
                  Reach out for design, development, video editing, or
                  project/event management. We’ll respond quickly.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                <a
                  href={BRAND.phoneHref}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-white text-black px-6 text-sm font-semibold hover:bg-zinc-100 transition"
                >
                  Call {BRAND.phoneDisplay}
                </a>
                <a
                  href={BRAND.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-black/20 px-6 text-sm font-semibold hover:bg-black/30 transition"
                >
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
