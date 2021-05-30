const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const ipsDataPath = path.join(__dirname, "../assets/ips.json");

function cmdRun(cmd) {
    const exec = require("child_process").exec;
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.warn(error);
            }
            console.log(`stdout: ${stdout}`);
            resolve(stdout ? stdout : stderr);
        });
    });
}
exports.blockInternet = () => {
    const cmd = `netsh advfirewall set allprofiles firewallpolicy blockinbound,blockoutbound`;
    return new Promise((resolve, reject) => {
        cmdRun(cmd)
            .then(out => resolve(out))
            .catch(err => reject(err));
    });
};

exports.allowNode = () => {
    const cmd = `netsh advfirewall firewall add rule name="s" dir=in action=allow profile=any program="C:\\Program Files\\nodejs\\node.exe"
                & netsh advfirewall firewall add rule name = "s" dir = out action = allow profile = any program = "C:\\Program Files\\nodejs\\node.exe"
                `;
    return new Promise((resolve, reject) => {
        cmdRun(cmd)
            .then(out => {
                console.log("node allowed");
                resolve(out);
            })
            .catch(err => reject(err));
    });
};

exports.allowInternet = () => {
    const cmd = `netsh advfirewall reset`;
    return new Promise((resolve, reject) => {
        cmdRun(cmd)
            .then(out => {
                resolve(out);
            })

            .catch(err => reject(err));
    });
};

exports.getHostName = () => {
    cmd = `hostname`;
    return new Promise((resolve, reject) => {
        cmdRun(cmd)
            .then(out => {
                resolve(out);
            })
            .catch(err => reject(err));
    });
};

exports.getIps = () => {
    cmd = `for /L %i in (0,1,255) do ping -n 1 -w 250 192.168.1.%i`;
    return new Promise((resolve, reject) => {
        cmdRun(cmd)
            .then(out => {
                resolve(out);
            })
            .catch(err => reject(err));
    });
};

exports.addIp = host => {
    return new Promise((resolve, reject) => {
        fs.writeFile(ipsDataPath, JSON.stringify(host), err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};
