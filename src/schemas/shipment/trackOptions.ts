import { zId } from "@zodyac/zod-mongoose";
import mongoose from "mongoose";
import { z } from "zod";

export const trackOptionsSchema = z.object({
  by: zId(),
  at: z.date().default(() => new Date())
});