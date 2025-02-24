import { z } from "zod";
import { itemSchema } from "./item";
import { alternativeCitySchema } from "./alternativeCity";

export const stopSchema = z.object({
  type: z.enum(['pickup', 'delivery']).default('delivery'),
  destCode: z.string(),
  destName: z.string(),
  destAddr1: z.string(),
  destAddr2: z.string(),
  destCity: z.string(),
  destState: z.string(),
  destZip: z.string(),
  destCtry: z.string(),
  destContact: z.string(),
  destPhone: z.string(),
  destEmail: z.string(),
  targetDeliveryEarly: z.date(),
  targetDeliveryLate: z.date(),
  actualDelivery: z.date(),
  estArrivalTime: z.date(),
  position: z.number(),
  alternativeCities: z.array(alternativeCitySchema),
  items: z.array(itemSchema),
  coordinate: z.any()
});