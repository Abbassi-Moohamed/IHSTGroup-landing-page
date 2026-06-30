import "./globals.css";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#081427",
};

export const metadata: Metadata = {
  title: "IHSTGroup | Premium Education Collective",
  description:
    "IHSTGroup delivers Cambridge tutoring, clubs, career education, IB support, languages, and modern systems learning with a premium experience.",
  openGraph: {
    title: "IHSTGroup | Premium Education Collective",
    description:
      "IHSTGroup delivers Cambridge tutoring, clubs, career education, IB support, languages, and modern systems learning with a premium experience.",
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
