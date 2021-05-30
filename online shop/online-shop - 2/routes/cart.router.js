const cartController = require("../controllers/cart.controller");
const authGuard = require("./guards/auth.guard");
const router = require("express").Router();
const check = require("express-validator").check;

router.get("/", authGuard.isAuth, cartController.getCart);
router.post(
    "/",
    check("amount")
        .not()
        .isEmpty()
        .withMessage("amount cannot be empty")
        .isInt({ min: 1 })
        .withMessage("amount cannot be 0"),
    authGuard.isAuth,

    cartController.postCart
);
router.post("/save", authGuard.isAuth, cartController.postEditeItem);
router.post("/delete", authGuard.isAuth, cartController.postDeleteItem);

module.exports = router;
