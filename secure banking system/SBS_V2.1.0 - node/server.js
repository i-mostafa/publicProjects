const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoDB = require("mongodb");

const bodyParserMW = bodyParser.urlencoded({
    extended: true
});
const app = express();

app.use(express.static(path.join(__dirname, "static")));
app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (req, res) => {
    res.render("view", {
        pageTittle: "Home",
        pageHeading: "Home Page",
        userRole: {
            cridet: true,
            log: true,
            account: true,
            pll: true,
            transaction: true,
            settings: true
        },
        userData: { name: "testName", role: "admin" },
        pageContent: {}
    });
});

app.listen(5050, () => {
    console.log("server is runing");
});
