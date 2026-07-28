"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Shield,
  Code,
  Database,
  Cloud,
  Zap,
  Smartphone,
} from "lucide-react";

const skillCategories = [
  {
    title: "IA & Data Science",
    icon: Zap,
    color: "primary",
    skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Scikit-Learn"],
  },
  {
    title: "Cybersécurité",
    icon: Shield,
    color: "accent",
    skills: ["Sécurité Réseaux", "Tests d'intrusion", "Cryptographie", "SIEM", "OWASP"],
  },
  {
    title: "Big Data",
    icon: Database,
    color: "primary",
    skills: ["Hadoop", "Spark", "Kafka", "NoSQL", "Data Warehousing"],
  },
  {
    title: "Développement Full-stack",
    icon: Code,
    color: "accent",
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "SQL"],
  },
  {
    title: "Machine Learning",
    icon: Cloud,
    color: "primary",
    skills: ["Modèles supervisés", "Modèles non-supervisés", "TensorFlow", "PyTorch", "Évaluation de modèles"],
  },
  {
    title: "Réseau et sécurité informatique",
    icon: Smartphone,
    color: "accent",
    skills: ["Routage & Switching", "Sécurité des réseaux", "Firewall", "VPN", "Monitoring"],
  },
];

function SkillCard({ category, index, isInView }: { category: typeof skillCategories[0], index: number, isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl ${
        category.color === "primary" ? "bg-primary/20" : "bg-accent/20"
      }`} />
      
      <div className="relative glass rounded-2xl p-6 border border-primary/20 hover:border-primary/50 transition-all duration-300 h-full overflow-hidden">
        {/* Animated background gradient */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${
          category.color === "primary" ? "bg-primary" : "bg-accent"
        }`} />
        
        <div className="relative">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              animate={isHovered ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${
                category.color === "primary"
                  ? "bg-primary/20 group-hover:bg-primary/30"
                  : "bg-accent/20 group-hover:bg-accent/30"
              }`}
            >
              <category.icon
                className={category.color === "primary" ? "text-primary" : "text-accent"}
                size={28}
              />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                {category.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {category.skills.length} compétences
              </p>
            </div>
          </div>

          {/* Skills as tags */}
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill, skillIndex) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 + skillIndex * 0.05 + 0.3 }}
                className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-all duration-300 cursor-default ${
                  category.color === "primary"
                    ? "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/40"
                    : "bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 hover:border-accent/40"
                }`}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
      
      <div ref={ref} className="max-w-7xl mx-auto">
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
              &lt;COMPÉTENCES /&gt;
            </motion.span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mt-6 text-foreground">
              Mon Arsenal{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Technique
              </span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg text-pretty">
              Une combinaison de compétences en développement web, mobile,
              bases de données et sécurité informatique.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <SkillCard 
                key={category.title} 
                category={category} 
                index={index}
                isInView={isInView}
              />
            ))}
          </div>

          {/* Bottom stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { value: "30+", label: "Technologies", color: "primary" },
              { value: "2+", label: "Projets réalisés", color: "accent" },
              { value: "2+", label: "Années d'expérience", color: "primary" },
              { value: "100%", label: "Passion", color: "accent" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 1 + index * 0.1 }}
                className="glass rounded-xl p-6 border border-primary/20 text-center hover:border-primary/50 transition-colors"
              >
                <p className={`text-3xl md:text-4xl font-bold ${stat.color === "primary" ? "text-primary" : "text-accent"}`}>
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
