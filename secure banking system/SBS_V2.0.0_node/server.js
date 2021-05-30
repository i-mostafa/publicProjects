const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate.js");
const testPage = fs.readFileSync('./templates/test.html', "utf-8");
const basicPage = fs.readFileSync(`./templates/basic.html`, "utf-8"),
    footer = fs.readFileSync(`./templates/footer.html`, "utf-8"),
    sideBar = fs.readFileSync(`./templates/sideBar.html`, "utf-8"),
    topBar = fs.readFileSync(`./templates/topBar.html`, "utf-8");

const data = fs.readFileSync(`./dev-data/data.json`, "utf-8");

const objData = JSON.parse(data);

const server = http.createServer((req, res) => {
    const {
        query,
        pathname
    } = url.parse(req.url, true);

    //basic
    if (pathname === "/") {
        res.writeHead(200, {
            "content-type": "text/html"
        });

        // const cardHtml = objData.map(el => replaceTemplate(cardData, el)).join("");
        let output = replaceTemplate(basicPage, objData.home);
        console.log(objData.home);
        output = output.replace(/{%TOP_BAR%}/g, topBar);

        output = output.replace(/{%FOOTER%}/g, footer);
        output = output.replace(/{%SIDE_BAR%}/g, sideBar);
        console.log(testPage);

        res.end(testPage);
    }

    //console.log(req.url);
    //res.end("hello, you are in the server ");
});

server.listen(process.env.PORT || 8000, () => {
    console.log("we are listening ");
});