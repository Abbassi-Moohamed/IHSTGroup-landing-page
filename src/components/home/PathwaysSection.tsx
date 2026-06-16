"use client";

import { usePathwaysScroll } from "@/hooks/usePathwaysScroll";
import { SECTIONS } from "@/constants/content";
import { PathwaysNavigation } from "./pathways/PathwaysNavigation";
import { CylinderScene } from "./pathways/CylinderScene";

export function PathwaysSection() {
  const {
    sectionRef,
    sectionHeight,
    cylinderRotation,
    activeCard,
    hoveredCard,
    setHoveredCard,
    scrollToCard,
  } = usePathwaysScroll(SECTIONS.length);

  return (
    <section
      ref={sectionRef}
      className="relative px-4 sm:px-10 lg:px-14"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-dvh overflow-hidden bg-gradient-to-b from-slate-950 via-[#0c1a30] to-slate-950">
        <div className="mx-auto flex h-full max-w-7xl">
          <div className="hidden w-72 shrink-0 md:flex md:flex-col">
            <PathwaysNavigation
              sections={SECTIONS}
              activeCard={activeCard}
              totalCards={SECTIONS.length}
              onHover={setHoveredCard}
              onClick={scrollToCard}
            />
          </div>

          <div className="relative flex min-w-0 flex-1 items-center justify-center">
            <CylinderScene
              cylinderRotation={cylinderRotation}
              activeCard={activeCard}
              hoveredCard={hoveredCard}
            />
          </div>
        </div>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center md:hidden">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 backdrop-blur">
            <span className="text-[10px] uppercase tracking-wider text-rosewood/70">
              {SECTIONS[activeCard]?.id}
            </span>
            <span className="text-xs text-slate-500">
              {String(activeCard + 1).padStart(2, "0")} /{" "}
              {String(SECTIONS.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
