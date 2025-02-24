import { z } from "zod";

export const filePackageSlipSchema = z.object({
  url: z.string(),
  name: z.string()
});

export const fileAttachmentSchema = z.object({
  url: z.string(),
  name: z.string()
});