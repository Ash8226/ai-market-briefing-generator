import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { listBriefings } from "@/lib/briefings";
import type { Briefing } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function SavedBriefingsPage() {
  let briefings: Briefing[] = [];
  let error: string | null = null;
  try {
    briefings = await listBriefings();
  } catch (err) {
    error = err instanceof Error ? err.message : "Could not load saved briefings.";
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div><p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-pine">Archive</p><h1 className="text-3xl font-bold tracking-normal text-ink sm:text-4xl">Saved Briefings</h1></div>
        <Link href="/" className="rounded bg-pine px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800">Generate new</Link>
      </div>
      {error ? <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">{error}</div> : null}
      {!error && briefings.length === 0 ? (
        <div className="rounded-lg border border-line bg-white p-8 text-center"><div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded bg-teal-50 text-pine"><FileText aria-hidden="true" size={24} /></div><h2 className="text-lg font-semibold text-ink">No saved briefings yet</h2><p className="mt-2 text-slate-700">Generate your first market briefing and it will appear here.</p></div>
      ) : null}
      <div className="grid gap-3">
        {briefings.map((briefing) => (
          <Link key={briefing.id} href={`/briefings/${briefing.id}`} className="group rounded-lg border border-line bg-white p-5 transition hover:border-pine hover:shadow-soft">
            <div className="flex items-start justify-between gap-4"><div className="min-w-0"><h2 className="truncate text-lg font-semibold text-ink">{briefing.topic}</h2><p className="mt-2 line-clamp-2 leading-7 text-slate-700">{briefing.sections.marketSummary}</p><p className="mt-3 text-sm text-slate-500">{new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(briefing.created_at))}</p></div><ArrowRight aria-hidden="true" className="mt-1 shrink-0 text-slate-400 transition group-hover:text-pine" size={20} /></div>
          </Link>
        ))}
      </div>
    </main>
  );
}
