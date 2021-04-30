# Javascript Tricks & Jugards

## Executing JS Code genrated at runtime
This rarely used pattern is known as function constructor:
<div class="demo-container">
  <iframe src="../../vendor/demoit/index.html?state=../../pages/javascript-tricks/function-constructor.json" style="width:100%; height:300px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
</div>

## Deep/Shallow Cloning in JS

```
// cjs
// const clone = require('lodash.clone');
// const cloneDeep = require('lodash.clonedeep');

// importing default exports from cjs
import clone from 'lodash.clone';
import cloneDeep from 'lodash.clonedeep';

// importing from lodash esm
// import { clone } from 'lodash-es';
// import { cloneDeep } from 'lodash-es';

// importing default export from v8 cjs
import v8 from 'v8';

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
    // Works beautifully
    return clone(this);
  }

  cloneDeepUsingLodash() {
    // Works beautifully
    return cloneDeep(this);
  }

  cloneUsingObjectAssign() {
    // TypeError: jane.greet is not a function
    return Object.assign({}, this);
  }

  cloneUsingSpread() {
    // TypeError: jane.greet is not a function
    return { ...this };
  }

  cloneUsingJsonStringifyParse() {
    // TypeError: jane.greet is not a function
    return JSON.parse(JSON.stringify(this));
  }

  structuredClone() {
    // TypeError: jane.greet is not a function
    return v8.deserialize(v8.serialize(this));
  }

  cloneDeepUsingRecursion(target = {}, source = this) {
    // works beautifully - deep clone - separate copies of methods
    for (let key in source) {
      // console.log('key in source ::::::::::::', key);
      // Use getOwnPropertyDescriptor instead of source[key] to prevent from trigering setter/getter.
      let descriptor = Object.getOwnPropertyDescriptor(source, key);
      // console.log('descriptior ::::::::::::', descriptor);

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



A naive implementation:

```
function clone(source, destination) {
  for(var attr in source.prototype){ destination.prototype[attr] = source.prototype[attr];}
}
```

A little robust:
```
function extend(){
    for(var i=1; i<arguments.length; i++)
        for(var key in arguments[i])
            if(arguments[i].hasOwnProperty(key))
                arguments[0][key] = arguments[i][key];
    return arguments[0];
}
```

Extend as in Typescript:
```
let __extends = this.__extends || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() { this.constructor = d; }
  __.prototype = b.prototype;
  d.prototype = new __();
};
```

Usage:
```

```



Spread operator:

```
function clone(source, destination) {
  return {...source, ...destination };
}
```

Object.assing
```
function extend(source, destination) {
  return Object.assing({}, source, destination);
}
```

The jQuery library provides a function called extend which implements prototype inheritance in a robust fashion. It is about 50 lines long and deals with deep copies and null values. The underscore library porovides a similar implimentation.




## Interface or an Abstract class in Javascript

```
class IInterfaceName {
  constructor() {
    if(this.constructor.name === 'IInterfaceName') {
      throw new Error('IInterfaceName is designed to be abstract!');
    }
  }

  requiredFunction() {
    throw new Error('requiredFunction needs to be implemented');
  }
}
```

VSCode Snippet code:
```
	"abstract class": {
		"prefix": "abs-js",
		"body": [
			"class ${1:AbstractClassName} {",
			"  constructor() {",
			"    if(this.constructor.name === '${1:AbstractClassName}') {",
			"      throw new Error('${1:AbstractClassName} is designed to be abstract!');",
			"    }",
			"  }",
			"}"
		],
		"description": "Abstract class in Javascript"
	},
```

## Extend Error class

```
class SpecialError extends Error {
  constructor(name) {
    let msg = `${name} some special error message here.`
    super(msg);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SpecialError);
    }
  }
}

//usage:
throw new SpecialError('test');
```

## Simple Enum in Javascript
```
let enumSize = Object.freeze({
  large: "large",
  medium: "medium",
  small: "small"
});

//usage
console.log(enumSize.large);
```