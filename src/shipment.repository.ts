
// export type UserDTO = z.infer<typeof userDTOSchema>;

import { Db, MongoClient } from "mongodb";
import { ShipmentSchemaType } from "./shipment.schema";


export class ShipmentRepository {
  private readonly db: Db;
  private readonly collectionName = 'shipment';

  constructor(mongoClient: MongoClient) {
    this.db = mongoClient.db();
  }
  
  private get collection() {
    // CASE DOESNT EXIST COLLECTION, CREATE IT
    return this.db.collection<ShipmentSchemaType>("shipment");
  }

  public getAll() {
    this.collection.find()
  }
}