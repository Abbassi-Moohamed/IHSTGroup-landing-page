"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Section } from "@/types";

interface TitleSidebarProps {
  activeCard: number;
  totalCards: number;
  hoveredCard: number | null;
  sections: Section[];
}

function BookIcon() {
  return (
    <svg viewBox="0 0 100 100" fill="none" className="h-full w-full">
      <path d="M18 22v56l32-12 32 12V22l-32 12L18 22z" stroke="url(#g-cam)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M50 34v44" stroke="url(#g-cam)" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 14l-14 10M68 14l14 10" stroke="url(#g-cam)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="36" cy="54" r="2.5" fill="#B4473F" opacity="0.8" />
      <circle cx="64" cy="54" r="2.5" fill="#B4473F" opacity="0.8" />
      <defs>
        <linearGradient id="g-cam" x1="18" y1="14" x2="82" y2="78">
          <stop offset="0%" stopColor="#8B2720" />
          <stop offset="100%" stopColor="#B4473F" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ClubsIcon() {
  return (
    <svg viewBox="0 0 100 100" fill="none" className="h-full w-full">
      <path d="M50 12l10 28h30l-24 18 9 28-25-18-25 18 9-28-24-18h30l10-28z" stroke="url(#g-club)" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="50" cy="45" r="8" fill="none" stroke="url(#g-club)" strokeWidth="2" />
      <circle cx="28" cy="22" r="3.5" fill="#B4473F" opacity="0.7" />
      <circle cx="72" cy="22" r="3.5" fill="#8B2720" opacity="0.7" />
      <defs>
        <linearGradient id="g-club" x1="16" y1="12" x2="84" y2="68">
          <stop offset="0%" stopColor="#B4473F" />
          <stop offset="100%" stopColor="#8B2720" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CareerIcon() {
  return (
    <svg viewBox="0 0 100 100" fill="none" className="h-full w-full">
      <rect x="18" y="34" width="64" height="48" rx="6" stroke="url(#g-car)" strokeWidth="2.5" />
      <path d="M38 34V26a6 6 0 0 1 6-6h12a6 6 0 0 1 6 6v8" stroke="url(#g-car)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="32" y1="54" x2="68" y2="54" stroke="url(#g-car)" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="62" x2="56" y2="62" stroke="url(#g-car)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="50" cy="48" r="3.5" fill="#B4473F" opacity="0.8" />
      <defs>
        <linearGradient id="g-car" x1="18" y1="20" x2="82" y2="82">
          <stop offset="0%" stopColor="#8B2720" />
          <stop offset="100%" stopColor="#B4473F" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function AIIcon() {
  return (
    <svg viewBox="0 0 100 100" fill="none" className="h-full w-full">
      <path d="M50 10l8 24h24l-20 14 8 24-20-14-20 14 8-24-20-14h24l8-24z" stroke="url(#g-ai)" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="50" cy="50" r="10" fill="none" stroke="url(#g-ai)" strokeWidth="2" />
      <path d="M50 38l6 12 12-6-6 12 12 6-12 6 6 12-12-6-12 6 6-12-12-6 12-6-6-12z" stroke="url(#g-ai)" strokeWidth="1.5" strokeLinejoin="round" opacity="0.7" />
      <circle cx="28" cy="24" r="3.5" fill="#8B2720" opacity="0.7" />
      <circle cx="72" cy="24" r="3.5" fill="#B4473F" opacity="0.7" />
      <defs>
        <linearGradient id="g-ai" x1="20" y1="10" x2="80" y2="90">
          <stop offset="0%" stopColor="#B4473F" />
          <stop offset="50%" stopColor="#8B2720" />
          <stop offset="100%" stopColor="#6B1D18" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const ICONS = [BookIcon, ClubsIcon, CareerIcon, AIIcon];

const BG_GRADIENTS = [
  "from-rosewood/15 via-transparent to-transparent",
  "from-burgundy/15 via-transparent to-transparent",
  "from-rosewood/15 via-transparent to-transparent",
  "from-burgundy/15 via-transparent to-transparent",
];

export function TitleSidebar({ activeCard, totalCards, hoveredCard, sections }: TitleSidebarProps) {
  const displayIndex = hoveredCard ?? activeCard;
  const section = sections[displayIndex];
  const IconComponent = ICONS[displayIndex];

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden border-r border-white/[0.04] bg-slate-950">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${BG_GRADIENTS[displayIndex]} opacity-70 transition-all duration-700`} />

      <div className="absolute left-10 right-10 top-0 h-px bg-gradient-to-r from-transparent via-rosewood/30 to-transparent" />

      <div className="relative z-10 flex h-full flex-col px-10 py-14">
        {/* Header */}
        <div className="mb-10 mt-28 text-center">
          <p className="text-xl font-bold uppercase tracking-[0.35em] text-rosewood/70">
            Our pathways
          </p>
          <div className="mx-auto mt-4 h-px w-20 bg-rosewood/20" />
        </div>

        {/* Icon */}
        <div className="mb-10 flex items-center justify-center">
          <div className="relative h-44 w-44">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={displayIndex}
                initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <IconComponent />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Tag badge */}
        <div className="mb-3 flex justify-center">
          <span className="inline-block rounded-full border border-rosewood/20 bg-rosewood/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-rosewood/80">
            {section.tag ?? section.id}
          </span>
        </div>

        {/* Section title + description (section three) */}
        <div className="mt-64 space-y-3">
          <AnimatePresence mode="popLayout">
            <motion.h3
              key={displayIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold leading-tight text-white"
            >
              {section.title}
            </motion.h3>
          </AnimatePresence>

          <AnimatePresence mode="popLayout">
            <motion.p
              key={displayIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="text-sm leading-relaxed text-white/45 line-clamp-3"
            >
              {section.description}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Highlights */}
        <div className="mt-6 space-y-2">
          {section.highlights.map((h, i) => (
            <AnimatePresence mode="popLayout" key={i}>
              <motion.div
                key={`${displayIndex}-${i}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2, delay: 0.1 + i * 0.05 }}
                className="flex items-center gap-2 text-xs text-white/40"
              >
                <span className="h-1 w-1 shrink-0 rounded-full bg-rosewood/60" />
                <span>{h}</span>
              </motion.div>
            </AnimatePresence>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto space-y-4">
          <div className="h-px w-full bg-gradient-to-r from-white/[0.06] via-white/[0.03] to-transparent" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-white/25 tracking-wider">
              {String(displayIndex + 1).padStart(2, "0")} / {String(totalCards).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalCards }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all duration-500 ${
                    i === displayIndex
                      ? "h-1.5 w-6 bg-rosewood"
                      : "h-1.5 w-1.5 bg-white/[0.08]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
