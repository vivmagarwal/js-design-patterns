console.log('constructor-pattern works!!');

// #1. Creating object with object literals
var new_object_one = {};

// #2. Creating object with Object.create() Method
var new_object_two = Object.create(Object.prototype);

// #3. Creating object with a constructor
var new_object_three = new Object();

// #4. Creating object using es6 classes
var new_object_four = new class { };

console.log(new_object_one);
console.log(new_object_two);
console.log(new_object_three);
console.log(new_object_four);

// ===================================================== //
// #1. Dot syntax

// Set property
new_object_one.key_one = "Hello World!";

// Get value
var value = new_object_one.key_one;


// ===================================================== //
// #2. Square braket syntax

// Set property
new_object_one['key_two'] = "Welcome to JS Patterns."

// Get value
var value_two = new_object_one['key_two'];

// ===================================================== //
// #3. Object.defineProperty

// Set properties
Object.defineProperty(new_object_one, "key_three", {
  value: 'I just defied a property',
  writable: true,
  enumerable: true,
  configurable: true,
});

// We often create a helper function to make it simpler
function defineProp(obj, key, value) {
  var config = {
    value: value,
    writable: true,
    enumerable: true,
    configurable: true
  };
  Object.defineProperty( obj, key, config );
}

// Usage
defineProp(new_object_one, "key_four", "I just used my helper function to define property")

// ===================================================== //
// Object.defineProperties

// Set properties
Object.defineProperties(new_object_one, {
  "key_six": {
    value: "I can define multiple properties.",
    writable: true,
    enumerable: true,
    configurable: true
  },
 
  "key_seven": {
    value: "I can define multiple properties!! Wow!!.",
    writable: false,
    enumerable: true,
    configurable: true
  }
})

// ===================================================== //
console.log(new_object_one);

// ===================================================== //
// Basic constructors

function Account(type, balance, year) {
  this.type = type;
  this.balance = balance;
  this.year = year;

  this.getInfo = function () {
    return `${this.type} account opened in the year ${this.year} has a balance of Rs. ${this.balance}`;
  }
}

// Usage:

// Creating new instances.
var account_one = new Account("savings", 1000, 2020);
var account_two = new Account("corporate", -1000000, 2021);

console.log(account_one.getInfo());
console.log(account_two.getInfo());

// ===================================================== //
// Constructor with Prototypes

function EfficientAccount(type, balance, year) {
  this.type = type;
  this.balance = balance;
  this.year = year;
}

// In this way on every object creation this method will not be redefined. If it is explicitly refined in for an object then that will be used else javascript will find it in the prototype chain.
// IMO this approach is much more suitable for inheritance. A single instance of getInfo() will now be shared between all EfficientAccount objects.
EfficientAccount.prototype.getInfo = function () {
  return `Efficient ${this.type} account opened in the year ${this.year} has a balance of Rs. ${this.balance}`;
}

// usage:

var efficient_accunt_one = new EfficientAccount("savings", 1000, 1999);
var efficient_account_two = new EfficientAccount("premium", 1000000, 2020);
console.log(efficient_accunt_one.getInfo());
console.log(efficient_account_two.getInfo());
