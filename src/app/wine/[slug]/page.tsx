import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header } from "@/components/chrome";
import { ScaleRow } from "@/components/wine-ticket";
import { getWine, plan, wines } from "@/lib/wines";

export function generateStaticParams() {
  return wines.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata(props: PageProps<"/wine/[slug]">): Promise<Metadata> {
  const wine = getWine((await props.params).slug);
  return { title: wine ? `${wine.name} · Sleepys Wine Club` : "Sleepys Wine Club" };
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
      <main>
        <section className="grain" style={{ background: wine.colour, color: wine.ink }}>
          <div className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-8 lg:pb-24">
            <Link href="/#this-month" className="text-sm font-semibold underline-offset-4 hover:underline">
              ← {plan.month}&rsquo;s box
            </Link>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-[0.2em] opacity-80">
              <span>
                No. {String(i + 1).padStart(2, "0")} / {String(wines.length).padStart(2, "0")}
              </span>
              <span>{wine.style}</span>
              <span>{wine.vintage}</span>
            </div>
            <h1 className="display animate-rise mt-4 text-[clamp(5rem,16vw,13rem)]">{wine.name}</h1>
            <p className="mt-4 text-lg font-medium sm:text-xl">
              {wine.producer} · {wine.grape} · {wine.region}, {wine.country}
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-16 px-5 py-20 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:py-28">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-tomato">Why we picked it</p>
            <p className="mt-6 font-serif text-4xl italic leading-tight text-green sm:text-5xl">
              &ldquo;{wine.hook}&rdquo;
            </p>
            <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-ink/80">
              {wine.note.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
            <p className="mt-8 text-sm font-semibold text-ink/60">The Sleepys wine guys</p>
          </div>

          <aside className="docket h-fit bg-paper px-7 py-10 text-ink shadow-xl">
            <h2 className="display text-3xl text-green">The short version</h2>
            <div className="mt-6 space-y-3 text-green">
              {wine.scales.map((s) => (
                <ScaleRow key={s.left} scale={s} />
              ))}
            </div>
            <dl className="mt-8 space-y-5 border-t-2 border-dashed border-ink/15 pt-6">
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-ink/50">Tastes like</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {wine.tastesLike.map((t) => (
                    <span key={t} className="rounded-full bg-green px-3 py-1 text-sm font-medium text-cream">
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-ink/50">Drink it with</dt>
                <dd className="mt-1 text-lg">{wine.drinkWith}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-ink/50">How to serve</dt>
                <dd className="mt-1 text-lg">{wine.serve}</dd>
              </div>
            </dl>
          </aside>
        </section>

        <section className="border-t border-green/15">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-5 py-12 sm:px-8">
            <Link href={`/wine/${next.slug}`} className="group">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-ink/50">Next in the box</span>
              <span className="display mt-1 block text-5xl text-green transition group-hover:translate-x-2">
                {next.name} →
              </span>
            </Link>
            <Link href="/join" className="rounded-full bg-green px-7 py-4 text-lg font-bold text-yellow transition hover:-translate-y-0.5">
              Get this box for ${plan.price}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
