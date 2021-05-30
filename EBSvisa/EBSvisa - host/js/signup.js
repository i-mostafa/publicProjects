function signUp() {
    let reply = confirm("Prees Ok to confirm singing up");
    if (reply) {
        alert("your request is upon review!");
        window.location.href = "./login.html";
    }
}
