"use client";

import { useEffect, useState } from "react";

export function useSectionObserver(initialSection = "hero") {
  const [activeSection, setActiveSection] = useState(initialSection);
  const [revealedSections, setRevealedSections] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);

        if (!visible.length) {
          return;
        }

        visible.sort(
          (a, b) =>
            Math.abs(a.boundingClientRect.top) -
            Math.abs(b.boundingClientRect.top),
        );

        const target = visible[0].target as HTMLElement;
        const activeId = target.dataset.id || initialSection;

        setActiveSection(activeId);
        setRevealedSections((current) => ({ ...current, [activeId]: true }));
      },
      {
        root: null,
        rootMargin: "-32% 0px -55% 0px",
        threshold: 0.2,
      },
    );

    const sections = document.querySelectorAll<HTMLElement>("section[data-id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [initialSection]);

  return { activeSection, setActiveSection, revealedSections };
}
