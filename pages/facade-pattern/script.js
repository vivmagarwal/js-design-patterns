console.log('facade-pattern works!!');

// Facade
var addMyEvent = function (el, ev, fn) {
  if (el.addEventListener) {
    el.addEventListener(ev, fn, false);
  } else if (el.attachEvent) {
    el.attachEvent("on" + ev, fn);
  } else {
    el["on" + ev] = fn;
  }
};


// Client

addMyEvent(document.getElementById("facade-pattern"), "click", () => { console.log("Heading clicked.") });