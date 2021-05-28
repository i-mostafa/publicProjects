const router = require("express").Router();
const nodeController = require("../controllers/node.controller");
const authController = require("../controllers/auth.controller");
const authGuard = require("../guards/auth.guard");
router.get("/", authGuard.isAuth, (req, res, next) => {
  console.log(req.session);
  res.render("about", {
    role: req.session.role,
    userName: req.session.userName,
  });
});
router.get("/toggleNodePort", authGuard.isAuth, (req, res, next) => {
  console.log(req.query);
  nodeController.toggleNodePort(req, res, next);
});
router.get("/PWMSignal", authGuard.isAuth, (req, res, next) => {
  nodeController.updatePWMNode(req, res, next);
});
router.get("/refreshNodeData", authGuard.isAuth, (req, res, next) => {
  console.log(req.query);
  nodeController.getNodeJson(req, res, next);
});

router.get("/login", authGuard.isNotAuth, (req, res, next) => {
  res.render("login");
});
router.post("/login", authGuard.isNotAuth, (req, res, next) => {
  authController.login(req, res, next);
});
router.post("/logOut", authGuard.isAuth, (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/login");
  });
});
router.get("/controlRoom", authGuard.isAdmin, (req, res, next) => {
  nodeController.controlNodeData(req, res, next);
});
router.get("/readStatus", authGuard.isUser, (req, res, next) => {
  nodeController.getNodeData(req, res, next);
});

router.get("/about", authGuard.isAuth, (req, res, next) => {
  res.render("about", {
    role: req.session.role,
    userName: req.session.userName,
  });
});
router.get("/addNode", authGuard.isAdmin, (req, res, next) => {
  res.render("addNode", {
    role: req.session.role,
    userName: req.session.userName,
  });
});
router.post("/addNode", authGuard.isAdmin, (req, res, next) => {
  console.log(req.body);
  nodeController.addNode(req, res, next);
});
router.get("/createUser", authGuard.isAdmin, (req, res, next) => {
  res.render("createUser", {
    role: req.session.role,
    userName: req.session.userName,
  });
});

router.post("/createUser", authGuard.isAdmin, (req, res, next) => {
  authController.addNewUser(req, res, next);
});

router.get("/changePassword", authGuard.isAuth, (req, res, next) => {
  res.render("changePassword", {
    role: req.session.role,
    userName: req.session.userName,
  });
});
router.post("/changePassword", authGuard.isAuth, (req, res, next) => {
  authController.changePassword(req, res, next);
});
router.get("/currentUsers", authGuard.isAdmin, (req, res, next) => {
  authController.currentUsers(req, res, next);
});

router.get("/currentNodes", authGuard.isAdmin, (req, res, next) => {
  nodeController.getCurrentNodes(req, res, next);
});
router.get("/nodeData", async (req, res, next) => {
  console.log(req.query, req.originalUrl);
  let update = nodeController.extractNodeData(req.originalUrl);
  nodeController.nodeRequest(req.query.nodeId, update, res);
});
router.get("/nodeData1", (req, res, next) => {
  console.log(req.query);
  res.send("welcom from server");
});

module.exports = router;
