const express = require("express");
const router = express.Router();

const apiCtrl = require("../controllers/api");

router.post("/sleep", apiCtrl.getApiSleep);
router.post("/sleep2", apiCtrl.getApiSleep2);
router.get("/enjoy", apiCtrl.getApiEnjoy);
router.post("/travel", apiCtrl.getApiTravel);
router.get("/airport", apiCtrl.getApiAirport);
router.get("/eat", apiCtrl.getApiEatDrinks);
router.get("/drink", apiCtrl.getApiEatDrinks);

//router.get("/:id", apiCtrl.getApiId);

module.exports = router;
