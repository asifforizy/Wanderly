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

export const CreateDestinationSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must be at most 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description is too long"),
  country: z.string().min(2, "Country is required"),
  city: z.string().min(2, "City is required"),
  // kept as a string in the form, converted to a number in onSubmit
  price: z
    .string()
    .refine((v) => v === "" || (!isNaN(Number(v)) && Number(v) >= 0), {
      message: "Price must be a positive number",
    }),
  imageUrl: z.string().refine((v) => v === "" || /^https?:\/\//.test(v), {
    message: "Enter a valid image URL (https://...)",
  }),
});

export type CreateDestinationValues = z.infer<typeof CreateDestinationSchema>;
