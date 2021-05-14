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

// ===================================================== //
console.log('================= Example 2 ======================');

class Point {
  constructor(x,y,pointType,icon) {
    this.x = x;
    this.y = y;
    this.pointType = pointType;
    this.icon = icon;
  }

  draw() {
    console.log(`drawing a ${this.pointType} at (${this.x}/${this.y})`);
  }
}

class PointService {
  constructor() {

  }

  getPoints() {
    let points = [];
    points.push(new Point(1, 3, "CAFE", "cafe-icon"));
    return points;
  }

}

// main
let service = new PointService();
let points = service.getPoints();

points.forEach(point => {
  point.draw();
});

// Problem for 100 cafe's 100 icons are loaded in the memory
// icon is dependent on type and not X or Y coordinate
// it is our flyweitght
class PointIcon {
  constructor(pointType,icon) {
    this.pointType = pointType;
    this.icon = icon;
    console.log('PointIcon constructed');
  }

  getPointType() {
    return this.pointType;
  }
}

// Ensure that identical objects are reused and not re created every time.
class PointIconFactory {
  constructor() {
    this.icons = {};
  }

  getPointIcon(type) {
    if (!(type in this.icons)) {
      let icon = new PointIcon(type, `icon-of-${type}.png`);
      this.icons[type] = icon;
    }

    return icons[type];
  }
}

class LightPoint {
  constructor(x,y, pointIcon) {
    this.x = x;
    this.y = y;
    this.pointIcon = pointIcon;
  }

  draw() {
    console.log(`drawing a ${this.pointIcon.getPointType()} at (${this.x}/${this.y})`);
  }
}

class LightPointService {
  constructor(pointIconFactory) {
    this.pointIconFactory = pointIconFactory;
  }

  getPoints() {
    let points = [];
    let point = new LightPoint(1, 2, this.pointIconFactory.getPointIcon("CAFE"));
  }
}

let light_service = new LightPointService( new PointIconFactory());
let light_points = service.getPoints();

points.forEach(point => {
  point.draw();
});