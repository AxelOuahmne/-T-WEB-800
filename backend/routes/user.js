const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.get('/users',auth, userCtrl.getAllUsers);

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/:id", auth, userCtrl.deleteUser);
router.put("/:id", auth, userCtrl.putUser);
router.get("/:id", auth, userCtrl.getUser);
router.post("/create", auth, userCtrl.createUser);
// router.get("/:id", userCtrl.getUser);

// router.post("/signup", userCtrl.signup);
// router.post("/login", userCtrl.login);
// router.delete("/:id", auth, userCtrl.deleteUser);
// router.put("/:id", auth, userCtrl.putUser);
// router.get("/user/:id", auth, userCtrl.getUser);  // Modifié le chemin pour éviter la redondance
// router.get("/users", auth, userCtrl.getAllUsers);
module.exports = router;
