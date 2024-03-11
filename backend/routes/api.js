const express = require("express");
const router = express.Router();

const apiCtrl = require("../controllers/api");

router.get("/enjoy", apiCtrl.getApiEnjoy);
router.get("/sleep", apiCtrl.getApiSleep);
router.get("/travel", apiCtrl.getApiTravel);
router.get("/eat", apiCtrl.getApiEat);
router.get("/drink", apiCtrl.getApiDrink);

//router.get("/:id", apiCtrl.getApiId);

module.exports = router;
