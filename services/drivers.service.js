import * as driversDal from "../dal/drivers.dal.js";
import { f1ApiBaseUrl } from "../config/index.js";

/**
 * 1. Fetches a driver from the external F1 API and adds them to local favorites.
 * @param {string} driverId - The driverId on f1api.dev (e.g. 'lewis_hamilton').
 * @returns {Promise<Object>} The added driver data.
 */
export const addDriverToFavorites = async (driverId) => {
  const existing = driversDal.getFavoriteById(driverId);
  if (existing) {
    throw new Error("Driver is already in your favorites list");
  }

  const response = await fetch(`${f1ApiBaseUrl}/drivers/${driverId}`);
  
  if (!response.ok) {
    throw new Error(`Driver '${driverId}' not found in the external F1 API`);
  }

  const driverData = await response.json();
  
  return driversDal.addFavorite(driverData);
};

/**
 * 2. Retrieves all local favorite drivers.
 * @returns {Array} List of favorites.
 */
export const fetchFavoriteDrivers = () => {
  return driversDal.getAllFavorites();
};

/**
 * 3. Removes a driver from local favorites.
 * @param {string} driverId 
 * @returns {Object} The removed driver.
 */
export const removeDriverFromFavorites = (driverId) => {
  const deleted = driversDal.deleteFavorite(driverId);
  if (!deleted) {
    throw new Error("Driver not found in your favorites list");
  }
  return deleted;
};

/**
 * 4. Checks if a driver name exists locally and returns a specific message.
 * @param {string} name 
 * @returns {Object} Message and driver data if found.
 */
export const checkDriverStatus = (name) => {
  if (!name) throw new Error("Driver name query parameter is required");
  
  const driver = driversDal.findFavoriteByName(name);
  if (!driver) {
    return { found: false, message: `Driver '${name}' is not in your favorites list.` };
  }
  
  return { 
    found: true, 
    message: `Yes! ${driver.name} ${driver.surname} is in your favorites!`,
    driver 
  };
};

/**
 * 5. Fetches upcoming races/circuits from the external F1 API.
 * @returns {Promise<Array>} List of circuits/races.
 */
export const fetchUpcomingRaces = async () => {
  const response = await fetch(`${f1ApiBaseUrl}/circuits`);
  if (!response.ok) {
    throw new Error("Failed to fetch circuits from external F1 API");
  }
  const circuits = await response.json();
  
  return circuits;
};