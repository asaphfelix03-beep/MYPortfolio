"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Smartphone, Leaf, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "EcoCollect",
    subtitle: "Application de collecte et recyclage des déchets",
    description:
      "Projet en cours de développement : application mobile citoyenne permettant de signaler des dépôts sauvages de déchets, de localiser les points de collecte et de recyclage, et de sensibiliser à l'éco-responsabilité.",
    technologies: ["Flutter", "Django", "PostgreSQL", "Google Maps API"],
    year: "2025-2026",
    icon: Leaf,
    color: "accent",
    type: "Mobile App",
    status: "En cours",
  },
  {
    id: 2,
    title: "N'ti",
    subtitle: "Application d'apprentissage du Baoulé",
    description:
      "Application mobile dédiée à l'apprentissage de la langue Baoulé, proposant des leçons, du vocabulaire, des audios de prononciation, des quiz et un dictionnaire hors ligne Baoulé–Français permettant d'apprendre la langue Baoulé plus efficacement.",
    technologies: ["Flutter", "Firebase", "Audio Processing"],
    year: "2025",
    icon: BookOpen,
    color: "primary",
    type: "Mobile App",
    download: "/files/nti-app-release.apk",
  },
  {
    id: 3,
    title: "PROJET D'ANALYSE DE DONNÉES – VENTES PHARMACEUTIQUES",
    subtitle: "Analyse exploratoire des ventes pharmaceutiques (2014–2019)",
    description:
      "J'ai effectué une analyse exploratoire des données sur six années (2014–2019) à partir de fichiers CSV. Nettoyage et agrégation des données (groupements, filtres temporels, gestion des valeurs manquantes). Création de visualisations pour mettre en évidence les tendances : médicaments les plus vendus, moyennes quotidiennes et saisonnalité de la catégorie R03, qui affiche une augmentation de XX % pendant l'hiver.",
    technologies: ["Python", "Pandas", "Matplotlib"],
    year: "2019",
    image: "/images/diagram-2019.png",
    link: "/Online_Retail_Top10_Countries.html",
    linkLabel: "Voir la visualisation",
    visualization: "/Online_Retail_Top10_Countries.html",
    icon: BookOpen,
    color: "accent",
    type: "Analyse de données",
    download: "/Online_Retail_Analysis_Notebook.md",
    linkLabel: "Voir la visualisation",
  },
  {
    id: 4,
    title: "Matronassist-ci",
    subtitle: "Plateforme de suivi de grossesse pour sages-femmes",
    description:
      "Projet en cours de développement : plateforme de suivi de grossesse qui automatise le travail administratif des sages-femmes et améliore le suivi des patientes grâce à des alertes intelligentes et un partage facilité des données médicales.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Docker"],
    year: "2024",
    icon: BookOpen,
    color: "primary",
    type: "Plateforme web",
    status: "En cours",
  },

];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="projects" className="relative py-32 px-6">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider">
              &lt;PROJETS /&gt;
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 text-foreground">
              Mes Réalisations
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-pretty">
              Des projets concrets qui démontrent ma capacité à résoudre des
              problèmes réels avec des solutions technologiques innovantes.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group relative"
              >
                <div
                  className={`card project-card transition-all duration-300 h-full ${
                    hoveredProject === project.id
                      ? project.color === "primary"
                        ? "border-primary/50 shadow-lg shadow-primary/10"
                        : "border-accent/50 shadow-lg shadow-accent/10"
                      : "border-primary/20"
                  }`}
                >
                  <div className="project-meta">
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                          project.color === "primary"
                            ? "bg-primary/20 group-hover:bg-primary/30"
                            : "bg-accent/20 group-hover:bg-accent/30"
                        }`}
                      >
                        <project.icon
                          className={project.color === "primary" ? "text-primary" : "text-accent"}
                          size={28}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          {project.status ? (
                            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${project.color === "primary" ? "bg-primary/10 text-primary border border-primary/20" : "bg-accent/10 text-accent border border-accent/20"}`}>
                              {project.status}
                            </span>
                          ) : null}
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-foreground mt-1">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2 hidden lg:block">{project.type}</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className={`font-medium mb-1 ${project.color === "primary" ? "text-primary" : "text-accent"}`}>
                        {project.subtitle}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${
                              project.color === "primary"
                                ? "bg-primary/10 text-primary border-primary/20"
                                : "bg-accent/10 text-accent border-accent/20"
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="project-body">
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 text-pretty">
                      {project.description}
                    </p>

                    {project.visualization ? (
                     <div className="mb-4 rounded-xl border border-border/70 bg-background/70 p-2 shadow-inner">
                       <div className="mb-2 flex items-center justify-between gap-2">
                         <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                           Aperçu interactif
                         </p>
                         {project.link ? (
                           <a
                             href={project.link}
                             target="_blank"
                             rel="noopener noreferrer"
                             className={`text-xs font-medium underline-offset-4 hover:underline ${project.color === "primary" ? "text-primary" : "text-accent"}`}
                           >
                             Plein écran
                           </a>
                         ) : null}
                       </div>
                       <iframe
                         src={project.visualization}
                         title={`${project.title} visualisation`}
                         loading="lazy"
                         className="project-visualization"
                       />
                     </div>
                    ) : project.image ? (
                     <div className="mb-4">
                       <img src={project.image} alt={`${project.title} diagramme`} className="project-img" />
                     </div>
                    ) : null}

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                     {project.link ? (
                       <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-full sm:w-1/2">
                         <Button
                           variant="ghost"
                           className={`w-full justify-center gap-2 ${project.color === "primary" ? "hover:bg-primary/10 text-primary" : "hover:bg-accent/10 text-accent"}`}
                         >
                           <span>{project.linkLabel ?? "Voir le projet"}</span>
                           <ExternalLink size={16} />
                         </Button>
                       </a>
                     ) : null}

                      {project.download ? (
                        <a href={project.download} download className="w-full sm:w-1/2">
                          <Button
                            variant="outline"
                            className={`w-full justify-center gap-2 ${project.color === "primary" ? "text-primary border-primary/20 hover:bg-primary/5" : "text-accent border-accent/20 hover:bg-accent/5"}`}
                          >
                            <span>Télécharger</span>
                          </Button>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* Decorative gradient */}
                <div
                  className={`absolute inset-0 -z-10 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity ${
                    project.color === "primary"
                      ? "bg-primary/20"
                      : "bg-accent/20"
                  }`}
                />
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
