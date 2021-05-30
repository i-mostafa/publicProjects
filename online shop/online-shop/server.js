const express = require("express");
const path = require("path");
const homeRouter = require("./routes/home.router");
const adminRouter = require("./routes/admin.router");
const productRouter = require("./routes/product.router");
const authRouter = require("./routes/auth.router");
const bodyParserMW = require("body-parser").urlencoded({
    extended: true
});

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "images")));

app.use("/admin", adminRouter);
app.use("/product", productRouter);
app.use("/signup", authRouter);
app.use("/", authRouter);
app.use("/", homeRouter);

app.listen(5050, (err) => {
    console.log("server is running");
});