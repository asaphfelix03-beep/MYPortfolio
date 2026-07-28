"use client";

import dynamic from "next/dynamic";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

const Scene3D = dynamic(() => import("@/components/scene-3d"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 -z-10 bg-background" />
  ),
});

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Scene3D />
      <Navigation />
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
