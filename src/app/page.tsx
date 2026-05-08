import Link from "next/link";
import type { ReactNode } from "react";
import { Archive, Clock3, ShieldCheck } from "lucide-react";
import { BriefingForm } from "@/components/BriefingForm";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <section>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-gold">Plain-English market notes</p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-normal text-ink sm:text-5xl">Generate a concise briefing for any market topic.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">Enter an asset, currency pair, sector, company, or market theme. The app creates a structured briefing with drivers, risks, business impact, and practical next steps.</p>
          <div className="mt-7"><Link href="/saved" className="text-sm font-semibold text-navy hover:text-royal">View saved briefings</Link></div>
        </section>
        <BriefingForm />
      </div>
      <section className="mt-12 grid gap-4 md:grid-cols-3">
        <Feature icon={<Clock3 aria-hidden="true" size={20} />} title="Fast readout" text="Get a tight, business-friendly summary without digging through raw market commentary." />
        <Feature icon={<ShieldCheck aria-hidden="true" size={20} />} title="Decision support" text="Frame the topic through drivers, risks, impact, and action points." />
        <Feature icon={<Archive aria-hidden="true" size={20} />} title="Saved history" text="Store generated briefings in Supabase so the team can revisit recent views." />
      </section>
    </main>
  );
}

function Feature({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <article className="rounded-lg border border-line bg-white p-5">
      <div className="mb-4 grid h-10 w-10 place-items-center rounded bg-gold/15 text-navy">{icon}</div>
      <h2 className="text-base font-semibold text-ink">{title}</h2>
      <p className="mt-2 leading-7 text-slate-700">{text}</p>
    </article>
  );
}
