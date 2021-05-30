const router = require("express").Router();
const internetController = require("../controllers/internet.controller");

router.get("/allow", internetController.allowInternetAccess);
router.get("/block", internetController.blockInternetAccess);
router.get("/ips", internetController.getIpsData);

module.exports = router;