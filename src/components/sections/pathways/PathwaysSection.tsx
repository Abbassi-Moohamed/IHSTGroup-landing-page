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
    <section ref={sectionRef} className="relative" style={{ height: sectionHeight }}>
      <div className="sticky top-0 h-dvh overflow-hidden">
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
    </section>
  );
}
