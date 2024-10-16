import { z } from "zod";
export const getUserProfileSchema = z.object({
  username: z.string().min(1, "Username cannot be empty").max(30, "Username must be less than 30 characters"),
});

export const updateUserProfileSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters" })
    .optional(),
  email: z.string().email({ message: "Invalid email format" }).optional(),
  currentPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .optional(),
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain an uppercase letter",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "Password must contain a number",
    })
    .optional(),
  bio: z
    .string()
    .max(150, { message: "Bio must be under 150 characters" })
    .optional(),
  link: z.string().url({ message: "Invalid URL" }).optional(),
});
export const searchUsersSchema = z.object({
  query: z.string(),
});
