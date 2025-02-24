import { z } from "zod";

export const serviceSchema = z.object({
  excessLength12ftAndOver: z.boolean(),
  excessLength12to15ft: z.boolean(),
  excessLength8to11ft: z.boolean(),
  airportPickup: z.boolean(),
  guaranteedDelivery: z.boolean(),
  hazardousCargoCharge: z.boolean(),
  insideDelivery: z.boolean(),
  liftGateDelivery: z.boolean(),
  liftGatePickup: z.boolean(),
  limitedAccess: z.boolean(),
  notifyBeforeDelivery: z.boolean(),
  protectFromFreezing: z.boolean(),
  residentialDelivery: z.boolean(),
  residentialPickup: z.boolean(),
  scheduleApptCharge: z.boolean(),
  expedited: z.boolean(),
  overDimensions: z.boolean(),
  limitedAccessPickup: z.string(),
  limitedAccessDelivery: z.string(),
  loadingDockPickup: z.boolean(),
  loadingDockStop: z.boolean(),
  forkliftPickup: z.boolean(),
  forkliftStop: z.boolean(),
  needsAppointmentPickup: z.boolean(),
  needsAppointmentStop: z.boolean()
});