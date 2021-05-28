let textBar = document.getElementsByClassName("_1awRl")[1],
  textBarPlaceHolder = document.getElementsByClassName("Srlyw")[1];
textBarPlaceHolder.style.visibility = "hidden";
textBar.innerText = "hi merry";

let sendButtonDiv = document.getElementsByClassName("_3qpzV")[1];
sendButtonDiv.innerHTML =
  '<button class="_2Ujuu"><span data-testid="send" data-icon="send" class=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path></svg></span></button>';
let sendButton = document.getElementsByClassName("_2Ujuu")[0];
sendButton.click();
