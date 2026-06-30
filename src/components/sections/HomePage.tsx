"use client";

import { useRef, useState } from "react";
import { Footer, Header } from "@/components/layout";
import { useSectionObserver, useTheme } from "@/hooks";
import { ClubsSection } from "./pathways/ClubsSection";
import { ContactSection } from "./contact/ContactSection";
import { HeroSection } from "./hero/HeroSection";
import { NodesBackground } from "./background/NodesBackground";
import { PathwaysSection } from "./pathways/PathwaysSection";

export function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { activeSection, setActiveSection } = useSectionObserver();
  const nodesBgRef = useRef<HTMLDivElement>(null);

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

      <div ref={nodesBgRef} className="relative">
        <NodesBackground containerRef={nodesBgRef} theme={theme} />
        <PathwaysSection />
        <ClubsSection />
        <ContactSection />
      </div>

      <Footer />
    </main>
  );
}
