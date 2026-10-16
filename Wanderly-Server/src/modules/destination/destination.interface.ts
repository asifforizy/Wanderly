import { DestinationCategory } from "../../../prisma/generated/prisma/enums";

export interface ICreateDestinationPayload {
  name: string;
  country: string;
  location: string;
  shortDescription: string;
  fullDescription: string;
  category: DestinationCategory;
  estimatedBudget: number;
  currency: string;
  bestTimeToVisit: string;
  recommendedDuration: string;
  activities: string[];
  travelTips: string[];
  imageUrl: string;
}

export type IUpdateDestinationPayload = Partial<ICreateDestinationPayload>;

export type BudgetLevel = "low" | "medium" | "high";
export type DestinationSortBy = "name" | "budget";

export interface IDestinationQuery {
  search?: string;
  category?: string;
  budget?: string;
  sort?: string;
  order?: string;
  page?: string | number;
  limit?: string | number;
}
