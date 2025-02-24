import express, { Request, Response, NextFunction } from 'express';
import { registry } from '../swagger/swagger';
import { validateShipment } from '../middleware/validation';
import { getAllShipments } from '../repository/shipment';
import { ShipmentSchema } from '../schemas/shipment';

/**
 * @swagger
 * tags:
 *  name: /shipment
 *  description: Routes from shipments
 */

const router = express.Router({ mergeParams: true});

// Create a new shipment

type Middleware = (req: Request, res: Response, next: NextFunction) => any;
type Method = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'options' | 'trace';

registry.registerPath({
  method: 'post',
  path: '/api/v1/shipments',
  description: 'Create a new shipment',
  summary: 'Create Shipment',
  request: {
    body: {
      content: { 'application/json': { schema: ShipmentSchema, }, },
    },
  },
  responses: {
    201: {
      description: 'Shipment created successfully',
      content: {
        'application/json': {
          schema: ShipmentSchema,
        },
      },
    },
  },
});

router.post(
  '/shipments',
  validateShipment(ShipmentSchema),
  (req: Request, res: Response) => {
    res.status(201).send('Shipment created');
  }
);

router.put(
  '/shipments/:id',
  validateShipment(ShipmentSchema),
  (req: Request, res: Response) => {
    res.status(201).send('Shipment created');
  }
);

registry.registerPath({
  method: 'get',
  path: '/api/v1/shipments',
  description: 'Get shipments',
  summary: 'Get Shipment',  
  responses: {
    201: {
      description: 'List of shipments',
      content: {
        'application/json': {
          schema: ShipmentSchema,
        },
      },
    },
  },
});

// Get all shipments
router.get('/shipments', async (req: Request, res: Response) => {  
  try {
    
    const results = await getAllShipments()
    res.status(200).json(results);    
  } catch(err: any) {
    res.status(404).json({ message: err.message})
  }  
});

// Get a single shipment by ID
router.get('/shipments/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  // Logic to get a shipment by ID
  res.status(200).send(`Shipment with ID: ${id}`);
});

// Update a shipment by ID
router.put('/shipments/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  // Logic to update a shipment by ID
  res.status(200).send(`Shipment with ID: ${id} updated`);
});

// Delete a shipment by ID
router.delete('/shipments/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  // Logic to delete a shipment by ID
  res.status(200).send(`Shipment with ID: ${id} deleted`);
});

export default router;