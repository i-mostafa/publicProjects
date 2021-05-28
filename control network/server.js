const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
let buff = require("audio-buffer");
const Speaker = require("audio-speaker/stream");
const bodyParserMW = require("body-parser").urlencoded({
    extended: true,
});

const internetRouter = require("./routes/internet.router");
const chatRouter = require("./routes/chat.router");
const fileRouter = require("./routes/file.router");
const chatModel = require("./models/chat.model");
const app = express();
const server = http.createServer(app);
ioSocket = socketIO(server);

exports.clientSocket = ioSocket;
let io = socketIO.listen(server);
var audioBuffer = new buff({
    length: 2048,
    sampleRate: 8192,
    numberOfChannels: 1,
});

array = new Float32Array();
var speakerVoice;

io.on("connection", (socket) => {
    console.log("new");
    this.clientSocket = socket;
    socket.on("send", (message) => {
        chatModel.postChatMessage({ sender: "Admin", message: message });
        console.log(message);
    });
    socket.on("audioinput", (data) => {
        array = data;
        if (counter == 0) {
            speakerVoice = new Speaker({
                sampleRate: 4096,
                float: true,
                signed: true,
                bitDepth: 16,
            });
        }
        audioBuffer.copyToChannel(array, 0, 0);
        speakerVoice.write(audioBuffer);
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
app.use("/", fileRouter);
app.get("/check", (req, res, next) => {
    res.json({ success: "success" });
});

server.listen(5050, (err) => {
    console.log("server is running");
});
