const productModel = require("../models/products.model");

exports.getHome = (req, res, next) => {
    // get all products
    // render home page

    let category = req.query.category;
    let validCategories = ['phones', 'tablets', 'clothes', 'laptops'];
    let productsPromise;
    if (category && validCategories.includes(category)) {
        productsPromise = productModel.getCustomCategory(category);
    } else {
        productsPromise = productModel.getAllProducts();
    }
    productsPromise.then((products) => {
        res.render("index", {
            products: products
        });
    });
};