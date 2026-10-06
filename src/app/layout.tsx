import type { Metadata } from "next";
import { Schibsted_Grotesk, Sofia_Sans_Extra_Condensed, Sorts_Mill_Goudy } from "next/font/google";
import "./globals.css";

// Closest free match to the Helvetica Condensed in the Sleepys wordmark
const display = Sofia_Sans_Extra_Condensed({
  variable: "--font-display-face",
  subsets: ["latin"],
});

const sans = Schibsted_Grotesk({
  variable: "--font-sans-face",
  subsets: ["latin"],
});

// Old-style serif for the handwritten-letter voice of the wine notes
const serif = Sorts_Mill_Goudy({
  variable: "--font-serif-face",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Sleepys Wine Club",
  description:
    "Three bottles a month, picked from all over the world by the wine nerds at Sleepys Cafe & Wine Bar, Carlton North.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-AU"
      className={`${display.variable} ${sans.variable} ${serif.variable}`}
    >
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
