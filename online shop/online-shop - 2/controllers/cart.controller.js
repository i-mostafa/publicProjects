const cartModel = require("../models/cart.model");
const validationResult = require("express-validator").validationResult;

exports.getCart = (req, res, next) => {
    cartModel
        .getCartItems(req.session.userId)
        .then((cartItems) => {
            res.render("cart", {
                isUser: req.session.userId,
                cartValidationError: req.flash("cartValidationError")[0],
                cartItems: cartItems
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postCart = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        cartModel
            .addItem({
                name: req.body.name,
                amount: req.body.amount,
                price: req.body.price,
                productId: req.body.productId,
                userId: req.session.userId,
                timeStamp: Date.now()
            })
            .then(() => {
                res.redirect("/cart");
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        req.flash("cartValidationError", validationResult(req).array());
        res.redirect(req.body.pageToRedirect);
    }
};

exports.postEditeItem = (req, res, next) => {
    cartModel
        .editeItem(req.body.cartId, { amount: req.body.amount, timeStamp: Date.now() })
        .then(() => {
            res.redirect("/cart");
        })
        .catch((err) => {
            res.redirect("/cart");
            console.log(err);
        });
};

exports.postDeleteItem = (req, res, next) => {
    cartModel
        .deleteItem(req.body.cartId)
        .then(() => {
            res.redirect("/cart");
        })
        .catch((err) => {
            res.redirect("/cart");
            console.log(err);
        });
};
