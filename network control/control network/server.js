const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const bodyParserMW = require("body-parser").urlencoded({
    extended: true,
});

const internetRouter = require("./routes/internet.router");
const chatRouter = require("./routes/chat.router");

const app = express();
const server = http.createServer(app);
exports.ioSocket = socketIO(server);
let io = socketIO.listen(server);
io.on("connection", (socket) => {
    console.log("new");
    socket.on("send", (message) => {
        console.log(message);
        socket.emit("send", { sender: "me", message: "do you here me" });
    });
});

app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParserMW);
app.use(express.static(path.join(__dirname, "assets")));
app.use("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With, *");
    next();
});
app.use("/", internetRouter);
app.use("/", chatRouter);
server.listen(5050, (err) => {
    console.log("server is running");
});
