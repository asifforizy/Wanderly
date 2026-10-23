export type Destination = {
  id: string;
  slug?: string;
  name: string;
  country: string;
  location: string;
  shortDescription: string;
  fullDescription?: string;
  category: string;
  estimatedBudget: number;
  currency: string;
  imageUrl: string;
  bestTimeToVisit?: string;
  recommendedDuration?: string;
  activities?: string[];
  travelTips?: string[];
  createdAt?: string;
  updatedAt?: string;
  createdBy?: {
    id: string;
    name: string;
    imageUrl?: string;
  };
};
export type DestinationsResult =
  | { success: true; destinations: Destination[]; total?: number }
  | { success: false; message: string };
