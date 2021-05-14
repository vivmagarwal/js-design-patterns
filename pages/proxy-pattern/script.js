console.log('proxy-pattern works!!');

// application for reading ebooks. 
// without proxy pattern.
(()=>{
  class Ebook {
    constructor(filename) {
      this.filename = filename;
      this.load();
    }
  
    load() {
      console.log("Loading the ebook: " + this.filename);
    }
  
    show() {
      console.log("Showing the ebook: " + this.filename);
    }
  
    getFileName() {
      return this.filename;
    }
  }
  
  class Library {
    constructor() {
      this.ebooks = new Map();
  
    }
  
    add(ebook) {
      this.ebooks.set(ebook.getFileName(), ebook);
    }
  
    open(filename) {
      this.ebooks.get(filename).show();
    }
  }
  
  // Main app
  let library = new Library();
  
  // relplicating - ebooks in disk
  let ebooks = ["a", "b", "c", "d", "e"];
  
  // for opening and ebook, we need to load all the ebooks in memory; then we can open it.
  // creating ebook object is costly
  ebooks.forEach(ebook => {
    library.add(new Ebook(ebook));
  });
  
  library.open("a");
})();

console.log('=======================================');

// proxy: same implementation with lazy or on-demand initialization
(() => {
  class Ebook {
    show() { };
    getFileName() { };
  }

  class RealEbook extends Ebook {
    constructor(filename) {
      super();
      this.filename = filename;
      this.load();
    }

    load() {
      console.log("Loading the ebook: " + this.filename);
    }
  
    show() {
      console.log("Showing the ebook: " + this.filename);
    }
  
    getFileName() {
      return this.filename;
    }
  }

  class EbookProxy extends Ebook {
    constructor(filename) {
      super();
      this.filename = filename;
      this.ebook = null; // we will initialize it on demand. Not at consturctor.
    }

    // load() {
    //   // lazy initialization. 
    //   if (!this.ebook) {
    //     this.ebook = new RealEbook(this.filename);
    //   }

    //   // forwarding the load request to the real ebook object.
    //   this.ebook.load();
    // }
  
    show() {
    // lazy initialization. 
    if (!this.ebook) {
      this.ebook = new RealEbook(this.filename);
    }
      
      console.log("Showing the ebook: " + this.filename);
    }
  
    getFileName() {
      return this.filename;
    }
  }

  class LoggingEbookProxy extends Ebook {
    constructor(filename) {
      super();
      this.filename = filename;
      this.ebook = null; // we will initialize it on demand. Not at consturctor.
    }

    // load() {
    //   // lazy initialization. 
    //   if (!this.ebook) {
    //     this.ebook = new RealEbook(this.filename);
    //   }

    //   // forwarding the load request to the real ebook object.
    //   this.ebook.load();
    // }
  
    show() {
      // lazy initialization. 
      if (!this.ebook) {
        this.ebook = new RealEbook(this.filename);
      }
      console.log("Logging");
      console.log("Authenticating");

      console.log("Showing the ebook: " + this.filename);
    }
  
    getFileName() {
      return this.filename;
    }
  }

  class Library {
    constructor() {
      this.ebooks = new Map();
  
    }
  
    add(ebook) {
      this.ebooks.set(ebook.getFileName(), ebook);
    }
  
    open(filename) {
      this.ebooks.get(filename).show();
    }
  }


  // Main app / Client
  let library = new Library();
  
  // relplicating - ebooks in disk
  let ebooks = ["a", "b", "c", "d", "e"];
  
  // for opening and ebook, we need to load all the ebooks in memory; then we can open it.
  // creating ebook objects is costly
  ebooks.forEach(ebook => {
    library.add(new EbookProxy(ebook)); // Can easily replace proxies here.
  });
  
  library.open("a");
})();
