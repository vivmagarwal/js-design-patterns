console.log('builder-design-pattern works!!');

// ===================================================== //
// Example 1. Pizza builder
// ===================================================== //

import { Pizza } from "./Pizza.js";

const pepperoni = new Pizza();
pepperoni.setBase('Whole wheat');
pepperoni.setSauce('Tomato Basil');
pepperoni.setCheeze('Smoked Mozzarella');
pepperoni.setToppings(['Pepperoni', 'Basil']);

// pepperoni.bake();

// Using Calsses - without pattern

// ===================================================== //
// Example 2. Signup builder
// ===================================================== //

import { signup } from './Signup.js';

// the huge list of arguments is certainly prone to mistakes and is not client friendly.
// the telescoping construction anti pattern in OOP languages.
// signup.create({ name: 'John doe', email: 'John@email.com', age: 36, nickname: 'jd', photo: 'john.jpeg', isModerator: true, isAdmin: false });

import { SignupBuilder } from "./SignupBuilder.js";

new SignupBuilder('James Bond', 'bond@james.com', '40')
  .setPhoto('james.jped')
  .setNickName('bond')
  .setModerator()
  .setAdmin()
  // .create();


// ===================================================== //
// Example 3. DOM Tree & Tag builder
// ===================================================== //

// responsibility to create a Tag
// Intentionally avoiding tree implementation to keep it simple.
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

let builder = new HtmlBuilder('div', 'parent div', 'parent', 'parent');

builder.addChild('div', 'child 1', 'child-1', 'child-1');
builder.addChild('div', 'child 2', 'child-2', 'child-2');

console.log(builder);
console.log(builder.toString());

// ===================================================== //
// Example 4
// ===================================================== //

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


// the client only sees this HouseBuilder
// this HouseBuilder encapsulates the House & other builders
// it is a builder manger that constructs several builders and make sure they are working on the same house object.
// all other builders extends HouseBuilder. So all of them can switch between location, wall, door etc freely
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

let castleBuilder = new HouseBuilder();
let mySmallCastle = castleBuilder
  .location.at('123 ABCD Road').in('Pune City')
  .wall.of('stone').color('off white')
  .door.of('wood').size('large').color('brown')
  .floor.of('marble tiles').color('brown').pattern('zig-zag')
  .build();
console.log(mySmallCastle);
