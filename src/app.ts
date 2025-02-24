import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { registry } from './swagger/swagger';
import {  OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { ShipmentSchema } from './schemas/shipment';
export class App {
  public server: express.Application;

  constructor() {
    this.server = express();    
    this.connectToDatabase();
    this.server.use(bodyParser.json({ limit: '100mb' }));
    this.server.use('/api/v1', require('./routes/shipment').default);    
    registry.register('Shipment', ShipmentSchema);

    const generator = new OpenApiGeneratorV3(registry.definitions);

    const openapiSpecification = generator.generateDocument({
      openapi: '3.0.0',
      info: { title: 'My API', version: '1.0.0' },
    });    

    this.server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));        
  }

  private connectToDatabase = async () => {
    return await mongoose.connect(process.env.MONGO_URL!);
  };  
}
