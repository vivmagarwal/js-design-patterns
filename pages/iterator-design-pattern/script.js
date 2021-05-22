console.log('iterator-design-pattern works!!');

// Example from Mosh's course
// https://codewithmosh.com/courses/759570/lectures/13732430

(()=>{
 
  class BrowserHistory {
    constructor() {
      this.urls = [];
    }

    push(url) {
      this.urls.push(url);
    }

    pop() {
      return this.urls.pop();
    }

    getUrls() {
      return this.urls;
    }
  }

  let history = new BrowserHistory();
  history.push("a");
  history.push("b");
  history.push("c");

  history.getUrls().forEach((url) => console.log(url));
  
})();

// problem with above solution:
/**
 * if tomorrow we decide to use a different data structure to store the list of urls we have visited, our client 
 * code is going to break. the new datastructure may not understand push / pop; 
 * 
 * A change in the internals of our Browser history should ideally not brek the client code. Changing the 
 * internals of an object should not affect it's consumers.
 * 
 * Solving the problem with iterator pattern.
 * 
 * We want to be doing something like the following at the client side:
 * while(history.hasNext()) {
 *   let current = history.current();
 *   // do something with current 
 *   history.next()
 * }
 * 
 * At client code, we need not worry about the internal representation of the urls
 */

(() => {
   
  class Iterator {
    next() { /* abstract */ }
    current() { /* abstract */ }
    hasNext() { /* abstract */ }
  }

  class ListIterator {
    constructor(history) {
      this.history = history;
      this.index = 0;
    }

    next() {
      this.index++;
    }

    current() {
      return history.urls[index];
    }

    hasNext() {
      return (this.index < history.urls.length);
    }
  }
 
  class BrowserHistory {
    constructor() {
      this.urls = [];
    }

    push(url) {
      this.urls.push(url);
    }

    pop() {
      return this.urls.pop();
    }

    getUrls() {
      return this.urls;
    }

    createIterator() {
      return new ListIterator(this);
    }
  }

  let history = new BrowserHistory();
  history.push("a");
  history.push("b");
  history.push("c");
  history.push("d");

  let iterator = history.createIterator();
  while (iterator.hasNext()) {
    console.log(iterator.current);
    iterator.next();
  }


  history.getUrls().forEach((url) => console.log(url));
  
})();


(() => {
   
  class Iterator {
    next() { /* abstract */ }
    current() { /* abstract */ }
    hasNext() { /* abstract */ }
  }

  class ListIterator {
    constructor(history) {
      this.history = history;
      this.index = 0;
    }

    next() {
      this.index++;
    }

    current() {
      return history.urls[index];
    }

    hasNext() {
      return (this.index < history.urls.length);
    }
  }
 
  class BrowserHistory {
    constructor() {
      this.urls = [];
    }

    push(url) {
      this.urls.push(url);
    }

    pop() {
      return this.urls.pop();
    }

    getUrls() {
      return this.urls;
    }

    createIterator() {
      return new ListIterator(this);
    }
  }

  // Client / usage:

  let history = new BrowserHistory();
  history.push("a");
  history.push("b");
  history.push("c");
  history.push("d");

  let iterator = history.createIterator();
  while (iterator.hasNext()) {
    console.log(iterator.current);
    iterator.next();
  }


  history.getUrls().forEach((url) => console.log(url));
  
})();