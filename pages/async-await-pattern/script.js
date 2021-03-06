console.log('async-await-pattern works!!');

// async function f() {
//   return Promise.resolve(1);
// }
// f().then((data) => console.log(data));


// async function f() {
//   return 1; // equivalent to return Promise.resolve(1);
// }

// f().then((data) => console.log(data));

// ===================================================== //

// async function f2() {
//   let promise_object_post_one = fetch(`https://jsonplaceholder.typicode.com/posts/1`);
//   let response = await promise_object_post_one; // (#1)
//   let data = await response.json(); // (#2)
//   console.log(data.title);
// }

// f2();

// ===================================================== //
// #1 and #2 are often written in a single line like the following
// let data = await promise_object_post_one.then(data => data.json());
// ===================================================== //

// async function f3() {
//   try {
//     let response = await fetch('http://no-such-url');
//   } catch (err) {
//     console.log(err); // TypeError: failed to fetch
//   }
// }

// f3();

// ===================================================== //

// async function moviePlanets(movieNum) {
//   let films_url = 'https://swapi.dev/api/films/';
//   try {
//     if (typeof movieNum !== 'number') {
//       // We can use throw to create an exeption if we need one. 
//       throw "You must pass in a number.";
//     }
//     let movie_response = await fetch(films_url + movieNum + '/');
//     let movie_data = await movie_response.json();
//     console.log('Movie title: ', movie_data.title);

//     let planets = movie_data.planets;
//     let planets_promise_array = planets.map((url) => fetch(url).then((response) => response.json()));

//     // normal loops like for..each doesnot work.
//     for await (let pl of planets_promise_array) {
//       console.log('planet: ', pl.name);
//     }
//   } catch (e) {
//     console.error('Error: ', e)
//   }
// }

// moviePlanets(1);

// ===================================================== //

// (async function () {
//   let response = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);
//   let obj = await response.json();
//   console.log(obj);
// })();

// ===================================================== //

// let blog_posts = [
//   'https://jsonplaceholder.typicode.com/posts/1',
//   'https://jsonplaceholder.typicode.com/posts/2',
//   'https://jsonplaceholder.typicode.com/posts/3'
// ];

// let blog_posts_promise_objects = blog_posts.map((post) => fetch(post));

// (async function () {
//   let responses = await Promise.all(blog_posts_promise_objects);
//   console.log(responses);
// })();

// ===================================================== //

// let user_obj = {
//   first_name: 'John',
//   last_name: 'Doe',
//   async get_todo() {
//     let response = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);
//     let obj = await response.json();
//     console.log(obj);
//   }
// }

// user_obj.get_todo();