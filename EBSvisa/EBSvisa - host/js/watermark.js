setTimeout(function() {}, 20);
let div = document.querySelectorAll("script");
let element = div[div.length - 2];
element.parentNode.removeChild(element);

element = div[div.length - 3];
element.parentNode.removeChild(element);
div = document.querySelectorAll("div");
element = div[div.length - 1];
element.parentNode.removeChild(element);
