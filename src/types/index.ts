import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface NavItem {
  label: string;
  target: string;
}

export interface Section {
  id: string;
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

export type CardProps = {
  variant: "stat" | "benefit" | "feature";
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export type BadgeProps = {
  variant: "primary";
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

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

export type FooterProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
>;
