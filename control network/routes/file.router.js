const router = require("express").Router();
const fileController = require("../controllers/file.controller");
const multer = require("multer");

router.post(
    "/file",
    multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "uploads");
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + file.originalname);
            },
        }),
    }).single("file"),
    fileController.postFile
);

router.get("/file", fileController.getFile);
module.exports = router;
