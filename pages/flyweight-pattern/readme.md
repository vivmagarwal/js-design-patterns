# Flyweight Pattern

**Flyweight** is a structural design pattern that let's you fit more objects in to the available amount of RAM by **sharing** common parts of state between multiple objects instead of keeping all of the data in each object.

The flyweight pattern is a classical structural solution for optimizing code that is repetitive, slow and inefficiently shares data. It aims to minimize the use of memory in an application by sharing as much data as possible with related objects. 

In practice, Flyweight data sharing can involve taking several similar objects or data constructs used by a number of objects and placing this data into a single **external object**. We can **pass through** this object to those depending on this data, rather than **storing** *identical data* across each one.

The Flyweight is a space optimization technique that let's us use less memory by string externally the data associated with similar objects.

A great example could be a forest (game) app where we need to draw thousands of trees. An example implementation could be something like this:

### A Tree class

```
class Tree {
  constructor(treeType) {
    this.treeType = treeType;
    this.x = null;
    this.y = null;
    this.image = null;
    console.log(`:::: >> constructing a tree of type: ${treeType}`);
  }

  setImage(image) {
    this.image = image;
    console.log(`**** >> setting image ${this.image} for ${this.treeType} tree`);
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
```

### Helper functions at client code

```
let getRandomTree = function () {
  return treeTypes[(Math.floor(Math.random() * treeTypes.length))];
}

let getRandomX = function() {
  return Math.floor(Math.random() * 100);
}

let getRandomY = function() {
  return Math.floor(Math.random() * 100);
}
```

### Usage at client code

```
for (let i = 0; i < 20; i++) {
  let randomTreeType = getRandomTree();
  
  let tree = new Tree(randomTreeType); // #(1)
  tree.setImage(`${randomTreeType}.png`); // #(2)

  tree.setx(getRandomX());
  tree.sety(getRandomY());

  tree.draw();
}
```

### Output
```bash
:::: >> constructing a tree of type: Apple
**** >> setting image Apple.png for Apple tree
Drawing a tree of type : Apple at (20,5)
:::: >> constructing a tree of type: Mango
**** >> setting image Mango.png for Mango tree
Drawing a tree of type : Mango at (34,5)
:::: >> constructing a tree of type: Mango
**** >> setting image Mango.png for Mango tree
Drawing a tree of type : Mango at (75,31)
:::: >> constructing a tree of type: Apple
**** >> setting image Apple.png for Apple tree
Drawing a tree of type : Apple at (26,43)
:::: >> constructing a tree of type: Apple
**** >> setting image Apple.png for Apple tree
Drawing a tree of type : Apple at (58,69)
:::: >> constructing a tree of type: Neem
**** >> setting image Neem.png for Neem tree
Drawing a tree of type : Neem at (88,48)
:::: >> constructing a tree of type: Neem
**** >> setting image Neem.png for Neem tree
Drawing a tree of type : Neem at (1,45)
:::: >> constructing a tree of type: Neem
**** >> setting image Neem.png for Neem tree
Drawing a tree of type : Neem at (83,66)
:::: >> constructing a tree of type: Teak
**** >> setting image Teak.png for Teak tree
Drawing a tree of type : Teak at (27,94)
:::: >> constructing a tree of type: Mango
**** >> setting image Mango.png for Mango tree
Drawing a tree of type : Mango at (62,20)
:::: >> constructing a tree of type: Apple
**** >> setting image Apple.png for Apple tree
Drawing a tree of type : Apple at (99,12)
:::: >> constructing a tree of type: Apple
**** >> setting image Apple.png for Apple tree
Drawing a tree of type : Apple at (90,36)
:::: >> constructing a tree of type: Apple
**** >> setting image Apple.png for Apple tree
Drawing a tree of type : Apple at (6,8)
:::: >> constructing a tree of type: Apple
**** >> setting image Apple.png for Apple tree
Drawing a tree of type : Apple at (87,33)
:::: >> constructing a tree of type: Neem
**** >> setting image Neem.png for Neem tree
Drawing a tree of type : Neem at (62,83)
:::: >> constructing a tree of type: Teak
**** >> setting image Teak.png for Teak tree
Drawing a tree of type : Teak at (6,77)
:::: >> constructing a tree of type: Mango
**** >> setting image Mango.png for Mango tree
Drawing a tree of type : Mango at (82,2)
:::: >> constructing a tree of type: Neem
**** >> setting image Neem.png for Neem tree
Drawing a tree of type : Neem at (4,56)
:::: >> constructing a tree of type: Mango
**** >> setting image Mango.png for Mango tree
Drawing a tree of type : Mango at (26,76)
:::: >> constructing a tree of type: Apple
**** >> setting image Apple.png for Apple tree
Drawing a tree of type : Apple at (61,65)
```

Do you see a problem here in the output? Even though there are just 4 types of trees in our app, but in order to **draw** 20 trees, 20 different tree objects are **created**.

What if we need to **draw** 1000 trees, our app will end up **creating** 1000 tree objects. It may be expensive. What If each tree object carries an image with itself and takes up 1mb of RAM. total RAM consumed for **drawing** 1000 tees would be **`1000 x 1mb = 1GB`**

On closer inspection of the `Tree` class, you may notice that the `image` field cosumes a lot more memory than other fields. What's worse is that the `image` field store almost identical data across all trees. Other parts of the trees state, such as coordinates are unique for each tree object.

In other words, the `image` mostly remains **constant** for each tree and the `coordinates` are always **changing**.

The constant data of an object is usually called the *intrinsic* state. It mostly lives withing the object and other objects can only read it, not change it.

The rest of the objects state, often altered from outside by other objects, is called the *extrinsic* state.

Our intention here is to reduce the  total RAM consumed for **drawing** 1000 tees to be **`4 x 1mb = 4mb`**

We basically need to manage the object instantiation `#(1)` and the setting of image `#(2)`. We can create a separate staic factory to manage and create trees with image for us.

### A TreeFactory Object
```
let TreeFactory =  {
  treeMap: new Map(),
  
  getTree: function (treeType) {
    let tree = this.treeMap.get(treeType);

    if (!tree) {
      tree = new Tree(treeType);
      tree.setImage(`${treeType}.png`)
      this.treeMap.set(treeType, tree);
    }

    return tree;
  }
}
```

In the property `treeMap` the factory stores tree objects in the form ('treeType', tree_object). Yes, its kind of singleton. For each treeType it just cretes one object and set's relevant image to it.

At client side we now, could use our factory instead of new instantitation. The client code now looks like:

```
for (let i = 0; i < 20; i++) {
  // here we get a tree object with an image (intrinsic state).
  let tree = TreeFactory.getTree(getRandomTree());

  // here we set the coordinates (extrinsic state)
  tree.setx(getRandomX());
  tree.sety(getRandomY());

  // now that we have our tree ready,  we can draw it.
  tree.draw();
}

```

And here's our new output:

```bash
:::: >> constructing a tree of type: Apple
**** >> setting image Apple.png for Apple tree
Drawing a tree of type : Apple at (13,65)
Drawing a tree of type : Apple at (82,26)
:::: >> constructing a tree of type: Teak
**** >> setting image Teak.png for Teak tree
Drawing a tree of type : Teak at (88,42)
:::: >> constructing a tree of type: Neem
**** >> setting image Neem.png for Neem tree
Drawing a tree of type : Neem at (27,43)
Drawing a tree of type : Teak at (44,61)
Drawing a tree of type : Apple at (29,64)
Drawing a tree of type : Apple at (71,17)
:::: >> constructing a tree of type: Mango
**** >> setting image Mango.png for Mango tree
Drawing a tree of type : Mango at (63,9)
Drawing a tree of type : Teak at (53,26)
Drawing a tree of type : Neem at (7,24)
Drawing a tree of type : Teak at (72,13)
Drawing a tree of type : Teak at (66,56)
Drawing a tree of type : Apple at (54,82)
Drawing a tree of type : Teak at (49,26)
Drawing a tree of type : Mango at (59,39)
Drawing a tree of type : Neem at (24,72)
Drawing a tree of type : Mango at (43,10)
Drawing a tree of type : Apple at (29,57)
Drawing a tree of type : Mango at (53,63)
Drawing a tree of type : Neem at (83,60)
```

Can you notice the differene. We still have 20 trees drawn but only 4 tree objects created. Awesome!!

## Applicability

- an application needs to spawn a huge number of similar objects
- this drains all available RAM on a target device
- the objects contain duplicate states which can be extracted and shared between multiple objects


## Just keeping the SetImage() part out

This variation is acutally the real `FlyWeight` pattern. Once you've got the above solution, it will be super easy to get it.

Just a recap that in the Flyweight pattern, there's a concept of two states - *intrinsic* & *extrinsic*. *Intrinsic information* may be required by internal methods which they asbolutely cannot function without. *Extrinsic information* can however be removed and stored externally.

Objects with the same intrinsic data can be replaced with a single **shared object** usually created by a **factory**. The factory is responsible to keep an eye on objects that have already been instantiated so that new copies are only ever created if the object differs from the objects we already have.

In several real life situations, you may actually need separate Tree objects. So, we are looking for the following end result:
- a separate `Tree` object is created for each tree in our app
- but the `TreeImage` is constructed only once for each type of tree
- a `tree` object is composed with a `treeImage` to re-use a tree image


As a first step we need to move the `image` out of the `Tree`. As `image` is dependent on `treeType` we'll need to move `treeType` out as well. 

### Our Flyweight class

```
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

```

### Our Tree class
```
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
```

Each tree has a treeImage. The idea is to store and re-use a tree image.When instantiaing, a tree object is composed with a treeImage


### Static TreeImage factory
This is the only place in the app where we are managing / constructing a new TreeImage
``` 
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
```

### Helper objects and functions
```
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
```

### Usage / Client / Main app
```
for (let i = 0; i < 20; i++) {
  //  we re-use the treeImage. We are not storing the treeImage for each tree.
  let tree = new Tree(TreeImageFactory.getTreeImage(getRandomTreeType()));

  tree.setx(getRandomX());
  tree.sety(getRandomY());

  // now that we have our tree ready, we can draw it.
  tree.draw();
}
```

### Output

```bash
### >> constructing a TreeImage of type: Mango
**** >> setting image Mango.png for Mango tree
:::: >> constructing a tree of type: Mango
Drawing a tree of type : Mango at (15,21)
:::: >> constructing a tree of type: Mango
Drawing a tree of type : Mango at (15,68)
### >> constructing a TreeImage of type: Neem
**** >> setting image Neem.png for Neem tree
:::: >> constructing a tree of type: Neem
Drawing a tree of type : Neem at (99,96)
:::: >> constructing a tree of type: Neem
Drawing a tree of type : Neem at (79,63)
:::: >> constructing a tree of type: Mango
Drawing a tree of type : Mango at (54,94)
### >> constructing a TreeImage of type: Apple
**** >> setting image Apple.png for Apple tree
:::: >> constructing a tree of type: Apple
Drawing a tree of type : Apple at (7,64)
:::: >> constructing a tree of type: Apple
Drawing a tree of type : Apple at (87,11)
:::: >> constructing a tree of type: Apple
Drawing a tree of type : Apple at (62,16)
:::: >> constructing a tree of type: Neem
Drawing a tree of type : Neem at (79,46)
### >> constructing a TreeImage of type: Teak
**** >> setting image Teak.png for Teak tree
:::: >> constructing a tree of type: Teak
Drawing a tree of type : Teak at (19,70)
:::: >> constructing a tree of type: Mango
Drawing a tree of type : Mango at (60,97)
:::: >> constructing a tree of type: Teak
Drawing a tree of type : Teak at (76,73)
:::: >> constructing a tree of type: Apple
Drawing a tree of type : Apple at (73,92)
:::: >> constructing a tree of type: Mango
Drawing a tree of type : Mango at (74,81)
:::: >> constructing a tree of type: Teak
Drawing a tree of type : Teak at (64,69)
:::: >> constructing a tree of type: Apple
Drawing a tree of type : Apple at (13,80)
:::: >> constructing a tree of type: Apple
Drawing a tree of type : Apple at (90,40)
:::: >> constructing a tree of type: Neem
Drawing a tree of type : Neem at (71,18)
:::: >> constructing a tree of type: Mango
Drawing a tree of type : Mango at (45,51)
:::: >> constructing a tree of type: Neem
Drawing a tree of type : Neem at (15,16)
```

As per our requirement, we are constructing 20 different tree objects this time, but the expensive task of creating a treeImage is happeing just 4 times (once for each type). We are composing a tree with a treeImage and we have control over how many treeImage's object we create. 