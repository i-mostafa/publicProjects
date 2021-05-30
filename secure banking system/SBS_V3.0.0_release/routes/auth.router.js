const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const check = require("express-validator").check;
const authGuard = require("./guards/auth.guard");

router.get("/", authGuard.isNotAuth, (req, res, next) => {
    res.render("index");
});

router.get("/signup", authGuard.isNotAuth, authController.getSignUp);
router.post(
    "/signup",
    authGuard.isNotAuth,
    check("firstName")
    .not()
    .isEmpty()
    .withMessage("please enter your name"),
    check("lastName")
    .not()
    .isEmpty()
    .withMessage("please enter your name"),
    check("gender")
    .not()
    .isEmpty()
    .withMessage("please select a gender"),
    check("email")
    .isEmail()
    .withMessage("please enter a valid email"),
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
    .withMessage("passwords not matched"),
    authController.postSignUp
);

router.get("/login", authGuard.isNotAuth, authController.getLogin);

router.post(
    "/login",
    authGuard.isNotAuth,
    check("email")
    .isEmail()
    .withMessage("please enter a valid email"),
    check("password")
    .isLength({
        min: 6
    })
    .withMessage("please enter a valid password"),
    authController.postLogin
);

router.get("/resetpass", authGuard.isNotAuth, authController.getResetPass);

router.post(
    "/resetpass",
    authGuard.isNotAuth,
    check("email")
    .isEmail()
    .withMessage("please enter a valid email"),

    authController.postResetPass
);

router.all("/logout", authGuard.isAuth, authController.allLogout);
module.exports = router;