import { z } from "zod";
import { alternativeCitySchema } from "./alternativeCity";
import { itemSchema } from "./item";

export const pickupSchema = z.object({
  type: z.enum(['pickup', 'delivery']).default('pickup'),
  originCode: z.string(),
  originName: z.string(),
  originAddr1: z.string(),
  originAddr2: z.string(),
  originCity: z.string(),
  originState: z.string(),
  originZip: z.string(),
  originCtry: z.string(),
  originContact: z.string(),
  originPhone: z.string(),
  originEmail: z.string(),
  targetShipEarly: z.date(),
  targetShipLate: z.date(),
  actualShip: z.date(),
  estArrivalTime: z.date(),
  position: z.number(),
  alternativeCities: z.array(alternativeCitySchema),
  items: z.array(itemSchema),
  coordinate: z.any()
});