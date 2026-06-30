"use client";

import Image from "next/image";
import { Button } from "@/components/ui";
import { Navigation, ThemeToggle } from "@/components/layout";
import { BRANDING, CTA_TEXT } from "@/constants/content";
import type { HeaderProps } from "@/types";

export function Header({
  activeSection,
  mobileMenuOpen,
  onMenuToggle,
  onSectionChange,
  theme,
  onThemeChange,
}: HeaderProps) {
  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-3xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-10 sm:gap-4 sm:py-4 lg:px-14">
        <a
          href="#hero"
          className="flex items-center gap-2 transition hover:opacity-90 sm:gap-3"
        >
          <Image
            src={BRANDING.logo}
            alt={`${BRANDING.name} logo`}
            width={48}
            height={48}
            className="h-10 w-10 rounded-2xl bg-white/10 p-1.5 shadow-soft sm:h-12 sm:w-12 sm:rounded-3xl sm:p-2"
          />
          <div className="space-y-0.5 sm:space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white sm:text-sm">
              {BRANDING.name}
            </p>
            <p className="hidden text-[10px] uppercase tracking-[0.35em] text-slate-400 sm:block sm:text-[11px]">
              {BRANDING.tagline}
            </p>
          </div>
        </a>

        <Navigation
          activeSection={activeSection}
          onNavigate={onSectionChange}
        />

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle theme={theme} onToggle={onThemeChange} />

          <Button
            href="#contact"
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            {CTA_TEXT.contactButton}
          </Button>

          <button
            type="button"
            onClick={onMenuToggle}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition hover:border-burgundy hover:text-white sm:hidden"
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            <span className="absolute block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out" style={{
              transform: mobileMenuOpen ? 'rotate(45deg)' : 'translateY(-3px)',
            }} />
            <span className="absolute block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out" style={{
              opacity: mobileMenuOpen ? 0 : 1,
            }} />
            <span className="absolute block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out" style={{
              transform: mobileMenuOpen ? 'rotate(-45deg)' : 'translateY(3px)',
            }} />
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-white/10 bg-slate-950/95 transition-all duration-300 ease-out sm:hidden ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4">
          <Navigation
            activeSection={activeSection}
            isMobile
            onNavigate={(section) => {
              onSectionChange(section);
              onMenuToggle();
            }}
          />
        </div>
      </div>
    </div>
  );
}
