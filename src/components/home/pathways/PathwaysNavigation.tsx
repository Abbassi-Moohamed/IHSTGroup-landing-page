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
  const progress = (activeCard + 1) / totalCards;

  const navItems = useMemo(
    () =>
      sections.map((section, index) => (
        <button
          key={section.id}
          type="button"
          onMouseEnter={() => onHover(index)}
          onMouseLeave={() => onHover(null)}
          onClick={() => onClick(index)}
          className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm text-left transition-all duration-500 ${
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
    <aside className="flex h-full flex-col justify-center py-8">
      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-rosewood/70">
          Our pathways
        </p>
        <h2 className="mt-1 text-xl font-semibold text-white">
          {sections[activeCard]?.title}
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          {String(activeCard + 1).padStart(2, "0")} /{" "}
          {String(totalCards).padStart(2, "0")}
        </p>
      </div>

      <div className="mb-2 h-1 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-rosewood to-rosewood/60 transition-all duration-500 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <nav className="mt-4 flex flex-col gap-2">{navItems}</nav>
    </aside>
  );
}
