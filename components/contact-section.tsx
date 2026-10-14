"use client";

import { useId, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Reveal, RevealTitle } from "@/components/ui/reveal";
import { SwapIcon } from "@/components/ui/swap-icon";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand";
import { site, type CvInfo } from "@/lib/site";

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 2000;

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
export default function ContactSection({ cv }: { cv: CvInfo }) {
  const uid = useId();
  const [fields, setFields] = useState<Fields>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<"idle" | "handed-off">("idle");
  const [copied, setCopied] = useState<"email" | "message" | null>(null);
  const refs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };

  const subject = `Contact portfolio — ${fields.name.trim() || "Nouveau message"}`;
  const body = `${fields.message.trim()}\n\n—\nDe : ${fields.name.trim()}\nE-mail : ${fields.email.trim()}`;
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
    `w-full border bg-card px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/80 focus-visible:outline-none focus:border-accent focus:ring-2 focus:ring-accent/25 ${
      invalid ? "border-destructive" : "border-input"
    }`;

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
      className="relative px-5 py-20 outline-none sm:px-8 sm:py-28 lg:py-32"
    >
      <Reveal kind="scale" duration={1.1} className="mx-auto max-w-7xl">
        {/* The closing panel: navy, with one localised glow behind the form. */}
        <div className="theme-ink relative overflow-hidden rounded-[2rem] px-5 py-12 sm:px-10 sm:py-16 lg:px-14">
        <span aria-hidden className="weave-field pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(70%_60%_at_80%_10%,black,transparent)]" />
        <div className="relative grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-5">
            <RevealTitle id="contact-title" className="h-section" text="Parlons de votre offre de _stage_" />
            <Reveal delay={0.06}>
              <p className="prose-night mt-5 text-base sm:text-[1.0625rem]">
                {site.availability.sentence} Une question sur un projet ou sur
                mon parcours ? Écrivez-moi, je réponds rapidement.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 border-t border-border pt-6">
                <p className="label">E-mail</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <a
                    href={`mailto:${site.email}`}
                    className="link-line inline-block break-all py-1.5 text-[clamp(1.25rem,2.3vw,1.6rem)] font-light text-foreground hover:text-accent"
                  >
                    {site.email}
                  </a>
                  <button
                    type="button"
                    onClick={() => copy("email")}
                    className="btn btn-outline btn-sm"
                  >
                    <SwapIcon active={copied === "email"} on={<Check size={15} aria-hidden />} off={<Copy size={15} aria-hidden />} />
                    {copied === "email" ? "Adresse copiée" : "Copier"}
                  </button>
                </div>
              </div>

              <ul className="mt-6 divide-y divide-border border-y border-border">
                <ContactRow icon={<Phone size={16} aria-hidden />} label="Téléphone">
                  <a href={site.phone.href} className="link-line inline-block py-2.5 hover:text-accent">
                    {site.phone.display}
                  </a>
                </ContactRow>
                <ContactRow icon={<LinkedinIcon size={15} />} label="LinkedIn">
                  <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="link-go inline-flex min-h-11 items-center gap-1.5 hover:text-accent">
                    Ojewumi Asaph Felix
                    <ArrowUpRight size={14} aria-hidden className="icon-out" />
                    <span className="sr-only">(nouvel onglet)</span>
                  </a>
                </ContactRow>
                <ContactRow icon={<GithubIcon size={15} />} label="GitHub">
                  <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="link-go inline-flex min-h-11 items-center gap-1.5 hover:text-accent">
                    asaphfelix03-beep
                    <ArrowUpRight size={14} aria-hidden className="icon-out" />
                    <span className="sr-only">(nouvel onglet)</span>
                  </a>
                </ContactRow>
                <ContactRow icon={<Download size={16} aria-hidden />} label="CV">
                  <a href={cv.href} download={cv.downloadName} className="link-line inline-block py-2.5 hover:text-accent">
                    {cv.label} <span className="text-muted-foreground">· {cv.size}</span>
                  </a>
                </ContactRow>
                <ContactRow icon={<MapPin size={16} aria-hidden />} label="Ville">
                  {site.location}
                </ContactRow>
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="min-w-0 lg:col-span-7">
            <form
              noValidate
              onSubmit={onSubmit}
              aria-labelledby={`${uid}-form-title`}
              aria-describedby={ids.note}
              className="border-t border-border pt-6 lg:border-t-0 lg:pt-0"
            >
              <h3 id={`${uid}-form-title`} className="h-title text-[1.375rem]">
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
                <button type="submit" className="btn btn-primary">
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
        </div>
      </Reveal>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-4 py-1.5 text-[0.9375rem]">
      <span className="grid h-9 w-9 shrink-0 place-items-center border border-border text-accent">
        {icon}
      </span>
      <span className="w-24 shrink-0 text-muted-foreground">{label}</span>
      <span className="min-w-0 text-foreground">{children}</span>
    </li>
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
