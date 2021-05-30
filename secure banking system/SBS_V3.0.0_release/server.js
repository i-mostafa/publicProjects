const express = require("express");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const SessionStore = require("connect-mongodb-session")(session);
const bodyParserMW = require("body-parser").urlencoded({
    extended: true
});

const authRouter = require("./routes/auth.router");
const pagesRouter = require("./routes/pages.router");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "assets")));
app.use(flash());
app.use(bodyParserMW);
STORE = new SessionStore({
    uri: "mongodb://localhost:27017/sbs",
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
app.use("/", pagesRouter);
app.use("/", authRouter);

app.listen(5050, err => {
    console.log("server is running");
});