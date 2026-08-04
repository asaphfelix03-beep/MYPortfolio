"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Github,
  Linkedin,
  Check,
  Copy,
  ExternalLink,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const EMAIL = "asaphfelix02@gmail.com";

const contactInfo = [
  { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+225 01 53 06 91 11",
    href: "tel:+2250153069111",
  },
  { icon: MapPin, label: "Localisation", value: "Treichville, Abidjan", href: null },
];

const socials = [
  {
    icon: Github,
    href: "https://github.com/asaphfelix03-beep/portfolio-asaph",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/asaph-felix-ojewumi-469054324/",
    label: "LinkedIn",
  },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const subject = `Contact portfolio — ${form.name || "Nouveau message"}`;
  const body = `${form.message}\n\n—\nDe : ${form.name}\nEmail : ${form.email}`;

  const mailtoUrl = `mailto:${EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;

  // Browser-based fallback: works even with no desktop mail client installed,
  // which is what made the previous mailto-only submit fail silently.
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    EMAIL,
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    window.location.href = mailtoUrl;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const field =
    "w-full rounded-md border border-border bg-card px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <section id="contact" className="relative py-20 sm:py-28 lg:py-32 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="eyebrow">Contact</p>
        </Reveal>

        <div className="mt-5 grid lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left: pitch + coordinates */}
          <div className="lg:col-span-5 min-w-0">
            <Reveal delay={0.06}>
              <h2 className="display text-[clamp(1.9rem,4.6vw,3.4rem)] text-balance">
                Bâtissons quelque chose d&apos;
                <span className="italic">utile</span>.
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 text-sm sm:text-base leading-relaxed text-muted-foreground text-pretty">
                Une opportunité de stage, une alternance ou simplement une
                question sur mon parcours ? Écrivez-moi, je réponds rapidement.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <dl className="mt-10 space-y-5">
                {contactInfo.map((item) => {
                  const inner = (
                    <>
                      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-md border border-border bg-card">
                        <item.icon size={15} className="text-accent" />
                      </span>
                      <span className="min-w-0">
                        <dt className="eyebrow text-[10px]">{item.label}</dt>
                        <dd className="text-sm font-medium mt-0.5 break-words">
                          {item.value}
                        </dd>
                      </span>
                    </>
                  );

                  return item.href ? (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-start gap-3.5 hover:[&_dd]:text-accent"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={item.label} className="flex items-start gap-3.5">
                      {inner}
                    </div>
                  );
                })}
              </dl>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap items-center gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="grid h-10 w-10 place-items-center rounded-md border border-border bg-card text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors"
                  >
                    <s.icon size={16} />
                  </a>
                ))}
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 h-10 text-xs font-medium text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Adresse copiée" : "Copier mon email"}
                </button>
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={0.18} className="lg:col-span-7 min-w-0">
            <form onSubmit={handleSubmit} className="card-paper p-6 sm:p-8">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="eyebrow text-[10px] block mb-2">
                    Nom complet
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Votre nom"
                    className={field}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="eyebrow text-[10px] block mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="votre@email.com"
                    className={field}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="message" className="eyebrow text-[10px] block mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Parlez-moi de votre projet ou de votre offre…"
                  className={`${field} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="group mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-foreground text-background px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] hover:opacity-90 transition-opacity"
              >
                Envoyer le message
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>

              {/* Shown after submit: mailto only works when a mail client is
                  installed, so always offer a route that works in-browser. */}
              {sent && (
                <div
                  role="status"
                  className="mt-5 rounded-md border border-accent/30 bg-accent/[0.06] p-4"
                >
                  <p className="flex items-center gap-2 text-sm font-semibold">
                    <Check size={15} className="text-accent shrink-0" />
                    Votre logiciel de messagerie devrait s&apos;ouvrir.
                  </p>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    Rien ne s&apos;est passé ? Utilisez une de ces options — votre
                    message est déjà pré-rempli.
                  </p>
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    <a
                      href={gmailUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md bg-foreground text-background px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] hover:opacity-90 transition-opacity"
                    >
                      Ouvrir dans Gmail
                      <ExternalLink size={13} />
                    </a>
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] hover:border-accent/40 transition-colors"
                    >
                      {copied ? <Check size={13} /> : <Copy size={13} />}
                      {copied ? "Copiée" : "Copier l'adresse"}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
