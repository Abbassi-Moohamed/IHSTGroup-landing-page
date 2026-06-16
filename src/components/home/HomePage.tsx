"use client";

import { useState } from "react";
import { Footer, Header } from "@/components/layout";
import { useSectionObserver } from "@/hooks/useSectionObserver";
import { useTheme } from "@/hooks/useTheme";
import { ClubsSection } from "./ClubsSection";
import { ContactSection } from "./ContactSection";
import { HeroSection } from "./HeroSection";
import { PathwaysSection } from "./PathwaysSection";

export function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { activeSection, setActiveSection, revealedSections } =
    useSectionObserver();

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
      <PathwaysSection />
      <ClubsSection />
      <ContactSection />

      <Footer />
    </main>
  );
}
