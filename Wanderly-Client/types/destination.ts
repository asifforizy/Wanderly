export type Destination = {
  id: string;
  name?: string;
  title?: string;
  description?: string;
  location?: string;
  country?: string;
  city?: string;
  price?: number;
  rating?: number;
  imageUrl?: string;
  image?: string;
  images?: string[];
};

export type DestinationsResult =
  | { success: true; destinations: Destination[] }
  | { success: false; message: string };

export type CreateDestinationPayload = {
  name: string;
  description: string;
  country: string;
  city: string;
  price?: number;
  imageUrl?: string;
};
