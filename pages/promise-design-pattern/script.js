console.log('promise-design-pattern works!!');

// A Promise producing function.
// let asyncFunction = function () {
//   return new Promise(function (resolve, reject) {
//     setTimeout(function () { resolve('asyncFunction resolved after 2000ms'); }, 2000)
//   });
// }

// A Promise producing function
// let asyncFunction2 = function () {
//   return new Promise(function (resolve, reject) {
//     setTimeout(function () { resolve('asyncFunction2 resolved after 3000ms'); }, 3000)
//   });
// }

// let promise = asyncFunction();
// console.log(promise);

// let promise2 = promise.then((data) => {
//   console.log(data);
//   return asyncFunction2();
// });

// promise2.then((data) => console.log(data));

// chaining example.
// asyncFunction().then((data) => {
//   // console.log(data);
//   return asyncFunction2();
// })
//   .then((data) => {
//     console.log(data);
//   });

// using APIs - fetch returns a promise.
// Its much easier to read 

// fetch('https://api.github.com/users/vivmagarwal')
//   .then(function (data) {
//     console.log(data);
//     return data.json(); // fetch provides us this json function. data.json returns a promise. that's why we return it here in order to chain another then.
//   })
//   .then(function (data) {
//     console.log(data);
//   })
//   .catch(function (err) {
//     console.log(err);
//   })

// fetch('https://jsonplaceholder.typicode.com/posts/1')
//   .then((response) => {return response.json() }) // read response body and parse as JSON
//   .then((data) => {console.log(data) })
//   .catch((error) => {console.log(error)})

/**
 * What if we need to fetch data of three blog posts?
 */

let blog_posts = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3'
];

/**
 * One of the ways could be to chin the then's
 */

// fetch(blog_posts[0])
//   .then((data) => {
//     console.log(data);
//     return fetch(blog_posts[1])
//   })
//   .then((data) => {
//     console.log(data);
//     return fetch(blog_posts[2])
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   })

/**
 * Promise.all
 * if We want many promises to execute in paralled and wait unitl all of them are ready.
 * it takes in an array (iterable) if promises and returns a new promise
 * the new promise resolves when all the listed promises are settled, and the array of thir result becomes its result. 
 * 
 * Promise.all rejects as a whole if any promise rejects which is useful for all or nothing cases.
 */

// Promise.all([
//   fetch(blog_posts[0]),
//   fetch(blog_posts[1]),
//   fetch(blog_posts[2])
// ])
//   .then((data) => {
//    console.log(data);
//   })
//   .catch((err) => {
//    console.log(err);
//   })

// Samething using map

// let blog_posts_promise_objects = blog_posts.map((post) => fetch(post));

// Promise.all(blog_posts_promise_objects)
//   .then((data_array) => {
//     console.log(data_array);
//   })

/**
 * if any of the promises is rejected, the promise returned by Promise.all 
 * immediately rejects with that error.
 */

// Promise.allSettled
/**
 * Promise.allSettled just waits for all promises to settle (regardless of the result)
 * resulting array looks something like:
 * [
 *   { status: "fullfiled", value: result},
 *   { status: "rejected", reason: error}
 * ]
 */

//  Promise.allSettled([
//   fetch(blog_posts[0]),
//   fetch(blog_posts[1]),
//   fetch(blog_posts[2])
// ])
//   .then((data) => {
//    console.log(data);
//   })
//   .catch((err) => {
//    console.log(err);
//   })

// Promise.allSettled(blog_posts_promise_objects)
//   .then((data_array) => {
//     console.log(data_array);
//   });


/**
 *  What if we need to spin up multiple promises and wait only for the first promise to settle (resolve or reject)
 *  the result of the fastest or the first settled promise wins the race
 *  So, Promise.race just waits for the fastest settled promise and get's its result or error.
 *  we are making a few promises race, and the one that wins is returned and rest a are ignored.
 */

// Promise.race(blog_posts_promise_objects)
//   .then((data) => {
//     console.log(data);
//   });

// Promise.race([
//   fetch(blog_posts[0]),
//   fetch(blog_posts[1]),
//   fetch(blog_posts[2])
// ])
// .then((data) => {
//   console.log(data);
// })
// .catch((err) => {
//   console.log(err);
// })

/**
 * What if we need to spinup multiple promises and get the first one that resolves?
 * The fastest fulfilled promise wins the race of any.
 * if all the promises are rejected, then the returned promise is rejected with AgreegateError. The error has an errors property which contains an array of errors.
 */

//  Promise.any(blog_posts_promise_objects)
//   .then((data) => {
//     console.log(data);
//   });

// Promise.any([
//   fetch(blog_posts[0]),
//   fetch(blog_posts[1]),
//   fetch(blog_posts[2])
// ])
// .then((data) => {
//   console.log(data);
// })
// .catch((err) => {
//   console.log(err);
// })

/**
 * What if we want a function to guarentee to return promise.
 * Promise.resolve() method returns a settled promise object that is resolved with a given value.
 * Promise.reject() method returns a settled promise object that is rejected with a given value.
 */

// Promise.resolve("James") // returns a fulfilled promise object
//   .then((data) => console.log('data: ' + data),(error) => console.log('error: ' + error));

// Promise.reject("John") // returns a rejected promise object  
//   .then((data) => console.log('data: ' + data), (error) => console.log('error: ' + error))

// ---------- Promisification --------------- //
// conversion of a function that accepts a callback into a function that returns a promise.

// Example callback.

// ------------------------------------------- //

// var postNumber = 4
// fetch(`https://jsonplaceholder.typicode.com/posts/${postNumber}`)
//   .then(
//     (response) => {
//       if (response.ok) {
//         console.log('data: ', response);
//       } else {
//         console.log('data: ', 'Not OK, Something went wrong.');
//       }
//     },
//   )
//   .catch(
//     (error) => {
//       console.log('err: ', error);
//     }
//   )

// ------------------------------------------- //

function getPost(postNumber, cb) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${postNumber}`)
    .then(
      (response) => {
        if (response.ok) {
          return cb(null, response);
        } else {
          return cb(`Error fetching following post: ${postNumber}`, null);
        }
      },
    )
    .catch(
      () => {
        return cb(`Error fetching following post: ${postNumber}`, null);
      }
    )
}

// getPost(444, (err, post) => {
//   console.log('err: ', err);
//   console.log('post: ', post);
// });

// ------------------------------------------------------- //

// function getPostPromise(postNumber) {
//   return new Promise((resolve, reject) => {
//     fetch(`https://jsonplaceholder.typicode.com/posts/${postNumber}`)
//     .then(
//       (response) => {
//         if (response.ok) {
//           return resolve(response);
//         } else {
//           return reject(`Error fetching following post: ${postNumber}`);
//         }
//       },
//     )
//     .catch(
//       () => {
//         return reject(`Error fetching following post: ${postNumber}`);
//       }
//     )
//   })
// }

// getPostPromise(333)
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err))

// ---------------------------------------------------- //

// ------ a more flexible promisify function ---------- //

function promisify(f) {
  // the rest parameter allows a function to accept an indefinite number of arguments as an array.
  return function (...args) {
    return new Promise((resolve, reject) => {
      // our example, getPost takes in one argurment and a callback function. the callback expects two arguments (err, result) 
      // how to call f?
      // with arguments and finally the callback; example: getPost(2, (data) => console.log(data))
      f(...args, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
    })
  }
};

// let promisifiedGetPost = promisify(getPost)

// usage:
// promisifiedGetPost(4)
//   .then((data) => console.log(data));

// promisifiedGetPost(2)
//   .then((data) => console.log(data));  

// basically we are returning a function that retruns a new promise
// we call the original function with args and a callback
// we resolve the promise depending upon the result of the callback 

// A call to promisify(f) returns a wrapper around f(). That wrapper returns a promise and forwards the call to the original f, tracking the result in the custom callback.

// -------------------------------------------------------------- //

// --------------- Advanced Promisify --------------------------- //
// --------------- Promisify with several args ------------------ //
// ----- so the original callback looks like callback(err, res1, res2)

// example function with callback that accepts multiple arguments.

function getFirstThreePosts(cb) {
  let promise_object_one = fetch(`https://jsonplaceholder.typicode.com/posts/1`);
  let promise_object_two = fetch(`https://jsonplaceholder.typicode.com/posts/2`);
  let promise_object_three = fetch(`https://jsonplaceholder.typicode.com/posts/3`);
  Promise.allSettled([promise_object_one, promise_object_two, promise_object_three])
    .then(
      (response) => {
        cb(null, response[0].value, response[1].value, response[2].value);
      },
    )
    .catch(
      () => {
        cb(`Error fetching following post`, null, null, null);
      }
    )
}

// usage: with callback.
// getFirstThreePosts((err, post1, post2, post3) => {
//   console.log('err: ', err);
//   console.log('post1: ', post1);
//   console.log('post2: ', post2);
//   console.log('post3: ', post3);
// });

function advancedPromisify(f) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      f(...args, (err, ...results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      })
    })
  }
};

let promisifiedGetFirstThreePosts = advancedPromisify(getFirstThreePosts);

// usage:
// promisifiedGetFirstThreePosts()
//   .then((data) => {
//     console.log('data:  ', data);
//   })
