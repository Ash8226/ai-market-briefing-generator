"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

const topicOptions = [
  "USD/SGD",
  "gold",
  "crypto liquidity",
  "Singapore exporters",
  "DBS",
  "AI semiconductors",
  "oil prices",
  "China demand",
  "ASEAN equities",
  "US rates"
];

export function BriefingForm() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function buildTopicQuery() {
    const manualTopics = topic
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    return Array.from(new Set([...selectedTopics, ...manualTopics])).join(", ");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanTopic = buildTopicQuery();

    if (!cleanTopic) {
      setError("Select one or more topics or type topics manually. Use a comma between topics.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/briefings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
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
        <label htmlFor="topic-select" className="block text-sm font-semibold text-ink">
          Market topic
        </label>

        <div className="grid gap-3">
          <select
            id="topic-select"
            multiple
            value={selectedTopics}
            onChange={(event) => {
              const values = Array.from(event.currentTarget.selectedOptions, (option) => option.value);
              setSelectedTopics(values);
            }}
            className="min-h-36 rounded border border-line bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/20"
          >
            {topicOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <input
            id="topic-manual"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            placeholder="Or type topics manually, e.g. USD/SGD, gold, Singapore exporters"
            className="min-h-12 rounded border border-line bg-white px-4 text-base outline-none transition placeholder:text-slate-400 focus:border-gold focus:ring-4 focus:ring-gold/20"
          />
          <p className="text-sm font-medium leading-6 text-slate-700">
            Select multiple topics from the dropdown or type them manually. A comma must exist between topics, for example: USD/SGD, gold, Singapore exporters.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="min-h-6 text-sm text-slate-600">
            {buildTopicQuery() ? `Briefing topics: ${buildTopicQuery()}` : "No topics selected yet."}
          </p>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-navy px-5 text-sm font-semibold text-white transition hover:bg-royal disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? <Loader2 aria-hidden="true" className="animate-spin" size={18} /> : <ArrowRight aria-hidden="true" size={18} />}
            Generate
          </button>
        </div>
        {error ? <p className="text-sm font-medium text-red-700">{error}</p> : null}
      </form>

      <div className="mt-5 flex flex-wrap gap-2">
        {topicOptions.slice(0, 4).map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => {
              setSelectedTopics((current) => (current.includes(example) ? current : [...current, example]));
            }}
            className="rounded border border-line bg-mist px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-gold hover:text-navy"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
}
