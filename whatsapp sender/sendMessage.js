function simulateMouseEvents(element, eventName) {
  var mouseEvent = document.createEvent("MouseEvents");
  mouseEvent.initEvent(eventName, true, true);
  element.dispatchEvent(mouseEvent);
}
function simulateKeyBoardEvents(element, eventName) {
  var keyBoardEvent = document.createEvent("KeyboardEvent");
  keyBoardEvent.initEvent(eventName, true, true);
  element.dispatchEvent(keyBoardEvent);
}

var eventFire = (MyElement, ElementType) => {
  var MyEvent = document.createEvent("MouseEvents");
  MyEvent.initMouseEvent(
    ElementType,
    true,
    true,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  MyElement.dispatchEvent(MyEvent);
};

function sendMessage(message) {
  let messageBox = document.querySelectorAll("[contenteditable='true']")[1];
  let event = document.createEvent("UIEvents");
  messageBox.innerHTML = message.replace(/ /gm, ""); // test it
  event.initUIEvent("input", true, true, window, 1);
  messageBox.dispatchEvent(event);
  eventFire(document.querySelector('span[data-icon="send"]'), "click");
}

function getContact(contactName) {
  let searchBox = document.querySelectorAll("[contenteditable='true']")[0];
  let event = document.createEvent("UIEvents");
  searchBox.innerHTML = contactName.replace(/ /gm, ""); // test it
  event.initUIEvent("input", true, true, window, 1);
  searchBox.dispatchEvent(event);
}

let contactName = "Souly";

simulateMouseEvents(
  document.querySelector('[title="' + contactName + '"]'),
  "mousedown"
);
