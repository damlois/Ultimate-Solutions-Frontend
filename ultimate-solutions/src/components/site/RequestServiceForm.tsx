"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { BUSINESS_REGISTRATION_SERVICE, REQUEST_SERVICES } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";
type ReadyChoice = "" | "yes" | "no";
type RegistrationType = "" | "Business" | "Company";

const fieldClass =
  "mt-1.5 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground shadow-sm outline-none transition placeholder:text-muted/70 focus:border-ultimate-purple/40 focus:ring-2 focus:ring-ultimate-purple/20";

const fileClass =
  "mt-1.5 block w-full text-sm text-muted file:mr-4 file:rounded-full file:border-0 file:bg-ultimate-purple/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-ultimate-purple hover:file:bg-ultimate-purple/15";

function Req() {
  return (
    <span className="text-ultimate-purple" aria-hidden="true">
      *
    </span>
  );
}

function matchService(query: string | null) {
  if (!query) return "";
  const normalized = query.trim().toLowerCase();
  return (
    REQUEST_SERVICES.find((s) => s.toLowerCase() === normalized) ??
    REQUEST_SERVICES.find((s) => s.toLowerCase().includes(normalized)) ??
    ""
  );
}

const emptyBusiness = {
  proposedBusinessName: "",
  alternativeBusinessName: "",
  fullNames: "",
  dateOfBirth: "",
  email: "",
  address: "",
  occupation: "",
  phone: "",
  idType: "" as "" | "International Passport" | "NIN",
  businessAddress: "",
  natureOfBusiness: "",
};

export function RequestServiceForm() {
  const searchParams = useSearchParams();
  const initialService = useMemo(
    () => matchService(searchParams.get("service")),
    [searchParams],
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState(initialService);
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [ready, setReady] = useState<ReadyChoice>("");
  const [registrationType, setRegistrationType] = useState<RegistrationType>("");
  const [business, setBusiness] = useState(emptyBusiness);
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [signature, setSignature] = useState<File | null>(null);
  const [passportPhoto, setPassportPhoto] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const isBusinessRegistration = service === BUSINESS_REGISTRATION_SERVICE;
  const showBusinessFields = isBusinessRegistration && ready === "yes";
  const showPassportPhoto = showBusinessFields && registrationType === "Business";
  const showNotReadyFields = isBusinessRegistration && ready === "no";
  const showGeneralFields = !isBusinessRegistration;

  function resetForm() {
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setService("");
    setMessage("");
    setWebsite("");
    setReady("");
    setRegistrationType("");
    setBusiness(emptyBusiness);
    setIdDocument(null);
    setSignature(null);
    setPassportPhoto(null);
  }

  function onServiceChange(value: string) {
    setService(value);
    setReady("");
    setRegistrationType("");
    setBusiness(emptyBusiness);
    setIdDocument(null);
    setSignature(null);
    setPassportPhoto(null);
    setError("");
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const formData = new FormData();
      formData.set("service", service);
      formData.set("website", website);

      if (showBusinessFields) {
        formData.set("proposedBusinessName", business.proposedBusinessName);
        formData.set("alternativeBusinessName", business.alternativeBusinessName);
        formData.set("fullNames", business.fullNames);
        formData.set("dateOfBirth", business.dateOfBirth);
        formData.set("email", business.email);
        formData.set("address", business.address);
        formData.set("occupation", business.occupation);
        formData.set("phone", business.phone);
        formData.set("idType", business.idType);
        formData.set("businessAddress", business.businessAddress);
        formData.set("natureOfBusiness", business.natureOfBusiness);
        formData.set("registrationType", registrationType);
        formData.set("name", business.fullNames);
        if (idDocument) formData.set("idDocument", idDocument);
        if (signature) formData.set("signature", signature);
        if (showPassportPhoto && passportPhoto) {
          formData.set("passportPhoto", passportPhoto);
        }
      } else {
        formData.set("name", name);
        formData.set("email", email);
        formData.set("phone", phone);
        formData.set("company", company);
        formData.set("message", message);
        if (showNotReadyFields) {
          formData.set("readyToFillDetails", "no");
        }
      }

      const res = await fetch("/api/request-service", {
        method: "POST",
        body: formData,
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      resetForm();
    } catch {
      setStatus("error");
      setError("Network error. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-emerald-200/80 bg-emerald-50/80 p-8 text-center sm:p-10">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-emerald-700 text-xl">
          ✓
        </div>
        <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight">
          Request received
        </h2>
        <p className="mt-2 text-sm text-muted leading-relaxed">
          Thanks for reaching out. We’ll review your details and get back to you
          shortly at the email you provided.
        </p>
        <button
          type="button"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-ultimate-purple px-6 text-sm font-semibold text-white hover:bg-ultimate-purple-2 hover:-translate-y-0.5 transition-all"
          onClick={() => setStatus("idle")}
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-5" noValidate>
      <label className="block text-sm font-medium text-foreground">
        Service <Req />
        <select
          className={fieldClass}
          name="service"
          required
          value={service}
          onChange={(e) => onServiceChange(e.target.value)}
        >
          <option value="" disabled>
            Select a service
          </option>
          {REQUEST_SERVICES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      {isBusinessRegistration ? (
        <fieldset className="rounded-3xl border border-ultimate-purple/15 bg-ultimate-purple/[0.03] p-5">
          <legend className="px-1 text-sm font-semibold text-foreground">
            Are you ready to fill in your registration details? <Req />
          </legend>
          <div className="mt-3 flex flex-wrap gap-3">
            <button
              type="button"
              className={[
                "inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition-all",
                ready === "yes"
                  ? "bg-ultimate-purple text-white shadow-sm shadow-ultimate-purple/30"
                  : "border border-ultimate-purple/25 bg-white text-ultimate-purple hover:bg-ultimate-purple/5",
              ].join(" ")}
              onClick={() => setReady("yes")}
            >
              Yes, I’m ready
            </button>
            <button
              type="button"
              className={[
                "inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition-all",
                ready === "no"
                  ? "bg-ultimate-purple text-white shadow-sm shadow-ultimate-purple/30"
                  : "border border-ultimate-purple/25 bg-white text-ultimate-purple hover:bg-ultimate-purple/5",
              ].join(" ")}
              onClick={() => setReady("no")}
            >
              Not yet
            </button>
          </div>
          {ready === "" ? (
            <p className="mt-3 text-sm text-muted">
              Choose an option to continue. If you’re not ready, leave your
              contact details and we’ll follow up.
            </p>
          ) : null}
        </fieldset>
      ) : null}

      {showGeneralFields || showNotReadyFields ? (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium text-foreground">
              Full name <Req />
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

            <label className="block text-sm font-medium text-foreground">
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

            <label className="block text-sm font-medium text-foreground">
              Phone{" "}
              <span className="font-normal text-muted">(optional)</span>
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

            {showGeneralFields ? (
              <label className="block text-sm font-medium text-foreground">
                Company{" "}
                <span className="font-normal text-muted">(optional)</span>
                <input
                  className={fieldClass}
                  name="company"
                  autoComplete="organization"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Your company"
                />
              </label>
            ) : null}
          </div>

          <label className="block text-sm font-medium text-foreground">
            {showNotReadyFields ? (
              <>
                Anything we should know?{" "}
                <span className="font-normal text-muted">(optional)</span>
              </>
            ) : (
              <>
                Project details <Req />
              </>
            )}
            <textarea
              className={`${fieldClass} min-h-32 resize-y`}
              name="message"
              required={!showNotReadyFields}
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                showNotReadyFields
                  ? "Optional note — when should we follow up, or what stage are you at?"
                  : "Tell us about your goals, timeline, and anything else we should know."
              }
            />
          </label>
        </>
      ) : null}

      {showBusinessFields ? (
        <div className="space-y-5">
          <fieldset className="rounded-3xl border border-ultimate-purple/15 bg-ultimate-purple/[0.03] p-5">
            <legend className="px-1 text-sm font-semibold text-foreground">
              Is this a business or a company? <Req />
            </legend>
            <div className="mt-3 flex flex-wrap gap-3">
              <button
                type="button"
                className={[
                  "inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition-all",
                  registrationType === "Business"
                    ? "bg-ultimate-purple text-white shadow-sm shadow-ultimate-purple/30"
                    : "border border-ultimate-purple/25 bg-white text-ultimate-purple hover:bg-ultimate-purple/5",
                ].join(" ")}
                onClick={() => setRegistrationType("Business")}
              >
                Business
              </button>
              <button
                type="button"
                className={[
                  "inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition-all",
                  registrationType === "Company"
                    ? "bg-ultimate-purple text-white shadow-sm shadow-ultimate-purple/30"
                    : "border border-ultimate-purple/25 bg-white text-ultimate-purple hover:bg-ultimate-purple/5",
                ].join(" ")}
                onClick={() => {
                  setRegistrationType("Company");
                  setPassportPhoto(null);
                }}
              >
                Company
              </button>
            </div>
          </fieldset>

          {registrationType ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium text-foreground sm:col-span-2">
              Proposed {registrationType} Name <Req />
              <input
                className={fieldClass}
                required
                value={business.proposedBusinessName}
                onChange={(e) =>
                  setBusiness((b) => ({
                    ...b,
                    proposedBusinessName: e.target.value,
                  }))
                }
                placeholder={
                  registrationType === "Company"
                    ? "e.g. Acme Ventures Ltd"
                    : "e.g. Acme Ventures"
                }
              />
            </label>

            <label className="block text-sm font-medium text-foreground sm:col-span-2">
              Alternative {registrationType} Name <Req />{" "}
              <span className="font-normal text-muted">
                (in case the proposed name is unavailable)
              </span>
              <input
                className={fieldClass}
                required
                value={business.alternativeBusinessName}
                onChange={(e) =>
                  setBusiness((b) => ({
                    ...b,
                    alternativeBusinessName: e.target.value,
                  }))
                }
                placeholder="Backup name"
              />
            </label>

            <label className="block text-sm font-medium text-foreground">
              Full name <Req />
              <input
                className={fieldClass}
                required
                autoComplete="name"
                value={business.fullNames}
                onChange={(e) =>
                  setBusiness((b) => ({ ...b, fullNames: e.target.value }))
                }
                placeholder="As on your ID"
              />
            </label>

            <label className="block text-sm font-medium text-foreground">
              Date of birth <Req />
              <input
                className={fieldClass}
                type="date"
                required
                value={business.dateOfBirth}
                onChange={(e) =>
                  setBusiness((b) => ({ ...b, dateOfBirth: e.target.value }))
                }
              />
            </label>

            <label className="block text-sm font-medium text-foreground">
              Email <Req />
              <input
                className={fieldClass}
                type="email"
                required
                autoComplete="email"
                value={business.email}
                onChange={(e) =>
                  setBusiness((b) => ({ ...b, email: e.target.value }))
                }
                placeholder="you@email.com"
              />
            </label>

            <label className="block text-sm font-medium text-foreground">
              Phone number <Req />
              <input
                className={fieldClass}
                type="tel"
                required
                autoComplete="tel"
                value={business.phone}
                onChange={(e) =>
                  setBusiness((b) => ({ ...b, phone: e.target.value }))
                }
                placeholder="0705 281 8672"
              />
            </label>

            <label className="block text-sm font-medium text-foreground sm:col-span-2">
              Address <Req />
              <input
                className={fieldClass}
                required
                autoComplete="street-address"
                value={business.address}
                onChange={(e) =>
                  setBusiness((b) => ({ ...b, address: e.target.value }))
                }
                placeholder="Residential address"
              />
            </label>

            <label className="block text-sm font-medium text-foreground">
              Occupation <Req />
              <input
                className={fieldClass}
                required
                value={business.occupation}
                onChange={(e) =>
                  setBusiness((b) => ({ ...b, occupation: e.target.value }))
                }
                placeholder="e.g. Entrepreneur"
              />
            </label>

            <label className="block text-sm font-medium text-foreground">
              Means of I.D. <Req />
              <select
                className={fieldClass}
                required
                value={business.idType}
                onChange={(e) =>
                  setBusiness((b) => ({
                    ...b,
                    idType: e.target.value as typeof business.idType,
                  }))
                }
              >
                <option value="" disabled>
                  Select ID type
                </option>
                <option value="International Passport">
                  International Passport
                </option>
                <option value="NIN">NIN</option>
              </select>
            </label>

            <label className="block text-sm font-medium text-foreground sm:col-span-2">
              ID document <Req />{" "}
              <span className="font-normal text-muted">
                (international passport or NIN)
              </span>
              <input
                className={fileClass}
                type="file"
                accept="image/*,.pdf"
                required
                onChange={(e) => setIdDocument(e.target.files?.[0] ?? null)}
              />
            </label>

            <label className="block text-sm font-medium text-foreground sm:col-span-2">
              Signature <Req />
              <input
                className={fileClass}
                type="file"
                accept="image/*"
                required
                onChange={(e) => setSignature(e.target.files?.[0] ?? null)}
              />
            </label>

            <label className="block text-sm font-medium text-foreground sm:col-span-2">
              Address of the {registrationType.toLowerCase()} <Req />
              <input
                className={fieldClass}
                required
                value={business.businessAddress}
                onChange={(e) =>
                  setBusiness((b) => ({
                    ...b,
                    businessAddress: e.target.value,
                  }))
                }
                placeholder={
                  registrationType === "Company"
                    ? "Company / registered office address"
                    : "Business address"
                }
              />
            </label>

            <label className="block text-sm font-medium text-foreground sm:col-span-2">
              Nature of {registrationType.toLowerCase()} <Req />
              <textarea
                className={`${fieldClass} min-h-24 resize-y`}
                required
                rows={3}
                value={business.natureOfBusiness}
                onChange={(e) =>
                  setBusiness((b) => ({
                    ...b,
                    natureOfBusiness: e.target.value,
                  }))
                }
                placeholder={`What will the ${registrationType.toLowerCase()} do?`}
              />
            </label>

            {showPassportPhoto ? (
              <label className="block text-sm font-medium text-foreground sm:col-span-2">
                Passport photograph <Req />
                <input
                  className={fileClass}
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => setPassportPhoto(e.target.files?.[0] ?? null)}
                />
              </label>
            ) : null}
          </div>
          ) : null}
        </div>
      ) : null}

      {/* Honeypot — hidden from people, visible to bots */}
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

      {(!isBusinessRegistration || ready !== "") && (
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-ultimate-purple px-7 text-sm font-semibold text-white shadow-sm shadow-ultimate-purple/30 hover:bg-ultimate-purple-2 hover:shadow-md hover:-translate-y-0.5 transition-all disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto"
        >
          {status === "submitting" ? "Sending…" : "Submit request"}
        </button>
      )}
    </form>
  );
}
