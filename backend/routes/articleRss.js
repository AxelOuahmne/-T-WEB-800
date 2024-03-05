const express = require('express');
const router = express.Router();

const routeCtrl = require('../controllers/article');

router.get("/", routeCtrl.getArticles);

module.exports = router;