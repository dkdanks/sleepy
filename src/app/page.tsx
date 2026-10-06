import Image from "next/image";
import Link from "next/link";
import { Footer, Header, Marquee, Zzz } from "@/components/chrome";
import { CountUp, Reveal } from "@/components/motion";
import { plan, wines } from "@/lib/wines";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Splash, same move as the Sleepys homepage: photo + big yellow type */}
        <section className="grain relative h-[78svh] min-h-[520px] overflow-hidden bg-ink">
          <Image
            src="/img/bottle.jpg"
            alt="Opening a bottle at the Sleepys bar"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_35%] opacity-80"
          />
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5 text-center text-yellow">
            <h1 className="sr-only">Sleepys Wine Club</h1>
            <div className="relative">
              <Image
                src="/img/logo.png"
                alt=""
                width={1500}
                height={321}
                className="animate-rise w-[min(88vw,900px)] drop-shadow-[0_4px_30px_rgba(0,0,0,0.35)]"
              />
              <div className="snooze display pointer-events-none absolute right-[4%] -top-6 text-yellow" aria-hidden>
                {["z", "z", "Z"].map((z, i) => (
                  <span key={i} style={{ "--i": i, fontSize: `${2 + i * 0.9}rem` } as React.CSSProperties}>
                    {z}
                  </span>
                ))}
              </div>
            </div>
            <p className="display animate-rise mt-3 text-[clamp(2.75rem,8vw,6.5rem)] drop-shadow-[0_4px_30px_rgba(0,0,0,0.35)] [animation-delay:120ms]">
              Wine Club
            </p>
          </div>
        </section>

        <Marquee
          items={["Three bottles a month", "From all over the world", "Picked by us", "No wine snobs"]}
          className="display bg-yellow py-3 text-2xl text-green sm:text-3xl"
        />

        {/* A note from the two of them */}
        <section className="mx-auto grid max-w-6xl items-start gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_340px] lg:py-28">
          <div className="max-w-2xl font-serif text-[1.65rem] leading-snug text-ink sm:text-[2rem]">
            <Reveal as="p" className="text-green">Hey,</Reveal>
            <Reveal as="p" delay={120} className="mt-6">
              We&rsquo;re the two guys pouring wine at Sleepys. We spend a lot of time drinking
              bottles from small producers all over the world, the kind of stuff that tastes great and
              doesn&rsquo;t cost a fortune.
            </Reveal>
            <Reveal as="p" delay={240} className="mt-6">
              So once a month we&rsquo;ll pick our three favourites and send them to you, each with a
              note from us: where it&rsquo;s from, what it tastes like, what to eat with it.
            </Reveal>
            <Reveal as="p" delay={360} className="mt-6">
              You don&rsquo;t need to know anything about wine. Tell us what you like, or just drink
              along and work it out as you go.
            </Reveal>
            <Reveal as="p" delay={480} className="mt-8 text-green">
              See you at the bar,
              <br />
              the Sleepys wine guys <Zzz />
            </Reveal>
          </div>

          {/* Snapshot taped to the page */}
          <Reveal as="figure" variant="drop" delay={300} className="relative mx-auto w-72 rotate-3 bg-paper p-3 pb-12 shadow-xl transition-transform hover:rotate-0 lg:mt-10">
            <span className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-2 bg-yellow/80" aria-hidden />
            <div className="relative aspect-square overflow-hidden">
              <Image src="/img/crew.jpg" alt="The Sleepys crew in the kitchen" fill sizes="288px" className="object-cover" />
            </div>
            <figcaption className="absolute bottom-3 left-0 right-0 text-center font-serif text-lg italic text-ink/70">
              the crew, mid-argument about Gamay
            </figcaption>
          </Reveal>
        </section>

        {/* This month, set like the wine list at the bar */}
        <section id="list" className="grain bg-green text-cream">
          <div className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-yellow pb-5">
              <Reveal variant="wipe">
                <h2 className="display text-6xl text-yellow sm:text-8xl">{plan.month}</h2>
              </Reveal>
              <p className="text-lg text-cream/70">What&rsquo;s in the box this month</p>
            </div>
            <ul>
              {wines.map((w, i) => (
                <Reveal as="li" key={w.slug} delay={i * 140} className="border-b border-cream/15">
                  <Link
                    href={`/wine/${w.slug}`}
                    className="group relative grid gap-x-8 gap-y-2 py-8 transition sm:grid-cols-[1fr_auto] sm:items-end"
                  >
                    {/* A splash of the wine's colour pours across on hover */}
                    <span
                      aria-hidden
                      className="absolute inset-y-0 -left-5 -right-5 origin-left scale-x-0 opacity-25 transition-transform duration-500 ease-out group-hover:scale-x-100 sm:-left-8 sm:-right-8"
                      style={{ background: w.colour }}
                    />
                    <div className="relative">
                      <p className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-cream/55">
                        <span className="size-2.5 rounded-full transition-transform duration-300 group-hover:scale-150" style={{ background: w.colour }} />
                        {w.style} · {w.country}
                      </p>
                      <p className="display mt-2 text-5xl text-cream transition group-hover:text-yellow sm:text-7xl">
                        {w.name}
                      </p>
                      <p className="mt-2 text-lg text-cream/75">
                        {w.grape}, {w.region} {w.vintage}
                      </p>
                    </div>
                    <p className="relative font-serif text-xl italic text-yellow sm:max-w-xs sm:text-right">
                      {w.hook} <span className="not-italic transition group-hover:ml-1">→</span>
                    </p>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* The deal, written like a menu item */}
        <section className="bg-yellow text-green">
          <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-28">
            <Reveal className="flex items-end gap-3 text-left">
              <span className="display text-5xl sm:text-7xl">The box</span>
              <span className="leader mb-3 flex-1 border-b-[3px] border-dotted border-green" aria-hidden />
              <CountUp to={plan.price} className="display text-5xl sm:text-7xl" />
            </Reveal>
            <p className="mt-4 text-left text-lg sm:text-xl">
              {plan.bottles} bottles and our notes on each, every month.
            </p>
            <div className="mt-12 grid gap-6 text-left text-lg sm:grid-cols-2">
              <p>
                <strong className="display block text-3xl">Delivered</strong>
                On us while we&rsquo;re getting started. Later on there&rsquo;ll be a small delivery fee.
              </p>
              <p>
                <strong className="display block text-3xl">Or come grab it</strong>
                Always free from the bar at {plan.pickup}. Stay for a glass.
              </p>
            </div>
            <Link
              href="/join"
              className="display mt-14 inline-block bg-green px-10 py-5 text-3xl text-yellow transition hover:-rotate-2 hover:scale-105 active:scale-95"
            >
              Sign me up
            </Link>
            <p className="mt-4 text-sm">Skip a month or stop whenever. No drama.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
