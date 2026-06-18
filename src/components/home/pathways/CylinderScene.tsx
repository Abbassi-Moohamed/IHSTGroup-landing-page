"use client";

import { useMemo, useEffect, useRef, useState } from "react";
import { motion, animate, useMotionValue, type MotionValue } from "framer-motion";
import { SECTIONS } from "@/constants/content";
import { CylinderCard } from "./CylinderCard";

interface CylinderSceneProps {
  cylinderRotation: MotionValue<number>;
  activeCard: number;
  hoveredCard: number | null;
}

const TOTAL = SECTIONS.length;
const CARD_SPACING = 50;

export function CylinderScene({
  cylinderRotation,
  activeCard,
  hoveredCard,
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

  // Sync with scroll-driven rotation when not hovering
  useEffect(() => {
    const unsubscribe = cylinderRotation.on("change", (v) => {
      if (!isAnimating.current) {
        effectiveRotation.set(v);
      }
    });
    return unsubscribe;
  }, [cylinderRotation, effectiveRotation]);

  // Animate to hovered card on hover, snap back to scroll on leave
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
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
      <div
        className="relative"
        style={{
          perspective: "1200px",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
    </div>
  );
}
