const internetModel = require("../models/internet.model");
const ping = require("ping");

exports.blockInternetAccess = (req, res, next) => {
    res.json({ success: "blocked" });
    /* setTimeout(() => {
        internetModel
            .blockInternet()
            .then(out => {
                internetModel.allowNode();
            })
            .then(out => {
                console.log("blocked");
                res.send("blocked");
            })
            .catch(err => {});
    }, 2000); */
};

exports.allowInternetAccess = (req, res, next) => {
    res.json({ success: "allowed" });
    /* setTimeout(() => {
        internetModel
            .allowInternet()
            .then(out => {
                internetModel.allowNode();
            })
            .then(out => {
                console.log("allowed");
                res.send("allowed");
            })
            .catch(err => {});
    }, 2000); */
};

exports.getIpsData = (req, res, next) => {
    res.send();
    let ipsData = [];
    for (let i = 2; i < 255; i++) {
        let host = `192.168.1.${i}`;
        ping.sys.probe(host, function (isAlive) {
            var msg = isAlive ? "host " + host + " is alive" : "host " + host + " is dead";
            console.log(msg);
            if (isAlive) ipsData.push(host);
            if (i === 245) internetModel.addIp(ipsData);
        });
    }
};
