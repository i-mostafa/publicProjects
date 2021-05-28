exports.postFile = (req, res, next) => {
    res.json({ status: "success" });
};

exports.getFile = (req, res, next) => {
    res.render("fileupload");
};
