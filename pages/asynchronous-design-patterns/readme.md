# Asynchronous Design Patterns

- Callbacks
- Promises
- Async Await
- Generators

### The event loop

The purpose of the event loop is to make sure that all the code is handled. JavaScript has a single threaded environment, we can only execute one piece of code at a time. But the event loop makes it possible to achieve asynchronicity because we're able to set code aside such as a callback that was created by set timeout, set that aside and then the event loop will check for that and make sure that it gets taken care of when it's time to execute that.

### Callbacks
Traditionally the callbacks were the only way of acheiving asyncronicity in javascipt. The modern patterns like Promises / Async await relies on callbacks, so its important to understand them.

A Callback is simply a function that is invoked after something else happens and it is acheived by passing a function to another function as an argument in Javascript. The function that we pass to an other function, is called back after something else happens. 


