"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

const exampleTopics = ["USD/SGD", "gold", "crypto liquidity", "Singapore exporters"];

export function BriefingForm() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanTopic = topic.trim();

    if (!cleanTopic) {
      setError("Enter an asset, company, currency pair, sector, or market theme.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/briefings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: cleanTopic })
      });

      const payload = (await response.json()) as { id?: string; error?: string };
      if (!response.ok || !payload.id) {
        throw new Error(payload.error || "Could not create the briefing.");
      }

      router.push(`/briefings/${payload.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setIsLoading(false);
    }
  }

  return (
    <div className="rounded-lg border border-line bg-white p-4 shadow-soft sm:p-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <label htmlFor="topic" className="block text-sm font-semibold text-ink">Market topic</label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input id="topic" value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="Try USD/SGD, gold, DBS, AI semiconductors..." className="min-h-12 flex-1 rounded border border-line bg-white px-4 text-base outline-none transition placeholder:text-slate-400 focus:border-pine focus:ring-4 focus:ring-pine/10" />
          <button type="submit" disabled={isLoading} className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-pine px-5 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-70">
            {isLoading ? <Loader2 aria-hidden="true" className="animate-spin" size={18} /> : <ArrowRight aria-hidden="true" size={18} />}
            Generate
          </button>
        </div>
        {error ? <p className="text-sm font-medium text-red-700">{error}</p> : null}
      </form>

      <div className="mt-5 flex flex-wrap gap-2">
        {exampleTopics.map((example) => (
          <button key={example} type="button" onClick={() => setTopic(example)} className="rounded border border-line bg-mist px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-pine hover:text-pine">
            {example}
          </button>
        ))}
      </div>
    </div>
  );
}
