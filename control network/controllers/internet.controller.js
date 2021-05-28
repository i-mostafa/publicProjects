const internetModel = require("../models/internet.model");
const ping = require("ping");

exports.blockInternetAccess = (req, res, next) => {
    // res.redirect("/");
    console.log("blocked");

    res.json({ ststus: "blocked" });
    /*setTimeout(() => {
        internetModel
            .blockInternet()
            .then((out) => {
                internetModel.allowNode();
            })
            .then((out) => {
                console.log("blocked");
                res.send("blocked");
            })
            .catch((err) => {});
    }, 2000);*/
};

exports.allowInternetAccess = (req, res, next) => {
    //res.redirect("/");
    res.json({ ststus: "allowed" });
    console.log("allowed");
    /* setTimeout(() => {
        internetModel
            .allowInternet()
            .then((out) => {
                internetModel.allowNode();
            })
            .then((out) => {
                console.log("allowed");
                res.send("allowed");
            })
            .catch((err) => {});
    }, 2000); */
};

exports.getIpsData = (req, res, next) => {
    let ipsData = [];
    for (let i = 2; i < 255; i++) {
        let host = `192.168.1.${i}`;
        ping.sys.probe(host, function (isAlive) {
            var msg = isAlive ? "host " + host + " is alive" : "host " + host + " is dead";
            console.log(msg);
            if (isAlive) ipsData.push(host);
            if (i === 245) {
                res.render("index", {
                    ipsData: ipsData,
                });
                internetModel.addIp(ipsData);
            }
        });
    }
};

exports.getSavedIps = (req, res, next) => {
    internetModel
        .readSavedIps()
        .then((ipsData) => {
            res.render("index", {
                ipsData: ipsData,
            });
        })
        .catch((err) => {
            console.log(err);
            res.render("index", {
                ipsData: [],
            });
        });
};

exports.getIpToShow = () => {
    internetModel.readIps().then((data) => {
        console.log(data);
    });
};
