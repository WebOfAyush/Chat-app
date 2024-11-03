import {z} from "zod";
export const sendMessageSchema = z.object({
    receiverId: z.string().length(24, { message: "Invalid user ID format" }),
})