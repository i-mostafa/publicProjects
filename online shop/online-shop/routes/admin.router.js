const router = require("express").Router();
const adminController = require("../controllers/admin.controller");

router.get("/init", adminController.initDB);

module.exports = router;
