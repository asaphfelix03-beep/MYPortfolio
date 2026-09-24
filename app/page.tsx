"use client";

import Navigation from "@/components/navigation";
import NightHero from "@/components/night/night-hero";
import { Register, Selvedge } from "@/components/night/weave";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

/**
 * The home page is woven: one night ground, and the sections stacked as the
 * registers of a pagne, each opened by a hairline the shuttle crosses.
 *
 * The selvedge replaces the old top progress bar — two readouts of the same
 * quantity is one too many, and the edge of the cloth is where a measure
 * belongs.
 */
export default function Home() {
  return (
    <main className="world-night relative min-h-screen overflow-x-hidden">
      <Navigation />
      <Selvedge />

      <div className="relative z-10">
        <NightHero />

        <Register className="md:pl-14">
          <AboutSection />
        </Register>
        <Register className="md:pl-14">
          <SkillsSection />
        </Register>
        <Register className="md:pl-14">
          <ProjectsSection />
        </Register>
        <Register className="md:pl-14">
          <ContactSection />
        </Register>

        <div className="md:pl-14">
          <Footer />
        </div>
      </div>
    </main>
  );
}
