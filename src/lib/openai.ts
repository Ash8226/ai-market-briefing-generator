import OpenAI from "openai";
import { z } from "zod";
import type { BriefingSections } from "@/lib/types";

const briefingSchema = z.object({
  marketSummary: z.string().min(20),
  keyDrivers: z.array(z.string().min(5)).min(3).max(5),
  risksToWatch: z.array(z.string().min(5)).min(3).max(5),
  businessImpact: z.string().min(20),
  suggestedActionPoints: z.array(z.string().min(5)).min(3).max(5)
});

const fallbackBriefing = (topic: string): BriefingSections => ({
  marketSummary: `${topic} is being assessed across price action, liquidity, macro conditions, and sector-specific signals. The current setup calls for a balanced read rather than a single directional assumption.`,
  keyDrivers: [
    "Changes in interest-rate expectations and funding conditions",
    "Recent price momentum, positioning, and liquidity depth",
    "Policy, earnings, demand, or trade-flow signals tied to the topic"
  ],
  risksToWatch: [
    "Unexpected central bank or policy announcements",
    "Volatility from crowded positioning or thin liquidity",
    "Headline risk that changes business confidence or demand"
  ],
  businessImpact: "Businesses should treat the topic as a planning variable for pricing, margins, cash flow, and customer demand until stronger confirmation appears.",
  suggestedActionPoints: [
    "Set a monitoring range and review it weekly",
    "Identify direct revenue, cost, and balance-sheet exposure",
    "Prepare a base case and a stress case before making commitments"
  ]
});

export async function generateBriefing(topic: string): Promise<BriefingSections> {
  if (!process.env.OPENAI_API_KEY) {
    return fallbackBriefing(topic);
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

  const completion = await openai.chat.completions.create({
    model,
    temperature: 0.35,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: "You write concise market briefings in plain English for business users. Avoid financial advice, avoid invented live prices, and return only valid JSON."
      },
      {
        role: "user",
        content: `Create a short market briefing for: ${topic}\n\nReturn this exact JSON shape:\n{\n  "marketSummary": "one concise paragraph",\n  "keyDrivers": ["3 to 5 bullets"],\n  "risksToWatch": ["3 to 5 bullets"],\n  "businessImpact": "one concise paragraph",\n  "suggestedActionPoints": ["3 to 5 practical bullets"]\n}`
      }
    ]
  });

  const content = completion.choices[0]?.message.content;
  if (!content) {
    throw new Error("OpenAI returned an empty briefing.");
  }

  return briefingSchema.parse(JSON.parse(content));
}
