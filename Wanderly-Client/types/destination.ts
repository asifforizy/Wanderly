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
};
export type DestinationsResult =
  | { success: true; destinations: Destination[] }
  | { success: false; message: string };
