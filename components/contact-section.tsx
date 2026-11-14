"use client";

import { useId, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  Copy,
  Mail,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SwapIcon } from "@/components/ui/swap-icon";
import { site, type CvInfo } from "@/lib/site";

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 2000;
const PROJECT_TYPES = ["Stage", "Projet cybersécurité", "Analyse de données", "Application web ou mobile", "Autre"];
const DELAYS = ["Dès fin février 2027", "Dans l'année", "À définir"];

function validate(f: Fields): Errors {
  const errors: Errors = {};
  if (f.name.trim().length < 2) errors.name = "Indiquez votre nom (au moins 2 caractères).";
  if (!f.email.trim()) errors.email = "Indiquez votre adresse e-mail pour que je puisse vous répondre.";
  else if (!EMAIL_PATTERN.test(f.email.trim()))
    errors.email = "Cette adresse e-mail semble incomplète, par exemple : nom@entreprise.ci";
  const length = f.message.trim().length;
  if (length < MESSAGE_MIN)
    errors.message = `Votre message est trop court : ${MESSAGE_MIN} caractères au minimum.`;
  else if (length > MESSAGE_MAX)
    errors.message = `Votre message dépasse ${MESSAGE_MAX} caractères ; raccourcissez-le ou écrivez-moi directement.`;
  return errors;
}

/**
 * The contact band.
 *
 * There is no mail backend behind this site, and the form does not pretend
 * otherwise: it checks the fields, then hands a pre-filled e-mail to the
 * visitor's own mail app — and says plainly that nothing has been sent until
 * they press Send there. Gmail in the browser and a copy button cover the
 * visitor who has no mail app configured.
 */
// `cv` stays in the props: the page passes it; the CV download lives in the Parcours section.
export default function ContactSection(_props: { cv: CvInfo }) {
  const uid = useId();
  const [fields, setFields] = useState<Fields>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<"idle" | "handed-off">("idle");
  const [copied, setCopied] = useState<"email" | "message" | null>(null);
  const [projectType, setProjectType] = useState("");
  const [delay, setDelay] = useState("");
  const pillsId = useId();
  const refs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };

  const subject = `Contact portfolio — ${fields.name.trim() || "Nouveau message"}`;
  const context = [projectType && `Type de projet : ${projectType}`, delay && `Délai : ${delay}`].filter(Boolean).join("\n");
  const body = `${context ? `${context}\n\n` : ""}${fields.message.trim()}\n\n—\nDe : ${fields.name.trim()}\nE-mail : ${fields.email.trim()}`;
  const mailtoUrl = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const update = (key: keyof Fields, value: string) => {
    const next = { ...fields, [key]: value };
    setFields(next);
    if (status === "handed-off") setStatus("idle");
    // Once the visitor has tried to send, errors clear as they are fixed.
    if (attempted) setErrors(validate(next));
  };

  const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAttempted(true);
    const found = validate(fields);
    setErrors(found);
    const firstInvalid = (Object.keys(refs) as (keyof Fields)[]).find((k) => found[k]);
    if (firstInvalid) {
      refs[firstInvalid].current?.focus();
      return;
    }
    setStatus("handed-off");
    window.location.href = mailtoUrl;
  };

  const copy = async (what: "email" | "message") => {
    const text =
      what === "email"
        ? site.email
        : `À : ${site.email}\nObjet : ${subject}\n\n${body}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(what);
      window.setTimeout(() => setCopied(null), 2400);
    } catch {
      setCopied(null);
    }
  };

  const errorCount = Object.keys(errors).length;
  const fieldClass = (invalid: boolean) =>
    `w-full rounded-lg border bg-muted px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/80 focus:border-accent ${
      invalid ? "border-destructive" : "border-transparent"
    }`;
  const canSubmit = Boolean(fields.name.trim() && fields.email.trim() && fields.message.trim());
  const copyAnnounce = copied === "email" ? "Adresse copiée" : "";

  const ids = {
    name: `${uid}-name`,
    email: `${uid}-email`,
    message: `${uid}-message`,
    note: `${uid}-note`,
  };

  return (
    <section
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-title"
      className="mx-auto max-w-[var(--content-max)] px-[var(--gutter)] py-[var(--section-y)] outline-none"
    >
      <h2 id="contact-title" className="h-section min-w-0 break-words">
        Écrivons
        <br />
        <span className="grad-text">la suite.</span>
      </h2>

      <div className="mt-16 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <div className="min-w-0">
          <Reveal>
            <p className="max-w-lg text-[1.15rem] leading-relaxed text-muted-foreground text-pretty">
              {site.availability.sentence}
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-signal-soft text-accent">
                <Mail size={18} aria-hidden />
              </span>
              <a
                href={`mailto:${site.email}`}
                className="min-w-0 break-all text-[clamp(1.35rem,3.6vw,2.5rem)] font-medium tracking-[-0.03em] hover:text-accent"
              >
                {site.email}
              </a>
            </div>
            <button
              type="button"
              onClick={() => copy("email")}
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-muted px-5 text-[0.9375rem] font-medium text-foreground hover:bg-border"
            >
              <SwapIcon active={copied === "email"} on={<Check size={15} aria-hidden />} off={<Copy size={15} aria-hidden />} />
              Copier l&apos;adresse
            </button>
            <p className="sr-only" aria-live="polite">
              {copyAnnounce}
            </p>

            <ul className="mt-12">
              {[
                { name: "LinkedIn", href: site.links.linkedin, external: true },
                { name: "GitHub", href: site.links.github, external: true },
                { name: "Téléphone", href: site.phone.href, external: false },
              ].map((c) => (
                <li key={c.name} className="hairline-row">
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="link-go flex items-center justify-between gap-4 py-5 text-[length:var(--fs-h2)] font-semibold leading-none tracking-[-0.045em] hover:text-accent"
                  >
                    <span className="min-w-0 break-words">{c.name}</span>
                    <ArrowUpRight aria-hidden className="icon-out h-[0.6em] w-[0.6em] shrink-0" />
                    {c.external ? <span className="sr-only">(nouvel onglet)</span> : <span className="sr-only">{site.phone.display}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

          <Reveal className="min-w-0">
            <form
              noValidate
              onSubmit={onSubmit}
              aria-labelledby={`${uid}-form-title`}
              aria-describedby={ids.note}
              className="rounded-2xl border border-border bg-card p-6 sm:p-10"
            >
              <h3 id={`${uid}-form-title`} className="text-[length:var(--fs-h3)] font-semibold tracking-[-0.03em]">
                Écrire un message
              </h3>
              <p id={ids.note} className="mt-2 text-[0.875rem] leading-relaxed text-muted-foreground">
                Le formulaire prépare un e-mail dans votre messagerie : il ne
                part qu&apos;une fois que vous l&apos;envoyez de là-bas.
              </p>

              {attempted && errorCount > 0 ? (
                <p role="alert" className="mt-5 flex items-center gap-2 text-[0.9375rem] text-destructive">
                  <AlertCircle size={17} aria-hidden />
                  {errorCount > 1
                    ? `${errorCount} champs sont à corriger.`
                    : "Un champ est à corriger."}
                </p>
              ) : null}

              <div className="mt-6 space-y-5">
                <PillGroup legend="Type de projet (facultatif)" name={`${pillsId}-type`} options={PROJECT_TYPES} value={projectType} onChange={setProjectType} />
                <PillGroup legend="Délai (facultatif)" name={`${pillsId}-delay`} options={DELAYS} value={delay} onChange={setDelay} />
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field id={ids.name} label="Nom complet" error={errors.name}>
                  <input
                    ref={refs.name}
                    id={ids.name}
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={fields.name}
                    onChange={(e) => update("name", e.target.value)}
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={errors.name ? `${ids.name}-error` : undefined}
                    placeholder="Votre nom"
                    className={fieldClass(!!errors.name)}
                  />
                </Field>
                <Field id={ids.email} label="E-mail" error={errors.email}>
                  <input
                    ref={refs.email}
                    id={ids.email}
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    value={fields.email}
                    onChange={(e) => update("email", e.target.value)}
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? `${ids.email}-error` : undefined}
                    placeholder="vous@entreprise.ci"
                    className={fieldClass(!!errors.email)}
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field
                  id={ids.message}
                  label="Message"
                  error={errors.message}
                  hint={`${fields.message.trim().length} / ${MESSAGE_MAX}`}
                >
                  <textarea
                    ref={refs.message}
                    id={ids.message}
                    name="message"
                    rows={7}
                    required
                    value={fields.message}
                    onChange={(e) => update("message", e.target.value)}
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={errors.message ? `${ids.message}-error` : undefined}
                    placeholder="Le poste, l'équipe, les dates : ce qui vous semble utile."
                    className={`${fieldClass(!!errors.message)} resize-y`}
                  />
                </Field>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button type="submit" disabled={!canSubmit} className="btn btn-signal disabled:cursor-not-allowed disabled:opacity-50">
                  <Mail size={17} aria-hidden />
                  Envoyer avec ma messagerie
                </button>
              </div>

              <div aria-live="polite">
                {status === "handed-off" ? (
                  <div className="mt-6 border border-accent/40 bg-accent/[0.06] p-5">
                    <p className="flex items-start gap-2.5 text-[0.9375rem] text-foreground">
                      <Check size={17} aria-hidden className="mt-0.5 shrink-0 text-accent" />
                      Votre messagerie devrait s&apos;ouvrir avec le message
                      prêt. Il ne sera envoyé que lorsque vous cliquerez sur
                      Envoyer dans votre messagerie.
                    </p>
                    <p className="mt-3 text-[0.875rem] text-muted-foreground">
                      Rien ne s&apos;est ouvert ? Ces deux solutions marchent sans
                      logiciel de messagerie :
                    </p>
                    <div className="mt-3.5 flex flex-wrap gap-2">
                      <a href={gmailUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                        Ouvrir dans Gmail
                        <ArrowUpRight size={15} aria-hidden className="icon-out" />
                        <span className="sr-only">(nouvel onglet)</span>
                      </a>
                      <button type="button" onClick={() => copy("message")} className="btn btn-outline btn-sm">
                        <SwapIcon active={copied === "message"} on={<Check size={15} aria-hidden />} off={<Copy size={15} aria-hidden />} />
                        {copied === "message" ? "Message copié" : "Copier le message et l'adresse"}
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </form>
          </Reveal>
        </div>
    </section>
  );
}

function PillGroup({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-[0.875rem] font-medium text-foreground">{legend}</legend>
      <div className="mt-2.5 flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(o)} className="sr-only" />
            <span className="pill-face">{o}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[0.875rem] font-medium text-foreground">
          {label}
        </label>
        {hint ? (
          <span aria-hidden className="text-[0.75rem] tabular-nums text-muted-foreground">
            {hint}
          </span>
        ) : null}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-[0.8125rem] text-destructive">
          <AlertCircle size={14} aria-hidden className="mt-0.5 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
