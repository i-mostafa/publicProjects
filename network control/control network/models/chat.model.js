const fs = require("fs");
const path = require("path");
const chatDataPath = path.join(__dirname, "../assets/chatData.json");
exports.getChatMessages = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(chatDataPath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                data = JSON.parse(data);
                resolve(data);
            }
        });
    });
};

exports.postChatMessage = (msg) => {
    return new Promise((resolve, reject) => {
        fs.readFile(chatDataPath, function (err, data) {
            if (err) {
                reject(err);
            } else {
                var json = JSON.parse(data);
                json.push(msg);
                fs.writeFile(chatDataPath, JSON.stringify(json), (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }
        });
    });
};
