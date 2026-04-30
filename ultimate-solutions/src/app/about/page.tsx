import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { ABOUT, VISION_MISSION_OBJECTIVE } from "@/lib/site";

const TEAM = [
  {
    name: "Anuoluwapo Soremekun",
    role: "Chief Executive Director",
    src: "/team/Anuoluwapo%20Soremekun.jpeg",
  },
  {
    name: "Emmanuel Adegbola",
    role: "Brand Identity Expert",
    src: "/team/Emmanuel%20Adegbola.png",
  },
  {
    name: "Gbadebo Adewale",
    role: "Chief Operating Officer",
    src: "/team/Gbadebo%20Adewale.jpeg",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container-page py-14 sm:py-18">
        <div className="space-y-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition"
          >
            <span className="text-lg leading-none">←</span> Back to home
          </Link>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-ultimate-purple" />
                About
              </div>

              <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
                A digital tech ecosystem built for growth
              </h1>
              <p className="text-muted whitespace-pre-line leading-relaxed">
                {ABOUT}
              </p>
            </div>

            <div className="glass rounded-3xl overflow-hidden">
              <div className="relative aspect-[4/5] w-full bg-card">
                <Image
                  src="https://images.pexels.com/photos/16323586/pexels-photo-16323586.jpeg?auto=compress&cs=tinysrgb&w=1400"
                  alt="Laptop workspace for a digital tech ecosystem"
                  fill
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          <section className="grid gap-4 md:grid-cols-3">
            <div className="glass rounded-3xl p-8">
              <div className="font-display text-lg font-semibold">Vision</div>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                {VISION_MISSION_OBJECTIVE.vision}
              </p>
            </div>
            <div className="glass rounded-3xl p-8">
              <div className="font-display text-lg font-semibold">Mission</div>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                {VISION_MISSION_OBJECTIVE.mission}
              </p>
            </div>
            <div className="glass rounded-3xl p-8">
              <div className="font-display text-lg font-semibold">Objective</div>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                {VISION_MISSION_OBJECTIVE.objective}
              </p>
            </div>
          </section>

          <section aria-label="Team" className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-ultimate-purple" />
                Team
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
                Meet the people behind the work
              </h2>
              <p className="text-muted max-w-2xl">
                An excellent, focused team built around creativity, execution, and
                delivery.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TEAM.map((m) => (
                <div
                  key={m.name}
                  className="group glass rounded-3xl p-6 overflow-hidden"
                >
                  <div className="relative">
                    <div className="absolute -inset-10 bg-gradient-to-br from-ultimate-purple/15 via-transparent to-transparent blur-2xl" />
                    <div className="relative aspect-[4/4] w-full rounded-2xl border border-border bg-card overflow-hidden">
                      <Image
                        src={m.src}
                        alt={m.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 360px"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="font-display text-lg font-semibold">
                      {m.name}
                    </div>
                    <div className="text-sm text-muted">{m.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

