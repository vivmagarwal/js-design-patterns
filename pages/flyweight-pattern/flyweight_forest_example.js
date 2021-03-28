console.log('flyweight-pattern works!!');

class Tree {
  constructor(treeType) {
    this.treeType = treeType;
    this.x = null;
    this.y = null;
    console.log(`:::: >> constructing a tree of type: ${treeType}`);
  }

  getx() {
    return this.x;
  }

  setx(x) {
    this.x = x;
  }

  gety() {
    return this.y;
  }

  sety(y) {
    this.y = y;
  }
  
  draw() {
    console.log(`Drawing a tree of type : ${this.treeType} at (${this.x},${this.y})`);
  };
}

// Static Tree factory object
let TreeFactory =  {
  treeMap: new Map(),
  
  getTree: function (treeType) {
    let tree = this.treeMap.get(treeType);

    if (!tree) {
      tree = new Tree(treeType);
      this.treeMap.set(treeType, tree);
    }

    return tree;
  }
}


// Main / usage/ client 

let treeTypes = ["Neem", "Apple", "Mango", "Teak"];

let getRandomTree = function () {
  return treeTypes[(Math.floor(Math.random() * treeTypes.length))];
}

let getRandomX = function() {
  return Math.floor(Math.random() * 100);
}

let getRandomY = function() {
  return Math.floor(Math.random() * 100);
}

for (let i = 0; i < 20; i++) {
  let circle = TreeFactory.getTree(getRandomTree());
  circle.setx(getRandomX());
  circle.sety(getRandomY());
  circle.draw();
}
