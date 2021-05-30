const authModel = require("../models/auth.model");
const validationResult = require("express-validator").validationResult;
const logModel = require("../models/log.model");
const stmpModel = require("../models/stmp.model");

var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sbs.sar.resetpass@gmail.com",
        pass: "forruawbhgpnkgpa"
    }
});

exports.getSignUp = (req, res, next) => {
    res.render("signup", {
        sigUpError: req.flash("sigUpError")[0],
        signupValidationErrors: req.flash("signupValidationErrors")[0],
        isUser: false
    });
};

exports.postSignUp = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        authModel
            .createUser(req.body.firstName, req.body.lastName, req.body.gender, req.body.email, req.body.password)
            .then(() => {
                logModel
                    .saveLog(`account created for email: ${req.body.email} and it's pending`)
                    .then(() => {
                        res.redirect("login");
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                req.flash("sigUpError", err);
                console.log(err);
                res.redirect("signup");
            });
    } else {
        req.flash("signupValidationErrors", validationResult(req).array());
        res.redirect("/signup");
    }
};

exports.getLogin = (req, res, next) => {
    res.render("login", {
        logInError: req.flash("logInError"),
        loginValidationErrors: req.flash("loginValidationErrors")[0],
        isUser: false
    });
};

exports.postLogin = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        authModel
            .checkUser(req.body.email, req.body.password)
            .then(id => {
                req.session.userId = id;
                logModel
                    .saveLog(`user loged in with email: ${req.body.email}`)
                    .then(() => {
                        res.redirect("home");
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                req.flash("logInError", err);
                console.log(err);
                res.redirect("login");
            });
    } else {
        req.flash("loginValidationErrors", validationResult(req).array());
        res.redirect("login");
    }
};

exports.getResetPass = (req, res, next) => {
    res.render("resetpass", {
        logInError: req.flash("logInError")[0],
        loginValidationErrors: req.flash("loginValidationErrors"),
        isUser: false
    });
};

exports.postResetPass = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        authModel
            .checkEmail(req.body.email)
            .then(() => {
                var mailOptions = {
                    from: "sbs.sar.resetpass@gmail.com",
                    to: req.body.email,
                    subject: "SBS RESET PASSEORD",
                    text: `we receive a request to reset your password so you can use ${Math.random()
                        .toString(36)
                        .slice(2)} as a n OTP password `
                };
                transporter.sendMail(mailOptions, function(error, info) {
                    /*  if (error) {
                        console.log(error);
                    } else {
                        console.log("Email sent: " + info.response);
                    } */
                });
                res.redirect("login");
            })
            .catch(err => {
                req.flash("logInError", err);
                console.log(err);
                res.redirect("login");
            });
    } else {
        req.flash("loginValidationErrors", validationResult(req).array());
        res.redirect("/resetpass");
    }
};

exports.allLogout = (req, res, next) => {
    req.session.destroy(err => {
        res.redirect("login");
    });
};
