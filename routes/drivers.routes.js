import { Router } from 'express';
import * as driverController from '../controllers/drivers.controller.js';

const router = Router();

// Add a driver to local favorites by their ID via URL params
router.post('/:id', driverController.addFavoriteDriver);

// Get all local favorite drivers
router.get('/', driverController.getFavoriteDrivers);

// Check if a specific driver exists in favorites by name
router.get("/status/:driverId", driverController.checkDriverFavoriteStatus);

// Get upcoming races from external F1 API
router.get('/upcoming', driverController.getUpcomingRaces);

// Delete a driver from local favorites by ID
router.delete('/:id', driverController.deleteFavoriteDriver);

export default router;