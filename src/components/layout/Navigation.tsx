import { NAV_ITEMS } from "@/constants/content";
import type { NavigationProps } from "@/types";

export function Navigation({
  activeSection,
  isMobile = false,
  onNavigate,
}: NavigationProps) {
  if (isMobile) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.target}
            href={`#${item.target}`}
            onClick={() => onNavigate(item.target)}
            className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm text-slate-200 transition hover:bg-burgundy hover:text-white"
          >
            {item.label}
          </a>
        ))}
      </div>
    );
  }

  return (
    <nav aria-label="Main navigation" className="hidden items-center gap-6 text-sm sm:flex">
      {NAV_ITEMS.map((item) => (
        <a
          key={item.target}
          href={`#${item.target}`}
          onClick={() => onNavigate(item.target)}
          className={`relative transition ${
            activeSection === item.target
              ? "text-white"
              : "text-slate-300 hover:text-white"
          }`}
          aria-current={activeSection === item.target ? "page" : undefined}
        >
          {item.label}
          <span
            className={`absolute left-0 -bottom-2 h-0.5 w-full rounded-full bg-burgundy transition-opacity duration-300 ${
              activeSection === item.target ? "opacity-100" : "opacity-0"
            }`}
          />
        </a>
      ))}
    </nav>
  );
}
