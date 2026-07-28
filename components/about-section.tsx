"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, MapPin, Calendar, Award, Star, Code2, Target } from "lucide-react";
import Image from "next/image";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      
      <div ref={ref} className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              className="inline-block text-primary font-mono text-sm tracking-wider px-4 py-2 rounded-full glass border border-primary/30"
            >
              &lt;À PROPOS /&gt;
            </motion.span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mt-6 text-foreground">
              Qui suis-je{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">?</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Profile Card - Left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="lg:col-span-2"
            >
              <div className="glass rounded-3xl p-8 border border-primary/20 relative overflow-hidden group">
                {/* Decorative gradient */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors" />
                
                {/* Profile image */}
                <div className="relative mb-6">
                  <div className="w-full aspect-square max-w-[200px] mx-auto relative">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-accent opacity-50 blur-lg" />
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-primary/30">
                      <Image
                        src="/images/asaph-photo.png"
                        alt="Ojewumi Asaph Felix"
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Name and title */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Ojewumi Asaph Felix
                  </h3>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
                    <Code2 size={16} className="text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      Étudiant en Cybersécurité & IA
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
                  <MapPin size={16} className="text-primary" />
                  <span>Treichville, Abidjan, Côte d&apos;Ivoire</span>
                </div>

                {/* Traits */}
                <div className="flex flex-wrap justify-center gap-2">
                  {["Rigoureux", "Créatif", "Curieux", "Team Player"].map((trait, i) => (
                    <motion.span
                      key={trait}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary/50 text-foreground border border-border/50 hover:border-primary/50 transition-colors"
                    >
                      {trait}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Languages Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 gap-4 mt-6"
              >
                <div className="glass rounded-xl p-5 border border-primary/20 text-center group hover:border-primary/50 transition-colors">
                  <div className="text-3xl font-bold text-primary mb-1">FR</div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={12} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">Courant</p>
                </div>
                <div className="glass rounded-xl p-5 border border-accent/20 text-center group hover:border-accent/50 transition-colors">
                  <div className="text-3xl font-bold text-accent mb-1">EN</div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {[1, 2, 3, 4].map((star) => (
                      <Star key={star} size={12} className="fill-accent text-accent" />
                    ))}
                    <Star size={12} className="text-accent/30" />
                  </div>
                  <p className="text-xs text-muted-foreground">Technique</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Bio + Education + Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="lg:col-span-3 space-y-6"
            >
              {/* Bio Card */}
              <div className="glass rounded-2xl p-8 border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Target className="text-primary" size={20} />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">Ma Mission</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg text-pretty">
                  Étudiant passionné en <span className="text-primary font-medium">Cybersécurité</span> et{" "}
                  <span className="text-accent font-medium">Intelligence Artificielle</span>, je souhaite mettre ma polyvalence technique au service de
                  projets innovants. Compétent en développement web, sécurité informatique et bases de données.
                </p>
              </div>

              {/* Education */}
              <div className="glass rounded-2xl p-8 border border-primary/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <GraduationCap className="text-primary" size={20} />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">Formation</h4>
                </div>
                <div className="space-y-6">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 }}
                    className="relative pl-6 border-l-2 border-primary/50"
                  >
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar size={14} />
                      <span>2026 - 2027</span>
                    </div>
                    <h5 className="text-lg font-semibold text-foreground">
                      Licence 3 en Cybersécurité et Intelligence Artificielle
                    </h5>
                    <p className="text-muted-foreground">
                      École Supérieure Africaine des TICs (ESATIC)
                    </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 }}
                    className="relative pl-6 border-l-2 border-primary/50"
                  >
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar size={14} />
                      <span>2024 - Aujourd&apos;hui</span>
                    </div>
                    <h5 className="text-lg font-semibold text-foreground">
                      Licence 2 en Cybersécurité et IA
                    </h5>
                    <p className="text-muted-foreground">
                      École Supérieure Africaine des TICs (ESATIC)
                    </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 }}
                    className="relative pl-6 border-l-2 border-accent/50"
                  >
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-accent border-4 border-background" />
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar size={14} />
                      <span>Juin 2024</span>
                    </div>
                    <h5 className="text-lg font-semibold text-foreground">Baccalauréat série D</h5>
                    <p className="text-muted-foreground">
                      Lycée Moderne de Treichville
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Achievements */}
              <div className="glass rounded-2xl p-8 border border-accent/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Award className="text-accent" size={20} />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">Distinctions</h4>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { title: "Hackathons Tech", desc: "Participation active", icon: "💻" },
                    { title: "Ecowas Hackathon", desc: "Compétition régionale", icon: "🏆" },
                  ].map((achievement, index) => (
                    <motion.div
                      key={achievement.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-accent/50 transition-colors"
                    >
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <h5 className="font-medium text-foreground">{achievement.title}</h5>
                        <p className="text-sm text-muted-foreground">{achievement.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="glass rounded-2xl p-8 border border-primary/20 mt-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Award className="text-primary" size={20} />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">Certifications</h4>
                </div>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 text-sm">
                  <li>Data Analytics Essentials (Cisco Networking Academy)</li>
                  <li>Introduction à la science des données (Cisco Networking Academy)</li>
                  <li>Introduction à l’IA moderne (Cisco Networking Academy)</li>
                  <li>Data Science &amp; Analytics with Python (Cisco Networking Academy)</li>
                  <li>Cybersecurity Defense Analyst Pathway Exam (Cisco Networking Academy)</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
