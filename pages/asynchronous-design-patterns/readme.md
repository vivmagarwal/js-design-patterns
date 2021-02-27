# Asynchronous Design Patterns

- Callbacks
- Promises
- Async Await
- Generators


### Synchronous code
- A bunch of statements in **sequence**
- Each statement in a synchronous code is executed one after the other
- Each statement has to wait for the previous one to finish executing

```js
function ourSyncFunction() {
  console.log('Our first sync statement.');
  console.log('Our second sync statement.');
  console.log('Our third sync statement.');
  console.log('Our fourth sync statement.');
  console.log('Our fifth sync statement.');
}

ourSyncFunction();
```
The statements above will execute in **order**, outputting: 

```bash
Our first sync statement.
Our second sync statement.
Our third sync statement.
Our fourth sync statement.
Our fifth sync statement. 
```

That’s because it’s written **synchronously**.



### The event loop

The purpose of the event loop is to make sure that all the code is handled. JavaScript has a single threaded environment, we can only execute one piece of code at a time. But the event loop makes it possible to achieve asynchronicity because we're able to set code aside such as a callback that was created by set timeout, set that aside and then the event loop will check for that and make sure that it gets taken care of when it's time to execute that.

### Callbacks
Traditionally the callbacks were the only way of acheiving asyncronicity in javascipt. The modern patterns like Promises / Async await relies on callbacks, so its important to understand them.

A Callback is simply a function that is invoked after something else happens and it is acheived by passing a function to another function as an argument in Javascript. The function that we pass to an other function, is called back after something else happens. 


