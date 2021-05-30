const authModel = require("../models/auth.model");
const validationResult = require("express-validator").validationResult;

exports.getSignUp = (req, res, next) => {
    res.render("signup", {
        sigUpError: req.flash("sigUpError")[0],
        signupValidationErrors: req.flash("signupValidationErrors"),
        isUser: false
    });
};

exports.postSignUp = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        authModel
            .createUser(req.body.userName, req.body.email, req.body.password)
            .then(() => {
                res.redirect("login");
            })
            .catch((err) => {
                req.flash("sigUpError", err);
                res.redirect("signup");
            });
    } else {
        req.flash("signupValidationErrors", validationResult(req).array());
        res.redirect("/signup");
    }
};

exports.getLogin = (req, res, next) => {
    res.render("login", {
        logInError: req.flash("logInError")[0],
        loginValidationErrors: req.flash("loginValidationErrors"),
        isUser: false
    });
};

exports.postLogin = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        authModel
            .checkUser(req.body.email, req.body.password)
            .then((id) => {
                req.session.userId = id;
                res.redirect("/");
            })
            .catch((err) => {
                req.flash("logInError", err);
                res.redirect("login");
            });
    } else {
        req.flash("loginValidationErrors", validationResult(req).array());
        res.redirect("/login");
    }
};

exports.allLogout = (req, res, next) => {
    req.session.destroy((err) => {
        res.redirect("login");
    });
};
