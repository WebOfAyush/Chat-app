import { z } from "zod";

export const sendfriendRequestSchema = z.object({
    toUserId: z.string().length(24, { message: "Invalid user ID format" }),
  });
  