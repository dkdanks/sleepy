"use client";

import Link from "next/link";
import { useState } from "react";
import { Zzz } from "@/components/chrome";
import { plan } from "@/lib/wines";

const blank =
  "mx-1 [field-sizing:content] border-b-2 border-dashed border-green bg-transparent px-1 font-sans text-[0.8em] font-semibold text-green outline-none focus:border-solid focus:bg-yellow/40";

function Pick({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  const [flash, setFlash] = useState(false);
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
        setFlash(true);
      }}
      onAnimationEnd={() => setFlash(false)}
      className={`${blank} cursor-pointer ${flash ? "flash" : ""}`}
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

function Blank({ label, size, ...props }: { label: string; size: number } & React.InputHTMLAttributes<HTMLInputElement>) {
  return <input aria-label={label} required {...props} style={{ minWidth: `${size}ch` }} className={`${blank} max-w-full placeholder:font-normal placeholder:text-green/35`} />;
}

export function JoinFlow() {
  const [style, setStyle] = useState("a bit of everything");
  const [taste, setTaste] = useState("am still learning");
  const [getting, setGetting] = useState("pick it up from the bar");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [done, setDone] = useState(false);

  const delivered = getting === "have it delivered";

  if (done) {
    return (
      <div className="grain grid min-h-[calc(100svh-5rem)] place-items-center bg-green px-5 py-20 text-center text-cream">
        <div className="animate-rise relative z-10 max-w-xl">
          <h1 className="display text-[clamp(5rem,15vw,9rem)] text-yellow">
            {"You’re in.".split("").map((c, i) => (
              <span key={i} className="pop inline-block whitespace-pre" style={{ animationDelay: `${i * 45}ms` }}>
                {c}
              </span>
            ))}
          </h1>
          <p className="mt-6 font-serif text-3xl leading-snug">
            Cheers {name.split(" ")[0]}. Your first box is {plan.month}&rsquo;s picks.{" "}
            {delivered ? "We'll let you know when it's on its way." : "We'll let you know when it's ready at the bar."}
          </p>
          <p className="mt-6 text-sm text-cream/50">(Demo only. No payment taken.)</p>
          <Link href="/" className="mt-10 inline-block text-lg text-yellow underline underline-offset-4">
            Back to the start
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grain min-h-[calc(100svh-5rem)] bg-green px-4 py-14 sm:py-20">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (sent) return;
          setSent(true);
          // Let the stamp land before moving on
          setTimeout(() => {
            setDone(true);
            window.scrollTo({ top: 0 });
          }, 1400);
        }}
        className={`docket animate-rise relative z-10 mx-auto max-w-3xl bg-paper px-6 py-14 shadow-2xl sm:px-14 sm:py-20 ${sent ? "shudder" : ""}`}
      >
        {sent && (
          <div
            aria-live="polite"
            className="stamp display pointer-events-none absolute whitespace-nowrap left-1/2 top-1/2 z-20 border-[6px] border-tomato px-8 py-3 text-[clamp(4rem,14vw,8rem)] text-tomato opacity-90 mix-blend-multiply"
          >
            Sent <Zzz />
          </div>
        )}
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-green/60">
          Sleepys Wine Club <Zzz />
        </p>
        <h1 className="sr-only">Sign up to the Sleepys Wine Club</h1>

        <div className="mt-8 font-serif text-[1.45rem] leading-[2.1] text-ink sm:text-[2rem]">
          <p className="text-green">Hi Sleepys,</p>
          <p className="mt-4">
            I&rsquo;d like{" "}
            <Pick label="What wine" value={style} onChange={setStyle} options={["a bit of everything", "mostly reds", "mostly whites & orange"]} />{" "}
            in my box each month.
          </p>
          <p className="mt-4">
            When it comes to wine, I{" "}
            <Pick
              label="Your wine knowledge"
              value={taste}
              onChange={setTaste}
              options={["am still learning", "know what I like", "will try anything"]}
            />
            .
          </p>
          <p className="mt-4">
            I&rsquo;ll{" "}
            <Pick label="Delivery or pickup" value={getting} onChange={setGetting} options={["pick it up from the bar", "have it delivered"]} />
            {delivered ? (
              <>
                {" "}to <Blank label="Delivery address" size={22} autoComplete="street-address" placeholder="your address" value={address} onChange={(e) => setAddress(e.target.value)} />
              </>
            ) : null}
            .
          </p>
          <p className="mt-4">
            My name&rsquo;s <Blank label="Your name" size={12} autoComplete="name" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />{" "}
            and you can email me at{" "}
            <Blank label="Email" size={20} type="email" autoComplete="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            .
          </p>
        </div>

        <label className="mt-10 flex items-center gap-3 text-lg">
          <input type="checkbox" required className="size-5 accent-green" />
          I&rsquo;m over 18
        </label>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t-2 border-dashed border-ink/15 pt-8">
          <div>
            <p className="display text-5xl text-green">${plan.price} a month</p>
            <p className="mt-1 text-ink/60">
              {plan.bottles} bottles. {delivered ? "Free delivery for now." : "Pickup is always free."} Stop whenever.
            </p>
          </div>
          <button type="submit" disabled={sent} className="display bg-green px-10 py-5 text-3xl text-yellow transition hover:-rotate-2 hover:scale-105 active:scale-95">
            Send it
          </button>
        </div>
      </form>
    </div>
  );
}
