# Promise Design Pattern

Promises provides a powerful async pattern in Javascript. Lots and losts of API's use promises. 

- A promise is simply a Javascript Object with properties & methods. 
- This Object (Promise) represents the eventual completing (or failure) of an Async Operation.
- When the opration completes, the Promise provides a resulting value.

This is how we construct a promise (Promise *producing* code):
```js
let promise = new Promise(function(resolve, reject){
  // executor : do something here...
})
```

The function passed to a new Promise is called the *executor*. The executor is called automatically and immediately by `new Promise`. When the executor obtains the result, it should call one of these callbacks:
- `resolve(value)`
- `reject(value)`

The `promise` object returned by the `new Promise` constructor has these internal propterties:
- `state` initially set to `pending`, then changes to either `fulfilled` or `rejected`. The `state` changes to `fulfilled` when `resolved` is called or it changes to `rejected` when `reject` is called.
- `result` is initially `undefined`, then it changes to `value` when `resolve(value)` is called or it changes to `error` when `reject(error)` is called.

The properties `state` and `result` of the Promise object are internal. We can't directly access them, we can use the methods `.then()` / `.catch()` / `.finally()` for that. These are called *consumer functions* in the world of Promise.

### then

The most important, fundamental one is `.then`.

The syntax is:
```javascript
  promise.then(function(result){}, function(error){});
```

### catch

`.catch(function(error){})` takes just one callback to handle errors.

The syntax is:
```js
  promise.catch(function(error){});
```

### finally

`.finally()` runs when a promise is settles, it doesn't matter wether the promise was resolved or rejected.

- A `finally` handler has no arguments. 
- A `finally` handler passes through the results and errors to the next handler. So, technically we can chain a `.then` to a `.finally`. Remember, `finally` is not meant to process a promise result, so, it passes through.

