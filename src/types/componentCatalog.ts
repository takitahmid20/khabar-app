export type ComponentCandidateConfidence = "high" | "medium";

export type ComponentCandidate = {
  id: string;
  name: string;
  purpose: string;
  recommendedPath: string;
  appearsIn: number;
  variants: string[];
  confidence: ComponentCandidateConfidence;
};

export type ComponentCatalogSection = {
  id: string;
  title: string;
  items: ComponentCandidate[];
};
