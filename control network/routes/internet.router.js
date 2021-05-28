const router = require("express").Router();
const internetController = require("../controllers/internet.controller");

router.all("/allow", internetController.allowInternetAccess);
router.all("/block", internetController.blockInternetAccess);
//router.get("/control", internetController.getIpToShow);
router.get("/getip", internetController.getIpsData);
router.get("/", internetController.getSavedIps);

module.exports = router;
