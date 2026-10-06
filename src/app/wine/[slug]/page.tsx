import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header, Zzz } from "@/components/chrome";
import { getWine, plan, wines, type Scale } from "@/lib/wines";

export function generateStaticParams() {
  return wines.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata(props: PageProps<"/wine/[slug]">): Promise<Metadata> {
  const wine = getWine((await props.params).slug);
  return { title: wine ? `${wine.name} · Sleepys Wine Club` : "Sleepys Wine Club" };
}

function ScaleRow({ scale, row }: { scale: Scale; row: number }) {
  return (
    <div className="grid grid-cols-[4.5rem_1fr_4.5rem] items-center gap-3 text-sm">
      <span>{scale.left}</span>
      <div className="flex justify-between" role="img" aria-label={`${scale.value} out of 5, ${scale.left} to ${scale.right}`}>
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className="relative size-3 rounded-full border-[1.5px] border-green">
            {n === scale.value && (
              <span className="pop absolute -inset-px rounded-full bg-green" style={{ animationDelay: `${700 + row * 180}ms` }} />
            )}
          </span>
        ))}
      </div>
      <span className="text-right">{scale.right}</span>
    </div>
  );
}

export default async function WinePage(props: PageProps<"/wine/[slug]">) {
  const { slug } = await props.params;
  const wine = getWine(slug);
  if (!wine) notFound();

  const i = wines.indexOf(wine);
  const next = wines[(i + 1) % wines.length];

  return (
    <>
      <Header />
      <main className="grain bg-green px-4 py-14 sm:py-20">
        <article className="docket animate-rise relative z-10 mx-auto max-w-3xl bg-paper shadow-2xl">
          <div className="h-3" style={{ background: wine.colour }} />
          <div className="px-6 py-12 sm:px-14 sm:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-green/60">
              {plan.month} · {i + 1} of {wines.length} · {wine.style}
            </p>
            <h1 className="display mt-5 text-[clamp(4.5rem,14vw,9rem)] text-green">{wine.name}</h1>
            <p className="mt-3 text-lg text-ink/70">
              {wine.producer}. {wine.grape} from {wine.region}, {wine.country}, {wine.vintage}.
            </p>

            <div className="mt-10 space-y-6 font-serif text-[1.45rem] leading-snug text-ink sm:text-[1.7rem]">
              {wine.note.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
              <p className="text-green">
                The Sleepys wine guys <Zzz />
              </p>
            </div>

            <div className="mt-12 grid gap-10 border-t-2 border-dashed border-ink/15 pt-10 sm:grid-cols-2">
              <div className="space-y-3 text-green">
                {wine.scales.map((s, row) => (
                  <ScaleRow key={s.left} scale={s} row={row} />
                ))}
              </div>
              <dl className="space-y-4 text-lg">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.2em] text-ink/50">Tastes like</dt>
                  <dd>{wine.tastesLike.join(", ")}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.2em] text-ink/50">Drink it with</dt>
                  <dd>{wine.drinkWith}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.2em] text-ink/50">Serve it</dt>
                  <dd>{wine.serve}</dd>
                </div>
              </dl>
            </div>
          </div>
        </article>

        <nav className="relative z-10 mx-auto mt-10 flex max-w-3xl flex-wrap justify-between gap-4 text-lg text-cream">
          <Link href="/#list" className="hover:underline">
            ← All of {plan.month}
          </Link>
          <Link href={`/wine/${next.slug}`} className="text-yellow hover:underline">
            Next up: {next.name} →
          </Link>
        </nav>
      </main>
      <Footer />
    </>
  );
}
