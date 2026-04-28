import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { ABOUT, VISION_MISSION_OBJECTIVE } from "@/lib/site";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container-page py-14 sm:py-18">
        <div className="space-y-10">
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
        </div>
      </main>

      <Footer />
    </div>
  );
}

