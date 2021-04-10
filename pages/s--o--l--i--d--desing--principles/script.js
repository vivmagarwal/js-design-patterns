console.log('s--o--l--i--d--desing--principles works!!');

// ===================================================== //
// Single responsibility
// ===================================================== //


// all these could go inside PersistanceManager;
var idbAdapter = new LokiIndexedAdapter('finance');

var db = new loki("quickstart.db", {
  adapter:  idbAdapter
});

var users = db.addCollection("users");

users.insert({name:'odin', age: 50});
users.insert({ name: 'thor', age: 35 });

db.saveDatabase();

var result = users.find({ age: { $lte: 35 } });

idbAdapter.getDatabaseList(function(result) {
  result.forEach(function(str) {
    // console.log(str);
  });
});

// console.log(result);

class Joural {
  constructor() {
    this.entries = {};
    this.count = 0;
  }

  // responsibility 1. add remove entries
  addEntry(text) {
    let c = ++this.count;
    let entry = `${c}: ${text}`;
    this.entries[c] = entry;
    return c;
  }

  removeEntry(index) {
    delete this.entries[index];
  }

  toString() {
    return Object.values(this.entries).join('\n');
  }

  // responsibity 2. presist data; it may have several dependencies. no a good idea to mix them.
  save(filename) {
    console.log(`saved to ${filename}.`);
  }

  load(filename) {
    console.log(`loading from ${filename}.`);
  }

  loadFromUrl(url) {
    console.log(`loading from ${url}`);
  }
}

// group functionality into classes. dont mix them.
class PersistenceManager {
  preprocess(j) {
    //
  }

  saveToFile(journal, filename) {
    console.log(`saved to ${filename}.`);
  }
}

let j = new Joural();
j.addEntry('I exercised today.');
j.addEntry('I leaned to code today.');
j.addEntry('I exercised today.');

// console.log(j.toString());


// ===================================================== //
// Open/Closed
// ===================================================== //

