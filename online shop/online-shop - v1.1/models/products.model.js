const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser").urlencoded({
    extended: true
});

const dbUrl = "mongodb://localhost:27017/online-shoping";
const productSchema = {
    name: String,
    price: Number,
    image: String,
    description: String,
    category: String
};

const Product = mongoose.model("product", productSchema);

exports.getAllProducts = () => {
    // connect to database
    // get all products
    // disconnect
    return new Promise((resolve, reject) => {
        mongoose
            .connect(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                return Product.find();
            })
            .then((products) => {
                mongoose.disconnect();
                resolve(products);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

exports.getCustomCategory = (category) => {
    // connect to database
    // get all products
    // disconnect
    return new Promise((resolve, reject) => {
        mongoose
            .connect(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                return Product.find({
                    category: category
                });
            })
            .then((products) => {
                mongoose.disconnect();
                resolve(products);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

exports.initProducts = () => {
    // read init data
    // connect to db
    // insert data
    // disconnect

    const data = fs.readFileSync(path.join(__dirname, "../assets/init.db.json"));
    const initDataObj = JSON.parse(data);
    return new Promise((resolve, reject) => {
        mongoose
            .connect(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                Product.insertMany(initDataObj).then((products) => {
                    mongoose.disconnect();
                    resolve(products);
                });
            })

            .catch((err) => {
                reject(err);
            });
    });
};

exports.getProductDetails = (id) => {
    // connect to db
    // find collection of this id
    // render
    return new Promise((resolve, reject) => {
        mongoose
            .connect(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                return Product.findById(id);
            })
            .then((product) => {
                mongoose.disconnect();
                resolve(product);
            })
            .catch((err) => {
                reject(err);
            });
    });
}