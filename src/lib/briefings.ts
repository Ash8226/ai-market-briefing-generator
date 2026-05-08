import type { Briefing, BriefingSections } from "@/lib/types";
import { getSupabaseServerClient } from "@/lib/supabase";

type BriefingRow = {
  id: string;
  topic: string;
  sections: BriefingSections;
  created_at: string;
};

export async function saveBriefing(topic: string, sections: BriefingSections): Promise<Briefing> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("briefings")
    .insert({ topic, sections })
    .select("id, topic, sections, created_at")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as BriefingRow;
}

export async function getBriefing(id: string): Promise<Briefing | null> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("briefings")
    .select("id, topic, sections, created_at")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    throw new Error(error.message);
  }

  return data as BriefingRow;
}

export async function listBriefings(): Promise<Briefing[]> {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase
    .from("briefings")
    .select("id, topic, sections, created_at")
    .order("created_at", { ascending: false })
    .limit(30)
    .returns<BriefingRow[]>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
