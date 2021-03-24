console.log('mixin-pattern works!!');

// ===================================================== //
// subclassing
// ===================================================== //

var Person = function (firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.gender = "male";
};

var clark = new Person("John", "Doe");
console.log(clark);

var SuperHero = function (firstName, lastName, powers) {
  Person.call(this, firstName, lastName);
  this.powers = powers;
};
SuperHero.prototype = Object.create(Person.prototype);

var superman = new SuperHero("James", "Bond", ["flight", "heat-vision",]);
console.log(superman);

// ===================================================== //
// mixins
// ===================================================== //

// A simple car constructor function
var Car = function (settings) {
  this.model = settings.model || "no model provided";
  this.color = settings.color || "no colour provided";
};

// Mixin
var Mixin = function () { };

Mixin.prototype = {
  driveForward: function () {
    console.log("drive forward");
  },

  driveBackward: function () {
    console.log("drive backward");
  },

  driveSideways: function () {
    console.log("drive sideways");
  }
};

// Extend an existing object with a method from another
function augment(receivingClass, givingClass) {
  //only provide certain methods (of course we can use spread oprator here.)
  if (arguments[2]) {
    for (var i = 2, len = arguments.length; i < len; i++) {
      receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
    }
  }
  // provide all methods
  else {
    for (var methodName in givingClass.prototype) {
      if (!Object.hasOwnProperty.call(receivingClass.prototype, methodName)) {
        receivingClass.prototype[methodName] = givingClass.prototype[methodName];
      }
    }
  }
}

augment(Car, Mixin);

// Create a new Car
var myCar = new Car({
  model: "Ford Escort",
  color: "blue"
});

myCar.driveForward();
myCar.driveBackward();

console.log('=======================================');
// ===================================================== //

const Tracer = (superClass) => class extends superClass {
  trace(msg) {
    console.log(`Message: ${msg}`);
  }
};

class Widget {
  draw() {
    return "drawing";
  }
}

class NiceWidget extends Tracer(Widget) {
  drawNicely() {
    this.trace(`invoking...`)
    return "Nicely drawig";
  }
}

const niceWidget = new NiceWidget();
const result = niceWidget.drawNicely();
console.log(result);

console.log('=======================================');
// ===================================================== //

const jsSkill = {
  knowsJS() {
    return true
  }
}

const cssSkill = {
  knowsCSS() {
    return true
  }
}

const engDegree = {
  hasDegree() {
    return true;
  }
}

const beSkill = {
  knowsBackend() {
    return true;
  }
}

const frontendEngineer = Object.assign({}, jsSkill, cssSkill, engDegree);
console.log(frontendEngineer);

const fullstackEngineer = Object.assign({}, frontendEngineer, beSkill);
console.log(fullstackEngineer);

console.log('=======================================');
// ===================================================== //
// Factory function (not constructor function)
// ===================================================== //

let CCar = function (color) {
  let moving = false; // closure

  return Object.assign({}, {
    color: color,
    drive() {
      moving = true;
    },
    stop() {
      moving = false;
    },
    isMoving() {
      return moving
    }
  });
};

let redCar = CCar('red'); // we dont need new. we are already returning an object.
console.log(redCar);

console.log(redCar.isMoving());
redCar.drive();
console.log(redCar.isMoving());

const yellowCar = CCar('yellow');
console.log(yellowCar.isMoving());

console.log('=======================================');
// ===================================================== //
// function mixins
// ===================================================== //

/**
 * function mixin is a factory function 
 * that takes an object as an argument
 * copy the properties of the mixins to this object
 * and return a new object
 */

// provides an easy way to share methods without using inheritance.
const humanMixin = function (obj) {
  let isCrying = false;

  return Object.assign({}, obj, {
    cry() {
      isCrying = true;
    },
    isCrying() {
      return isCrying;
    }
  })
}

// provides an easy way to share methods without using inheritance.
const flyMixin = function (obj){
  let isFlying = false;

  return Object.assign({}, obj, {
    fly() {
      isFlying() = true;
    },
    isFlying() {
      return isFlying;
    }
  })
}

const john = humanMixin({});
console.log(john);

const superJohn = flyMixin(john);
console.log(superJohn);

// ===================================================== //
console.log('=======================================');
// underscore library has a much robust _extend function.

var _extend = function (extend_from, extend_to) {
  for (var key in extend_from) {
    if (extend_from.hasOwnProperty(key)) {
      extend_to[key] = extend_from[key];
    }
  }
  return extend_to;
}

var Button = function (txt){
  this.text = txt;
}

var buttonFunctions = {
  click: function (){
    console.log(`this button has been clicked.`);
  },

  hover: function (){
    console.log(`this button has been hovered.`);
  }
}

_extend(buttonFunctions, Button);

Button.click();

// ===================================================== //
console.log('=======================================');
// almost our custom Object.assing

function _mixit(dest, ...src) {
  if(typeof dest == 'object') {
      for(let s of src) {
          if(typeof s == 'object') {
              for(let prp of Object.keys(s)) {
                  dest[prp] = s[prp]
              }
          }
      }
  }
}

const myDetails = {};

const first_name = { firstname: "john" };
const last_name = { lastname: "doe" };
const occupation = { occupation: "front end engineer" };

_mixit(myDetails, first_name, last_name, occupation);

console.log(myDetails);

console.log('=======================================');
// ===================================================== //
// Mixing classes
// ===================================================== //

class CCCar { };


class Wiper {
  wipe() {
    console.log('wiping');
  }
}
class Engine {
  start() {
    console.log('starting the engine');
  }
}

// using our Object.assing wont work in this case.

function classMixin(cls, ...src) {
  for (let _cl of src) {
    for (var key of Object.getOwnPropertyNames(_cl.prototype)) {
      cls.prototype[key] = _cl.prototype[key]
    }
  }
}

classMixin(CCCar, Wiper, Engine);

// the point of a mixin is ease of use. if we intend to apply a mixin to a class (not an object/instance), we can do the following.
function flyCarMixin(cls) {
  cls.prototype.fly = function () {
    console.log(`I am flying`);
  }
  return cls;
}


const c3 = new CCCar();
c3.wipe();


let FlyingCar = flyCarMixin(CCCar);
let c4 = new FlyingCar();
c4.fly();

// if the intention is to use apply the mixin to an object/instance , folliwing can be used
// mutate
function sailCarMixin(obj) {
  Object.assign(obj, {
    sail: function () {
      console.log('Sail in water');
    }
  })
};

sailCarMixin(c4);
c4.sail();

console.log('---------------------------------------');
// apply to object & dont mutate; return a brand new object

function glideCarMixin(obj) {
  return Object.assign({}, obj, {
    glide: function () {
      console.log('Glide in ice');
    }
  })
};

let new_c4 = glideCarMixin(c4);
new_c4.sail();
new_c4.glide();

// ===================================================== //
/**
 * The simplest way to implement a mixin in Javascript is to make object with useful methods, 
 * so that we can easily merge them into a prototype of any class.
 */

