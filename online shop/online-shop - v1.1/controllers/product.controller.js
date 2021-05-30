const productModel = require("../models/products.model");

exports.getProduct = (req, res, next) => {
    // get all products
    // render home page

    let id = req.params.id;

    productModel.getProductDetails(id).then((product) => {
        res.render("product", {
            product: product
        });
    });
};