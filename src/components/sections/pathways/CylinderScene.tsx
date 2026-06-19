"use client";

import { useMemo, useEffect, useRef, useState } from "react";
import { motion, animate, useMotionValue, type MotionValue } from "framer-motion";
import { SECTIONS } from "@/constants/content";
import type { Section } from "@/types";
import { CylinderCard } from "./CylinderCard";
import { TitleCard } from "./TitleCard";
import { BottomNavBar } from "./BottomNavBar";

interface CylinderSceneProps {
  cylinderRotation: MotionValue<number>;
  activeCard: number;
  totalCards: number;
  hoveredCard: number | null;
  sections: Section[];
  onHover: (index: number | null) => void;
  onClick: (index: number) => void;
}

const TOTAL = SECTIONS.length;
const CARD_SPACING = 50;

export function CylinderScene({
  cylinderRotation,
  activeCard,
  totalCards,
  hoveredCard,
  sections,
  onHover,
  onClick,
}: CylinderSceneProps) {
  const effectiveRotation = useMotionValue(0);
  const isAnimating = useRef(false);

  const [dimensions, setDimensions] = useState({ cardWidth: 520, radius: 300, cardHeight: 220 });

  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setDimensions({ cardWidth: 300, radius: 195, cardHeight: 165 });
      } else if (w < 1024) {
        setDimensions({ cardWidth: 410, radius: 255, cardHeight: 195 });
      } else {
        setDimensions({ cardWidth: 520, radius: 300, cardHeight: 220 });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const unsubscribe = cylinderRotation.on("change", (v) => {
      if (!isAnimating.current) {
        effectiveRotation.set(v);
      }
    });
    return unsubscribe;
  }, [cylinderRotation, effectiveRotation]);

  useEffect(() => {
    if (hoveredCard === null) return;

    isAnimating.current = true;
    const target = hoveredCard * CARD_SPACING;
    const controls = animate(effectiveRotation, target, {
      type: "spring",
      stiffness: 80,
      damping: 25,
    });

    return () => {
      controls.stop();
      isAnimating.current = false;
      const scrollAngle = cylinderRotation.get();
      animate(effectiveRotation, scrollAngle, {
        type: "spring",
        stiffness: 100,
        damping: 30,
      });
    };
  }, [hoveredCard, cylinderRotation, effectiveRotation]);

  const cards = useMemo(
    () =>
      SECTIONS.map((section, index) => (
        <CylinderCard
          key={section.id}
          section={section}
          index={index}
          total={TOTAL}
          radius={dimensions.radius}
          cardWidth={dimensions.cardWidth}
          cardHeight={dimensions.cardHeight}
          isActive={activeCard === index}
        />
      )),
    [activeCard, dimensions],
  );

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {/* Title Card overlay — top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center pt-24 sm:pt-28">
        <div className="pointer-events-auto">
          <TitleCard
            activeCard={activeCard}
            totalCards={totalCards}
            section={sections[activeCard]}
          />
        </div>
      </div>

      {/* Carousel */}
      <div
        className="relative flex items-center justify-center"
        style={{
          perspective: "1200px",
          width: "100%",
          height: "100%",
        }}
      >
        <motion.div
          className="relative"
          style={{
            transformStyle: "preserve-3d",
            rotateX: effectiveRotation,
            width: 0,
            height: 0,
          }}
        >
          {cards}
        </motion.div>
      </div>

      {/* Bottom Nav Bar overlay — bottom, scrolls away with the section */}
      <div className={`pointer-events-none absolute inset-x-0 z-40 flex justify-center border-t border-white/10 bg-slate-950/60 backdrop-blur-sm transition-all duration-700 ${activeCard === totalCards - 1 ? "bottom-36" : "bottom-12"}`}>
        <div className="pointer-events-auto">
          <BottomNavBar
            sections={sections}
            activeCard={activeCard}
            onHover={onHover}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
}
