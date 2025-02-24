import { ShipmentSchema } from "../schemas/shipment";
import { z } from "zod";

export type ShipmentSchemaType = z.infer<typeof ShipmentSchema> 