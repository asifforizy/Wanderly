import { z } from "zod";
import { DestinationCategory } from "../../../prisma/generated/prisma/enums";

const stringList = (label: string) =>
  z
    .array(z.string().trim().min(1, `${label} cannot be empty`))
    .min(1, `At least one ${label} is required`)
    .max(20, `Too many ${label} items`);

const createDestinationZodSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  country: z.string().trim().min(2, "Country is required").max(100),
  location: z.string().trim().min(2, "City or region is required").max(150),
  shortDescription: z
    .string()
    .trim()
    .min(10, "Short description is too short")
    .max(200, "Short description must be 200 characters or less"),
  fullDescription: z
    .string()
    .trim()
    .min(30, "Full description is too short")
    .max(5000),
  category: z.nativeEnum(DestinationCategory, {
    message: "Invalid category",
  }),
  estimatedBudget: z
    .number({ message: "Estimated budget must be a number" })
    .int("Budget must be a whole number")
    .positive("Budget must be greater than 0")
    .max(10_000_000),
  currency: z
    .string()
    .trim()
    .length(3, "Use a 3-letter currency code")
    .toUpperCase(),
  bestTimeToVisit: z
    .string()
    .trim()
    .min(2, "Best time to visit is required")
    .max(100),
  recommendedDuration: z
    .string()
    .trim()
    .min(2, "Recommended duration is required")
    .max(100),
  activities: stringList("activity"),
  travelTips: stringList("travel tip"),
  imageUrl: z.string().trim().url("Image URL must be a valid URL"),
});

const updateDestinationZodSchema = createDestinationZodSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

export const DestinationValidation = {
  createDestinationZodSchema,
  updateDestinationZodSchema,
};
