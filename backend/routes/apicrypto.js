const express = require("express");
const router = express.Router();

const apiCtrl = require("../controllers/apicrypto");

router.get("/", apiCtrl.getApi50);
router.get("/coin", apiCtrl.getCoinMarket);
router.get("/coin/:coinId", apiCtrl.getCoinMarketDetails);
router.get("/:id", apiCtrl.getApiId);
router.get("/history/:cryptoId/:currency/:startDate",apiCtrl.getHistoryApiparDays);
router.get("/history/:cryptoId/:currency/heure", apiCtrl.getHistoryApiparHeure);
router.get("/history/:cryptoId/:currency/minute",apiCtrl.getHistoryApiparMinute);


module.exports = router;
