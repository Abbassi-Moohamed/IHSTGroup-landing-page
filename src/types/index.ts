export interface NavItem {
  label: string;
  target: string;
}

export interface Section {
  id: string;
  tag?: string;
  title: string;
  description: string;
  highlights: string[];
}

export interface FloatCardId {
  id: "one" | "two" | "three";
}

export interface FloatCard extends FloatCardId {
  tag: string;
  title: string;
  baseRotate: number;
  positionClass: string;
  idleOffset: {
    x: number[];
    y: number[];
    rotateZ: number[];
  };
}

export interface CardPosition {
  x: number;
  y: number;
}

export interface CardProps {
  variant: "stat" | "benefit" | "feature";
  className?: string;
  children?: React.ReactNode;
}

export interface BadgeProps {
  variant: "primary";
  className?: string;
  children?: React.ReactNode;
}

export type ThemeMode = "dark" | "light";

export interface HeaderProps {
  activeSection: string;
  mobileMenuOpen: boolean;
  onMenuToggle: () => void;
  onSectionChange: (section: string) => void;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export interface NavigationProps {
  activeSection: string;
  isMobile?: boolean;
  onNavigate: (section: string) => void;
}
