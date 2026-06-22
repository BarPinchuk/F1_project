import * as driversService from "../services/drivers.service.js";

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
      return res
        .status(400)
        .json({ error: "driverId is required in the URL path" });
    }

    const newFavorite = await driversService.addDriverToFavorites(driverId);
    res.status(201).json({
      message: "Driver added to favorites successfully",
      data: newFavorite,
    });
  } catch (error) {
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
    const favorites = driversService.fetchFavoriteDrivers();
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @function deleteFavoriteDriver
 * @description Controller to remove a driver from the local favorites list by ID.
 * @param {Object} req - Express request object containing the driver ID as a URL parameter.
 * @param {Object} res - Express response object.
 * @returns {void} Sends a 200 OK response with the deleted driver data, or 404 Not Found on error.
 */
export const deleteFavoriteDriver = (req, res) => {
  try {
    const { id } = req.params;
    const removed = driversService.removeDriverFromFavorites(id);
    res
      .status(200)
      .json({ message: "Driver removed from favorites", data: removed });
  } catch (error) {
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
    
    const status = driversService.checkDriverStatus(driverId);
    res.status(200).json(status);
  } catch (error) {
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
    const races = await driversService.fetchUpcomingRaces();
    res.status(200).json(races);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
