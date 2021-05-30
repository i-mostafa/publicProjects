const mongoose = require("mongoose");
const path = require("path");

const dbUrl = "mongodb://localhost:27017/online-shoping";
const cartSchema = mongoose.Schema({
    name: String,
    amount: Number,
    price: Number,
    productId: String,
    userId: String,
    timeStamp: String,
    timeStamp: String
});

const Item = mongoose.model("cart", cartSchema);

exports.addItem = (data) => {
    // connect to db
    return new Promise((resolve, reject) => {
        mongoose
            .connect(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                item = new Item({
                    name: data.name,
                    amount: data.amount,
                    price: data.price,
                    productId: data.productId,
                    userId: data.userId,
                    timeStamp: data.timeStamp
                });
                return item.save();
            })
            .then(() => {
                mongoose.disconnect();
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
};

exports.getCartItems = (userId) => {
    // connect to database
    // get all items
    // disconnect
    return new Promise((resolve, reject) => {
        mongoose
            .connect(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                return Item.find({ userId: userId }).sort({ timeStamp: 1 });
            })
            .then((items) => {
                mongoose.disconnect();
                resolve(items);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

exports.editeItem = (id, data) => {
    // connect to database
    return new Promise((resolve, reject) => {
        mongoose
            .connect(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                console.log(id, data);
                Item.findByIdAndUpdate(id, data);
            })
            .then(() => {
                mongoose.disconnect();
                resolve();
            })
            .catch((err) => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.deleteItem = (id) => {
    // connect to database
    return new Promise((resolve, reject) => {
        mongoose
            .connect(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                Item.findByIdAndDelete(id);
            })
            .then(() => {
                mongoose.disconnect();
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
};
