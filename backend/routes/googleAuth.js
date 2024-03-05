const express = require("express");
const router = express.Router();
const AuthGGCtrl = require("../controllers/auth_google");

router.get("/", AuthGGCtrl.getAuth);
router.get("/google", AuthGGCtrl.getGoogle);
module.exports=router;