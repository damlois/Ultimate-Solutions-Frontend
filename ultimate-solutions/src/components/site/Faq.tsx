"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "How long does a typical project take?",
    a: "Timelines depend on scope. After a quick discovery call, we'll share a clear timeline before any work begins, so there are no surprises.",
  },
  {
    q: "Do you offer revisions?",
    a: "Yes. Every project includes review rounds so the final result matches your vision before we call it done.",
  },
  {
    q: "Can you work with an existing brand or in-house team?",
    a: "Absolutely. We slot into existing workflows and collaborate directly with your team, following whatever brand guidelines are already in place.",
  },
  {
    q: "What do you need from me to get started?",
    a: "A short brief and any existing brand assets. We'll guide you through everything else during onboarding.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes, we offer ongoing design, development, and content support beyond the initial project delivery.",
  },
];

function FaqItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="card-soft rounded-2xl px-5 py-1 sm:px-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-base sm:text-lg font-semibold">{q}</span>
        <Plus
          className={[
            "h-5 w-5 shrink-0 text-ultimate-purple transition-transform duration-300",
            open ? "rotate-45" : "",
          ].join(" ")}
        />
      </button>
      <div
        className={[
          "grid overflow-hidden transition-all duration-300 ease-out",
          open ? "grid-rows-[1fr] pb-4 opacity-100" : "grid-rows-[0fr] opacity-0",
        ].join(" ")}
      >
        <div className="min-h-0 text-sm text-muted leading-relaxed">{a}</div>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <div className="grid gap-4">
      {FAQS.map((f, i) => (
        <FaqItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
      ))}
    </div>
  );
}
