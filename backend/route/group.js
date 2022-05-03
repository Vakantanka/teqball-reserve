const router = require('express').Router();
const GroupCtrl = require("../controller/group");
const authJwt = require('../middleware/authJwt');

router.post("/register", [authJwt.verifyToken], GroupCtrl.apiRegister);

module.exports = router
