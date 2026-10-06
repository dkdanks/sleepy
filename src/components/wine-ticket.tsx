import Link from "next/link";
import type { Scale, Wine } from "@/lib/wines";

export function ScaleRow({ scale, ink = "currentColor" }: { scale: Scale; ink?: string }) {
  return (
    <div className="grid grid-cols-[4.5rem_1fr_4.5rem] items-center gap-2 text-[11px] font-semibold uppercase tracking-wider">
      <span className="opacity-70">{scale.left}</span>
      <div className="flex justify-between" role="img" aria-label={`${scale.value} out of 5, ${scale.left} to ${scale.right}`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className="size-3 rounded-full border-[1.5px]"
            style={{ borderColor: ink, background: n === scale.value ? ink : "transparent" }}
          />
        ))}
      </div>
      <span className="text-right opacity-70">{scale.right}</span>
    </div>
  );
}

export function WineTicket({ wine, index, total }: { wine: Wine; index: number; total: number }) {
  return (
    <Link
      href={`/wine/${wine.slug}`}
      className="group block transition duration-300 ease-out hover:-translate-y-2 hover:rotate-[-1deg] focus-visible:-translate-y-2"
    >
      <article className="docket flex h-full flex-col bg-paper text-ink shadow-xl">
        <div className="px-6 pb-6 pt-8" style={{ background: wine.colour, color: wine.ink }}>
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em]">
            <span>
              No. {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span>{wine.style}</span>
          </div>
          <h3 className="display mt-6 text-6xl">{wine.name}</h3>
          <p className="mt-2 text-sm font-medium opacity-80">
            {wine.grape} · {wine.region}, {wine.country}
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-5 border-t-2 border-dashed border-ink/15 px-6 py-6">
          <p className="font-serif text-2xl italic leading-tight">&ldquo;{wine.hook}&rdquo;</p>
          <div className="space-y-2.5 text-green">
            {wine.scales.map((s) => (
              <ScaleRow key={s.left} scale={s} />
            ))}
          </div>
          <p className="mt-auto flex items-center justify-between pt-2 text-sm font-semibold text-green">
            Read our notes
            <span className="transition group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </p>
        </div>
      </article>
    </Link>
  );
}
