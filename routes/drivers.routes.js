import { Router } from 'express';
import * as driverController from '../controllers/drivers.controller.js';
import { isReqHasBody } from '../utils/reqValidation.js';

const router = Router();

// Add a driver to local favorites via request body
router.post('/', isReqHasBody, driverController.addFavoriteDriver);

// Get all local favorite drivers
router.get('/', driverController.getFavoriteDrivers);

// Check if a specific driver exists in favorites by ID
router.get("/status/:driverId", driverController.checkDriverFavoriteStatus);

// Get circuits from external F1 API
router.get('/circuits', driverController.getCircuits);

// Delete a driver from local favorites by ID
router.delete('/:id', driverController.deleteFavoriteDriver);

export default router;