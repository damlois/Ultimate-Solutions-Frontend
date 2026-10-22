"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "mt-1.5 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted/70 focus:border-ultimate-purple/40 focus:ring-2 focus:ring-ultimate-purple/20";

function Req() {
  return (
    <span className="text-ultimate-purple" aria-hidden="true">
      *
    </span>
  );
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message, website }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setWebsite("");
    } catch {
      setStatus("error");
      setError("Network error. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full min-h-64 flex-col items-center justify-center rounded-3xl bg-emerald-50/80 px-6 py-10 text-center">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-lg text-emerald-700">
          ✓
        </div>
        <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">
          Message sent
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
          Thanks for writing. We’ll get back to you at the email you provided.
        </p>
        <button
          type="button"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-ultimate-purple px-6 text-sm font-semibold text-white hover:bg-ultimate-purple-2 transition-all"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div>
        <h3 className="font-display text-2xl font-semibold tracking-tight">
          Send a message
        </h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Name <Req />
          <input
            className={fieldClass}
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
          />
        </label>
        <label className="block text-sm font-medium">
          Email <Req />
          <input
            className={fieldClass}
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
          />
        </label>
      </div>

      <label className="block text-sm font-medium">
        Phone <span className="font-normal text-muted">(optional)</span>
        <input
          className={fieldClass}
          type="tel"
          name="phone"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="0705 281 8672"
        />
      </label>

      <label className="block text-sm font-medium">
        Message <Req />
        <textarea
          className={`${fieldClass} min-h-32 resize-y`}
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can we help?"
        />
      </label>

      <div className="sr-only" aria-hidden="true">
        <label>
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>

      {error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-12 w-full items-center justify-center rounded-full bg-ultimate-purple px-7 text-sm font-semibold text-white shadow-sm shadow-ultimate-purple/25 hover:bg-ultimate-purple-2 hover:-translate-y-0.5 transition-all disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
