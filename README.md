# F1 Favorites API - Final Project

## Student Information
* **Name:** Bar Pinchuk
* **ID:** 216755256
* **Submission:** Individual

## Project Description
A modular Express.js REST API that integrates with the external [F1 API](https://f1api.dev/). The server fetches real-time Formula 1 upcoming circuits and allows users to manage a customized in-memory list of their favorite F1 drivers.

## Architecture and Project Structure
The project strictly complies with modular architecture standards, separating concerns into distinct logical layers:

* `routes/`: Handles request entry points and binds HTTP methods to controllers.
* `controllers/`: Manages HTTP request and response handling, as well as basic parameter validation.
* `services/`: Processes core business logic and encapsulates external API communication.
* `dal/`: Data Access Layer responsible for managing the local in-memory favorites array.
* `utils/`: Contains utility tools, including a custom contextual Winston logger.
* `config/`: Manages environment variables and centralized configuration.

## Prerequisites
* Node.js (v18 or higher recommended)
* npm (Node Package Manager)

## Installation and Setup

1. Clone the repository:
    git clone [https://github.com/BarPinchuk/F1_project.git](https://github.com/BarPinchuk/F1_project.git)
    cd F1_project

2. Install project dependencies:
    npm install

3. Environment Configuration:
   Create a `.env` file in the root directory and add the following variables:
    PORT=5000
    F1_API_URL=[https://f1api.dev/api](https://f1api.dev/api)

4. Running the Server:
   * Development mode (with nodemon):
     npm run dev

   * Production mode:
     npm start

## API Endpoints

All resources are hosted under the `/api/drivers` base path prefix.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/circuits` | Fetches a clean array of upcoming F1 circuits from the external API. |
| GET | `/` | Retrieves the complete list of locally saved favorite drivers. |
| GET | `/status/:driverId` | Checks if a driver matching the `driverId` exists in local favorites. |
| POST | `/:id` | Fetches details for the driver from the external F1 API and adds them to local favorites. |
| DELETE | `/:id` | Removes a specific driver from the local favorites list by their ID. |

## Logging and Error Handling
* **Contextual Logs:** Implemented using `winston`. Logs are output to the console and mirrored to `logs/combined.log`. Critical errors are stored in `logs/error.log`.
* **Global Error Handler:** A centralized middleware in `app.js` catches unhandled exceptions and prevents stack trace leaks in production.