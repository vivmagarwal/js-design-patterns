# Prototype Pattern

## Gof Definition

"Prototype Design Pattern Specify the kind of objects to create using a prototypal instance, and create new objects by copying this prototype"

To simplify, instead of creating object from scratch, you can make copies of an original instance and modify it as required. Prototype is unique among the other creational patterns as it doesnot require a class but only an end object.

Complicated objects are typically never designed from scratch. Instead what you do is you look at what people have already done and try to improve over the existing constructs. An existing (partially or fully constructed) desing is a prototype. We usually make a deep copy (clone) of the pototype and customize it as per our requirements and give it to the client to consume. And also to make cloning convenient, we can build a prototype factory wheere we have a few predefiend desings and we ask factory to customize the design giving us a custom item.

**A prototype is a partially or fully initialized object that you copy (clone) and make use of**

## Note
Please dont confuse `Prototype design pattern` with Javascripts `Prototypal inheritance`. Even though we are going to use Javascript's `Prototype chain` in implementing the `Prototype design pattern`, remember that they are two different concepts. 

We do use Javascript's `Prototypal inheritance` to create shallow copes of objects. But please remember that `Prototype desing pattern` and Javascript's `__proto__` / `prototype` are different things. 
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

One of the most used and hence battle tested way to clone objects in javascript is `lodash.clone`, `lodash.cloneDeep`. However, in the following example I have also provided a plain JS way to `clone` and `cloneDeep`.

### Example - 1

```
import clone from 'lodash.clone';
import cloneDeep from 'lodash.clonedeep';

class Address {
  constructor(flatNumber, buildingName, city, country) {
    this.flatNumber = flatNumber;
    this.buildingName = buildingName;
    this.city = city;
    this.country = country;
  }

  toString() {
    return `${this.flatNumber} ${this.buildingName},${this.city}, ${this.country}`;
  }
}

class Person {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  greet() {
    console.log(`Hi, my name is ${this.name} and I live at ${this.address.toString()}`);
  }

  cloneShallowUsingLodash() {
    return clone(this);
  }

  cloneDeepUsingLodash() {
    return cloneDeep(this);
  }

  cloneDeepUsingRecursion(target = {}, source = this) {
    for (let key in source) {
      let descriptor = Object.getOwnPropertyDescriptor(source, key);

      if (descriptor.value instanceof String) {
        target[key] = new String(descriptor.value);
      }
      
      else if (descriptor.value instanceof Array) {
        target[key] = this.recursiveClone([], descriptor.value);
      }
      
      else if (descriptor.value instanceof Object) {
        let prototype = Reflect.getPrototypeOf(descriptor.value);
        let cloneObject = this.recursiveClone({}, descriptor.value);
        Reflect.setPrototypeOf(cloneObject, prototype);
        target[key] = cloneObject;
      }
        
      else {
        Object.defineProperty(target, key, descriptor);
      }
    }

    let prototype = Reflect.getPrototypeOf(source);
    Reflect.setPrototypeOf(target, prototype);
    return target;
  }


  cloneShallowUsingObjectCreate() {
    return Object.create(this);
  }
}

let john = new Person('John', new Address('F-22','Parle Appartment', 'Pune', 'INDIA'));

// what if we need to create another user with almost same properties?
let jane = john.cloneShallowUsingLodash();
jane.name = 'Jane'
jane.address.flatNumber = 'A-01';
jane.sayName = function () {
  console.log(`my name is ${this.name}!!`);
}

john.greet();
jane.greet();
jane.sayName();

```

## Prototype factory

The developer experience can be great if Person can be created in the following way:

```
let john = PersonFactory.parlePointMember('John', 'J-33');
let aman = PersonFactory.parlePointMember('Aman', 'A-34');
let raja = PersonFactory.parlePointMember('Raja', 'B-44');
let hero = PersonFactory.parlePointMember('Hero', 'H-88');

let jane = PersonFactory.empireEstateMember('Jane', 'A-01');

john.greet();
aman.greet();
raja.greet();
hero.greet();


jane.greet();
```

It can be accomplised using a Prototype factory:

```
class PersonFactory {
  static parlePointMember(name, flatNumber) {
    let proto = PersonFactory.parleAppartmentMemberPrototype;
    let copy = proto.cloneDeepUsingLodash();
    copy.name = name;
    copy.address.flatNumber = flatNumber;
    return copy
  }

  static empireEstateMember(name, flatNumber) {
    let proto = PersonFactory.empireEstateMemberPrototype;
    let copy = proto.cloneDeepUsingLodash();
    copy.name = name;
    copy.address.flatNumber = flatNumber;
    return copy
  }
}

// static properties for prototypes
PersonFactory.parleAppartmentMemberPrototype = new Person(null, new Address(null, 'Parle Appartment', 'Pune', 'INDIA'));
PersonFactory.empireEstateMemberPrototype = new Person(null, new Address(null, 'Empire Estate', 'New Delhi', 'INDIA'));
```

### Example 3 [work in progress]


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

Proving an easy way to set new properties.Please remember that a class, (i.e. Contructor) bears the prototype property not the instance! this keyword here will be pointing to the instance.
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
```

Deep cloning phone6 enumerating properties in the prototypal chain but making a copy of them.
```
const phone8 = phone6.deepClone();
console.log('phone8');
phone6.color = 'Red'; // it doesnot affect the deepClone
phone8.brand = 'Apple'; // it can surely be overwritten
phone8.makeACall(); // Apple ::: Calling...
phone8.ring(); // Apple, Yellow, ringing ::: tring tring...
```

Deep cloing (making a separate copy) only of own properties without enumerating properties in the prototypal chain.
```
const phone9 = phone6.deepClone(true);
console.log('phone9');
phone6.color = 'Red'; 
phone9.brand = 'Apple'; 
// phone9.makeACall(); // Uncaught TypeError: phone9.makeACall is not a function
phone9.ring(); // Apple, Red, ringing ::: tring tring...
```