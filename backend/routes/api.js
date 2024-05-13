const express = require("express");
const router = express.Router();
const middleware = require('../middleware/auth');

const apiCtrl = require("../controllers/api");
/**
 * @swagger
 * /api/sleep:
 *   post:
 *     summary: Get hotel options for accommodation.
 *     description: Retrieve hotel options based on the destination city code.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               destination:
 *                 type: string
 *                 description: The city code of the destination.
 *     responses:
 *       200:
 *         description: Successful response. Returns hotel options.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hotels:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Hotel'
 *       400:
 *         description: Bad request. Indicates missing or invalid parameters.
 *       500:
 *         description: Internal server error. Indicates a failure to retrieve hotel options.
 */
router.post("/sleep", apiCtrl.getApiSleep);
router.post("/sleep2", apiCtrl.getApiSleep2);
/**
 * @swagger
 * /api/hotel-validate:
 *   post:
 *     summary: Get hotel information for validation.
 *     description: Retrieve hotel information based on the provided parameters for validation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idHotel:
 *                 type: string
 *                 description: The ID of the hotel to validate.
 *               nbAdult:
 *                 type: integer
 *                 description: The number of adults.
 *                 minimum: 1
 *                 example: 1
 *               checkIn:
 *                 type: string
 *                 format: date
 *                 description: The check-in date in YYYY-MM-DD format.
 *               checkOut:
 *                 type: string
 *                 format: date
 *                 description: The check-out date in YYYY-MM-DD format.
 *               qttRoom:
 *                 type: integer
 *                 description: The number of rooms.
 *                 minimum: 1
 *                 example: 1
 *     responses:
 *       200:
 *         description: Successful response. Returns hotel information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hotelInfo:
 *                   $ref: '#/components/schemas/HotelInfo'
 *       400:
 *         description: Bad request. Indicates missing or invalid parameters.
 *       500:
 *         description: Internal server error. Indicates a failure to retrieve hotel information.
 */
router.post("/sleep3", apiCtrl.getApiHotelValidate);
//router.get("/enjoy", apiCtrl.getApiEnjoy);
/**
 * @swagger
 * /api/travel:
 *   post:
 *     summary: Get flight offers for travel.
 *     description: Retrieve flight offers based on origin, destination, dates, and number of adults.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               originLocationCode:
 *                 type: string
 *                 description: The IATA code for the origin location.
 *               destinationLocationCode:
 *                 type: string
 *                 description: The IATA code for the destination location.
 *               departureDate:
 *                 type: string
 *                 format: date
 *                 description: The departure date in YYYY-MM-DD format.
 *               returnDate:
 *                 type: string
 *                 format: date
 *                 description: The return date in YYYY-MM-DD format.
 *               adults:
 *                 type: integer
 *                 description: The number of adults traveling.
 *                 minimum: 1
 *                 example: 1
 *     responses:
 *       200:
 *         description: Successful response. Returns flight offers.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 flights:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/FlightOffer'
 *       400:
 *         description: Bad request. Indicates missing or invalid parameters.
 *       500:
 *         description: Internal server error. Indicates a failure to retrieve flight offers.
 */
router.post("/travel", apiCtrl.getApiTravel);
/**
 * @swagger
 * /api/airport:
 *   get:
 *     summary: Search for airports and cities.
 *     description: Search for airports and cities based on a keyword.
 *     parameters:
 *       - in: query
 *         name: term
 *         required: true
 *         description: The keyword to search for airports and cities.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response. Returns airports and cities matching the keyword.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 airports:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Airport'
 *                 cities:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/City'
 *       500:
 *         description: Internal server error. Indicates a failure to search for airports and cities.
 */
router.get("/airport", apiCtrl.getApiAirport);
/**
 * @swagger
 * /api/eat:
 *   post:
 *     summary: Get restaurants and bars based on location, category, and radius.
 *     description: Retrieve restaurants and bars based on specified location, category, and search radius.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *                 description: The location to search for restaurants and bars.
 *               category:
 *                 type: string
 *                 description: The category of establishments to search for (e.g., restaurant, bar).
 *               radius:
 *                 type: number
 *                 description: The search radius in kilometers.
 *     responses:
 *       200:
 *         description: Successful response. Returns restaurants and bars matching the search criteria.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 establishments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Establishment'
 *       500:
 *         description: Internal server error. Indicates a failure to retrieve restaurants and bars.
 */
router.post("/eat", apiCtrl.getApiEatDrinks);
//router.get("/drink", apiCtrl.getApiEatDrinks);
//router.get("/:id", apiCtrl.getApiId);

module.exports = router;
