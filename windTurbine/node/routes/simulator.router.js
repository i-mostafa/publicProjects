const router = require("express").Router();
const SimulatorController = require("../controllers/simulator.controller");

router.get("/refreshData", (req, res, next) => {
  SimulatorController.refreshSimulatorData(req, res, next);
});
router.get("/windAngle", (req, res, next) => {
  SimulatorController.changeWindAngle(req, res, next);
});
router.get("/mode", (req, res, next) => {
  SimulatorController.changeMode(req, res, next);
});
router.get("/email", (req, res, next) => {
  SimulatorController.sendTempMail(req, res, next);
});

module.exports = router;
