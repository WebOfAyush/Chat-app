import {z} from "zod";
export const signUpSchema = z.object({
    fullName : z.string(),
    email : z.string().email({ message: "Please provide a valid email" }),
    username : z.string().min(3, {message: "Username must be at least 3 charcters long"}),
    password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .refine((val) => /[A-Z]/.test(val), { message: "Password must contain an uppercase letter" })
    .refine((val) => /[0-9]/.test(val), { message: "Password must contain a number" })
});
export const signinSchema = z.object({
    username: z.string(),
    password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .refine((val) => /[A-Z]/.test(val), { message: "Password must contain an uppercase letter" })
    .refine((val) => /[0-9]/.test(val), { message: "Password must contain a number" })
  });
  