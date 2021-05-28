function timeout(ms, promise) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject(new Error("timeout"));
        }, ms);
        promise.then(resolve, reject);
    });
}
function getLivePcs(start, end, time) {
    let ips = [];
    let forCounter = 0;
    return new Promise((resolve, reject) => {
        for (let i = start; i < end; i++) {
            const url = `http://192.168.1.${i}:5050`;
            timeout(time, fetch(url))
                .then(function (response) {
                    console.log(url + " " + response);
                    ips.push(url);
                    forCounter++;
                })
                .catch(function (error) {
                    console.log(url + " is not reachable");
                    forCounter++;
                    if (forCounter >= end - start) {
                        resolve(ips);
                    }
                });
        }
    });
}

function sendAction(target, action, time = 2000) {
    timeout(time, fetch(target + action))
        .then(function (response) {
            console.log("done");
        })
        .catch(function (error) {
            console.log("error", error);
        });
}
