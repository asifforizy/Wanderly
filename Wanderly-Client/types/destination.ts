export type Destination = {
  id: string;
  name: string;
  country: string;
  location: string;
  shortDescription: string;
  category: string;
  estimatedBudget: number;
  currency: string;
  imageUrl: string;
  bestTimeToVisit?: string;
  recommendedDuration?: string;
  activities?: string[];
};
export type DestinationsResult =
  | { success: true; destinations: Destination[]; total?: number }
  | { success: false; message: string };
