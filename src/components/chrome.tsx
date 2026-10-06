import Image from "next/image";
import Link from "next/link";
import { plan } from "@/lib/wines";

export const Zzz = () => <span aria-hidden>ᶻ 𝗓 𐰁</span>;

// Mirrors the plain-text nav on sleepyscafeandwinebar.com.au
export function Header() {
  return (
    <header className="bg-green text-yellow">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link href="/" aria-label="Sleepys Wine Club home" className="yawn">
          <Image src="/img/logo.png" alt="Sleepys" width={1500} height={321} priority className="h-7 w-auto sm:h-9" />
        </Link>
        <nav className="flex items-center gap-5 text-lg sm:gap-7 sm:text-xl">
          <Link href="/#list" className="hover:underline">
            This month
          </Link>
          <Link href="/join" className="hover:underline">
            Sign up
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row = items.flatMap((t, i) => [
    <span key={`t${i}`}>{t}</span>,
    <span key={`z${i}`} className="opacity-60">
      <Zzz />
    </span>,
  ]);
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`} aria-label={items.join(", ")}>
      <div className="animate-marquee flex w-max gap-6" aria-hidden>
        <div className="flex gap-6">{row}</div>
        <div className="flex gap-6">{row}</div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-green text-cream">
      <Marquee
        items={["Good food", "Good coffee", "Good wine", "Good people"]}
        className="display border-y border-white/10 py-4 text-3xl text-yellow"
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 text-sm leading-relaxed sm:grid-cols-3 sm:px-8">
        <div>
          <p className="display mb-3 text-xl text-yellow">Sleepys by night</p>
          <p>Wednesday to Sunday</p>
          <p>5:30pm to 10pm</p>
        </div>
        <div>
          <p className="display mb-3 text-xl text-yellow">Location</p>
          <p>{plan.pickup}</p>
          <p>Carlton North VIC 3054</p>
        </div>
        <div>
          <p className="display mb-3 text-xl text-yellow">Stay sleepy</p>
          <a className="hover:underline" href="https://www.instagram.com/sleepyscafeandwinebar/">
            @sleepyscafeandwinebar
          </a>
          <p className="mt-3 text-cream/60">18+ only. Liquor licence no. 00000000.</p>
        </div>
      </div>
    </footer>
  );
}
