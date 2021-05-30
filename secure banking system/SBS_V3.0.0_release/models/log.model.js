const mongoose = require("mongoose");
const path = require("path");

const dbUrl = "mongodb://localhost:27017/sbs";
const logSchema = {
    timeStamp: String,
    event: String,
};

const Log = mongoose.model("log", logSchema);

exports.saveLog = (log) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                let event = new Log({
                    event: log,
                    timeStamp: Date.now()
                });
                return event.save();
            }).then(() => {
                mongoose.disconnect();
                resolve();
            }).catch((err) => {
                mongoose.disconnect();
                reject(err);
            })
    });
};

exports.getAllLogs = () => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                return Log.find();
            }).then((logs) => {
                mongoose.disconnect();
                resolve(logs);
            }).catch((err) => {
                mongoose.disconnect();
                reject(err);
            })
    });
}