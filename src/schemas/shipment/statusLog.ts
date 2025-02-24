import { z } from "zod";

export const statusLogSchema = z.object({
  name: z.string(),
  timestamp: z.date()
});