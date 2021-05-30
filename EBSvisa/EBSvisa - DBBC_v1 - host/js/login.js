let loginUserName;
function login() {
    let loginPass = document.getElementById("loginPass");
    loginUserName = document.getElementById("loginUserName");
    let loginRememberMe = document.getElementById("loginRememberMe");
    if (checkUserName(loginUserName.value)) {
        let data = JSON.parse(localStorage.getItem(loginUserName.value));
        if (data.approve === "activated") {
            if (data.password !== loginPass.value) {
                alert("wrong password");
            } else {
                localStorage.setItem("login", loginUserName.value);
                if (loginUserName.value === "superUser") {
                    window.location.href = "./admin.html";
                } else {
                    window.location.href = "./home.html";
                }
            }
        } else {
            alert("your account is still under approvment \n please try again later");
        }
    } else {
        alert("user name not found");
    }
}

function checkUserName(userName) {
    return localStorage.getItem(userName);
}
document.getElementsByTagName("body").onload = dbInit();
function dbInit() {
    if (!localStorage.getItem("superUser")) {
        let data = { userName: "superUser", password: "#wi%me@bar", approve: "activated" };
        localStorage.setItem("superUser", JSON.stringify(data));
        let mainBlock = {};
        mainBlock[0] = {
            timestamp: "20/02/2020",
            transactions: "genesis block",
            previousHash: "0",
            hash: "8d558f96bae3c2ff708644c7bd2183280a02a210de5ef0a5d5fa58e185b51f20",
            nonce: 0
        };
        localStorage.setItem("Blocks", JSON.stringify(mainBlock));
        localStorage.setItem("transactions", JSON.stringify({}));
        localStorage.setItem("previousHash", JSON.stringify("0"));
    }
}
function getProfile() {
    let loginUserName = localStorage.login;
    if (loginUserName) {
        let data = JSON.parse(localStorage.getItem(loginUserName));
        let firstName = document.getElementById("firstName");
        let lastName = document.getElementById("lastName");
        let eMail = document.getElementById("eMail");
        let phoneNumber = document.getElementById("phoneNumber");
        let passportId = document.getElementById("passportId");
        let visaExpDate = document.getElementById("visaExpDate");
        let dateOfBirth = document.getElementById("dateOfBirth");
        let visaType = document.getElementById("visaType");
        let visaState = document.getElementById("visaState");
        let daysLeft = document.getElementById("daysLeft");
        let info = document.getElementById("info");
        let visaDateModify = document.getElementById("visaDateModify");
        let daysLeftModify = document.getElementById("daysLeftModify");
        firstName.innerHTML = data.firstName;
        lastName.innerHTML = data.lastName;
        eMail.innerHTML = data.eMail;
        phoneNumber.innerHTML = data.phoneNumber;
        passportId.innerHTML = data.passportId;
        dateOfBirth.innerHTML = data.year + "-" + getMonthFromString(data.month) + "-" + data.day;
        visaState.innerHTML = data.visaState;

        if (data.visaState === "Valid") {
            if (checkDate(data.startDate)) {
                visaDateModify.innerHTML = "Exp-date";
                daysLeftModify.innerHTML = "Days Left";
                visaType.innerHTML = data.visaType;
                daysLeft.innerHTML = data.daysLeft;
                visaExpDate.innerHTML = data.endDate;
            } else {
                daysLeftModify.innerHTML = "# Days";
                visaDateModify.innerHTML = "St-date";
                visaType.innerHTML = data.visaType;
                daysLeft.innerHTML = data.daysLeft;
                visaExpDate.innerHTML = data.startDate;
            }
        } else {
            visaDateModify.innerHTML = "Exp-date";
            daysLeftModify.innerHTML = "Days Left";
            visaType.innerHTML = "No visa";
            visaExpDate.innerHTML = "Expired";
            daysLeft.innerHTML = 0;
        }
    } else {
        window.location.href = "./login.html";
    }
}

function editData(loginUserName, attribute, value) {
    let data = JSON.parse(localStorage.getItem(loginUserName));
    data[attribute] = value;
    data = JSON.stringify(data);
    localStorage.setItem(loginUserName, data);
    if (attribute == "approve" && value != "activated") {
        localStorage.removeItem("login");
    }
}
function getMonthFromString(mon) {
    return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1;
}

function calcDaysLeft(startDate, endDate) {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    const diffTime = date2 - date1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffDays);
    return diffDays;
}

function checkAuthorization() {
    if (!localStorage.login) {
        window.location.href = "./login.html";
    }
}

function signOut() {
    localStorage.removeItem("login");
    window.location.href = "./login.html";
}

function getVisaData() {
    let loginUserName = localStorage.login;
    let visaType = document.getElementById("visaType");
    let startDate = document.getElementById("startDate");
    let endDate = document.getElementById("endDate");
    let daysLeft = calcDaysLeft(startDate.value, endDate.value);
    if (daysLeft <= 0) {
        alert("please select a valid date ");
        return;
    }
    let visaCost = calcVisaCost(visaType.value, daysLeft);
    editData(loginUserName, "visaType", visaType.value);
    editData(loginUserName, "startDate", startDate.value);
    editData(loginUserName, "visaState", "Not Paied");
    editData(loginUserName, "endDate", endDate.value);
    editData(loginUserName, "daysLeft", daysLeft);
    editData(loginUserName, "visaCost", visaCost);
    window.location.href = "./payment.html";
}

function getVisaUpdate() {
    let udateDate = document.getElementById("updateDate");

    let loginUserName = localStorage.login;
    let data = JSON.parse(localStorage.getItem(loginUserName));
    let daysLeft = calcDaysLeft(data.endDate, udateDate.value);
    let visaCost = calcVisaCost(data.visaType, daysLeft);
    if (daysLeft <= 0) {
        alert("please enter a date after expiration date");
        return;
    }
    editData(loginUserName, "uvisaCost", visaCost);
    editData(loginUserName, "uvisaState", "Not Paied");
    editData(loginUserName, "uendDate", udateDate.value);
    window.location.href = "./payment.html";
}
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

function checkDate(date) {
    let now = new Date();
    mydate = new Date(date);
    if (now <= mydate) {
        return false;
    }
    return true;
}

function mainData() {
    let loginUserName = localStorage.login;
    let data = JSON.parse(localStorage.getItem(loginUserName));
    let passportId = document.getElementById("passportId");
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    firstName.innerHTML = data.firstName;
    lastName.innerHTML = data.lastName;
    passportId.innerHTML = data.passportId;
}
function calcVisaCost(visaType, daysLeft) {
    switch (visaType) {
        case "Tourism":
            return 50 * daysLeft;
            break;
        case "Work":
            return 70 * daysLeft;
            break;
        case "Hijj and Umrah":
            return 150 * daysLeft;
            break;
    }
}
function getVisaCost() {
    let visaCost = document.getElementById("visaCost");
    let loginUserName = localStorage.login;
    let data = JSON.parse(localStorage.getItem(loginUserName));
    visaCost.innerHTML = data.visaCost;
}

function pay() {
    let loginUserName = localStorage.login;
    let data = JSON.parse(localStorage.getItem(loginUserName));
    editData(loginUserName, "visaState", "pending");
    editData(loginUserName, "uvisaState", "pending");
    let transaction = { loginUserName: loginUserName, amount: data.visaCost };
    addTransToDB(transaction);
    window.location.href = "./home.html";
}

function getExpDate() {
    let expDate = document.getElementById("expDate");
    let loginUserName = localStorage.login;
    let data = JSON.parse(localStorage.getItem(loginUserName));
    expDate.innerHTML = data.endDate;
}

function approveVisa(loginUserName) {
    let data = JSON.parse(localStorage.getItem(loginUserName));
    if (data.visaState == "pending") {
        editData(loginUserName, "visaState", "Valid");
        location.reload(true);
    }
}
function approveUpdate(loginUserName) {
    let data = JSON.parse(localStorage.getItem(loginUserName));
    if (data.uvisaState == "pending") {
        editData(loginUserName, "visaState", "Valid");
        editData(loginUserName, "visaCost", data.uvisaCost);
        editData(loginUserName, "endDate", data.uendDate);
    }
}
function approveUser(loginUserName) {
    editData(loginUserName, "approve", "activated");
    generateBlock();
    location.reload(true);
}
function resetPass() {
    let eMail = document.getElementById("eMail");
    if (!eMail.value) {
        return;
    }
    let index = searchForEmail(eMail.value);
    if (index >= 0) {
        let loginUserName = localStorage.key(index);
        let data = JSON.parse(localStorage.getItem(loginUserName));
        let subject = "EBS BLOCKCHAIN";
        let newPassword = generatePassword();
        editData(loginUserName, "password", newPassword);
        let body = `hi ${data.firstName} we receive a request to reset your passowrd \n
        and your new password is \n "${newPassword}"`;
        sendEmail(eMail.value, subject, body);
        alert("Check your mail for your new password!");
        window.location.href = "../login.html";
    } else {
        alert("there is no account attached with this email!");
    }
}

function searchForEmail(eMail) {
    for (let i = 0; i < localStorage.length; i++) {
        let loginUserName = localStorage.key(i);
        if (loginUserName === "randid") {
            continue;
        }
        let data = JSON.parse(localStorage.getItem(loginUserName));
        if (eMail === data.eMail) {
            return i;
        }
    }
    return -1;
}

function generatePassword() {
    return Math.random()
        .toString(36)
        .slice(-8);
}

function fill_data() {
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let eMail = document.getElementById("eMail");
    let userName = document.getElementById("userName");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirmPassword");
    let phoneNumber = document.getElementById("phoneNumber");
    let passportId = document.getElementById("passportId");
    let passportExpDate = document.getElementById("passportExpDate");
    let gender = document.getElementById("gender");
    let citizen = document.getElementById("citizen");
    let day = document.getElementById("day");
    let month = document.getElementById("month");
    let year = document.getElementById("year");
    let streetAddress = document.getElementById("streetAddress");
    let streetLine = document.getElementById("streetLine");
    let landMark = document.getElementById("landMark");
    let city = document.getElementById("city");
    let state = document.getElementById("state");
    let postalCode = document.getElementById("postalCode");
}

function drawAccRequests(selector, approveState) {
    let isDrawen = false;
    for (let i = 0; i < localStorage.length; i++) {
        let loginUserName = localStorage.key(i);
        if (loginUserName === "randid" || loginUserName === "superUser" || loginUserName === "login") {
            continue;
        }
        let data = JSON.parse(localStorage.getItem(loginUserName));
        if (data[selector] === approveState) {
            drawAccRequest(selector, loginUserName, approveState);
            isDrawen = true;
        }
    }
    if (!isDrawen) {
        drawNoThing();
    }
}

function drawAccRequest(selector, loginUserName, approveState) {
    let data = JSON.parse(localStorage.getItem(loginUserName));
    let drawer = document.getElementById("request-list");
    let dateOfBirth = data.year + "-" + getMonthFromString(data.month) + "-" + data.day;
    let address = data.streetAddress + "-" + data.streetLine + "-" + data.landMark + "-" + data.city + "-" + data.state;
    let acceptButton = " ";
    let visaData = `</br>Visa State: <span id="postalCode">${data.visaState}</span>
            </br>Visa Type: <span id="postalCode">${data.visaType}</span>
            </br>Star tDate: <span id="postalCode">${data.startDate}</span>
            </br>End Date: <span id="postalCode">${data.endDate}</span>`;

    let userData = `Name:  <span id="lastName"> ${data.lastName}</span> <span id="firstName">${data.firstName}</span></br>userName:
                <span id="userName">${data.userName}</span></br>Email:
                <span id="eMail">${data.eMail}</span></br> Phone Number: <span id="phoneNumber">${data.phoneNumber}</span></br> Passport Id:
                <span id="passportId">${data.passportId}</span></br> Passport ExpDate: <span id="passportExpDate">${data.passportExpDate}</span> </br>citizen:
                <span id="citizen">${data.citizen}</span> </br>Date of birth: <span id="dateOfBirth">${dateOfBirth}</span></br> Address:
                <span id="Address">${address}</span> </br>Postal code: <span id="postalCode">${data.postalCode}</span>
                `;
    if (selector === "approve") {
        if (approveState === "pending") {
            acceptButton = ` <input
            type="button"
            value="accept"
            onclick="approveUser('${loginUserName}')"
            style=" width: 25%; margin: 0 0 10px 0 ; float: right;"
        />`;

            visaData = " ";
        }
    } else if (selector === "visaState") {
        userData = `Name:  <span id="lastName"> ${data.lastName}</span> <span id="firstName">${data.firstName}</span></br>userName:
                <span id="userName">${data.userName}</span></br>Email:
                <span id="eMail">${data.eMail}</span></br> Phone Number: <span id="phoneNumber">${data.phoneNumber}</span></br> Passport Id:
                <span id="passportId">${data.passportId}</span></br> Passport ExpDate: <span id="passportExpDate">${data.passportExpDate}</span></br>`;
        acceptButton = ` <input
            type="button"
            value="accept"
            onclick="approveVisa('${loginUserName}')"
            style=" width: 25%; margin: 0 0 10px 0 ; float: right;"
        />`;
    }

    let drawingData = ` <div>
                        <p class="acc-request" style="display: inline-block;">
                        ${userData}
                        ${visaData}
                        </p>
                        ${acceptButton}
                    </div>`;
    drawer.innerHTML += drawingData;
}

function drawNoThing() {
    let drawer = document.getElementById("request-list");
    let drawingData = `
                <p style="margin:70px; font-size:20px">No thing to preview</p>`;
    drawer.innerHTML = drawingData;
}

function drawBlock(block, i) {
    let drawer = document.getElementById("request-list");
    let blockData = `TimeStamp: <span > ${block.timestamp}</span> </br>Hash:
                <span>${block.hash.substr(0, 30)}</span>
                </br>
                <span>${block.hash.substr(31)}</span></br></br>Previeus Hash:
                <span>${block.previousHash.substr(0, 30)}</span>
                </br>
                <span>${block.previousHash.substr(31)}</span></br>
                `;
    let transactionsData = drawTransactions(block.transactions);
    let drawingData = ` 
                        <p style="margin: 0px; font-size:25px"> Block #${i} </p>
                        <div>
                        <p class="acc-request" style="display: inline-block;">
                        ${blockData}
                        ${transactionsData}
                        </p>
                    </div>`;
    drawer.innerHTML += drawingData;
}
function drawTransactions(transactions) {
    let transactionsData = "";
    for (let i = 0; i < transactions.length; i++) {
        transactionsData += `</br>From: <span > ${transactions[i].loginUserName}
        </span></br> Amount:
                <span>${transactions[i].amount}</span></br>
                `;
    }
    return transactionsData;
}

function drawBlocks() {
    let data = JSON.parse(localStorage.getItem("Blocks"));
    for (let i = 1; i < data.length() - 1; i++) {
        drawBlock(data[i], i);
    }
}

function getNetBalance() {
    let balance = document.getElementById("balance");
    let data = JSON.parse(localStorage.getItem("Blocks"));
    let netBalance = 0;
    for (let i = 1; i < data.length() - 1; i++) {
        for (let j = 0; j < data[i].transactions.length; j++) {
            netBalance += Number(data[i].transactions[j].amount);
        }
    }
    balance.innerHTML = netBalance;
}
