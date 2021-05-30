const authModel = require("../models/auth.model");
const logModel = require("../models//log.model");
const transactionsModel = require('../models/transactions.model')
const validationResult = require("express-validator").validationResult;

exports.getHome = (req, res, next) => {
    // get all products
    // render home page
    authModel.getUserData(req.session.userId).then(user => {
        res.render("home", {
            isUser: req.session.userId,
            validationError: req.flash("validationError")[0],
            userData: user
        });
    })
};
exports.getProfile = (req, res, next) => {
    // get all products
    // render home page

    authModel.getUserData(req.session.userId).then(user => {
        res.render("profile", {
            isUser: req.session.userId,
            signupValidationErrors: req.flash("signupValidationErrors")[0],
            userData: user
        });
    })

};
exports.getCredit = (req, res, next) => {
    // get all products
    // render home page

    authModel.getUserData(req.session.userId).then(user => {
        res.render("credit", {
            isUser: req.session.userId,
            validationError: req.flash("validationError")[0],
            userData: user
        });
    })
};
exports.getPll = (req, res, next) => {
    // get all products
    // render home page

    authModel.getUserData(req.session.userId).then(user => {
        res.render("pll", {
            isUser: req.session.userId,
            validationError: req.flash("validationError")[0],
            userData: user
        });
    })
};
exports.getLog = (req, res, next) => {
    // get all products
    // render home page

    authModel.getUserData(req.session.userId).then(user => {
        logModel.getAllLogs().then((logs) => {
            res.render("log", {
                isUser: req.session.userId,
                validationError: req.flash("validationError")[0],
                userData: user,
                logs: logs
            });
        })
    }).catch(err => {
        console.log(err)
        res.render("log", {
            isUser: req.session.userId,
            validationError: req.flash("validationError")[0],
            userData: user,
            logs: []
        });
    })
};
exports.getSettings = (req, res, next) => {
    // get all products
    // render home page

    authModel.getUserData(req.session.userId).then(user => {
        res.render("settings", {
            isUser: req.session.userId,
            validationError: req.flash("validationError")[0],
            userData: user
        });
    })
};
exports.getTransactions = (req, res, next) => {
    // get all products
    // render home page

    authModel.getUserData(req.session.userId).then(user => {
        transactionsModel.getallTransactions().then((transactions) => {
            res.render("transactions", {
                isUser: req.session.userId,
                validationError: req.flash("validationError")[0],
                userData: user,
                transactions: transactions
            });
        })
    }).catch(err => {
        console.log(err)
        res.render("log", {
            isUser: req.session.userId,
            validationError: req.flash("validationError")[0],
            userData: user,
            transactions: []
        });
    })
};

exports.getAccounts = (req, res, next) => {
    // get all products
    // render home page

    authModel.getUserData(req.session.userId).then(user => {
        authModel.getUsersData('accepted').then(currentUsers => {
            authModel.getUsersData('pending').then(requests => {
                res.render("accounts", {
                    isUser: req.session.userId,
                    userData: user,
                    currentUsers: currentUsers,
                    requests: requests
                });
            })
        })

    }).catch(err => {
        res.render("accounts", {
            isUser: req.session.userId,
            userData: user,
            currentUsers: [],
            requests: []
        });
        console.log(err)
    })
};

exports.postProfile = ((req, res, next) => {
    if (validationResult(req).isEmpty()) {
        authModel.postUpdateProfile(req.session.userId, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
        }).then(() => {
            logModel.saveLog(`account data changed for email: ${req.body.email} `).then(() => {
                res.redirect("/profile");
            })
        }).catch(err => {
            console.log(err)
        })
    } else {
        req.flash("signupValidationErrors", validationResult(req).array());
        res.redirect("/profile");
    }
})

exports.postTransfer = ((req, res, next) => {
    if (validationResult(req).isEmpty()) {
        transactionsModel.Transfer(req.body.fromId, req.body.toId, req.body.amount, req.body.username, req.body.balance).then(() => {
            logModel.saveLog(`transaction from ${req.session.userId} to : ${req.body.toId} with ${req.body.amount} SAR `).then(() => {
                res.redirect("/credit");
            })
        }).catch(err => {
            console.log(err)
        })
    } else {
        req.flash("signupValidationErrors", validationResult(req).array());
        res.redirect("/credit");
    }
})

exports.postDeleteAccount = ((req, res, next) => {
    if (validationResult(req).isEmpty()) {
        authModel.deleteAccount(req.body.userId).then(() => {
            logModel.saveLog(`account with user id  ${req.body.userId} was deleted`).then(() => {
                res.redirect("/accounts");
            })
        }).catch(err => {
            console.log(err)
        })
    } else {
        req.flash("ValidationError", validationResult(req).array());
        res.redirect("/accounts");
    }
})

exports.postAcceptAccount = ((req, res, next) => {
    if (validationResult(req).isEmpty()) {
        authModel.acceptAccount(req.body.userId).then(() => {
            logModel.saveLog(`account with user id  ${req.body.userId} was acceped`).then(() => {
                res.redirect("/accounts");
            })
        }).catch(err => {
            console.log(err)
        })
    } else {
        req.flash("ValidationError", validationResult(req).array());
        res.redirect("/accounts");
    }
})