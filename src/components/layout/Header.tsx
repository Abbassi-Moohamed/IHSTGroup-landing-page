"use client";

import Image from "next/image";
import { Button } from "@/components/ui";
import { Navigation } from "@/components/layout/Navigation";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-10 lg:px-14">
        <a
          href="#hero"
          className="flex items-center gap-3 transition hover:opacity-90"
        >
          <Image
            src={BRANDING.logo}
            alt={`${BRANDING.name} logo`}
            width={48}
            height={48}
            className="h-12 w-12 rounded-3xl bg-white/10 p-2 shadow-soft"
          />
          <div className="space-y-1">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white">
              {BRANDING.name}
            </p>
            <p className="text-[11px] uppercase tracking-[0.35em] text-slate-400">
              {BRANDING.tagline}
            </p>
          </div>
        </a>

        <Navigation
          activeSection={activeSection}
          onNavigate={onSectionChange}
        />

        <div className="flex items-center gap-3">
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition hover:border-burgundy hover:text-white sm:hidden"
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            <span className="block h-0.5 w-6 bg-current" />
            <span className="mt-1 block h-0.5 w-6 bg-current" />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-slate-950/95 px-6 py-4 sm:hidden">
          <Navigation
            activeSection={activeSection}
            isMobile
            onNavigate={(section) => {
              onSectionChange(section);
              onMenuToggle();
            }}
          />
        </div>
      )}
    </div>
  );
}
