console.log('callback-design-pattern starts!!');

// Synchronous callback function example. 
// This function is defined with a parameter intended for callback.
function processUserInput(first_name, last_name, callback) {
  // form an introduction text with first_name and last_name. 
  var intro_text = 'Hi, I am ' + first_name + ' ' + last_name + '.';
  // execute the callback function with our intro_text
  callback(intro_text);
}

processUserInput(
  'John',
  'Doe',
  function (intro) {
    console.log(' coming from line 16 ' + intro)
  }
);

// ================================================================== //

// Synchronous callback function example.
function calculate(num1, num2, cb) {
  return cb(num1, num2);
}

// (a,b) => a + b is equivalent to function(a,b) {return a + b}
console.log(calculate(2, 5, (a, b) => a + b));
console.log(calculate(2, 5, (a, b) => a * b));

// ================================================================== //

// Asynchronous callback function example.
let processUserInputAsync = function (first_name, last_name, callback) {
  setTimeout(function () {
    // form an introduction text with first_name and last_name. 
    var intro_text = 'Hi, I am ' + first_name + ' ' + last_name + '.';
    // execute the callback function with our intro_text
    callback(intro_text);
  }, 2000)
}

// ================================================================= //
function getPost(postNumber, cb) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${postNumber}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      cb(data);
  })
}

getPost(2, (data) => {
  console.log(data.title);
});

// fetch('https://jsonplaceholder.typicode.com/posts/3')
//   .then((response) => response.json())
//   .then((data) => console.log(data.title));


processUserInputAsync('James', 'Bond', function (intro) {
  console.log(intro);
});

// ================================================================== //

// Callback example. the function is called back whene ever the click event happends on the heading.
// When someone clicks on the heading, a message with the callback is added to the queue. 
// The event loop will eventually invoke the call back once it get's to that message.
let heading = document.getElementById('callback-design-pattern');
heading.addEventListener("click", function (e) {
  console.log("The heading was clicked.");
})

// Note: The above two functions makes use of callbacks. they are asynchronous because of eventLister or setTimeout. they use callbacks. all callbacks need not be asynchronous.

// ================================================================== //

// Callback example. Building our own callback.

let booksList = [
  { title: 'Elequent Javascript', author: 'Marjin haverbeke', price: 100, ebook: true },
  { title: 'JavaScript & JQuery', author: 'Jon Duckett', price: 80, ebook: false },
  { title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', price: 70, ebook: true },
  { title: 'Learn JavaScript VISUALLY', author: 'Ivelin Demirov', price: 100, ebook: true },
  { title: 'You Don’t Know JS', author: 'Kyle Simpson', price: 100, ebook: true },
  { title: 'Beginning JavaScript', author: 'Jeremy McPeak', price: 90, ebook: true },
];

// my own function that uses a callback. I need a higer order function that takes in an array of books and just processes ebooks one by one.
let processOnlyEBooks = function (data, callback) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].ebook) {
      if (typeof callback === "function") {
        callback(data[i]);
      }
    }
  }
}

// the call back function gets object (data[i]) one by one on every iteration.
console.log('Here is a list of all all ebooks prices above 80: ');
processOnlyEBooks(booksList, function (obj) {
  if (obj.price > 80) {
    console.log(obj.title, obj.price, obj.ebook);
  }
});

// Closure to avoid polluting the global scope. just scoping the total & the count variable by IIFE.
(() => {
  let total = 0;
  let count = 0;

  processOnlyEBooks(booksList, function (obj) {
    total = total + obj.price;
    count++;
  })

  console.log(`
    There are total ${count} ebooks,
    In total all ebooks costs ${total},
  `);
})();

// ================================================================== //

// my own Async function that uses a callback. I need a higer order function that takes in an array of books and just processes ebooks one by one.
let processOnlyEBooksAsync = function (data, callback) {
  setTimeout(function () {
    for (let i = 0; i < data.length; i++) {
      if (data[i].ebook) {
        if (typeof callback === "function") {
          callback(data[i]);
        }
      }
    }
  }, 0)
}

processOnlyEBooksAsync(booksList, function (obj) {
  console.log(obj.title);
});


