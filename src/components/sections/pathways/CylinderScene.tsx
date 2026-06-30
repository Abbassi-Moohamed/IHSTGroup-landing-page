"use client";

import { useMemo, useEffect, useRef, useState } from "react";
import { motion, animate, useMotionValue, type MotionValue } from "framer-motion";
import type { Section } from "@/types";
import { CylinderCard } from "./CylinderCard";
import { TitleSidebar } from "./TitleSidebar";
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

  const [dimensions, setDimensions] = useState({
    cardWidth: 520,
    radius: 300,
    cardHeight: 220,
    perspective: 1200,
  });

  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setDimensions({ cardWidth: 280, radius: 180, cardHeight: 160, perspective: 800 });
      } else if (w < 1024) {
        setDimensions({ cardWidth: 380, radius: 240, cardHeight: 190, perspective: 1000 });
      } else {
        setDimensions({ cardWidth: 520, radius: 300, cardHeight: 220, perspective: 1200 });
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
    if (hoveredCard !== null) {
      isAnimating.current = true;
      const target = hoveredCard * CARD_SPACING;
      const controls = animate(effectiveRotation, target, {
        type: "spring",
        stiffness: 100,
        damping: 28,
      });

      const timeout = setTimeout(() => {
        isAnimating.current = false;
        const scrollAngle = cylinderRotation.get();
        animate(effectiveRotation, scrollAngle, {
          type: "spring",
          stiffness: 120,
          damping: 35,
          restDelta: 0.5,
        });
      }, 1200);

      return () => {
        controls.stop();
        clearTimeout(timeout);
        isAnimating.current = false;
        const scrollAngle = cylinderRotation.get();
        animate(effectiveRotation, scrollAngle, {
          type: "spring",
          stiffness: 120,
          damping: 35,
          restDelta: 0.5,
        });
      };
    } else {
      isAnimating.current = false;
    }
  }, [hoveredCard, cylinderRotation, effectiveRotation]);

  const ambientOpacity = hoveredCard !== null ? 0.6 : 0.3;

  const cards = useMemo(
    () =>
      sections.map((section, index) => (
        <CylinderCard
          key={section.id}
          section={section}
          index={index}
          total={totalCards}
          radius={dimensions.radius}
          cardWidth={dimensions.cardWidth}
          cardHeight={dimensions.cardHeight}
          isActive={activeCard === index}
          onHover={onHover}
        />
      )),
    [activeCard, dimensions, sections, totalCards, onHover],
  );

  return (
    <div className="flex h-full w-full">
      {/* Left Sidebar */}
      <div className="hidden w-[34%] shrink-0 md:block">
        <TitleSidebar
          activeCard={activeCard}
          totalCards={totalCards}
          hoveredCard={hoveredCard}
          sections={sections}
        />
      </div>

      {/* Right area */}
      <div className="relative flex w-full flex-col md:w-[66%]">
        {/* Carousel */}
        <div
          className="relative flex flex-1 items-center justify-center overflow-hidden"
          style={{ perspective: `${dimensions.perspective}px` }}
        >
          {/* Ambient glow behind active card */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{
              width: dimensions.cardWidth * 1.4,
              height: dimensions.cardHeight * 1.4,
              background: `radial-gradient(circle, rgba(180,71,63,${ambientOpacity * 0.15}) 0%, rgba(139,39,32,${ambientOpacity * 0.05}) 40%, transparent 70%)`,
            }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

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

        {/* Bottom Nav */}
        <div className="border-t border-white/[0.04] bg-slate-950/40 backdrop-blur-lg">
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
