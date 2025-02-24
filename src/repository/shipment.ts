import { ShipmentModel } from "../schemas/shipment"

export const getAllShipments = async () => {
  const shipments = await ShipmentModel.find().limit(100);
  return shipments
}