const chatModel = require("../models/chat.model");
const internetModel = require("../models/internet.model");

exports.getChatMessages = (req, res, next) => {
    chatModel
        .getChatMessages()
        .then(messages => {
            res.render("chat", {
                messages: messages,
                action: "/chat"
            });
        })
        .catch(err => console.log(err));
};

exports.postChatMessages = (req, res, next) => {
    if (req.body.message) {
        internetModel
            .getHostName()
            .then(name => {
                chatModel
                    .postChatMessage({
                        message: req.body.message,
                        from: name
                    })
                    .then(() => {
                        res.redirect("/chat");
                    });
            })
            .catch(err => console.log(err));
    } else {
        res.redirect("/chat");
    }
};

exports.postAdminChatMessages = (req, res, next) => {
    if (req.body.message) {
        chatModel
            .postChatMessage({
                message: req.body.message,
                from: "Admin"
            })
            .then(() => {
                res.redirect("/chat/admin");
            })
            .catch(err => console.log(err));
    } else {
        res.redirect("/chat/admin");
    }
};
exports.getAdminChatMessages = (req, res, next) => {
    chatModel
        .getChatMessages()
        .then(messages => {
            res.render("chat", {
                messages: messages,
                action: "/chat/admin"
            });
        })
        .catch(err => console.log(err));
};
