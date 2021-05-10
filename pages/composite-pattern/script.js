console.log('composite-pattern works!!');
console.log('------------------ Example 1---------------------');

/**
 * We use this pattern whenever we want to represent hierarchy and we want to treat the objects in this hierarchy the same way,
 * wether they are containers or parts, we want to treat them the same way. 
 * 
 * Think of your file system and folders. If you delete a folder, you want all the files in that folder deleted recursively.
 * When you move a folder to another location, you expect all the files in that folder to move to the new location.
 */

// A component contains common properties and methods that a shape and a group contains.
// 

// Component interface
class Component {
  // an operation common to parts(leaf) and containers(composite).
  render() { /* abstract */ }
  move() { /* abstract */ }
}

// leaf
class Shape extends Component {
  render() {
    console.log('Render Shape');
  }

  move() {
    console.log('Moving Shape');
  }
}

// composite: it can be composed of 0 or more components. each component can be a leaf or a composite object. 
class Group extends Component {
  constructor() {
    super();
    this.components = [];
  }

  add(component) {
    this.components.push(component);
  }

  // iterate through the components and forward the render request
  render() {
    this.components.forEach(component => {
      component.render();
    });
  }

  // iterate through the components and forward the move request
  move() {
    this.components.forEach(component => {
      component.move();
    });
  }
}

let group1 = new Group();
group1.add(new Shape());
group1.add(new Shape());

let group2 = new Group();
group2.add(new Shape());
group2.add(new Shape());

let group = new Group();
group.add(group1);
group.add(group2);

group.render();
group.move();
