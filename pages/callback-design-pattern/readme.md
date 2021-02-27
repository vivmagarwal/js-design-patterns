# Callback Design Pattern

Traditionally the callbacks were the only way of acheiving asyncronicity in javascipt. The modern patterns like Promises / Async await relies on callbacks, so its important to understand them.

A Callback is simply a function that is invoked after something else happens and it is acheived by passing a function to another function as an argument in Javascript. The function that we pass to an other function, is called back after something else happens. 

### Problems with Javascript Callbacks

- Bunch of nested callbacks becomes very **difficult to work with** and are popularly called a callback hell.
- Nested callbacks are **difficult to reason about**.
- We **turn the control of our program** to something else.

**MDN Definition:**
A Callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.

If a callback function is executed immediately, its called a **synchronous** callback. However, callbacks are often used to continue code execution after an asynchronous operation has completed, these are called **asynchronous** callbacks.

### synchronous callback function example
```
function processUserInput(first_name, last_name, callback) {
  // form an introduction text with first_name and last_name. 
  var intro_text = 'Hi, I am ' + first_name + ' ' + last_name + '.';
  // execute the callback function with our intro_text
  callback(intro_text);
}

// What we do with the intro is very flexible; as a third argument we can pass in function and we have an unlimited flexibilty of what we can do with the processed information.
processUserInput(
  'John',
  'Doe',
  function (intro) {
    console.log(intro)
  }
);
```

### asyncronous callback function example
```
let processUserInputAsync = function (first_name, last_name, callback) {
  setTimeout(function () {
    // form an introduction text with first_name and last_name. 
    var intro_text = 'Hi, I am ' + first_name + ' ' + last_name + '.';
    // execute the callback function with our intro_text
    callback(intro_text);
  }, 2000)
}

// What we do with the processed information is very flexible; as a third argument we can pass in function and we have an unlimited flexibilty of what we can do with the processed information. 
processUserInputAsync('James','Bond', function (intro) {
  console.log(intro);
});
```

