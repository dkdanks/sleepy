import type { Metadata } from "next";
import { Archivo, Figtree, Instrument_Serif } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
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
      className={`${archivo.variable} ${figtree.variable} ${instrument.variable}`}
    >
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
