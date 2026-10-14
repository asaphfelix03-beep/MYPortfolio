import Navigation from "@/components/navigation";
import Hero from "@/components/night/hero";
import { Register, Selvedge } from "@/components/night/weave";
import ProjectsSection from "@/components/projects/projects-section";
import SkillsSection from "@/components/skills-section";
import ParcoursSection from "@/components/parcours-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { TechMarquee } from "@/components/motion/tech-marquee";
import { PageTransition } from "@/components/motion/page-transition";
import { getCvInfo } from "@/lib/cv-file";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { skillDomains } from "@/lib/skills";

/**
 * The home page, in the order a recruiter needs it: who (hero), the proof
 * (projects), what he can do (skills), where he comes from (parcours), and
 * how to reach him (contact).
 *
 * A server component: it reads the CV's size from disk at build time and
 * hands it to the sections that offer the download. The sections themselves
 * are client components only where they animate or hold state.
 */
export default function Home() {
  const cv = getCvInfo();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: site.url,
    inLanguage: "fr",
    mainEntity: {
      "@type": "Person",
      name: site.name,
      alternateName: site.shortName,
      url: site.url,
      image: `${site.url}/images/asaph-photo.webp`,
      email: `mailto:${site.email}`,
      jobTitle: "Étudiant en cybersécurité et intelligence artificielle",
      affiliation: {
        "@type": "CollegeOrUniversity",
        name: `${site.school.name} (${site.school.short})`,
        address: { "@type": "PostalAddress", addressLocality: site.school.city, addressCountry: "CI" },
      },
      address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "CI" },
      sameAs: [site.links.github, site.links.linkedin],
      knowsAbout: skillDomains.map((d) => d.title),
      subjectOf: projects.map((p) => ({
        "@type": "CreativeWork",
        name: p.title,
        url: `${site.url}/projets/${p.slug}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Static data built from lib/site.ts; nothing user-supplied.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Opening curtain, CSS only (see .intro in globals.css). */}
      <div aria-hidden className="intro">
        <p>Asaph Felix</p>
        <i />
      </div>
      <Navigation cv={cv} />
      <Selvedge />

      <PageTransition>
      <main id="contenu" tabIndex={-1} className="relative overflow-x-clip outline-none">
        <Hero cv={cv} />
        <div className="md:pl-14">
          <TechMarquee />
        </div>

        <Register className="md:pl-14">
          <ProjectsSection />
        </Register>
        <Register className="md:pl-14">
          <SkillsSection />
        </Register>
        <Register className="md:pl-14">
          <ParcoursSection cv={cv} />
        </Register>
        <Register className="md:pl-14">
          <ContactSection cv={cv} />
        </Register>
      </main>
      </PageTransition>

      <div className="theme-ink md:pl-14">
        <Footer cv={cv} />
      </div>
    </>
  );
}
