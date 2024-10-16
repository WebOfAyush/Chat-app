import {z} from "zod";
export const getUserProfileSchema = z.object({
    username : z.string()
})

export const updateUserProfileSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email format" }),
  currentPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
  newPassword: z.string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .refine((val) => /[A-Z]/.test(val), { message: "Password must contain an uppercase letter" })
  .refine((val) => /[0-9]/.test(val), { message: "Password must contain a number" }),
  bio: z.string().max(150, { message: "Bio must be under 150 characters" }).optional(),
  link: z.string().url({ message: "Invalid URL" }).optional(),
});
export const searchUsersSchema = z.object({
    query : z.string()
})
export const friendRequestSchema = z.object({
    toUserId: z.string().length(24, { message: "Invalid user ID format" }),
  });
