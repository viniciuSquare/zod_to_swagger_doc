
import {
  createDocument
} from "zod-openapi";
import shipmentSchema from "./shipment.schema";

const document = createDocument({
  openapi: "3.1.0",
  info: {
    title: "LoadManager API",
    description: "An API for managing Shipments and its workflows.",
    version: "1.0.0",
  },
  servers: [
    {
      url: "https://localhost:5001",
      description: "The local server.",
    },
  ],
  components: {
    schemas: {
      shipmentSchema,
    },
  },
});