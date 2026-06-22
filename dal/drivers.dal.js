/**
 * In-memory array acting as our local database for FAVORITE F1 drivers.
 */
let favoriteDrivers = [
  // אפשר להשאיר ריק או לשים נהג אחד דיפולטיבי לבדיקות ראשוניות
];

/**
 * Returns all locally saved favorite drivers.
 * @returns {Array} List of favorite drivers.
 */
export const getAllFavorites = () => {
  return favoriteDrivers;
};

/**
 * Finds a favorite driver by driverId.
 * @param {string} driverId - Unique string ID (e.g., 'max_verstappen').
 * @returns {Object|undefined} The driver object or undefined.
 */
export const getFavoriteById = (driverId) => {
  return favoriteDrivers.find((d) => d.driverId === driverId);
};

/**
 * Adds a driver to the local favorites list.
 * @param {Object} driverData - Driver object fetched from the external API.
 * @returns {Object} The added driver.
 */
export const addFavorite = (driverData) => {
  favoriteDrivers.push(driverData);
  return driverData;
};

/**
 * Removes a driver from favorites by driverId.
 * @param {string} driverId - Unique string ID.
 * @returns {Object|null} The deleted driver object, or null if not found.
 */
export const deleteFavorite = (driverId) => {
  const index = favoriteDrivers.findIndex((d) => d.driverId === driverId);
  if (index === -1) return null;

  const [deletedDriver] = favoriteDrivers.splice(index, 1);
  return deletedDriver;
};

/**
 * Checks if a driver exists in favorites by their name or surname.
 * @param {string} namePart - The name to search for (case-insensitive).
 * @returns {Object|undefined} The driver if found.
 */
export const findFavoriteByName = (namePart) => {
  const query = namePart.toLowerCase();
  return favoriteDrivers.find(
    (d) =>
      d.name.toLowerCase().includes(query) ||
      d.surname.toLowerCase().includes(query),
  );
};
