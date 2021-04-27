# Builder Design Pattern

*Builder* is a creational design pattern that lets you contruct complex objects step by step. 

> Separate the construction if a complex object from its representation so that the same construction process can create different representations. *-- GoF*
## Builder benifits

- Encapsulates the way a complex object is constructed
- Allows object to be constructed in a multistep process
- Hides the internal representation if the product from the client
- Product implementations can be swapped in and out because the client only sees an abstract interface

### Example

**Build Pizza step by step**:
From customers point of view, four steps are needed to build a pizza
- choose a base
- choose the sauce
- choose the type of cheeze
- choose the topping

### Example
A huge list of arguments is certainly prone to mistakes and is not client friendly. this kind of telescoping construction anti pattern in OOP languages:
```
signup.create({ name: 'John doe', email: 'John@email.com', age: 36, nickname: 'jd', photo: 'john.jpeg', isModerator: true, isAdmin: false });
```

For signing up a new user, the essential details can be taken in the first step & then rest of the information can be taken in a step by step manner (stages or piecewise construction) :

```
new SignupBuilder('James Bond', 'bond@james.com', '40')
  .setPhoto('james.jped')
  .setNickName('bond')
  .setModerator()
  .setAdmin()
  .create();
```


### Example

An HTML Tag can be constructed step by step, for example:
```
  let parentDivTag = new Tag('div');
  parentDivTag.setText(I am parent);
  parentDivTag.setClass('parent-class');
  parentDivTag.setId('parent-id');
```

### Example
An HTML Dom Tree can be constructed step by step, for example:
```
  let root = new HTMLTree(tagA);
  let rootList = root.addChild(tagUl);
  rootList.addChild(tagLi1);
  rootList.addChild(tagLi2);
  rootList.addChild(tagLi3);
```

In this example, I am intentionally avoiding tree data structure to keep it simple and to the point.

Product class:
```
class Tag {
  static get indentSize() { return 2; }
  
  constructor(name = '') {
    this.name = name;
    this.text = '';
    this.class = '';
    this.id = '';
    this.children = []; // list of Tag objects
  }

  setText(text) {
    this.text = text;
  }

  setClass(classes) {
    this.class = classes;
  }

  setId(id) {
    this.id = id;
  }

  _toString (indent) {
    let html = [];

    // opening tag
    html.push(' '.repeat(indent * Tag.indentSize));
    html.push('<');
    html.push(this.name);

    // set classes
    if (this.class.length > 0) {
      html.push(` class="${this.class}"`);
    }

    // set id
    if (this.id.length > 0) {
      html.push(` id="${this.id}"`);
    }

    html.push('>');
    html.push('\n');

    // text
    if (this.text.length > 0) {
      html.push(' '.repeat(Tag.indentSize * (indent + 1)));
      html.push(this.text);
      html.push('\n');
    }

    // children [recursion to handle the tree]
    for (const child of this.children) {
      html.push(child._toString(indent + 1));
    }

    // closing tag
    html.push(' '.repeat(indent * Tag.indentSize));
    html.push('</');
    html.push(this.name);
    html.push('>');
    html.push('\n');

    return html.join('');
  }

  toString() {
    return this._toString(0);
  }
}
```

Builder class:
```
class HtmlBuilder {
  constructor(rootName, rootText, className, id) {
    let rootTag = new Tag(rootName);
    rootTag.setText(rootText);
    rootTag.setClass(className);
    rootTag.setId(id);

    this.root = rootTag;
    this.rootName = rootName;
  }

  addChild(childName, childText, className, id) {
    let child = new Tag(childName);
    child.setText(childText);
    child.setClass(className);
    child.setId(id);

    this.root.children.push(child);
    return this;
  }

  toString() {
    return this.root.toString();
  }
}
```

Usage/Client:
```
let builder = new HtmlBuilder('div', 'parent div', 'parent', 'parent');

builder.addChild('div', 'child 1', 'child-1', 'child-1');
builder.addChild('div', 'child 2', 'child-2', 'child-2');

console.log(builder);
console.log(builder.toString());
```

### A More Evolved builder Example

In order to build a house, we may have a `HouseBuilder()` class that acts as a builder manager. It is the only interface that the client code interacts with. The `HouseBuilder()` initiates a `House` object by passing it as the default value of `house` at constructor.

There are separate builder classes for building (in our example just setting) `location`,`wall`, `door` & `floor`;

The heart of this variation of the pattern is that all the builder classes are working on the same object. 

We return `this` after every method to make our api chinable (fluent).

```
//Usage:

let castleBuilder = new HouseBuilder();
let mySmallCastle = castleBuilder
  .location.at('123 ABCD Road').in('Pune City')
  .wall.of('stone').color('off white')
  .door.of('wood').size('large').color('brown')
  .floor.of('marble tiles').color('brown').pattern('zig-zag')
  .build();
console.log(mySmallCastle);
```

Product:
```
class House {
  constructor() {
    // location info
    this.street = '';
    this.city = '';

    // Wall info
    this.wall_material = '';
    this.wall_color = '';

    // Door infor
    this.door_material = '';
    this.door_size = '';
    this.door_color = '';

    // Floor info
    this.floor_material = '';
    this.floor_color = '';
    this.foor_pattern = '';
  }
}
```

Builder Manager:
```
class HouseBuilder {
  constructor(house = new House()) {
    this.house = house;
  }

  get location() {
    return new HouseLocationBuilder(this.house);
  }

  get wall() {
    return new HouseWallBuilder(this.house);
  }

  get door() {
    return new HouseDoorBuilder(this.house);
  }

  get floor() {
    return new HouseFloorBuilder(this.house);
  }

  build() {
    return this.house;
  }
}
```

Builders: 
```
class HouseLocationBuilder extends HouseBuilder {
  constructor(house) {
    super(house);
  }

  at(street) {
    this.house.street = street;
    return this;
  }

  in(city) {
    this.house.city = city;
    return this;
  }
}

class HouseWallBuilder extends HouseBuilder {
  constructor(house) {
    super(house);
  }

  of(material) {
    this.house.wall_material = material;
    return this;
  }

  color(color) {
    this.house.wall_color = color;
    return this;
  }
}

class HouseFloorBuilder extends HouseBuilder {
  constructor(house) {
    super(house);
  }

  of(material) {
    this.house.floor_material = material;
    return this;
  }

  color(color) {
    this.house.floor_color = color;
    return this;
  }

  pattern(pattern) {
    this.house.foor_pattern = pattern;
    return this;
  }
}

class HouseDoorBuilder extends HouseBuilder {
  constructor(house) {
    super(house);
  }

  of(material) {
    this.house.door_material = material;
    return this;
  }

  size(size) {
    this.house.door_size = size;
    return this;
  }

  color(color) {
    this.house.door_color = color;
    return this;
  }
}
```

Usage/Client:

```
let castleBuilder = new HouseBuilder();
let mySmallCastle = castleBuilder
  .location.at('123 ABCD Road').in('Pune City')
  .wall.of('stone').color('off white')
  .door.of('wood').size('large').color('brown')
  .floor.of('marble tiles').color('brown').pattern('zig-zag')
  .build();
console.log(mySmallCastle);
```