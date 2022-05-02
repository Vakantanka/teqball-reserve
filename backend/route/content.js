const router = require('express').Router();
const ContentCtrl = require("../controller/content");
const authJwt = require('../middleware/authJwt');

router.get("/public", ContentCtrl.apiGetPublicContent);
router.get("/private", [authJwt.verifyToken], ContentCtrl.apiGetPrivateContent);

module.exports = router
