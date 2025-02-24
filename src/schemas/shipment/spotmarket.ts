import { zId } from "@zodyac/zod-mongoose";
import mongoose from "mongoose";
import { z } from "zod";

const truckRateRangeSchema = z.object({
  min: z.number(),
  max: z.number()
});

const dummySchema = z.object({
    isDummy: z.boolean(),
    consolidate: z.object({
      at: z.date(),
      by: zId()
    })
  });

export const spotmarketSchema = z.object({
  status: z.array(z.string()),
  truckRateRange: truckRateRangeSchema,
  postedRate: z.number(),
  export: z.object({
    last_exported_dat: z.date(),
    last_exported_ts: z.date()
  }),
  equipments: z.array(z.string()),
  dummy: dummySchema,
  customer: zId(),
  recurring: z.object({
    status: z.boolean(),
    startAt: z.date(),
    endAt: z.date()
  }),
  originalPrimaryReference: z.string()
});