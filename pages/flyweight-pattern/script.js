console.log('flyweight-pattern works!!');

// flyweight / something that we can share in different contexts.
// The treeImgae is dependent on tree type not the coordinates.
class TreeImage {
  constructor(treeType) {
    this.treeType = treeType;
    this.image = null; 
    console.log(`### >> constructing a TreeImage of type: ${treeType}`);
  }

  setImage(image) {
    this.image = image;
    console.log(`**** >> setting image ${this.image} for ${this.treeType} tree`);
  }

  getType() {
    return this.treeType;
  }
}


// each tree has a treeImage. The idea is to store and re-use a tree image.
// when instantiaing, a tree object is composed with a treeImage
class Tree {
  constructor(treeImageObject) {
    this.x = null;
    this.y = null;
    this.treeImageObject = treeImageObject;
    console.log(`:::: >> constructing a tree of type: ${this.treeImageObject.getType()}`);
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
    console.log(`Drawing a tree of type : ${this.treeImageObject.getType()} at (${this.x},${this.y})`);
   };
}

// Static TreeImage factory
// this is the only place in the app where we are managing / constructing a new TreeImage
let TreeImageFactory = {
  treeImageMap: new Map(),
  
  getTreeImage: function (treeType) {
    let treeImg = this.treeImageMap.get(treeType);

    if (!treeImg) {
      treeImg = new TreeImage(treeType);
      treeImg.setImage(`${treeType}.png`)
      this.treeImageMap.set(treeType, treeImg);
    }

    return treeImg;
  }
}


// Main / usage/ client 

let treeTypes = ["Neem", "Apple", "Mango", "Teak"];

let getRandomTreeType = function () {
  return treeTypes[(Math.floor(Math.random() * treeTypes.length))];
}

let getRandomX = function() {
  return Math.floor(Math.random() * 100);
}

let getRandomY = function() {
  return Math.floor(Math.random() * 100);
}

for (let i = 0; i < 20; i++) {
  //  we re-use the treeImage. We are not storing the treeImage for each tree.
  let tree = new Tree(TreeImageFactory.getTreeImage(getRandomTreeType()));

  tree.setx(getRandomX());
  tree.sety(getRandomY());

  // now that we have our tree ready, we can draw it.
  tree.draw();
}