const express = require("express");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const SessionStore = require("connect-mongodb-session")(session);
const bodyParserMW = require("body-parser").urlencoded({
    extended: true
});

const homeRouter = require("./routes/home.router");
const adminRouter = require("./routes/admin.router");
const productRouter = require("./routes/product.router");
const authRouter = require("./routes/auth.router");
const cartRouter = require("./routes/cart.router");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "images")));
app.use(flash());
app.use(bodyParserMW);
STORE = new SessionStore({
    uri: "mongodb://localhost:27017/online-shoping",
    collection: "session"
});

app.use(
    session({
        secret: "this is my secret and i use it to encrypt my data",
        saveUninitialized: false,
        store: STORE,
        resave: false
        /* cookie: {
            maxAge: 1 * 60 * 60 * 1000
        }, */
    })
);
app.use("/admin", adminRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/", authRouter);
app.use("/", homeRouter);

app.listen(5050, (err) => {
    console.log("server is running");
});