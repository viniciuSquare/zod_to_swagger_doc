import mongoose from 'mongoose';
import { z } from 'zod';
import {
  extendZodWithOpenApi,
  createDocument
} from "zod-openapi";
extendZodWithOpenApi(z);

const trackOptionsSchema = z.object({
  by: z.instanceof(mongoose.Types.ObjectId),
  at: z.date().default(() => new Date())
});

const subItemSchema = z.object({
  sku: z.string(),
  cartonNumber: z.string(),
  quantity: z.number(),
  quantityUOM: z.string(),
  description: z.string(),
  actualWeight: z.number(),
  actualWeightUOM: z.string(),
  actualWeightCountType: z.string(),
  actualLength: z.number(),
  actualWidth: z.number(),
  actualHeight: z.number(),
  actualDimensionsUOM: z.string(),
  actualValue: z.number(),
  plannedQty: z.number(),
  plannedQtyUOM: z.string(),
  manufacturerPartNumber: z.string()
});

const filePackageSlipSchema = z.object({
  url: z.string(),
  name: z.string()
});

const fileAttachmentSchema = z.object({
  url: z.string(),
  name: z.string()
});

const pickedUpSchema = z.object({
  by: z.instanceof(mongoose.Types.ObjectId),
  at: z.date()
});

const hazardousSchema = z.object({
  properShippingName: z.string(),
  unNumber: z.number(),
  class: z.number(),
  group: z.string(),
  flashpointTemp: z.string(),
  contactName: z.string(),
  contactPhone: z.string()
});

const statusLogSchema = z.object({
  name: z.string(),
  timestamp: z.date()
});

const alternativeCitySchema = z.object({
  _id: z.instanceof(mongoose.Types.ObjectId),
  city: z.string(),
  state: z.string(),
  ctry: z.string()
});

const itemSchema = z.object({
  itemId: z.string(),
  class: z.number(),
  nmfcCode: z.string(),
  actualQty: z.number(),
  actualQtyUOM: z.string(),
  actualWeight: z.number(),
  actualWeightUOM: z.string(),
  actualWeightCountType: z.string(),
  actualLength: z.number(),
  actualWidth: z.number(),
  actualHeight: z.number(),
  actualDimensionsUOM: z.string(),
  actualPieces: z.number(),
  actualPiecesUOM: z.string(),
  actualValue: z.number(),
  plannedQty: z.number(),
  plannedQtyUOM: z.string(),
  description: z.string(),
  manufacturerPartNumber: z.string(),
  vinNumber: z.string(),
  poNumber: z.string(),
  palletNumber: z.string(),
  hazardous: hazardousSchema,
  isHazmat: z.boolean(),
  subItems: z.array(subItemSchema),
  sequence: z.number(),
  packageSlip: filePackageSlipSchema
});

const pickupSchema = z.object({
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
  coordinate: z.any() // Assuming Coordinate is another schema
});

const stopSchema = z.object({
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
  coordinate: z.any() // Assuming Coordinate is another schema
});

const serviceSchema = z.object({
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

const equipmentSchema = z.object({
  dryVanTrailer: z.boolean(),
  flatbed: z.boolean(),
  ltl: z.boolean(),
  refrigeratedTrailer: z.boolean(),
  stepDeck: z.boolean(),
  airFreight: z.boolean(),
  stepDeckRamps: z.boolean(),
  conestoga: z.boolean()
});

const integrationSchema = z.object({
  target: z.string(),
  status: z.string(),
  note: z.string(),
  date: z.date(),
  metadata: z.any()
});

const mileageSchema = z.object({
  distanceInMiles: z.number(),
  hours: z.number(),
  minutes: z.number()
});

const dummySchema = z.object({
  isDummy: z.boolean(),
  consolidate: z.object({
    at: z.date(),
    by: z.instanceof(mongoose.Types.ObjectId)
  })
});

const truckRateRangeSchema = z.object({
  min: z.number(),
  max: z.number()
});

const spotmarketSchema = z.object({
  status: z.array(z.string()),
  truckRateRange: truckRateRangeSchema,
  postedRate: z.number(),
  export: z.object({
    last_exported_dat: z.date(),
    last_exported_ts: z.date()
  }),
  equipments: z.array(z.string()),
  dummy: dummySchema,
  customer: z.instanceof(mongoose.Types.ObjectId),
  recurring: z.object({
    status: z.boolean(),
    startAt: z.date(),
    endAt: z.date()
  }),
  originalPrimaryReference: z.string()
});

const confirmSchema = z.object({
  by: z.instanceof(mongoose.Types.ObjectId),
  in: z.date()
});

const quotationSchema = z.object({
  by: z.instanceof(mongoose.Types.ObjectId),
  in: z.date()
});

const appointmentTimeSchema = z.object({
  pickup: z.date(),
  stop: z.date()
});

const pendingSchema = z.object({
  status: z.boolean(),
  approvement: z.string(),
  rate: z.number()
});

const stuckSchema = z.object({
  status: z.boolean(),
  hoursElapsed: z.number(),
  lastNote: z.string(),
  lastStatusAt: z.date()
});

const lastBOLFileSchema = z.object({
  _id: z.instanceof(mongoose.Types.ObjectId),
  serviceId: z.string()
});

const metadataSchema = z.object({
  spotmarket: spotmarketSchema,
  pending: pendingSchema,
  appointmentTime: appointmentTimeSchema,
  quotation: quotationSchema,
  confirm: confirmSchema,
  invalidPoNumber: z.boolean(),
  forcedPoNumber: z.boolean(),
  lastBOLFile: lastBOLFileSchema
});

const quoteSchema = z.object({
  quoteId: z.instanceof(mongoose.Types.ObjectId),
  price: z.number()
});

const shipmentSchema = z.object({
  _id: z.instanceof(mongoose.Types.ObjectId),
  primaryReference: z.string(),
  customer: z.string(),
  createDate: z.date(),
  createdBy: z.string(),
  poNumber: z.string(),
  ordersNumbers: z.string(),
  coxPONumber: z.string(),
  shipmentNumber: z.string(),
  transferNumber: z.string(),
  isTransfer: z.boolean(),
  quantity: z.number(),
  quantityUOM: z.string(),
  weight: z.number(),
  weightUOM: z.string(),
  width: z.number(),
  length: z.number(),
  height: z.number(),
  dimensionUOM: z.string(),
  stackability: z.boolean(),
  equipmentDescriptions: z.string(),
  serviceDescriptions: z.string(),
  status: z.string(),
  mode: z.string(),
  internalStatus: z.array(z.string()),
  pickups: z.array(pickupSchema),
  stops: z.array(stopSchema),
  services: serviceSchema,
  equipment: equipmentSchema,
  bolFile: fileAttachmentSchema,
  podFile: fileAttachmentSchema,
  trackingUrl: z.string(),
  trackingNumber: z.string(),
  proNumber: z.string(),
  integrated: z.boolean(),
  integrations: z.array(integrationSchema),
  specialInstructions: z.string(),
  source: z.string(),
  validated: trackOptionsSchema,
  created: trackOptionsSchema,
  updated: trackOptionsSchema,
  deleted: trackOptionsSchema,
  combinedFrom: z.array(z.object({
    type: z.instanceof(mongoose.Types.ObjectId),
    ref: z.literal('Shipment')
  })),
  combined: z.boolean().openapi({
    ref: 'Combined Shipment',
    description: 'Boolean to identify combined Shipments'
  }),
  archived: z.boolean(),
  tenant: z.object({
    type: z.instanceof(mongoose.Types.ObjectId),
    ref: z.literal('Tenant'),
    required: z.literal(true)
  }),
  mileage: mileageSchema,
  metadata: metadataSchema,
  price: z.number(),
  attachment: fileAttachmentSchema,
  quote: quoteSchema,
  statusLog: z.array(statusLogSchema),
  actualValue: z.number(),
  pickedUp: pickedUpSchema
});

// OpenAPI COMPONENT
shipmentSchema.openapi({ ref: 'Shipment', description: '' });

// ZOD SCHEMA
export default shipmentSchema; 

// TYPE FROM ZOD
export type ShipmentSchemaType = z.infer<typeof shipmentSchema> 


