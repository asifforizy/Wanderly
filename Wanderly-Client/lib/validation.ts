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

export const DESTINATION_CATEGORIES = [
  "BEACH",
  "MOUNTAIN",
  "CITY",
  "CULTURAL",
  "ADVENTURE",
  "NATURE",
] as const;

export const CreateDestinationSchema = z.object({
  name: z
    .string()
    .min(3, "At least 3 characters")
    .max(100, "Max 100 characters"),
  country: z.string().min(2, "Country is required"),
  location: z.string().min(2, "Location is required"),
  shortDescription: z
    .string()
    .min(10, "At least 10 characters")
    .max(200, "Max 200 characters"),
  fullDescription: z
    .string()
    .min(30, "At least 30 characters")
    .max(5000, "Too long"),
  category: z.string().min(1, "Select a category"),
  estimatedBudget: z
    .string()
    .refine(
      (v) => v !== "" && !isNaN(Number(v)) && Number(v) >= 0,
      "Enter a valid budget"
    ),
  currency: z.string().min(1, "Currency is required"),
  bestTimeToVisit: z.string().min(2, "Required"),
  recommendedDuration: z.string().min(2, "Required"),
  activities: z.string().min(1, "Add at least one activity"),
  travelTips: z.string().min(1, "Add at least one tip"),
  imageUrl: z
    .string()
    .regex(/^https?:\/\//, "Enter a valid image URL (https://...)"),
});

export type CreateDestinationValues = z.infer<typeof CreateDestinationSchema>;
