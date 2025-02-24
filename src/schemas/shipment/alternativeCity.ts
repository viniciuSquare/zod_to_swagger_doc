import { zId } from "@zodyac/zod-mongoose";
import { z } from "zod";

export const alternativeCitySchema = z.object({
  _id: zId(),
  city: z.string(),
  state: z.string(),
  ctry: z.string()
});
