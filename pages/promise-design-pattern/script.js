console.log('promise-design-pattern works!!');

let asyncFunction = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () { resolve('asyncFunction resolved after 2000ms'); }, 2000)
  });
}

let asyncFunction2 = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () { resolve('asyncFunction2 resolved after 3000ms'); }, 3000)
  });
}

let promise = asyncFunction();
console.log(promise);

let promise2 = promise.then((data) => {
  console.log(data);
  return asyncFunction2();
});

promise2.then((data) => console.log(data));


// chaining

asyncFunction().then((data) => {
  console.log(data);
  return asyncFunction2();
})
  .then((data) => {
    console.log(data);
  });

// using APIs - fetch returns a promise.
// Its much easier to read 

fetch('https://api.github.com/users/vivmagarwal')
  .then(function (data) {
    console.log(data);
    return data.json(); // fetch provides us this json function. data.json returns a promise. that's why we return it here in order to chain another then.
  })
  .then(function (data) {
    console.log(data.url);
  })
  .catch(function (err) {
    console.log(err);
  })

// first function in the then returns data & second an error.



console.log('This comes from the last line of the code!!');


// let setTimeoutP = function(time) {
//   return new Promise(function(res, rej) {
//       if (isNaN(time)) {
//           rej("A number is required.");
//       }
//       setTimeout(res, time);
//   });
// };

// setTimeoutP("word")
//   .then(function() {
//       console.log("Done");
//   })
//   .catch(function(err) {
//       console.log(err);
//   });

function delay(ms) {
  return new Promise(function (res, rej) {
    setTimeout(function () {
      res();
    }, ms)
  })
}

delay(3000).then(() => alert('runs after 3 seconds'));