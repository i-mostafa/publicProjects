const productModel = require("../models/products.model");

exports.initDB = (req, res, next) => {
    // get all products
    // render home page
    productModel.initProducts().then(() => {
        res.redirect("/");
    });
};
