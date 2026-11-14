import Navigation from "@/components/navigation";
import Hero from "@/components/night/hero";
import ProjectsSection from "@/components/projects/projects-section";
import { ProfilSection } from "@/components/profil-section";
import { DomainesSection } from "@/components/domaines-section";
import ParcoursSection from "@/components/parcours-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { PageTransition } from "@/components/motion/page-transition";
import { getCvInfo } from "@/lib/cv-file";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { skillDomains } from "@/lib/skills";

/**
 * The home page, in the order a recruiter needs it: who (hero, profil), what
 * (domaines), the proof (projects, parcours), and how to get in touch.
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
      <Navigation cv={cv} />

      <PageTransition>
      <main id="contenu" tabIndex={-1} className="relative overflow-x-clip outline-none">
        <Hero cv={cv} />
        <ProfilSection />
        <DomainesSection />
        <ProjectsSection />
        <ParcoursSection cv={cv} />
        <ContactSection cv={cv} />
      </main>
      </PageTransition>

      <Footer cv={cv} />
    </>
  );
}
