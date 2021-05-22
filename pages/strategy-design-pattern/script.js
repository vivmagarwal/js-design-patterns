console.log('strategy-design-pattern works!!');

// Example from Mosh's course
// https://codewithmosh.com/courses/759570/lectures/13732452

// The probelm that we're trying to solve.
(() => {
  
  class ImageStorage {
    constructor(compressor, filter) {
      this.compressor = compressor;
      this.filter = filter;
    }

    /**
     * This class is violating the single responsibility principle. This class is responsible for
     * string image and compressing an image and applying filter to an image
     * 
     * Unmaintainable - the more filters and compressors we support, the more bulky our class would become
     * 
     * Open the code - It's difficult to support new compressors and new filters. Every time we want to support a new filter
     * we have open the code.
     */
    store(fileName) {
      // compress to jpeg, png ...
      // filters highContrast, b&w
      if (this.compressor == 'jpeg') {
        console.log("compressing using jpeg");
      } else if (this.compressor == 'png') {
        console.log("compressing using png");
      }

      if (this.filter == 'bnw') {
        console.log("applying bnw filter");
      } else if (this.filter == 'highContrast') {
        console.log("applying hi contrast filter");
      }
    }
  }

  // usage
  let store = new ImageStorage("jpeg", "bnw");
  store.store('sun.jpeg');
  
})();



// solution
(() => {
  // Context
  class ImageStorage {
    constructor(compressor, filter) {
      this.compressor = compressor;
      this.filter = filter;
    }

    store(fileName) {
      this.compressor.compress(fileName);
      this.filter.filter(fileName);
    }
  }

  // concreate Stragegy - both compressons implement same interface (Strategy)
  class JpegCompressor {
    compress(fileName) {
      console.log("compressing using jpeg");
    }
  }

  // concreate Stragegy 
  class PngCompressor {
    compress(fileName) {
      console.log("compressing using png");
    }
  }

  // concreate Stragegy - both filters implements same interface (Strategy)
  class BnwFilter {
    filter(fileName) {
      console.log("applying bnw filter");
    }
  }

  // concreate Stragegy 
  class HighContrastFilter {
    filter(fileName) {
      console.log("applying hi contrast filter");
    }
  }

  // usage
  let store = new ImageStorage(new JpegCompressor(), new BnwFilter());
  store.store('sun.jpg')

})();

/**
 * * * * * * * * * *  * * * * * * * * * *  * * * * * 
 * The way we implement them is similar - we change the way an object behaves at runtime
 * In both of them we use polymorphism - where we simply forward an action to a separate object
 * 
 * just the problems that we're trying to solve [ use case ] are different
 * * * * * * * * * * * * * * * * * * * * * *  * * * 
 * 
 * The structure of the strategy pattern looks very similar to the state pattern
 * We use both these patterns to change the behaviour of an object
 * the difference between the state and stratgy patten is that - 
 * 
 * In the state patten - 
 * the context can have a state and all the behaviours are 
 * represented by the subclasses of the abstract state interface
 * 
 * it like extending stragegy to use it in a different manner
 * 
 * example we have a system that has a document workflow
 * we do different things with those documents
 * we draft it, review it, pulish it
 * we have different state of this document
 * 
 * we may want the object (document) differently based on the current state
 * So, instead of creating an object with a fixed algorithm, we would basically build a finite-state-machine
 * 
 * State object change druing runtime.
 * 
 * 
 * **************************
 * In strategy, we dont have a single state. Different behaviours are represented by
 * different strategy objects.
 * 
 * strategy is a means of defining a family of algorithms that do common thing but in different ways depending on some sort of governance.
 * You can make them interchangeable. It's about taking an algorithm out of an object and putting it in a separate class.
 * 
 * Strategy interface usully have one method called (similar to) execute.
 * 
 * A Very common example is Storing - Same act of sorting but in different ways
 */