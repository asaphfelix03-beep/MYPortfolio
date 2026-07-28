"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Contact depuis Portfolio - ${formState.name}`,
    );
    const body = encodeURIComponent(
      `${formState.message}\n\nFrom: ${formState.email}`,
    );
    const mailtoLink = `mailto:asaphfelix02@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "asaphfelix02@gmail.com",
      href: "mailto:asaphfelix02@gmail.com",
    },
    {
      icon: Phone,
      label: "Téléphone",
      value: "+225 01 53 06 91 11",
      href: "tel:+2250153069111",
    },
    {
      icon: MapPin,
      label: "Localisation",
      value: "Treichville, Abidjan",
      href: "#",
    },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <section id="contact" className="relative py-32 px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider">
              &lt;CONTACT /&gt;
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 text-foreground">
              Travaillons Ensemble
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-pretty">
              Vous avez un projet en tête ou une opportunité professionnelle ? N&apos;hésitez
              pas à me contacter, je serai ravi d&apos;échanger avec vous.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-8"
            >
              <div className="glass rounded-2xl p-8 border border-primary/20">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Informations de contact
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                        <item.icon className="text-primary" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="glass rounded-2xl p-8 border border-accent/20">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Me suivre
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                      className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent hover:bg-accent/30 hover:scale-110 transition-all"
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9 }}
                className="flex items-center gap-3 px-6 py-4 rounded-xl glass border border-accent/30"
              >
                <span className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                <span className="text-foreground">
                  Ouvert aux opportunités de collaboration
                </span>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <form
                onSubmit={handleSubmit}
                className="glass rounded-2xl p-8 border border-primary/20 space-y-6"
              >
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Envoyez-moi un message
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Remplissez ce formulaire et je vous répondrai dans les plus brefs
                  délais.
                </p>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                    placeholder="Votre nom"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
                    placeholder="votre@email.com"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground resize-none"
                    placeholder="Votre message..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg gap-2"
                >
                  <Send size={18} />
                  Envoyer le message
                </Button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
