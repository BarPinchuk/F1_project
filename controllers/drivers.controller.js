import * as driversService from "../services/drivers.service.js";
import { createLogger } from "../utils/logger.js";

const logger = createLogger("DriversController");

/**
 * @async
 * @function addFavoriteDriver
 * @description Controller to fetch a driver from the external F1 API and add them to local favorites.
 * @param {Object} req - Express request object containing driverId in the body.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Sends a 21 Created response with the driver data, or 400 Bad Request on error.
 */
export const addFavoriteDriver = async (req, res) => {
  try {
    const { id: driverId } = req.params;

    if (!driverId) {
      logger.warn(
        "Attempted to add favorite driver without providing driverId in URL",
      );
      return res
        .status(400)
        .json({ error: "driverId is required in the URL path" });
    }

    logger.info(`Adding driver '${driverId}' to favorites`);
    const newFavorite = await driversService.addDriverToFavorites(driverId);

    logger.info(`Driver '${driverId}' successfully added to favorites`);
    res.status(201).json({
      message: "Driver added to favorites successfully",
      data: newFavorite,
    });
  } catch (error) {
    logger.error(`Failed to add driver '${req.params.id}': ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

/**
 * @function getFavoriteDrivers
 * @description Controller to retrieve all locally saved favorite F1 drivers.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void} Sends a 200 OK response with the favorites array, or 500 Internal Server Error.
 */
export const getFavoriteDrivers = (req, res) => {
  try {
    logger.info("Fetching all favorite drivers");
    const favorites = driversService.fetchFavoriteDrivers();
    res.status(200).json(favorites);
  } catch (error) {
    logger.error(`Failed to fetch favorite drivers: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

/**
 * @function deleteFavoriteDriver
 * @description Controller to delete a specific driver from local favorites by ID.
 * @param {Object} req - Express request object containing the ID parameter.
 * @param {Object} res - Express response object.
 * @returns {void} Sends a 200 OK response on success, or 404 Not Found on error.
 */
export const deleteFavoriteDriver = (req, res) => {
  try {
    const { id } = req.params;
    logger.info(`Attempting to remove driver '${id}' from favorites`);

    const removed = driversService.removeDriverFromFavorites(id);

    logger.info(`Driver '${id}' successfully removed from favorites`);
    res
      .status(200)
      .json({ message: "Driver removed from favorites", data: removed });
  } catch (error) {
    logger.error(
      `Failed to delete driver '${req.params.id}': ${error.message}`,
    );
    res.status(404).json({ error: error.message });
  }
};

/**
 * @function checkDriverFavoriteStatus
 * @description Controller to check if a specific driver name exists in local favorites.
 * @param {Object} req - Express request object containing the name query parameter.
 * @param {Object} res - Express response object.
 * @returns {void} Sends a 200 OK response with the status message, or 400 Bad Request on error.
 */
export const checkDriverFavoriteStatus = (req, res) => {
  try {
    const { driverId } = req.params;
    logger.info(`Checking favorite status for driver '${driverId}'`);

    const status = driversService.checkDriverStatus(driverId);

    logger.info(`Status check completed for driver '${driverId}'`);
    res.status(200).json(status);
  } catch (error) {
    logger.error(
      `Failed to check status for driver '${req.params.driverId}': ${error.message}`,
    );
    res.status(400).json({ error: error.message });
  }
};

/**
 * @async
 * @function getUpcomingRaces
 * @description Controller to fetch the full list of circuits/races from the external F1 API.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Sends a 200 OK response with the external circuits data, or 500 Internal Server Error.
 */
export const getUpcomingRaces = async (req, res) => {
  try {
    logger.info("Fetching upcoming races from external F1 API");
    const races = await driversService.getUpcomingRaces();

    logger.info("Upcoming races fetched successfully");
    res.status(200).json(races);
  } catch (error) {
    logger.error(`Failed to fetch upcoming races: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
