"use client";

import { useRef, useState } from "react";
import { Footer, Header } from "@/components/layout";
import { useSectionObserver } from "@/hooks/useSectionObserver";
import { useTheme } from "@/hooks/useTheme";
import { ClubsSection } from "./ClubsSection";
import { ContactSection } from "./ContactSection";
import { HeroSection } from "./HeroSection";
import { PathwaysSection } from "./PathwaysSection";
import { PathwayBackground } from "./PathwayBackground";

export function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { activeSection, setActiveSection } = useSectionObserver();
  const pathwayBgRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen overflow-x-clip bg-page text-primary">
      <Header
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        onMenuToggle={() => setMobileMenuOpen((current) => !current)}
        onSectionChange={setActiveSection}
        theme={theme}
        onThemeChange={setTheme}
      />

      <HeroSection />

      <div ref={pathwayBgRef} className="relative">
        <PathwayBackground containerRef={pathwayBgRef} theme={theme} />
        <PathwaysSection />
        <ClubsSection />
        <ContactSection />
      </div>

      <Footer />
    </main>
  );
}
