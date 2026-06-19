"use client";

import { useCylinderScroll } from "@/hooks/useCylinderScroll";
import { SECTIONS } from "@/constants/content";
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
      <div className="sticky top-0 h-dvh overflow-hidden bg-transparent px-4 sm:px-10 lg:px-14">
        <div className="mx-auto flex h-full max-w-7xl">
          <div className="relative flex min-w-0 flex-1 items-center justify-center">
            <CylinderScene
              cylinderRotation={cylinderRotation}
              activeCard={activeCard}
              totalCards={SECTIONS.length}
              hoveredCard={hoveredCard}
              sections={SECTIONS}
              onHover={setHoveredCard}
              onClick={scrollToCard}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
