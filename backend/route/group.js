const router = require('express').Router();
const GroupCtrl = require("../controller/group");
const authJwt = require('../middleware/authJwt');

router.post("/register", [authJwt.verifyToken], GroupCtrl.apiRegister);
router.post("/findGroupByName", [authJwt.verifyToken], GroupCtrl.apiFindGroupByName);

module.exports = router
