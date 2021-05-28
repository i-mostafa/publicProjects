const express = require("express");

const session = require("express-session");
const SessionStore = require("connect-mongodb-session")(session);
const path = require("path");
const homeRouter = require("./routes/homeRouter");
const bodyParserMW = require("body-parser").urlencoded({
  extended: true,
});
const app = express();
app.use(express.static(path.join(__dirname, "public")));
STORE = new SessionStore({
  uri: "mongodb://localhost:27017/scada",
  collection: "session",
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  session({
    secret: "this is my secret and i use it to encrypt my data",
    saveUninitialized: false,
    store: STORE,
    resave: false,
    cookie: {
      maxAge: 1 * 60 * 60 * 1000,
    },
  })
);

app.use(express.static(path.join(__dirname, "assets")));
app.use(bodyParserMW);

app.use("/", homeRouter);

app.listen(3000, (err) => {
  console.log("server is running");
});
