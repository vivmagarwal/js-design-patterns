console.log('prototype-pattern works!!');

// ===================================================== //
// Shallow by default via Object.create

// var phone = {
//   brand: 'no brand',
//   model: 'basic',

//   ring() {
//     console.log("tring tring");
//   },

//   makeACall() {
//     console.log(`${this.brand}::${this.model}::Calling...`);
//   },
// }

// const phone2 = Object.create(phone);
// phone2.brand = 'Samsung';
// phone2.makeACall(); // Samsung::basic::Calling...

// const phone1 = Object.create(phone);
// phone.brand = 'Apple'; // note that we changed phone not phone1
// phone1.makeACall(); // Apple::basic::Calling...

// // define and extra property using Object.create
// const phone3 = Object.create(phone, {
//   color: { value: "black" }
// });

// console.log(phone3.brand, phone3.color); // black

// const phone4 = Object.create(phone3);
// Object.defineProperty(phone4, 'camera', {
//   value: '1080px',
//   writable: true,
//   enumerable: true,
//   configurable: true
// })

// console.log(phone4.brand, phone4.color, phone4.camera); //Apple black 1080px


// console.log('=======================================');

// // Class or a constructor function
// function Phone(brand) {
//   this.brand = brand;
// }

// // please remember that a class, (i.e. Contructor) bears the prototype property not the instance! 
// Phone.prototype.makeACall = function() {
//   console.log(`${this.brand} ::: Calling...`);
// }

// Phone.prototype.clone = function() {
//   return Object.create(this);
// }

// Phone.prototype.deepClone = function (onlyOwnProperties = false) {
//   let out = {};
//   for (var attr in this) { // for..in loop enumerates properties in the prototypal chain as well.
//     if (onlyOwnProperties) {
//       if (this.hasOwnProperty(attr)) {
//         out[attr] = this[attr];
//       }
//     } else {
//       out[attr] = this[attr];
//     }
//   }
//   return out;
// }

// Phone.prototype.setProperty = function (key, value) {
//   Object.defineProperty(this, key, {
//     value: value,
//     writable: true,
//     enumerable: true,
//     configurable: true
//   })
// }

// // Creating a new Phone object
// const phone5 = new Phone('Blackberry');
// phone5.makeACall(); // Blackberry ::: Calling...

// const phone6 = phone5.clone();

// // Add a new property to the cloned object
// phone6.setProperty('color', 'Yellow');
// console.log(phone6.color);

// // Add a new method to the cloned object
// phone6.setProperty('ring', function () {
//   console.log(`${this.brand}, ${this.color}, ringing ::: tring tring...`);
// });
// phone6.ring(); // ringing ::: tring tring...

// // Cloning phone6
// const phone7 = phone6.clone();
// phone7.brand = "Samsung";
// phone7.color = "Black";
// phone7.makeACall();
// phone7.ring();

// console.log('=======================================');

// // Deep cloning phone6 enumerating properties in the prototypal chain but making a copy of them.
// const phone8 = phone6.deepClone();
// console.log('phone8');
// phone6.color = 'Red'; // it doesnot affect the deepClone
// phone8.brand = 'Apple'; // it can surely be overwritten
// phone8.makeACall(); // Apple ::: Calling...
// phone8.ring(); // Apple, Yellow, ringing ::: tring tring...

// console.log('=======================================');

// // Deep cloing (making a separate copy) only of own properties without enumerating properties in the prototypal chain.
// const phone9 = phone6.deepClone(true);
// console.log('phone9');
// phone6.color = 'Red'; 
// phone9.brand = 'Apple'; 
// // phone9.makeACall(); // Uncaught TypeError: phone9.makeACall is not a function
// phone9.ring(); // Apple, Red, ringing ::: tring tring...


// ===================================================== //

// class Address {
//   constructor(streetAddress, city, country) {
//     this.streetAddress = streetAddress;
//     this.city = city;
//     this.country = country;
//   }

//   toString() {
//     return `${this.streetAddress},${this.city}, ${this.country}`;
//   }

//   deepCopy() {
//     return new Address(this.streetAddress, this.city, this.country);
//   }
// }
// class Person {
//   constructor(name, address) {
//     this.name = name;
//     this.address = address;
//   }

//   greet() {
//     console.log(`Hi, my name is ${this.name} and I live at ${this.address.toString()}---`);
//   }

//   deepCopy() {
//     return new Person(this.name, this.address.deepCopy());
//   }
// }

// let john = new Person('John', new Address('123 street', 'London', 'UK'));

// // let jane = john; overwrites

// let jane = john.deepCopy(); 
// jane.name = 'Jane'
// jane.address.streetAddress = '124 street';

// john.greet();
// jane.greet();

// ===================================================== //

// class Address {
//   constructor(streetAddress, city, country) {
//     this.streetAddress = streetAddress;
//     this.city = city;
//     this.country = country;
//   }

//   toString() {
//     return `${this.streetAddress},${this.city}, ${this.country}`;
//   }

//   deepCopy() {
//     return new Address(this.streetAddress, this.city, this.country);
//   }
// }
// class Person {
//   constructor(name, address) {
//     this.name = name;
//     this.address = address;
//   }

//   greet() {
//     console.log(`Hi, my name is ${this.name} and I live at ${this.address.toString()}---`);
//   }

//   deepCopy() {
//     return new Person(this.name, this.address.deepCopy());
//   }
// }

// let john = new Person('John', new Address('123 street', 'London', 'UK'));

// // let jane = john; overwrites

// let jane = john.deepCopy(); 
// jane.name = 'Jane'
// jane.address.streetAddress = '124 street';
// jane.sayName = function () {
//   console.log(`my name is ${this.name}!!`);
// }

// john.greet();
// jane.greet();
// jane.sayName();

// ===================================================== //

// Using Lodash clone and deepclone

// const clone = require('lodash.clone');
// const cloneDeep = require('lodash.clonedeep');

// import { clone } from 'lodash-es';
// import { cloneDeep } from 'lodash-es';

// class Address {
//   constructor(streetAddress, city, country) {
//     this.streetAddress = streetAddress;
//     this.city = city;
//     this.country = country;
//   }

//   toString() {
//     return `${this.streetAddress},${this.city}, ${this.country}`;
//   }

//   deepCopy() {
//     return new Address(this.streetAddress, this.city, this.country);
//   }

//   copy() {
//     return { ... this };
//   }

//   clone() {
//     return clone(this);
//   }

//   clonedeep() {
//     return cloneDeep(this);
//   }
// }
// class Person {
//   constructor(name, address) {
//     this.name = name;
//     this.address = address;
//   }

//   greet() {
//     console.log(`Hi, my name is ${this.name} and I live at ${this.address.toString()}---`);
//   }

//   deepCopy() {
//     return new Person(this.name, this.address.deepCopy());
//   }

//   clone() {
//     return clone(this);
//   }

//   clonedeep() {
//     return cloneDeep(this);
//   }

//   copy() {
//     return {...this, ...this.address};
//   }
// }

// let john = new Person('John', new Address('123 street', 'London', 'UK'));

// let jane = john.clonedeep();

// console.log(john);

// jane.name = 'Jane'
// jane.address.streetAddress = '124 street';
// jane.sayName = function () {
//   console.log(`my name is ${this.name}!!`);
// }

// console.log(jane);

// john.greet();
// jane.greet();
// jane.sayName();

// ===================================================== //


// import clone from 'lodash.clone';
// import cloneDeep from 'lodash.clonedeep';
// class Address {
//   constructor(flatNumber, buildingName, city, country) {
//     this.flatNumber = flatNumber;
//     this.buildingName = buildingName;
//     this.city = city;
//     this.country = country;
//   }

//   toString() {
//     return `${this.flatNumber} ${this.buildingName},${this.city}, ${this.country}`;
//   }
// }
// class Person {
//   constructor(name, address) {
//     this.name = name;
//     this.address = address;
//   }

//   greet() {
//     console.log(`Hi, my name is ${this.name} and I live at ${this.address.toString()}`);
//   }

//   cloneShallowUsingLodash() {
//     return clone(this);
//   }

//   cloneDeepUsingLodash() {
//     return cloneDeep(this);
//   }

//   cloneDeepUsingRecursion(target = {}, source = this) {
//     for (let key in source) {
//       // console.log('key in source ::::::::::::', key);
//       // Use getOwnPropertyDescriptor instead of source[key] to prevent from trigering setter/getter.
//       let descriptor = Object.getOwnPropertyDescriptor(source, key);
//       // console.log('descriptior ::::::::::::', descriptor);

//       if (descriptor.value instanceof String) {
//         target[key] = new String(descriptor.value);
//       }
      
//       else if (descriptor.value instanceof Array) {
//         target[key] = this.recursiveClone([], descriptor.value);
//       }
      
//       else if (descriptor.value instanceof Object) {
//         let prototype = Reflect.getPrototypeOf(descriptor.value);
//         let cloneObject = this.recursiveClone({}, descriptor.value);
//         Reflect.setPrototypeOf(cloneObject, prototype);
//         target[key] = cloneObject;
//       }
        
//       else {
//         Object.defineProperty(target, key, descriptor);
//       }
//     }

//     let prototype = Reflect.getPrototypeOf(source);
//     Reflect.setPrototypeOf(target, prototype);
//     return target;
//   }


//   cloneShallowUsingObjectCreate() {
//     return Object.create(this);
//   }
// }

// let john = new Person('John', new Address('F-22','Parle Appartment', 'Pune', 'INDIA'));

// // what if we need to create another user with almost same properties? we can clone it!
// let jane = john.cloneShallowUsingLodash();
// jane.name = 'Jane'
// jane.address.flatNumber = 'A-01';

// // what if we need to add a new method to the new object? Sure we can!
// jane.sayName = function () {
//   console.log(`my name is ${this.name}!!`);
// }

// john.greet();
// jane.greet();
// jane.sayName();

// ===================================================== //

// import clone from '../../node_modules/lodash-es/clone.js';
// import cloneDeep from '../../node_modules/lodash-es/cloneDeep.js';

// console.log('test');

// class Address {
//   constructor(flatNumber, buildingName, city, country) {
//     this.flatNumber = flatNumber;
//     this.buildingName = buildingName;
//     this.city = city;
//     this.country = country;
//   }

//   toString() {
//     return `${this.flatNumber} ${this.buildingName},${this.city}, ${this.country}`;
//   }
// }

// class Person {
//   constructor(name, address) {
//     this.name = name;
//     this.address = address;
//   }

//   greet() {
//     console.log(`Hi, my name is ${this.name} and I live at ${this.address.toString()}`);
//   }

//   cloneShallowUsingLodash() {
//     return clone(this);
//   }

//   cloneDeepUsingLodash() {
//     return cloneDeep(this);
//   }

//   cloneDeepUsingRecursion(target = {}, source = this) {
//     for (let key in source) {
//       let descriptor = Object.getOwnPropertyDescriptor(source, key);

//       if (descriptor.value instanceof String) {
//         target[key] = new String(descriptor.value);
//       }
      
//       else if (descriptor.value instanceof Array) {
//         target[key] = this.recursiveClone([], descriptor.value);
//       }
      
//       else if (descriptor.value instanceof Object) {
//         let prototype = Reflect.getPrototypeOf(descriptor.value);
//         let cloneObject = this.recursiveClone({}, descriptor.value);
//         Reflect.setPrototypeOf(cloneObject, prototype);
//         target[key] = cloneObject;
//       }
        
//       else {
//         Object.defineProperty(target, key, descriptor);
//       }
//     }

//     let prototype = Reflect.getPrototypeOf(source);
//     Reflect.setPrototypeOf(target, prototype);
//     return target;
//   }


//   cloneShallowUsingObjectCreate() {
//     return Object.create(this);
//   }
// }

// let john = new Person('John', new Address('F-22','Parle Appartment', 'Pune', 'INDIA'));

// // what if we need to create another user with almost same properties?
// let jane = john.cloneShallowUsingLodash();
// jane.name = 'Jane'
// jane.address.flatNumber = 'A-01';
// jane.sayName = function () {
//   console.log(`my name is ${this.name}!!`);
// }

// john.greet();
// jane.greet();
// jane.sayName();

// ===================================================== //
// Prototype factory
// ===================================================== //

import clone from '../../node_modules/lodash-es/clone.js';
import cloneDeep from '../../node_modules/lodash-es/cloneDeep.js';

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
