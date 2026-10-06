"use client";

import Link from "next/link";
import { useState } from "react";
import { Zzz } from "@/components/chrome";
import { plan } from "@/lib/wines";

type Choice = { id: string; label: string; hint?: string };

const styles: Choice[] = [
  { id: "mixed", label: "Bit of everything", hint: "Our favourite. Reds, whites, orange, whatever we're excited about." },
  { id: "red", label: "Mostly reds", hint: "Light and juicy through to big and cosy." },
  { id: "white", label: "Whites & orange", hint: "Crisp, zippy, skin-contact, the fun stuff." },
];

const quiz: { q: string; options: string[] }[] = [
  { q: "Your usual coffee order?", options: ["Long black", "Flat white", "Iced something", "I'm a tea person"] },
  { q: "Pick a snack", options: ["Salt & vinegar chips", "Dark chocolate", "Cheese board", "A ripe peach"] },
  { q: "How adventurous are we?", options: ["Keep it easy", "Bit of both", "Get weird with it"] },
];

const deliveryOptions: Choice[] = [
  { id: "delivery", label: "Deliver it", hint: "Free for founding members. Later on, a small delivery fee." },
  { id: "pickup", label: "I'll pick it up", hint: `Always free. ${plan.pickup}.` },
];

const steps = ["Your wine", "Your taste", "Getting it", "Your details", "All good?"];

function Option({ selected, onClick, label, hint }: { selected: boolean; onClick: () => void; label: string; hint?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group flex w-full items-start justify-between gap-4 rounded-2xl border-2 p-5 text-left transition ${
        selected ? "border-green bg-green text-cream" : "border-green/15 bg-paper hover:border-green/50"
      }`}
    >
      <span>
        <span className="display block text-3xl">{label}</span>
        {hint && <span className={`mt-1 block text-sm ${selected ? "text-cream/75" : "text-ink/60"}`}>{hint}</span>}
      </span>
      <span
        className={`mt-1 grid size-6 shrink-0 place-items-center rounded-full border-2 ${
          selected ? "border-yellow bg-yellow text-green" : "border-green/25"
        }`}
        aria-hidden
      >
        {selected && "✓"}
      </span>
    </button>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink/70">{label}</span>
      <input
        {...props}
        className="mt-1.5 w-full rounded-xl border-2 border-green/15 bg-paper px-4 py-3 text-lg outline-none transition focus:border-green"
      />
    </label>
  );
}

export function JoinFlow() {
  const [step, setStep] = useState(0);
  const [style, setStyle] = useState("mixed");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [delivery, setDelivery] = useState("delivery");
  const [details, setDetails] = useState({ name: "", email: "", address: "", adult: false });
  const [done, setDone] = useState(false);

  const detailsValid =
    details.name.trim() && /\S+@\S+\.\S+/.test(details.email) && details.adult && (delivery === "pickup" || details.address.trim());
  const canContinue = step !== 3 || Boolean(detailsValid);
  const go = (n: number) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (done) {
    return (
      <div className="grain grid min-h-[calc(100dvh-4rem)] place-items-center bg-green px-5 text-center text-cream">
        <div className="relative z-10 max-w-xl animate-rise">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow/80">
            Welcome to the club <Zzz />
          </p>
          <h1 className="display mt-5 text-[clamp(5rem,15vw,9rem)] text-yellow">You&rsquo;re in.</h1>
          <p className="mt-6 text-lg leading-relaxed text-cream/80">
            Thanks {details.name.split(" ")[0] || "legend"}. Your first box ships with {plan.month}&rsquo;s picks.
            We&rsquo;ll email you when it&rsquo;s on its way.
          </p>
          <p className="mt-4 text-sm text-cream/50">(Demo only. No payment was taken.)</p>
          <Link href="/" className="mt-10 inline-block rounded-full bg-yellow px-7 py-4 text-lg font-bold text-green">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const styleLabel = styles.find((s) => s.id === style)?.label;
  const answered = Object.keys(answers).length;

  return (
    <div className="grid min-h-[calc(100dvh-4rem)] lg:grid-cols-[1fr_1.3fr]">
      {/* Left: where you are */}
      <aside className="grain bg-green px-5 py-10 text-cream sm:px-8 lg:py-16 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-12">
        <div className="relative z-10 flex h-full flex-col">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow/80">
            Step {step + 1} of {steps.length}
          </p>
          <h1 key={step} className="display animate-rise mt-4 text-[clamp(4rem,9vw,7.5rem)] text-yellow">
            {steps[step]}
          </h1>
          <ol className="mt-10 hidden gap-3 lg:grid">
            {steps.map((s, i) => (
              <li key={s} className={`flex items-center gap-3 text-sm font-semibold ${i <= step ? "text-cream" : "text-cream/35"}`}>
                <span className={`size-2.5 rounded-full ${i < step ? "bg-yellow" : i === step ? "bg-cream" : "bg-cream/25"}`} />
                {s}
              </li>
            ))}
          </ol>
          <div className="mt-8 h-1.5 overflow-hidden rounded-full bg-cream/15 lg:hidden">
            <div className="h-full bg-yellow transition-all duration-500" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
          </div>
          <div className="mt-auto hidden rounded-2xl bg-green-deep/60 p-6 lg:block">
            <p className="display text-5xl text-yellow">${plan.price}<span className="text-2xl">/mo</span></p>
            <p className="mt-2 text-sm text-cream/70">{plan.bottles} bottles · Skip or cancel any time</p>
          </div>
        </div>
      </aside>

      {/* Right: the question */}
      <section className="px-5 py-10 sm:px-8 lg:px-16 lg:py-16">
        <div key={step} className="animate-rise mx-auto max-w-xl">
          {step === 0 && (
            <>
              <p className="text-lg text-ink/70">What would you like in your box? You can change this whenever.</p>
              <div className="mt-8 grid gap-3">
                {styles.map((s) => (
                  <Option key={s.id} selected={style === s.id} onClick={() => setStyle(s.id)} label={s.label} hint={s.hint} />
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <p className="text-lg text-ink/70">
                Three quick ones to give us a head start. Totally optional, we&rsquo;ll learn what you like
                as you go either way.
              </p>
              <div className="mt-8 space-y-10">
                {quiz.map((item, qi) => (
                  <fieldset key={item.q}>
                    <legend className="display text-3xl text-green">{item.q}</legend>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.options.map((o) => {
                        const on = answers[qi] === o;
                        return (
                          <button
                            key={o}
                            type="button"
                            aria-pressed={on}
                            onClick={() => setAnswers((a) => ({ ...a, [qi]: o }))}
                            className={`rounded-full border-2 px-4 py-2 font-medium transition ${
                              on ? "border-green bg-green text-cream" : "border-green/15 bg-paper hover:border-green/50"
                            }`}
                          >
                            {o}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-lg text-ink/70">How should your box get to you each month?</p>
              <div className="mt-8 grid gap-3">
                {deliveryOptions.map((d) => (
                  <Option key={d.id} selected={delivery === d.id} onClick={() => setDelivery(d.id)} label={d.label} hint={d.hint} />
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); if (detailsValid) go(4); }}>
              <p className="text-lg text-ink/70">Nearly there. Who are we sending wine to?</p>
              <Field label="Your name" autoComplete="name" value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })} />
              <Field label="Email" type="email" autoComplete="email" value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} />
              {delivery === "delivery" && (
                <Field label="Delivery address" autoComplete="street-address" value={details.address} onChange={(e) => setDetails({ ...details, address: e.target.value })} />
              )}
              <label className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  checked={details.adult}
                  onChange={(e) => setDetails({ ...details, adult: e.target.checked })}
                  className="size-5 accent-green"
                />
                <span className="font-medium">I&rsquo;m 18 or older</span>
              </label>
              <button type="submit" hidden />
            </form>
          )}

          {step === 4 && (
            <div className="docket bg-paper px-7 py-10 shadow-xl">
              <h2 className="display text-4xl text-green">Your box</h2>
              <dl className="mt-6 divide-y-2 divide-dashed divide-ink/10">
                {[
                  ["Wine", styleLabel],
                  ["Taste profile", answered ? `${answered} of ${quiz.length} answered` : "We'll learn as we go"],
                  ["Getting it", delivery === "delivery" ? "Delivered, free for now" : "Pick up at Sleepys, free"],
                  delivery === "delivery" ? ["Sending to", details.address] : ["Collected by", details.name],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 py-3">
                    <dt className="text-ink/60">{k}</dt>
                    <dd className="text-right font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex items-end justify-between border-t-2 border-green pt-5">
                <span className="font-semibold">Monthly</span>
                <span className="display text-6xl text-green">${plan.price}</span>
              </div>
              <p className="mt-3 text-sm text-ink/55">Billed monthly. Skip or cancel any time from your account.</p>
            </div>
          )}

          <div className="mt-10 flex items-center justify-between gap-4">
            {step > 0 ? (
              <button type="button" onClick={() => go(step - 1)} className="px-2 py-3 font-semibold text-green underline-offset-4 hover:underline">
                ← Back
              </button>
            ) : (
              <Link href="/" className="px-2 py-3 font-semibold text-green underline-offset-4 hover:underline">
                ← Home
              </Link>
            )}
            <div className="flex items-center gap-4">
              {step === 1 && answered === 0 && (
                <button type="button" onClick={() => go(2)} className="px-2 py-3 font-semibold text-ink/60 hover:text-ink">
                  Skip for now
                </button>
              )}
              <button
                type="button"
                disabled={!canContinue}
                onClick={() => (step === 4 ? setDone(true) : go(step + 1))}
                className="rounded-full bg-green px-7 py-4 text-lg font-bold text-yellow transition enabled:hover:-translate-y-0.5 disabled:opacity-35"
              >
                {step === 4 ? "Continue to payment" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
