const router = require("express").Router();
const productController = require("../controllers/product.controller");
const authController = require("../controllers/auth.controller");
const check = require("express-validator").check;
const authGuard = require("./guards/auth.guard");

router.get("/signup", authGuard.isNotAuth, authController.getSignUp);
router.post(
    "/signup",
    authGuard.isNotAuth,
    check("userName")
        .not()
        .isEmpty()
        .withMessage("please enter your name"),
    check("email")
        .isEmail()
        .withMessage("please enter a valid email"),
    check("password")
        .isLength({ min: 6 })
        .withMessage("please enter a valid password"),
    check("cpassword")
        .custom((value, { req }) => {
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
        .isLength({ min: 6 })
        .withMessage("please enter a valid password"),
    authController.postLogin
);

router.all("/logout", authGuard.isAuth, authController.allLogout);
module.exports = router;
