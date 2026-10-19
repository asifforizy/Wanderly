import z from "zod";

export const UserRegistrationZodSchema = z
  .object({
    name: z
      .string("Not A String!!!!!")
      .min(3, "Name must atleast 3 characters long!!!")
      .max(10),
    email: z.email("Not email!!"),
    password: z
      .string()
      .min(8, "Password Must Minimum 8 Characters Long.")
      .regex(/[a-z]/, "Password must contain atleast 1 Lowercase Letter")
      .regex(/[A-Z]/, "Password must contain atleast 1 Uppercase Letter")
      .regex(/[0-9]/, "Password must contain atleast 1 Number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain atleast 1 Special Character"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    patient: z
      .object({
        contactNumber: z.string().optional(),
      })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const UserEmailVerifyZodSchema = z.object({
  email: z.email("Not email!!"),
  otp: z.string().length(6),
});

export const LoginZodSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password Must Minimum 8 Characters Long.")
    .regex(/[a-z]/, "Password must contain atleast 1 Lowercase Letter")
    .regex(/[A-Z]/, "Password must contain atleast 1 Uppercase Letter")

    .regex(/[0-9]/, "Password must contain atleast 1 Number")
    .regex(/[^A-Za-z0-9]/, "Password must contain atleast 1 Special Character"),
});

export const ForgotPasswordZodSchema = z.object({
  email: z.email(),
});

export const ResetPasswordZodSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password Must Minimum 8 Characters Long.")
      .regex(/[a-z]/, "Password must contain atleast 1 Lowercase Letter")
      .regex(/[A-Z]/, "Password must contain atleast 1 Uppercase Letter")
      .regex(/[0-9]/, "Password must contain atleast 1 Number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain atleast 1 Special Character"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

import {
  Building2,
  Landmark,
  Mountain,
  TreePine,
  Umbrella,
  Waves,
  type LucideIcon,
} from "lucide-react";

export const CATEGORIES: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "BEACH", label: "Beach", icon: Umbrella },
  { value: "MOUNTAINS", label: "Mountains", icon: Mountain },
  { value: "NATURE", label: "Nature", icon: TreePine },
  { value: "CULTURAL", label: "Cultural", icon: Landmark },
  { value: "COASTAL", label: "Coastal", icon: Waves },
  { value: "CITY", label: "City", icon: Building2 },
];

export const CreateDestinationSchema = z.object({
  name: z.string().min(2, "At least 2 characters").max(100),
  country: z.string().min(2, "Country is required"),
  location: z.string().min(2, "Location is required"),
  shortDescription: z
    .string()
    .min(10, "At least 10 characters")
    .max(200, "Max 200 characters"),
  fullDescription: z.string().min(30, "At least 30 characters").max(5000),
  category: z.string().min(1, "Select a category"),
  estimatedBudget: z
    .string()
    .refine(
      (v) => /^\d+$/.test(v) && Number(v) > 0,
      "Enter a whole number greater than 0"
    ),
  currency: z.string().length(3, "Use a 3-letter code, e.g. USD"),
  bestTimeToVisit: z.string().min(2, "Required"),
  recommendedDuration: z.string().min(2, "Required"),
  activities: z.string().min(1, "Add at least one activity"),
  travelTips: z.string().min(1, "Add at least one tip"),
  imageUrl: z
    .string()
    .regex(/^https?:\/\//, "Enter a valid image URL (https://...)"),
});

export type CreateDestinationValues = z.infer<typeof CreateDestinationSchema>;

export const DESTINATION_CATEGORIES = [
  "BEACH",
  "MOUNTAINS",
  "NATURE",
  "CULTURAL",
  "COASTAL",
  "CITY",
] as const;