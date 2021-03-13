# Prototype Pattern

## Gof Definition

"Prototype Design Pattern Specify the kind of objects to create using a prototypal instance, and create new objects by copying this prototype"

To simplify, instead of creating object from scratch, you can make copies of an original instance and modify it as required. Prototype is unique among the other creational patterns as it doesnot require a class but only an end object.

## Usecases

Choose Prototype Design Pattern when:
- Creating an object is an expensive opration and it would be more efficient to copy an object
- System should be independent of how its products are created, composed & represented
- Objcts are required that are similar to existing objects
- We need to hide the complexity of creating new instance from the client

## Shallow and Deep Copy

The idea of using copy is to create a new object of the same type whthout knowing the exact type of the object we are invoking. Shallow and Deep copy are two mechanisms used in copying an object.

### Shallow copy
Shallow Copy copies an object's value type fields into the target object and the object's reference types are copied as references into the target object. They will point to the same properties & method instead of creating their own individual copies.

### Deep copy
Unlike Shallow copy, the deep copy, copes and objects value and refence types into a new copy of the target objects. The properties and methods are not a referenced, but are individual copies.

## Shallow copy example

Let's first create an object called phone to play with:
```
var phone = {
  brand: 'no brand',
  model: 'basic',

  ring() {
    console.log("tring tring");
  },

  makeACall() {
    console.log(`${this.brand}::${this.model}::Calling...`);
  },
}
```

We can easily make a shallow clone using `Object.create`. It will be a shallow copy, which means that individual copies of properties and methods are not made but they are linked to the original object.

```
const phone1 = Object.create(phone);
phone1.brand = 'Samsung';
phone1.makeACall(); // Samsung::basic::Calling...
```

```
const phone2 = Object.create(phone);
phone.brand = 'Apple'; // note that we changed phone not phone2
phone2.makeACall(); // Apple::basic::Calling...
```

There are a few ways to add new properties to a newly shallowCloned object
```
// define an new property using Object.create
const phone3 = Object.create(phone, {
  color: { value: "black" }
});

console.log(phone3.brand, phone3.color); // Apple black
```

```
// difine a new property using Object.defineProperty(object, key,{value, ...property-descriptors}) or Object.defineProperties
const phone4 = Object.create(phone3);
Object.defineProperty(phone4, 'camera', {
  value: '1080px',
  writable: true,
  enumerable: true,
  configurable: true
})

console.log(phone4.brand, phone4.color, phone4.camera); //Apple black 1080px
```

In this pattern, it's common for a class (or a constructor) function to have a `clone`, `deepClone`, and `setProperty`. let's implement these in javascript:

Class or a constructor function
```
function Phone(brand) {
  this.brand = brand;
}
```

Please remember that a class, (i.e. Contructor) bears the prototype property not the instance! 
```
Phone.prototype.makeACall = function() {
  console.log(`${this.brand} ::: Calling...`);
}
```

Implementing the shallow clone functionality where properties and methods references the original object.
```
Phone.prototype.clone = function() {
  return Object.create(this);
}
```

Implementing the deepClone functionality where the cloned object has its own copy of properties and methods
```
Phone.prototype.deepClone = function (onlyOwnProperties = false) {
  let out = {};
  for (var attr in this) { // for..in loop enumerates properties in the prototypal chain as well.
    if (onlyOwnProperties) {
      if (this.hasOwnProperty(attr)) {
        out[attr] = this[attr];
      }
    } else {
      out[attr] = this[attr];
    }
  }
  return out;
}
```

Proving an easy way to set new properties 
```
Phone.prototype.setProperty = function (key, value) {
  Object.defineProperty(this, key, {
    value: value,
    writable: true,
    enumerable: true,
    configurable: true
  })
}
```

Usage:
```
// Creating a new Phone object
const phone5 = new Phone('Blackberry');
phone5.makeACall(); // Blackberry ::: Calling...

const phone6 = phone5.clone();

// Add a new property to the cloned object
phone6.setProperty('color', 'Yellow');
console.log(phone6.color);

// Add a new method to the cloned object
phone6.setProperty('ring', function () {
  console.log(`${this.brand}, ${this.color}, ringing ::: tring tring...`);
});
phone6.ring(); // ringing ::: tring tring...

// Cloning phone6
const phone7 = phone6.clone();
phone7.brand = "Samsung";
phone7.color = "Black";
phone7.makeACall();
phone7.ring();

console.log('=======================================');

// Deep cloning phone6 enumerating properties in the prototypal chain but making a copy of them.
const phone8 = phone6.deepClone();
console.log('phone8');
phone6.color = 'Red'; // it doesnot affect the deepClone
phone8.brand = 'Apple'; // it can surely be overwritten
phone8.makeACall(); // Apple ::: Calling...
phone8.ring(); // Apple, Yellow, ringing ::: tring tring...

console.log('=======================================');

// Deep cloing (making a separate copy) only of own properties without enumerating properties in the prototypal chain.
const phone9 = phone6.deepClone(true);
console.log('phone9');
phone6.color = 'Red'; 
phone9.brand = 'Apple'; 
// phone9.makeACall(); // Uncaught TypeError: phone9.makeACall is not a function
phone9.ring(); // Apple, Red, ringing ::: tring tring...
```