"use client";

import { FOOTER_COPYRIGHT, FOOTER_LINKS } from "@/constants/content";
import type { FooterProps } from "@/types";

export function Footer({ className, ...props }: FooterProps) {
  return (
    <footer
      className={`bg-navy px-6 py-10 sm:px-10 lg:px-14 ${className ?? ""}`}
      {...props}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 border-t border-white/10 pt-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>{FOOTER_COPYRIGHT}</p>
        <div className="flex flex-wrap gap-4">
          {FOOTER_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
