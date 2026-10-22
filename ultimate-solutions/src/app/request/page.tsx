import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { RequestServiceForm } from "@/components/site/RequestServiceForm";
import { Reveal } from "@/components/ui/Reveal";
import { BRAND } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request A Service | Ultimate Solutions",
  description:
    "Tell us what you need — design, development, video, social, or project management — and we’ll follow up quickly.",
};

function FormFallback() {
  return (
    <div className="animate-pulse space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="h-14 rounded-2xl bg-ultimate-purple/5" />
        <div className="h-14 rounded-2xl bg-ultimate-purple/5" />
        <div className="h-14 rounded-2xl bg-ultimate-purple/5" />
        <div className="h-14 rounded-2xl bg-ultimate-purple/5" />
      </div>
      <div className="h-14 rounded-2xl bg-ultimate-purple/5" />
      <div className="h-32 rounded-2xl bg-ultimate-purple/5" />
      <div className="h-12 w-40 rounded-full bg-ultimate-purple/10" />
    </div>
  );
}

export default function RequestPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-32 right-[-140px] h-[420px] w-[420px] rounded-full bg-ultimate-purple/15 blur-3xl animate-float-slow" />
          <div className="absolute top-[420px] left-[-160px] h-[380px] w-[380px] rounded-full bg-sky-500/10 blur-3xl animate-float-slower" />
        </div>

        <div className="container-page py-14 sm:py-18">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start">
            <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground hover:-translate-x-0.5 transition-all"
              >
                <span className="text-lg leading-none">←</span> Back to home
              </Link>

              <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-balance">
                Tell us what you need.{" "}
                <span className="text-gradient">We’ll take it from there.</span>
              </h1>

              <p className="text-muted leading-relaxed max-w-md">
                Share a few details about your project and the service you’re
                looking for. Your request goes straight to{" "}
                <a
                  href={BRAND.emailHref}
                  className="font-medium text-ultimate-purple hover:underline"
                >
                  {BRAND.email}
                </a>
                .
              </p>
            </aside>

            <Reveal delay={80} className="min-w-0">
              <div className="relative mx-auto w-full overflow-hidden rounded-[2rem] border border-border/70 bg-white/80 p-6 shadow-[0_24px_60px_-36px_rgba(77,13,87,0.45)] backdrop-blur-sm sm:p-8">
                <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-brand opacity-15 blur-2xl" />
                <Suspense fallback={<FormFallback />}>
                  <RequestServiceForm />
                </Suspense>
              </div>
            </Reveal>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
