import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { BriefingSections } from "@/components/BriefingSections";
import { getBriefing } from "@/lib/briefings";

export const dynamic = "force-dynamic";

type Props = { params: { id: string } };

export default async function BriefingResultPage({ params }: Props) {
  const { id } = params;
  const briefing = await getBriefing(id);
  if (!briefing) notFound();

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-royal"><ArrowLeft aria-hidden="true" size={17} />New briefing</Link>
        <Link href="/saved" className="rounded border border-line bg-white px-3 py-2 text-sm font-medium text-ink hover:border-gold hover:text-navy">Saved briefings</Link>
      </div>
      <header className="mb-6 rounded-lg border border-line bg-white p-5 shadow-soft">
        <div className="mb-3 flex items-center gap-2 text-sm text-slate-600"><CalendarDays aria-hidden="true" size={16} />{new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(briefing.created_at))}</div>
        <h1 className="text-3xl font-bold tracking-normal text-ink sm:text-4xl">{briefing.topic}</h1>
      </header>
      <BriefingSections sections={briefing.sections} />
    </main>
  );
}
