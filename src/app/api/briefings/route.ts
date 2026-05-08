import { NextResponse } from "next/server";
import { z } from "zod";
import { generateBriefing } from "@/lib/openai";
import { listBriefings, saveBriefing } from "@/lib/briefings";

const createBriefingSchema = z.object({
  topic: z.string().trim().min(2, "Topic must be at least 2 characters.").max(120, "Topic is too long.")
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { topic } = createBriefingSchema.parse(body);
    const sections = await generateBriefing(topic);
    const briefing = await saveBriefing(topic, sections);
    return NextResponse.json(briefing, { status: 201 });
  } catch (error) {
    const message = error instanceof z.ZodError ? error.issues[0]?.message || "Invalid request." : error instanceof Error ? error.message : "Unable to create briefing.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const briefings = await listBriefings();
    return NextResponse.json({ briefings });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to load briefings." }, { status: 500 });
  }
}
