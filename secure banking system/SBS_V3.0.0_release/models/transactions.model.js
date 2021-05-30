const mongoose = require("mongoose");
const path = require("path");
const authModel = require('./auth.model')
const dbUrl = "mongodb://localhost:27017/sbs";
const logSchema = {
    timeStamp: String,
    userName: String,
    toId: String,
    amount: String,
    status: String,
};

const Transaction = mongoose.model("transaction", logSchema);

exports.Transfer = (fromId, toId, amount, userName, balance) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                let transaction = new Transaction({
                    toId: toId,
                    userName: userName,
                    amount: amount,
                    status: 'TODO',
                    timeStamp: Date.now()
                });
                return transaction.save();
            }).then(() => {
                return authModel.afterTranfere(fromId, amount, balance);
            })
            .then(() => {
                mongoose.disconnect();
                resolve();
            }).catch((err) => {
                mongoose.disconnect();
                reject(err);
            })
    });
}
exports.getallTransactions = () => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                return Transaction.find();
            }).then((transactions) => {
                mongoose.disconnect();
                resolve(transactions);
            }).catch((err) => {
                mongoose.disconnect();
                reject(err);
            })
    });
}