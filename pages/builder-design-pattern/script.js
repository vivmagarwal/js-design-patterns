console.log('builder-design-pattern works!!');

import { Pizza } from "./Pizza.js";

const pepperoni = new Pizza();
pepperoni.setBase('Whole wheat');
pepperoni.setSauce('Tomato Basil');
pepperoni.setCheeze('Smoked Mozzarella');
pepperoni.setToppings(['Pepperoni', 'Basil']);

pepperoni.bake();

// Using Calsses - without pattern

import { signup } from './Signup.js';

// the huge list of arguments is certainly prone to mistakes and is not client friendly.
// the telescoping construction anti pattern in OOP languages.
signup.create({ name: 'John doe', email: 'John@email.com', age: 36, nickname: 'jd', photo: 'john.jpeg', isModerator: true, isAdmin: false });


// Example 2 - using classess with builder pattern

import { SignupBuilder } from "./SignupBuilder.js";

new SignupBuilder('James Bond', 'bond@james.com', '40')
  .setPhoto('james.jped')
  .setNickName('bond')
  .setModerator()
  .setAdmin()
  .create();


// ===================================================== //
// example 3
// ===================================================== //

const words = ['hello', 'world'];

// responsibility to create a Tag
class Tag {
  static get indentSize() { return 2; }
  
  constructor(name = '', text = '') {
    this.name = name;
    this.text = text;
    this.children = []; // list of Tag objects
  }

  _toString (indent) {
    let html = [];

    // opening tag
    html.push(' '.repeat(indent * Tag.indentSize));
    html.push('<');
    html.push(this.name);
    html.push('>');
    html.push('\n');

    // text
    if (this.text.length > 0) {
      html.push(' '.repeat(Tag.indentSize * (indent + 1)));
      html.push(this.text);
      html.push('\n');
    }

    // children
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

// responsibility of building a simple 1 level deep tree of tags
// may implement tree data structure here
class HtmlBuilder {
  constructor(rootName) {
    this.root = new Tag(rootName);
    this.rootName = rootName;
  }

  addChild(childName, childText) {
    let child = new Tag(childName, childText);
    this.root.children.push(child);
    return this;
  }

  toString() {
    return this.root.toString();
  }
}

let builder = new HtmlBuilder('ul');
builder.addChild('li', 'foo')
builder.addChild('li', 'bar')
builder.addChild('li', 'baz');

console.log(builder.toString());  