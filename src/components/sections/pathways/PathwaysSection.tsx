"use client";

import { useCylinderScroll } from "@/hooks/useCylinderScroll";
import { SECTIONS } from "@/constants/content";
import { SidebarNavigation } from "./SidebarNavigation";
import { CylinderScene } from "./CylinderScene";

export function PathwaysSection() {
  const {
    sectionRef,
    sectionHeight,
    cylinderRotation,
    activeCard,
    hoveredCard,
    setHoveredCard,
    scrollToCard,
  } = useCylinderScroll(SECTIONS.length);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-dvh overflow-hidden bg-gradient-section px-4 sm:px-10 lg:px-14">
        <div className="mx-auto flex h-full max-w-7xl">
          <div className="hidden w-72 shrink-0 md:flex md:flex-col">
            <SidebarNavigation
              sections={SECTIONS}
              activeCard={activeCard}
              totalCards={SECTIONS.length}
              onHover={setHoveredCard}
              onClick={scrollToCard}
            />
          </div>

          <div className="relative flex min-w-0 flex-1 items-center justify-center">
            <div className="pointer-events-none absolute left-1/2 z-10 -translate-x-1/2" style={{ top: "7rem" }}>
              <div className="pointer-events-auto rounded-2xl bg-slate-950/80 px-8 pt-4 text-center pb-6 backdrop-blur-2xl">
                <p className="text-2xl font-bold uppercase tracking-[0.3em] text-rosewood/90 sm:text-3xl">
                  Our pathways
                </p>
                <h2 className="mt-2 text-lg text-white sm:text-xl">
                  {SECTIONS[activeCard]?.title}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {String(activeCard + 1).padStart(2, "0")} /{" "}
                  {String(SECTIONS.length).padStart(2, "0")}
                </p>
                <div className="mx-auto mt-3 h-1 w-56 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-rosewood to-rosewood/60 transition-all duration-500 ease-out"
                    style={{ width: `${((activeCard + 1) / SECTIONS.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

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
