import Image from "next/image";
import Link from "next/link";
import { plan } from "@/lib/wines";

export const Zzz = () => <span aria-hidden>ᶻ 𝗓 𐰁</span>;

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-green text-yellow">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-end gap-2.5" aria-label="Sleepys Wine Club home">
          <Image
            src="/img/logo.png"
            alt="Sleepys"
            width={1500}
            height={321}
            priority
            className="h-6 w-auto sm:h-7"
          />
          <span className="display pb-px text-[15px] tracking-wide sm:text-base">Wine Club</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-medium sm:gap-2">
          <Link href="/#this-month" className="hidden rounded-full px-3 py-2 hover:underline sm:block">
            This month
          </Link>
          <Link href="/#how" className="hidden rounded-full px-3 py-2 hover:underline sm:block">
            How it works
          </Link>
          <Link
            href="/join"
            className="rounded-full bg-yellow px-4 py-2 font-semibold text-green transition hover:-translate-y-0.5"
          >
            Join the club
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

/* Round sticker with text running around the edge, like a bottle-shop price sticker */
export function Sticker({ text, center, className = "" }: { text: string; center: string; className?: string }) {
  return (
    <div className={`grid size-32 place-items-center rounded-full bg-yellow text-green shadow-[0_8px_30px_rgba(0,0,0,0.25)] sm:size-36 ${className}`}>
      <svg viewBox="0 0 100 100" className="animate-spin-slow absolute inset-0 size-full" aria-hidden>
        <defs>
          <path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-current text-[9.5px] font-bold uppercase tracking-[0.18em]">
          <textPath href="#circle">{text}</textPath>
        </text>
      </svg>
      <span className="display text-center text-2xl leading-[0.85]">{center}</span>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-green-deep text-cream">
      <Marquee
        items={["Good food", "Good coffee", "Good wine", "Good people"]}
        className="display border-b border-white/10 py-4 text-3xl text-yellow"
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-3 sm:px-8">
        <div>
          <Image src="/img/logo.png" alt="Sleepys" width={1500} height={321} className="h-8 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-cream/70">
            Cafe by day, wine bar by night. Now in your fridge once a month, too.
          </p>
        </div>
        <div className="text-sm leading-relaxed">
          <p className="display mb-3 text-xl text-yellow">Pick up & say hi</p>
          <p>{plan.pickup}</p>
          <p>Carlton North VIC 3054</p>
          <p className="mt-3 text-cream/70">Wine bar open Wed to Sun, 5:30pm to 10pm</p>
        </div>
        <div className="text-sm leading-relaxed">
          <p className="display mb-3 text-xl text-yellow">Keep up</p>
          <a className="underline-offset-4 hover:underline" href="https://www.instagram.com/sleepyscafeandwinebar/">
            @sleepyscafeandwinebar
          </a>
          <p className="mt-3 text-cream/70">
            You must be 18+ to join. Liquor licence no. 00000000.
          </p>
        </div>
      </div>
    </footer>
  );
}
