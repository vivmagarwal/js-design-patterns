
console.log('decorator-pattern works!!');

// Simplistic Example from: https://addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript

function Vehicle(vehicleType) {
  this.vehicleType = vehicleType || "car";
  this.model = "default";
  this.license = "00000-000";
}

var c1 = new Vehicle("car");
console.log(c1);

var t1 = new Vehicle("truck");
console.log(t1);

t1.setModal = function (modelName){
  this.model = modelName;
}

t1.setColor = function( color ){
  this.color = color;
};

t1.setColor("brown");
t1.setModal("BigB");

console.log(t1);


// ===================================================== //
// Example from Head First Design Patterns by Freeman, Sierra and Bates
// ===================================================== //

// The constructor which we will be decorating
function MacBook() {
  this.cost = function (){
    return 997;
  }

  this.screenSize = function (){
    return 11.6;
  }
}

var mb = new MacBook();
console.log(mb.cost()); // 997

// Decorator 1
function memory(macbook) {
  var v = macbook.cost();
  macbook.cost = function (){
    return v + 75;
  }
}

memory(mb);
console.log(mb.cost()); // 1072

// Decorator 2
function insurance(macbook) {
  var v = macbook.cost();
  macbook.cost = function (){
    return v + 100;
  }
}

insurance(mb);
console.log(mb.cost()); // 1172

// ===================================================== //
console.log('=======================================');

function Cost (qty, price){
  return qty * price;
}

console.log(Cost(20,5));

// docorators mostly accepts a function and returns back a decorated function.
function TaxDecorator (fn){
  return function (qty, price, taxRate) {
    const result = fn(qty, price);
    const tax = result * (taxRate / 100);
    return result + tax;
  }
}

const CostWithTax = TaxDecorator(Cost);
console.log(CostWithTax(20, 5, 10));

// ===================================================== //
console.log('=======================================');


// abstract class
class Bevarage {
  constructor() {
    this.size = "large"; //small/medium/large
    this.description = 'unknown beverage'
  }

  getDescription() {
    return (this.description);
  }

  setSize(cupSize) {
    this.size = cupSize;
  }

  getSize() {
    return this.size;
  }

  cost() { };
  
}

// concrete bevarage
class Espresso extends Bevarage {
  constructor() {
    super();
    this.description = "Espresso shot";
  }

  cost() {
    return 2;
  }
}

// concreate bevarage
class HouseBlend extends Bevarage {
  constructor() {
    super();
    this.description = "House blend coffee"
  }

  cost() {
    return .89;
  }
}

// concreate bevarage
class Decaf extends Bevarage {
  constructor() {
    super();
    this.description = "Decaf"
  }

  cost() {
    return 1.05;
  }
}

// concreate bevarage
class DarkRoast extends Bevarage {
  constructor() {
    super();
    this.description = "Dark Roast"
  }

  cost() {
    return 1;
  }
}

// abstract decorator class
class CondimentDecorator extends Bevarage {
  constructor() {
    super();
    this.decorator = null;
    this.beverage = null;
  }

  getDescription() { };

  getSize() {
    return this.beverage.getSize();
  }
}

class Mocha extends CondimentDecorator {
  constructor(beverage) {
    super();
    this.beverage = beverage;
  }

  getDescription() {
    return `${this.beverage.getDescription()} + Mocha`;
  }

  cost() {
    let cost = this.beverage.cost();

    if (this.beverage.getSize() == 'large') {
      cost += 1;
    } else if (this.beverage.getSize() == 'medium') {
      cost += .5;
    } else if (this.beverage.getSize() == 'small') {
      cost += .25;
    }
    return cost;
  }
}

class Whip extends CondimentDecorator {
  constructor(beverage) {
    super();
    this.beverage = beverage;
  }

  getDescription() {
    return `${this.beverage.getDescription()} + Whip`;
  }

  cost() {
    return this.beverage.cost() + .25;
  }
}

// Caller / client / usage

let esp = new Espresso();
console.log(esp.getDescription(), esp.cost()); // 2

esp.setSize("large");

esp = new Mocha(esp);
console.log(esp.getDescription(), esp.cost()); // 2 + 1 = 3

esp = new Mocha(esp);
console.log(esp.getDescription(), esp.cost()); // 2 + 1 + 1 = 4

console.log('=======================================');

let esp2 =  new Mocha( new Mocha ( new Mocha( new Espresso())))
console.log(esp2.getDescription(), esp2.cost())

const func = new Function(`
  var a = 34;
  console.log(a);
`);

func();

// ===================================================== //
// cloud stream example - with problem
console.log('---------------------------------------');
// ===================================================== //

// class CloudStream {
//   write(data) {
//     console.log('storing ' + data);
//   }
// }

// class EncryptedCloudStream extends CloudStream {
//   write(data) {
//     let encrypted = this.encrypt(data);
//     super.write(encrypted);
//   }

//   encrypt(data) {
//     return '$!@#$!@#$!@#$';
//   }
// }

// /**
//  * New requirement: We need to compress data before we store it, when we are dealing with large files.
//  */

//  class CompressedCloudStream extends CloudStream {
//   write(data) {
//     let compressedData = this.compress(data);
//     super.write(compressedData);
//   }

//   compress(data) {
//     return data.substring(0,4);
//   }
// }


// let cloudStream = new CloudStream();
// cloudStream.write("here's some data");

// let encryptedCloudStream = new EncryptedCloudStream();
// encryptedCloudStream.write("here's some data");

// let compressedCloudStrem = new CompressedCloudStream();
// compressedCloudStrem.write("asdfasdfadfadfadsfadfadsfadsfadfadf");

/**
 * Problem
 * Tomorrow your manager comes and says, in some situations, we need to encrpt and then compress data. 
 * Our cuurrnt implementation doesnot solve this problem. we can either encrypt it or compress it.
 * So we'll have to create a new class which could be a combination of these two..
 * The problem that we are facing is that for every feature, we're adding various classes that combines these features.
 * Here we're dealing with only two features. but in a more complex system, we'll need to have so many classes and their combinations.
 * That is not a maintainable approach. 
 * 
 * This is the problem we solve with the decorator pattern.
 * 
 * With decorator pattern we can add additional behaviour to an object. 
 * 
 * So, at the client side, we can create a plain cloudStream object and then we can add decorators to it.
 * We can decorate this object with different behavoiurs.
 */
  
class Stream {
  write(data) { };
}

class CloudStream extends Stream {
  write(data) {
    console.log('storing ' + data);
  }
}

// decorators
class CompressedCloudStream extends Stream {
  constructor(stream) {
    super();
    this.stream = stream;
  }

  write(data) {
    console.log('data in compress >>> ', data);
    let compressedData = this.compress(data);
    this.stream.write(compressedData);
  }

  compress(data) {
    return data.substring(0,4);
  }
}

class EncryptedCloudStream extends Stream {
  constructor(stream) {
    super();
    this.stream = stream;
  }

  write(data) {
    console.log('data in encrypt >>> ', data);
    let encrypted = this.encrypt(data);
    this.stream.write(encrypted);
  }

  encrypt(data) {
    return '$!@#$!@#$!@#$';
  }
}

// usage
/**
 * 
 */
storeCreditCard(
  new EncryptedCloudStream(
    new CompressedCloudStream(
      new CloudStream()
    )
  )
);

function storeCreditCard(stream) {
  stream.write("1234-1234-1234-1234")
}