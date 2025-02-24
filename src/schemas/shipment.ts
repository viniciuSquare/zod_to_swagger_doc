import mongoose, { model } from 'mongoose';
import { z } from 'zod';
import {
  extendZodWithOpenApi,  
} from "zod-openapi";
import { trackOptionsSchema } from './shipment/trackOptions';
import { fileAttachmentSchema } from './shipment/file';
import { statusLogSchema } from './shipment/statusLog';
import { pickupSchema } from './shipment/pickup';
import { stopSchema } from './shipment/stop';
import { serviceSchema } from './shipment/service';
import { spotmarketSchema } from './shipment/spotmarket';
import zodSchema, { extendZod, zId } from '@zodyac/zod-mongoose';
extendZodWithOpenApi(z);

extendZod(z);

const pickedUpSchema = z.object({
  by: zId(),
  at: z.date()
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

const confirmSchema = z.object({
  by: zId(),
  in: z.date()
});

const quotationSchema = z.object({
  by: zId(),
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

const LastBOLFileSchema = z.object({
  _id: zId(),
  serviceId: z.string()
});

const MetadataSchema = z.object({
  spotmarket: spotmarketSchema,
  pending: pendingSchema,
  appointmentTime: appointmentTimeSchema,
  quotation: quotationSchema,
  confirm: confirmSchema,
  invalidPoNumber: z.boolean(),
  forcedPoNumber: z.boolean(),
  lastBOLFile: LastBOLFileSchema
});

const QuoteSchema = z.object({
  quoteId: zId(),
  price: z.number()
});

export const ShipmentSchema = z.object({
  _id: zId(),
  primaryReference: z.string().min(1, 'error'),
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
  combinedFrom: zId().ref('Shipment'),
  combined: z.boolean().openapi({
    ref: 'Combined Shipment',
    description: 'Boolean to identify combined Shipments'
  }),
  archived: z.boolean(),
  tenant: zId().ref('Tenant'),//.required(true),
  mileage: mileageSchema,
  metadata: MetadataSchema,
  price: z.number(),
  attachment: fileAttachmentSchema,
  quote: QuoteSchema,
  statusLog: z.array(statusLogSchema),
  actualValue: z.number(),
  pickedUp: pickedUpSchema
});

// OpenAPI COMPONENT
ShipmentSchema.openapi({ ref: 'Shipment', description: '' });

const schema = zodSchema(ShipmentSchema);
export const ShipmentModel = model('Shipment', schema);