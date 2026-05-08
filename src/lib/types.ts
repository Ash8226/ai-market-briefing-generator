export type BriefingSections = {
  marketSummary: string;
  keyDrivers: string[];
  risksToWatch: string[];
  businessImpact: string;
  suggestedActionPoints: string[];
};

export type Briefing = {
  id: string;
  topic: string;
  sections: BriefingSections;
  created_at: string;
};
