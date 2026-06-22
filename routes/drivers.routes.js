import { Router } from 'express';
import * as driverController from '../controllers/drivers.controller.js';

const router = Router();

router.post("/", driverController.addFavoriteDriver);

router.get("/", driverController.getFavoriteDrivers);

router.get("/status", driverController.checkDriverFavoriteStatus);

router.get("/upcoming", driverController.getUpcomingRaces);

router.delete("/:id", driverController.deleteFavoriteDriver);

export default router;
