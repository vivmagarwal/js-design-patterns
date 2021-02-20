# Callback Design Pattern

Traditionally the callbacks were the only way of acheiving asyncronicity in javascipt. The modern patterns like Promises / Async await relies on callbacks, so its important to understand them.

A Callback is simply a function that is invoked after something else happens and it is acheived by passing a function to another function as an argument in Javascript. The function that we pass to an other function, is called back after something else happens. 

### Problems with Javascript Callbacks

- Bunch of nested callbacks becomes very **difficult to work with** and are popularly called a callback hell.
- Nested callbacks are **difficult to reason about**.
- We **turn the control of our program** to something else.


