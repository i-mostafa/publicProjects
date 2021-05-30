const router = require("express").Router();
const homeController = require("../controllers/pages.controller");
const authGuard = require("./guards/auth.guard");
const check = require("express-validator").check;


router.get("/pll", authGuard.isAuth, homeController.getPll);
router.get("/settings", authGuard.isAuth, homeController.getSettings);
router.get("/log", authGuard.isAuth, homeController.getLog);
router.get("/profile", authGuard.isAuth, homeController.getProfile);
router.get("/credit", authGuard.isAuth, homeController.getCredit);
router.get("/transactions", authGuard.isAuth, homeController.getTransactions);
router.get("/accounts", authGuard.isAuth, homeController.getAccounts);
router.get("/home", authGuard.isAuth, homeController.getHome);


router.post("/profile", authGuard.isAuth,
    check("firstName")
    .not()
    .isEmpty()
    .withMessage("please enter your name"),
    check("lastName")
    .not()
    .isEmpty()
    .withMessage("please enter your name"),
    check("password")
    .isLength({
        min: 6
    })
    .withMessage("please enter a valid password"),
    check("cpassword")
    .custom((value, {
        req
    }) => {
        if (value === req.body.password) return true;
        else return false;
    })
    .withMessage("passwords not matched"), homeController.postProfile);

router.post("/transfer", authGuard.isAuth,
    check("toId")
    .not()
    .isEmpty()
    .withMessage("please enter your to Id"),
    check("amount")
    .isLength({
        min: 1
    })
    .withMessage("please enter a valid password"), homeController.postTransfer);
router.post("/accounts/delete", authGuard.isAuth, homeController.postDeleteAccount);
router.post("/accounts/accept", authGuard.isAuth, homeController.postAcceptAccount);

module.exports = router;