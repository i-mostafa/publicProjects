function getSignUpData() {
    localStorage.removeItem("randid");
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

    let data = {
        firstName: firstName.value,
        lastName: lastName.value,
        userName: userName.value,
        eMail: eMail.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
        phoneNumber: phoneNumber.value,
        passportId: passportId.value,
        passportExpDate: passportExpDate.value,
        gender: gender.value,
        citizen: citizen.value,
        day: day.value,
        month: month.value,
        year: year.value,
        streetAddress: streetAddress.value,
        streetLine: streetLine.value,
        landMark: landMark.value,
        city: city.value,
        state: state.value,
        postalCode: postalCode.value,
        approve: "pending",
        visaState: "Not Valid"
    };

    if (checkUserName(userName.value)) {
        alert("sorry this user name is already used \n please, select another one");
    } else if (password.value !== confirmPassword.value) {
        alert("passwords not matched ");
    } else if (confirm("Prees Ok to confirm singing up")) {
        localStorage.setItem(userName.value, JSON.stringify(data));

        alert("your request is upon review!");
        window.location.href = "./login.html";
    }
}

function checkUserName(userName) {
    return localStorage.getItem(userName);
}
