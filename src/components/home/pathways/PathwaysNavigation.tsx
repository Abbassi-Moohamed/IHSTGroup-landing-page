"use client";

import { useMemo } from "react";
import type { Section } from "@/types";

interface PathwaysNavigationProps {
  sections: Section[];
  activeCard: number;
  totalCards: number;
  onHover: (index: number | null) => void;
  onClick: (index: number) => void;
}

export function PathwaysNavigation({
  sections,
  activeCard,
  totalCards,
  onHover,
  onClick,
}: PathwaysNavigationProps) {
  const navItems = useMemo(
    () =>
      sections.map((section, index) => (
        <button
          key={section.id}
          type="button"
          onMouseEnter={() => onHover(index)}
          onMouseLeave={() => onHover(null)}
          onClick={() => onClick(index)}
          className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all duration-500 ${
            index === activeCard
              ? "border-burgundy bg-slate-900 text-white shadow-glow"
              : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:bg-white/[0.06]"
          }`}
        >
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold transition-all duration-500 ${
              index === activeCard
                ? "border-burgundy bg-burgundy text-white"
                : "border-white/10 bg-slate-950/70 text-slate-500"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="min-w-0 flex-1">
            <p
              className={`truncate font-medium transition-colors duration-500 ${
                index === activeCard ? "text-white" : "text-slate-400"
              }`}
            >
              {section.title}
            </p>
          </div>
        </button>
      )),
    [sections, activeCard, onHover, onClick],
  );

  return (
    <aside className="flex h-full flex-col justify-center">
      <nav className="flex flex-col gap-12">{navItems}</nav>
    </aside>
  );
}
