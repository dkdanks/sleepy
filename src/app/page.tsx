import Image from "next/image";
import Link from "next/link";
import { Footer, Header, Marquee, Sticker, Zzz } from "@/components/chrome";
import { WineTicket } from "@/components/wine-ticket";
import { plan, wines } from "@/lib/wines";

const steps = [
  {
    title: "We pick",
    body: "Every month we taste a ridiculous amount of wine (someone has to) and pick our three favourites from anywhere in the world.",
  },
  {
    title: "We write it up",
    body: "Each bottle comes with a little profile from us. Where it's from, what it tastes like, what to cook with it. Plain English, no wine-speak.",
  },
  {
    title: "You drink & learn",
    body: "Tell us what you're into up front, or don't. Rate what you loved and we'll get better at picking for you each month.",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="grain overflow-hidden bg-green text-cream">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-10 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:pb-28 lg:pt-16">
            <div className="relative z-10">
              <p className="animate-rise text-sm font-semibold uppercase tracking-[0.25em] text-yellow/80">
                The Sleepys Wine Club <Zzz />
              </p>
              <h1 className="display animate-rise mt-5 text-[clamp(4rem,7vw,7.25rem)] text-yellow [animation-delay:80ms]">
                Wine we love,
                <br />
                at your door.
              </h1>
              <p className="animate-rise mt-8 max-w-lg text-lg leading-relaxed text-cream/85 [animation-delay:160ms]">
                Every month the two of us behind the bar at Sleepys pick {plan.bottles} bottles from
                somewhere in the world. Affordable, a bit unusual, always delicious, each with a note
                from us on why we love it.
              </p>
              <div className="animate-rise mt-10 flex flex-wrap items-center gap-4 [animation-delay:240ms]">
                <Link
                  href="/join"
                  className="rounded-full bg-yellow px-7 py-4 text-lg font-bold text-green shadow-[0_6px_0_#0f3328] transition hover:-translate-y-0.5 hover:shadow-[0_8px_0_#0f3328] active:translate-y-1 active:shadow-none"
                >
                  Join for ${plan.price}/month
                </Link>
                <Link href="#this-month" className="px-2 py-4 font-semibold text-cream underline-offset-4 hover:underline">
                  See {plan.month}&rsquo;s box
                </Link>
              </div>
              <p className="animate-rise mt-6 text-sm text-cream/60 [animation-delay:320ms]">
                {plan.bottles} bottles · Free delivery to start · Skip or cancel any time
              </p>
            </div>

            <div className="animate-rise relative mx-auto w-full max-w-md [animation-delay:200ms] lg:max-w-none">
              <div className="relative aspect-[3/4] rotate-[2.5deg] overflow-hidden rounded-t-[999px] rounded-b-3xl border-[10px] border-cream shadow-2xl">
                <Image
                  src="/img/bottle.jpg"
                  alt="A bottle of natural wine being opened at the Sleepys bar"
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-cover"
                />
              </div>
              <Sticker
                text="Free delivery · Founding members · "
                center={"Free\ndelivery"}
                className="absolute -top-4 -right-2 rotate-12 whitespace-pre-line sm:-right-8 lg:top-10"
              />
            </div>
          </div>
        </section>

        <Marquee
          items={["Picked by hand", "From all over the world", "No wine snobs", "Notes from us on every bottle", "Under $30 a bottle"]}
          className="display bg-yellow py-4 text-3xl text-green sm:text-4xl"
        />

        {/* How it works */}
        <section id="how" className="mx-auto max-w-7xl scroll-mt-16 px-5 py-24 sm:px-8 lg:py-32">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display text-7xl text-green sm:text-8xl">How it works</h2>
            <p className="max-w-sm text-lg text-ink/70">
              No quizzes you need a sommelier for. No 12-bottle commitments. Just good wine, once a month.
            </p>
          </div>
          <ol className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-green/15 sm:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="bg-cream p-8 lg:p-10">
                <span className="display block text-[7rem] text-tomato">{i + 1}</span>
                <h3 className="display mt-4 text-4xl text-green">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/75">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* This month's box */}
        <section id="this-month" className="grain scroll-mt-16 bg-green py-24 text-cream lg:py-32">
          <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow/80">
                  In the box this month
                </p>
                <h2 className="display mt-4 text-7xl text-yellow sm:text-8xl">
                  {plan.month}&rsquo;s picks
                </h2>
              </div>
              <p className="max-w-sm text-lg text-cream/75">
                Italy, France and Spain this time. A pink one, a chillable red and a cosy one for the
                cold nights still hanging around.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {wines.map((w, i) => (
                <WineTicket key={w.slug} wine={w} index={i} total={wines.length} />
              ))}
            </div>
          </div>
        </section>

        {/* Who picks */}
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:py-32">
          <div className="relative aspect-[3/2] -rotate-1 overflow-hidden rounded-3xl shadow-xl">
            <Image
              src="/img/crew.jpg"
              alt="The Sleepys crew mucking around in the kitchen"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="display text-7xl text-green sm:text-8xl">Who&rsquo;s picking?</h2>
            <p className="mt-6 font-serif text-3xl italic leading-snug text-ink">
              &ldquo;We&rsquo;re not here to tell you what you should like. We just want to share the
              stuff we can&rsquo;t stop talking about.&rdquo;
            </p>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/75">
              We&rsquo;re two mates who run the wine at Sleepys in Carlton North. We pour this stuff every
              night and we&rsquo;re always finding small producers making great wine that doesn&rsquo;t
              cost a fortune. Now we get to send it to you.
            </p>
          </div>
        </section>

        {/* Price + delivery */}
        <section className="px-5 pb-24 sm:px-8 lg:pb-32">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-yellow text-green shadow-xl">
            <div className="grid lg:grid-cols-[1.1fr_1fr]">
              <div className="p-8 sm:p-12">
                <p className="text-sm font-bold uppercase tracking-[0.25em]">One box. That&rsquo;s it.</p>
                <p className="display mt-4 text-[8rem] sm:text-[10rem]">
                  ${plan.price}
                  <span className="ml-2 align-top text-4xl">/mo</span>
                </p>
                <ul className="mt-6 space-y-2 text-lg font-medium">
                  <li>{plan.bottles} bottles we love, picked fresh each month</li>
                  <li>A profile card for every wine</li>
                  <li>Skip a month or cancel whenever</li>
                </ul>
                <Link
                  href="/join"
                  className="mt-10 inline-block rounded-full bg-green px-7 py-4 text-lg font-bold text-yellow transition hover:-translate-y-0.5"
                >
                  Join the club
                </Link>
              </div>
              <div className="grid content-center gap-4 bg-green-deep p-8 text-cream sm:p-12">
                <div className="rounded-2xl border border-cream/15 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="display text-3xl text-yellow">Delivered</h3>
                    <span className="whitespace-nowrap rounded-full bg-tomato px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                      Free for now
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-cream/75">
                    Free delivery for our founding members. Down the track there&rsquo;ll be a small
                    delivery fee.
                  </p>
                </div>
                <div className="rounded-2xl border border-cream/15 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="display text-3xl text-yellow">Pick up</h3>
                    <span className="whitespace-nowrap rounded-full bg-cream px-3 py-1 text-xs font-bold uppercase tracking-wider text-green">
                      Always free
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-cream/75">
                    Grab your box from Sleepys, {plan.pickup}. Stay for a glass while you&rsquo;re here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
