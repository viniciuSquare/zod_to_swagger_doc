import { z } from "zod";
import { filePackageSlipSchema } from "./file";

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

const hazardousSchema = z.object({
    properShippingName: z.string(),
    unNumber: z.number(),
    class: z.number(),
    group: z.string(),
    flashpointTemp: z.string(),
    contactName: z.string(),
    contactPhone: z.string()
});

export const itemSchema = z.object({
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