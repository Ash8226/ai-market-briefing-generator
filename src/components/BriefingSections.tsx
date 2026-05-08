import { AlertTriangle, Building2, CheckCircle2, Gauge, ListChecks } from "lucide-react";
import type { BriefingSections as BriefingSectionsType } from "@/lib/types";

type Props = { sections: BriefingSectionsType };

export function BriefingSections({ sections }: Props) {
  return (
    <div className="grid gap-4">
      <section className="rounded-lg border border-line bg-white p-5">
        <div className="mb-3 flex items-center gap-2 text-steel"><Gauge aria-hidden="true" size={19} /><h2 className="text-lg font-semibold text-ink">Market Summary</h2></div>
        <p className="leading-7 text-slate-700">{sections.marketSummary}</p>
      </section>
      <section className="rounded-lg border border-line bg-white p-5">
        <div className="mb-3 flex items-center gap-2 text-steel"><ListChecks aria-hidden="true" size={19} /><h2 className="text-lg font-semibold text-ink">Key Drivers</h2></div>
        <BulletList items={sections.keyDrivers} />
      </section>
      <section className="rounded-lg border border-line bg-white p-5">
        <div className="mb-3 flex items-center gap-2 text-amber"><AlertTriangle aria-hidden="true" size={19} /><h2 className="text-lg font-semibold text-ink">Risks To Watch</h2></div>
        <BulletList items={sections.risksToWatch} />
      </section>
      <section className="rounded-lg border border-line bg-white p-5">
        <div className="mb-3 flex items-center gap-2 text-steel"><Building2 aria-hidden="true" size={19} /><h2 className="text-lg font-semibold text-ink">Business Impact</h2></div>
        <p className="leading-7 text-slate-700">{sections.businessImpact}</p>
      </section>
      <section className="rounded-lg border border-line bg-white p-5">
        <div className="mb-3 flex items-center gap-2 text-pine"><CheckCircle2 aria-hidden="true" size={19} /><h2 className="text-lg font-semibold text-ink">Suggested Action Points</h2></div>
        <BulletList items={sections.suggestedActionPoints} />
      </section>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-7 text-slate-700"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-pine" /><span>{item}</span></li>
      ))}
    </ul>
  );
}
